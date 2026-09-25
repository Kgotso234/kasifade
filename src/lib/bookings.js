import clientPromise from "@/lib/mongodb";

const DB_NAME = "kasifade";
const COLLECTION_NAME = "bookings";

/**
 * Create a booking.
 */
export async function createBooking(booking) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  const now = new Date();

  const newBooking = {
    ...booking,
    status: booking.status ?? "confirmed",
    createdAt: now,
    updatedAt: now,
  };

  await db.collection(COLLECTION_NAME).insertOne(newBooking);

  return newBooking;
}

/**
 * Get a booking by its booking reference.
 */
export async function getBookingByReference(bookingReference) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  return db.collection(COLLECTION_NAME).findOne({
    bookingReference,
  });
}

/**
 * Get a booking by its ID.
 */
export async function getBookingById(bookingId) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  return db.collection(COLLECTION_NAME).findOne({
    id: bookingId,
  });
}

/**
 * Get bookings for a specific date.
 */
export async function getBookingsByDate(date) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  return db
    .collection(COLLECTION_NAME)
    .find({
      date,
      status: {
        $in: ["pending", "confirmed"],
      },
    })
    .sort({ time: 1 })
    .toArray();
}

/**
 * Get bookings for a specific barber on a specific date.
 */
export async function getBarberBookings(barberId, date) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  return db
    .collection(COLLECTION_NAME)
    .find({
      barberId,
      date,
      status: {
        $in: ["pending", "confirmed"],
      },
    })
    .sort({ time: 1 })
    .toArray();
}

/**
 * Cancel a booking.
 */
export async function cancelBooking(bookingReference) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  const result = await db.collection(COLLECTION_NAME).findOneAndUpdate(
    { bookingReference },
    {
      $set: {
        status: "cancelled",
        updatedAt: new Date(),
      },
    },
    {
      returnDocument: "after",
    }
  );

  return result;
}