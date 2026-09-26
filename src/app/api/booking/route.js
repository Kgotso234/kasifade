import { NextResponse } from "next/server";

import {
  createBooking,  getBarberBookings, getBookingsByDate,
} from "@/lib/bookings";

import {
  getCustomerByPhone, getCustomerByEmail, createCustomer, updateCustomer,
} from "@/lib/customers";

import {
  bookingSettings, services, barbers,
} from "@/data/service";

/**
 * Generate a unique booking reference.
 * Example: KASI-A1B2C
 */
function generateBookingReference() {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let result = "KASI-";

  for (let i = 0; i < 5; i++) {
    result += chars.charAt(
      Math.floor(Math.random() * chars.length)
    );
  }

  return result;
}

/**
 * Convert HH:mm to minutes from midnight.
 */
function timeToMinutes(time) {
  const [hours, minutes] =
    time.split(":").map(Number);

  return hours * 60 + minutes;
}

/**
 * Check whether two bookings overlap.
 */
function bookingsOverlap(
  existingTime,
  existingDuration,
  requestedTime,
  requestedDuration
) {
  const existingStart =
    timeToMinutes(existingTime);

  const existingEnd =
    existingStart +
    Number(existingDuration);

  const requestedStart =
    timeToMinutes(requestedTime);

  const requestedEnd =
    requestedStart +
    Number(requestedDuration);

  return (
    existingStart < requestedEnd &&
    existingEnd > requestedStart
  );
}

/**
 * Find barber by ID.
 */
function findBarber(barberId) {
  return barbers.find(
    (barber) => barber.id === barberId
  );
}

/**
 * Check whether barber can perform service.
 *
 * NOTE:
 * Your data uses `specialties`, not `services`.
 */
function barberCanPerformService(
  barber,
  serviceId
) {
  if (!barber) return false;

  return barber.specialties?.includes(
    serviceId
  );
}

/**
 * Check barber availability.
 */
function isBarberAvailable({
  barberId,
  service,
  time,
  existingBookings,
}) {
  const barberBookings =
    existingBookings.filter(
      (booking) =>
        booking.barberId === barberId &&
        booking.status !== "cancelled"
    );

  return !barberBookings.some((booking) =>
    bookingsOverlap(
      booking.time,
      booking.serviceDuration,
      time,
      service.duration
    )
  );
}

/**
 * GET /api/bookings?date=YYYY-MM-DD
 *
 * Optional:
 *
 * /api/bookings?date=YYYY-MM-DD&barberId=barber-1
 */
export async function GET(request) {
  try {
    const { searchParams } =
      new URL(request.url);

    const date =
      searchParams.get("date");

    const barberId =
      searchParams.get("barberId");

    if (!date) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Date parameter is required (YYYY-MM-DD).",
        },
        { status: 400 }
      );
    }

    let bookings = [];

    if (barberId) {
      bookings =
        await getBarberBookings(
          barberId,
          date
        );
    } else {
      bookings =
        await getBookingsByDate(date);
    }

    return NextResponse.json({
      success: true,
      bookings: bookings || [],
    });
  } catch (error) {
    console.error(
      "GET /api/bookings error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to fetch bookings.",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/bookings
 */
export async function POST(request) {
  try {
    const body = await request.json();

    const {
      customerName,
      customerSurname = "",
      customerEmail = "",
      customerPhone,
      date,
      time,
      partySize = 1,
      people = [],
      notes = "",
    } = body;

    /*
     * -----------------------------------------
     * BASIC VALIDATION
     * -----------------------------------------
     */

    if (
      !customerName ||
      !customerPhone ||
      !date ||
      !time
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Name, phone, date and time are required.",
        },
        { status: 400 }
      );
    }

    const parsedPartySize =
      Number(partySize);

    if (
      !Number.isInteger(
        parsedPartySize
      ) ||
      parsedPartySize < 1
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid party size.",
        },
        { status: 400 }
      );
    }

    if (
      parsedPartySize >
      bookingSettings.maxPartySize
    ) {
      return NextResponse.json(
        {
          success: false,
          error: `Maximum party size allowed is ${bookingSettings.maxPartySize}.`,
        },
        { status: 400 }
      );
    }

    /*
     * -----------------------------------------
     * NORMALISE PEOPLE
     * -----------------------------------------
     */

    if (
      !Array.isArray(people) ||
      people.length !==
        parsedPartySize
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "The number of guests does not match the party size.",
        },
        { status: 400 }
      );
    }

    /*
     * -----------------------------------------
     * VALIDATE SERVICE + BARBER
     * -----------------------------------------
     */

    const validatedPeople = [];

    for (
      let i = 0;
      i < people.length;
      i++
    ) {
      const person = people[i];

      const service = services.find(
        (item) =>
          item.id === person.serviceId
      );

      if (!service) {
        return NextResponse.json(
          {
            success: false,
            error: `Invalid service for guest ${
              i + 1
            }.`,
          },
          { status: 400 }
        );
      }

      let barber = null;

      if (
        person.barberId &&
        person.barberId !== "any"
      ) {
        barber = findBarber(
          person.barberId
        );

        if (!barber) {
          return NextResponse.json(
            {
              success: false,
              error: `Invalid barber for guest ${
                i + 1
              }.`,
            },
            { status: 400 }
          );
        }

        if (
          !barberCanPerformService(
            barber,
            service.id
          )
        ) {
          return NextResponse.json(
            {
              success: false,
              error: `${barber.name} does not provide ${service.name}.`,
            },
            { status: 400 }
          );
        }
      }

      validatedPeople.push({
        service,
        barberId:
          person.barberId || "any",
      });
    }

    /*
     * -----------------------------------------
     * GET CURRENT BOOKINGS
     * -----------------------------------------
     */

    const existingBookings =
      await getBookingsByDate(date);

    /*
     * -----------------------------------------
     * RESOLVE BARBERS
     * -----------------------------------------
     */

    const resolvedPeople = [];

    for (
      let i = 0;
      i < validatedPeople.length;
      i++
    ) {
      const person =
        validatedPeople[i];

      let selectedBarberId =
        person.barberId;

      /*
       * Specific barber.
       */
      if (
        selectedBarberId &&
        selectedBarberId !== "any"
      ) {
        const available =
          isBarberAvailable({
            barberId:
              selectedBarberId,
            service: person.service,
            time,
            existingBookings,
          });

        if (!available) {
          return NextResponse.json(
            {
              success: false,
              code:
                "BARBER_UNAVAILABLE",
              error:
                "The selected barber is no longer available at that time.",
              guest: i + 1,
            },
            { status: 409 }
          );
        }
      } else {
        /*
         * Any available barber.
         */
        const availableBarber =
          barbers.find((barber) => {
            if (
              !barberCanPerformService(
                barber,
                person.service.id
              )
            ) {
              return false;
            }

            return isBarberAvailable({
              barberId: barber.id,
              service: person.service,
              time,
              existingBookings,
            });
          });

        if (!availableBarber) {
          return NextResponse.json(
            {
              success: false,
              code:
                "NO_BARBER_AVAILABLE",
              error: `No available barber was found for ${person.service.name} at ${time}.`,
              guest: i + 1,
            },
            { status: 409 }
          );
        }

        selectedBarberId =
          availableBarber.id;
      }

      resolvedPeople.push({
        ...person,
        barberId:
          selectedBarberId,
      });
    }

    /*
     * -----------------------------------------
     * MAKE SURE TWO GROUP MEMBERS DON'T
     * SHARE THE SAME BARBER
     * -----------------------------------------
     */

    for (
      let i = 0;
      i < resolvedPeople.length;
      i++
    ) {
      for (
        let j = i + 1;
        j < resolvedPeople.length;
        j++
      ) {
        const first =
          resolvedPeople[i];

        const second =
          resolvedPeople[j];

        if (
          first.barberId !==
          second.barberId
        ) {
          continue;
        }

        if (
          bookingsOverlap(
            time,
            first.service.duration,
            time,
            second.service.duration
          )
        ) {
          return NextResponse.json(
            {
              success: false,
              code:
                "BARBER_CONFLICT",
              error:
                "Two guests cannot use the same barber at the same time.",
            },
            { status: 409 }
          );
        }
      }
    }

    /*
     * -----------------------------------------
     * CUSTOMER
     * -----------------------------------------
     */

    let customer = null;

    if (customerPhone) {
      customer =
        await getCustomerByPhone(
          customerPhone
        );
    }

    if (!customer && customerEmail) {
      customer =
        await getCustomerByEmail(
          customerEmail
        );
    }

    const fullName =
      `${customerName} ${customerSurname}`
        .trim();

    if (customer) {
      customer =
        await updateCustomer(
          customer.id,
          {
            name: fullName,
            email:
              customerEmail ||
              customer.email ||
              "",
            phone:
              customerPhone ||
              customer.phone,
          }
        );
    } else {
      const customerId =
        `cust_${Date.now()}`;

      customer =
        await createCustomer({
          id: customerId,
          name: fullName,
          email:
            customerEmail || "",
          phone: customerPhone,
        });
    }

    /*
     * -----------------------------------------
     * REFERENCES
     * -----------------------------------------
     */

    const groupReference =
      parsedPartySize > 1
        ? generateBookingReference()
        : null;

    /*
     * -----------------------------------------
     * CREATE BOOKINGS
     * -----------------------------------------
     */

    const createdBookings = [];

    for (
      let i = 0;
      i < resolvedPeople.length;
      i++
    ) {
      const person =
        resolvedPeople[i];

      const bookingReference =
        parsedPartySize === 1
          ? generateBookingReference()
          : `${groupReference}-${i + 1}`;

      const bookingData = {
        bookingReference,
        groupReference,

        customerId:
          customer.id,

        customerName:
          i === 0
            ? fullName
            : `Guest ${i + 1} (${fullName})`,

        customerEmail:
          customerEmail || "",

        customerPhone,

        serviceId:
          person.service.id,

        serviceName:
          person.service.name,

        servicePrice:
          person.service.price,

        serviceDuration:
          person.service.duration,

        barberId:
          person.barberId,

        date,
        time,

        notes,

        partySize:
          parsedPartySize,

        isPrimaryBooker:
          i === 0,

        status: "confirmed",
      };

      const created =
        await createBooking(
          bookingData
        );

      createdBookings.push(created);
    }

    return NextResponse.json(
      {
        success: true,

        message:
          parsedPartySize > 1
            ? "Group booking confirmed successfully."
            : "Booking confirmed successfully.",

        customer,

        groupReference,

        bookings:
          createdBookings,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "POST /api/bookings error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to process booking. Please try again.",
      },
      { status: 500 }
    );
  }
}