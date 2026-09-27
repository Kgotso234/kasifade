"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import {
  business,
  bookingSettings,
  openingHours,
  services,
  barbers,
  barbersFor,
  formatPrice,
} from "@/data/service";

/* ---------------------------------------------------------
   STYLES (matching the rest of the site)
--------------------------------------------------------- */
const label = "text-[11px] font-bold uppercase tracking-[0.22em] text-mustard";
const h2 = "font-display text-3xl leading-tight md:text-4xl";
const btnPrimary =
  "inline-flex items-center justify-center rounded-btn bg-mustard px-7 py-4 text-center text-sm font-bold tracking-wide text-forest transition-colors hover:bg-mustard-hover disabled:cursor-not-allowed disabled:opacity-40";
const btnGhost =
  "inline-flex items-center justify-center rounded-btn border border-cream/40 px-7 py-4 text-center text-sm font-bold tracking-wide transition-colors hover:border-mustard hover:text-mustard disabled:cursor-not-allowed disabled:opacity-40";
const card = "rounded-btn border p-5 text-left transition-colors";
const cardIdle = "border-cream/20 hover:border-cream/40";
const cardSelected = "border-mustard bg-mustard/10";
const cardDisabled = "cursor-not-allowed border-cream/10 opacity-40";
const cardService =
  "rounded-[999px] border px-6 py-4 text-center transition-colors";
const fieldTrigger =
  "flex w-full items-center justify-between rounded-btn border px-5 py-4 text-left transition-colors sm:w-auto sm:min-w-[280px]";

/* ---------------------------------------------------------
   ICONS
--------------------------------------------------------- */
function ArrowIcon({ direction }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      {direction === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`ml-3 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/* ---------------------------------------------------------
   DATE / TIME HELPERS
--------------------------------------------------------- */
const pad2 = (n) => String(n).padStart(2, "0");

const dateKeyOf = (date) =>
  `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;

const weekdayShort = (date) =>
  date.toLocaleDateString("en-ZA", { weekday: "short" });

const monthDay = (date) =>
  date.toLocaleDateString("en-ZA", { day: "numeric", month: "short" });

const fullDate = (date) =>
  date.toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function addMonths(date, n) {
  return new Date(date.getFullYear(), date.getMonth() + n, 1);
}
function buildMonthGrid(viewMonth) {
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const startWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(year, month, day));
  return cells;
}

// Next N days, each marked open/closed from openingHours
function buildDateOptions() {
  const out = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < bookingSettings.maxDaysAhead; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const hoursForDay = openingHours[d.getDay()];
    out.push({
      dateKey: dateKeyOf(d),
      date: d,
      label: i === 0 ? "Today" : weekdayShort(d),
      sub: monthDay(d),
      closed: !hoursForDay,
    });
  }
  return out;
}

// SAST is UTC+2 year-round (no daylight saving), so this stays simple.
function toUtcDate(dateKey, time) {
  const [y, m, d] = dateKey.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  return new Date(Date.UTC(y, m - 1, d, hh - 2, mm));
}

function minutesToTime(mins) {
  return `${pad2(Math.floor(mins / 60))}:${pad2(mins % 60)}`;
}
function timeToMinutes(time) {
  const [hh, mm] = time.split(":").map(Number);
  return hh * 60 + mm;
}

/* ---------------------------------------------------------
   SIMULATED AVAILABILITY
   Stand-in for the real /api/availability + MongoDB check.
   Deterministic (same slot always gives the same result on
   reload) so the demo behaves consistently.
--------------------------------------------------------- */
function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

function isBarberBusy(barberId, dateKey, time) {
  return hashString(`${barberId}|${dateKey}|${time}`) % 10 < 3; // ~30% busy
}

function freeBarberIdsAt(dateKey, time) {
  return barbers.filter((b) => !isBarberBusy(b.id, dateKey, time)).map((b) => b.id);
}

// Greedy: can every person in the party be covered by a free, qualified barber?
// Respects an explicit barber choice when that barber is actually free.
function tryAssignBarbers(people, freeIds) {
  const free = new Set(freeIds);
  const assignment = [];
  for (const person of people) {
    const qualified = barbersFor(person.service)
      .map((b) => b.id)
      .filter((id) => free.has(id));
    if (qualified.length === 0) return null;

    const preferred =
      person.barber && person.barber !== "any" && qualified.includes(person.barber)
        ? person.barber
        : qualified[0];

    free.delete(preferred);
    assignment.push({ ...person, assignedBarber: preferred });
  }
  return assignment;
}

// All slots for a date where enough barbers are free to cover the whole party
function slotsForDate(dateKey, people) {
  const hoursForDay = openingHours[new Date(dateKey).getDay()];
  if (!hoursForDay || people.length === 0) return [];

  const maxDuration = Math.max(
    ...people.map((p) => services.find((s) => s.id === p.service)?.duration || 0)
  );

  const openMin = timeToMinutes(hoursForDay.open);
  const closeMin = timeToMinutes(hoursForDay.close);
  const now = new Date();
  const earliestAllowed = new Date(now.getTime() + bookingSettings.leadTimeMinutes * 60000);

  const out = [];
  for (
    let m = openMin;
    m + maxDuration <= closeMin;
    m += bookingSettings.slotIntervalMinutes
  ) {
    const time = minutesToTime(m);
    const slotUtc = toUtcDate(dateKey, time);
    if (slotUtc < earliestAllowed) continue;

    const freeIds = freeBarberIdsAt(dateKey, time);
    const feasible = tryAssignBarbers(people, freeIds) !== null;
    if (feasible) out.push(time);
  }
  return out;
}

/* ---------------------------------------------------------
   CALENDAR LINKS
--------------------------------------------------------- */
function toIcsStamp(date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function buildCalendarEvent({ dateKey, time, people, reference }) {
  const maxDuration = Math.max(
    ...people.map((p) => services.find((s) => s.id === p.service)?.duration || 0)
  );
  const start = toUtcDate(dateKey, time);
  const end = new Date(start.getTime() + maxDuration * 60000);

  const title =
    people.length === 1
      ? `${services.find((s) => s.id === people[0].service)?.name} at ${business.name}`
      : `${business.name} — ${people.length} people`;

  const detailLines = people.map((p) => {
    const svc = services.find((s) => s.id === p.service);
    const barber = barbers.find((b) => b.id === p.assignedBarber);
    return `${svc?.name} with ${barber ? barber.name : "any barber"} (${formatPrice(
      svc?.price || 0
    )})`;
  });

  const details = [
    `Booking reference: ${reference}`,
    ...detailLines,
    `Call: ${business.phone}`,
  ].join("\\n");

  return { title, start, end, details, location: business.address };
}

function buildGoogleCalendarUrl(event) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${toIcsStamp(event.start)}/${toIcsStamp(event.end)}`,
    details: event.details.replace(/\\n/g, "\n"),
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function downloadIcs(event) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Kasifade//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@kasifade.co.za`,
    `DTSTAMP:${toIcsStamp(new Date())}`,
    `DTSTART:${toIcsStamp(event.start)}`,
    `DTEND:${toIcsStamp(event.end)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.details}`,
    `LOCATION:${event.location}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "kasifade-appointment.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* ---------------------------------------------------------
   SHARED PAGE SHELL — photo panel + content column
   Mobile: photo stacks on top, content below (default flow)
   Desktop: photo on the right, content on the left
--------------------------------------------------------- */
function BookingShell({ children }) {
  return (
    <div className="pt-20">
      <div className="lg:flex lg:min-h-[calc(100svh-5rem)]">
        {/* Photo panel */}
        <div className="relative h-56 w-full overflow-hidden sm:h-72 lg:order-2 lg:h-auto lg:w-[42%]">
          {/* TODO: replace with a real shop photo once available */}
          <img
            src="/images/kasifade-hero.jpg"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-forest/10 to-transparent lg:bg-gradient-to-l" />
          <div className="absolute bottom-5 left-5 lg:bottom-8 lg:left-8">
            <p className="font-display text-xl leading-none text-cream lg:text-2xl">
              {business.shortName.toUpperCase()}
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-mustard">
              {business.area.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Content column */}
        <div className="lg:order-1 lg:w-[58%]">
          <div className="px-6 py-10 lg:px-12 lg:py-16">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   DATE FIELD — button + custom calendar popover
--------------------------------------------------------- */
function DateField({ dateKey, dateOptions, onSelect }) {
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(new Date()));
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const dateInfoMap = useMemo(() => {
    const map = new Map();
    dateOptions.forEach((d) => map.set(d.dateKey, d));
    return map;
  }, [dateOptions]);

  const minMonth = useMemo(() => startOfMonth(new Date()), []);
  const maxMonth = useMemo(
    () => startOfMonth(dateOptions[dateOptions.length - 1].date),
    [dateOptions]
  );

  const cells = buildMonthGrid(viewMonth);
  const selectedInfo = dateKey ? dateInfoMap.get(dateKey) : null;
  const triggerLabel = selectedInfo ? fullDate(selectedInfo.date) : "Select booking date";

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${fieldTrigger} ${dateKey ? cardSelected : cardIdle}`}
      >
        <span className={dateKey ? "font-display text-lg" : "text-sm text-cream/70"}>
          {triggerLabel}
        </span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-2 w-[320px] max-w-[90vw] rounded-btn border border-cream/15 bg-forest p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <button
                type="button"
                disabled={viewMonth <= minMonth}
                onClick={() => setViewMonth((m) => addMonths(m, -1))}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-mustard disabled:opacity-20"
                aria-label="Previous month"
              >
                <ArrowIcon direction="left" />
              </button>
              <span className="font-display text-sm">
                {viewMonth.toLocaleDateString("en-ZA", { month: "long", year: "numeric" })}
              </span>
              <button
                type="button"
                disabled={viewMonth >= maxMonth}
                onClick={() => setViewMonth((m) => addMonths(m, 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-mustard disabled:opacity-20"
                aria-label="Next month"
              >
                <ArrowIcon direction="right" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase text-cream/40">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-1">
              {cells.map((date, i) => {
                if (!date) return <span key={`pad-${i}`} />;
                const key = dateKeyOf(date);
                const info = dateInfoMap.get(key);
                const disabled = !info || info.closed;
                const selected = dateKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                      onSelect(key);
                      setOpen(false);
                    }}
                    className={`aspect-square rounded-full text-xs transition-colors ${
                      selected
                        ? "bg-mustard font-bold text-forest"
                        : disabled
                        ? "cursor-not-allowed text-cream/20"
                        : "text-cream/80 hover:bg-cream/10"
                    }`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   BARBER FIELD — button + custom dropdown
--------------------------------------------------------- */
function BarberField({ person, qualified, freeIds, onSelect }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const selectedBarber = barbers.find((b) => b.id === person.barber);
  const triggerLabel =
    person.barber === "any" || !selectedBarber ? "Any available barber" : selectedBarber.name;

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${fieldTrigger} ${cardIdle}`}
      >
        <span className="font-display text-lg">{triggerLabel}</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-2 w-full min-w-[280px] rounded-btn border border-cream/15 bg-forest p-2 shadow-xl">
            <button
              type="button"
              onClick={() => {
                onSelect("any");
                setOpen(false);
              }}
              className={`block w-full rounded-btn px-4 py-3 text-left text-sm transition-colors ${
                person.barber === "any" ? "bg-mustard/15 text-mustard" : "hover:bg-cream/5"
              }`}
            >
              Any available barber
              <span className="block text-xs text-cream/50">Fastest option</span>
            </button>
            {qualified.map((b) => {
              const free = freeIds.includes(b.id);
              return (
                <button
                  key={b.id}
                  type="button"
                  disabled={!free}
                  onClick={() => {
                    onSelect(b.id);
                    setOpen(false);
                  }}
                  className={`block w-full rounded-btn px-4 py-3 text-left text-sm transition-colors ${
                    !free
                      ? "cursor-not-allowed text-cream/25"
                      : person.barber === b.id
                      ? "bg-mustard/15 text-mustard"
                      : "hover:bg-cream/5"
                  }`}
                >
                  {b.name}
                  <span className="block text-xs text-cream/50">
                    {b.role}
                    {!free ? " — booked at this time" : ""}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   MAIN COMPONENT
--------------------------------------------------------- */
const STEPS = ["Party", "Service", "Date & time", "Barber", "Details", "Review"];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [partySize, setPartySize] = useState(1);
  const [people, setPeople] = useState([{ service: null, barber: "any" }]);
  const [dateKey, setDateKey] = useState(null);
  const [time, setTime] = useState(null);
  const [customer, setCustomer] = useState({ name: "", surname: "", phone: "", email: "" });
  const [errors, setErrors] = useState({});
  const [assignError, setAssignError] = useState("");
  const [confirmed, setConfirmed] = useState(null); // { reference, ...booking }
  const [submitting, setSubmitting] = useState(false);

  const dateOptions = useMemo(() => buildDateOptions(), []);
  const readyForSlots = people.every((p) => p.service);
  const timeOptions = useMemo(() => {
    if (!dateKey || !readyForSlots) return [];
    return slotsForDate(dateKey, people);
  }, [dateKey, people, readyForSlots]);

  const totalPrice = people.reduce((sum, p) => {
    const svc = services.find((s) => s.id === p.service);
    return sum + (svc?.price || 0);
  }, 0);
  const totalDuration = Math.max(
    0,
    ...people.map((p) => services.find((s) => s.id === p.service)?.duration || 0)
  );

  /* ---- step 1: party size ---- */
  function setParty(n) {
    setPartySize(n);
    setPeople((prev) => {
      const next = [...prev];
      while (next.length < n) next.push({ service: null, barber: "any" });
      next.length = n;
      return next;
    });
    setDateKey(null);
    setTime(null);
  }

  /* ---- step 2: services ---- */
  function setPersonService(index, serviceId) {
    setPeople((prev) =>
      prev.map((p, i) => (i === index ? { ...p, service: serviceId, barber: "any" } : p))
    );
    setDateKey(null);
    setTime(null);
  }

  /* ---- step 4: barber choice ---- */
  function setPersonBarber(index, barberId) {
    setPeople((prev) => prev.map((p, i) => (i === index ? { ...p, barber: barberId } : p)));
    setAssignError("");
  }

  const freeIdsAtChosenSlot = dateKey && time ? freeBarberIdsAt(dateKey, time) : [];

  /* ---- validation ---- */
  function validateDetails() {
    const e = {};
    if (!customer.name.trim()) e.name = "Enter your first name.";
    if (!customer.surname.trim()) e.surname = "Enter your surname.";
    const phoneDigits = customer.phone.replace(/\s+/g, "");
    if (!/^(\+27|0)\d{9}$/.test(phoneDigits)) {
      e.phone = "Enter a valid SA number, e.g. 082 123 4567.";
    }
    if (customer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      e.email = "That email doesn't look right.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  /* ---- confirm: posts to /api/bookings, saves booking + customer ---- */
  async function handleConfirm() {
    const freeIds = freeBarberIdsAt(dateKey, time);
    const assignment = tryAssignBarbers(people, freeIds);
    if (!assignment) {
      setAssignError(
        "One of your barber picks just got taken for that time. Please choose another barber or time."
      );
      setStep(4);
      return;
    }

    const payload = {
      customerName: customer.name,
      customerSurname: customer.surname,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      date: dateKey,
      time,
      partySize: people.length,
      people: people.map((p) => ({ serviceId: p.service, barberId: p.barber })),
    };

    console.log("[booking] submitting payload:", payload);
    setSubmitting(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("[booking] response status:", res.status, res.headers.get("content-type"));

      let data;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const raw = await res.text();
        console.error("[booking] non-JSON response from /api/bookings:", raw.slice(0, 500));
        setAssignError(
          `Server returned an unexpected response (status ${res.status}). Check server logs.`
        );
        return;
      }

      console.log("[booking] response data:", data);

      if (!res.ok || !data.success) {
        console.error("[booking] booking failed:", data);
        setAssignError(data.error || `Couldn't save your booking (status ${res.status}).`);
        return;
      }

      setConfirmed({
        reference: data.groupReference || data.bookings[0].bookingReference,
        dateKey,
        time,
        people: data.bookings.map((b) => ({
          service: b.serviceId,
          assignedBarber: b.barberId,
        })),
        customer,
        totalPrice,
        totalDuration,
      });
    } catch (e) {
      console.error("[booking] fetch threw:", e);
      setAssignError(
        `Network error — ${e.message || "please check your connection and try again."}`
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function next() {
    if (step === 4) {
      const freeIds = freeBarberIdsAt(dateKey, time);
      if (!tryAssignBarbers(people, freeIds)) {
        setAssignError("That combination isn't available any more. Pick a different barber.");
        return;
      }
    }
    if (step === 5) {
      if (!validateDetails()) return;
      setStep(6);
      return;
    }
    if (step === 6) {
      await handleConfirm();
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length));
  }
  function back() {
    setAssignError("");
    setStep((s) => Math.max(s - 1, 1));
  }

  const canContinue = {
    1: partySize >= 1,
    2: people.every((p) => p.service),
    3: Boolean(dateKey && time),
    4: true,
    5: true,
    6: true,
  }[step];

  /* ---------------------------------------------------------
     CONFIRMATION SCREEN (after successful save)
  --------------------------------------------------------- */
  if (confirmed) {
    const event = buildCalendarEvent(confirmed);
    const chosenDate = new Date(confirmed.dateKey);

    return (
      <BookingShell>
        <p className={label}>Booking confirmed</p>
        <h1 className={`${h2} mt-3`}>You&apos;re booked, {confirmed.customer.name}.</h1>
        <p className="mt-2 text-sm text-cream/60">
          Reference <span className="text-mustard">{confirmed.reference}</span>
        </p>

        <div className="mt-8 rounded-btn border border-cream/15 bg-forest-light p-6">
          <p className="text-sm text-cream/70">
            {fullDate(chosenDate)} · {confirmed.time}
          </p>
          <ul className="mt-4 space-y-3">
            {confirmed.people.map((p, i) => {
              const svc = services.find((s) => s.id === p.service);
              const barber = barbers.find((b) => b.id === p.assignedBarber);
              return (
                <li key={i} className="flex items-center justify-between text-sm">
                  <span>
                    {svc?.name}
                    {confirmed.people.length > 1 ? ` (person ${i + 1})` : ""} with {barber?.name}
                  </span>
                  <span className="font-display text-mustard">{formatPrice(svc?.price || 0)}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-cream/15 pt-4 text-sm font-bold">
            <span>Total</span>
            <span className="font-display text-lg text-mustard">
              {formatPrice(confirmed.totalPrice)}
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          
          <a  href={buildGoogleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className={btnPrimary}
          >
            Add to Google Calendar
          </a>
          <button type="button" onClick={() => downloadIcs(event)} className={btnGhost}>
            Add to Apple / Outlook
          </button>
        </div>

        <p className="mt-8 text-sm text-cream/60">
          Need to change anything? Call us on{" "}
          <a href={business.phoneHref} className="text-mustard hover:underline">
            {business.phone}
          </a>{" "}
          and quote your reference.
        </p>

        <Link href="/" className="mt-10 inline-block text-sm text-cream/60 hover:text-mustard">
          Back to home
        </Link>
      </BookingShell>
    );
  }

  /* ---------------------------------------------------------
     BOOKING WIZARD
  --------------------------------------------------------- */
  return (
    <BookingShell>
      <p className={label}>Book your chair</p>
      <h1 className={`${h2} mt-3`}>Let&apos;s get you sharp.</h1>

      {/* Progress */}
      <ol className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-wide">
        {STEPS.map((label_, i) => (
          <li
            key={label_}
            className={
              i + 1 === step ? "text-mustard" : i + 1 < step ? "text-cream/60" : "text-cream/30"
            }
          >
            {i + 1}. {label_}
          </li>
        ))}
      </ol>

      <div className="mt-10">
        {/* STEP 1: party size */}
        {step === 1 && (
          <div>
            <h2 className="font-display text-2xl">How many people?</h2>

            <div className="mt-5 flex items-center justify-between rounded-btn border border-cream/20 p-5">
              <div>
                <p className="font-display text-lg">How many people?</p>
                <p className="mt-1 text-xs text-cream/60">
                  Each person gets their own barber and service
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setParty(Math.max(1, partySize - 1))}
                  disabled={partySize <= 1}
                  aria-label="Decrease party size"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/30 text-lg transition-colors hover:border-mustard disabled:cursor-not-allowed disabled:opacity-30"
                >
                  −
                </button>

                <span className="font-display w-6 text-center text-xl">{partySize}</span>

                <button
                  type="button"
                  onClick={() =>
                    setParty(Math.min(bookingSettings.maxPartySize, partySize + 1))
                  }
                  disabled={partySize >= bookingSettings.maxPartySize}
                  aria-label="Increase party size"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/30 text-lg transition-colors hover:border-mustard disabled:cursor-not-allowed disabled:opacity-30"
                >
                  +
                </button>
              </div>
            </div>

            <p className="mt-4 text-sm text-cream/60">
              Booking for more than {bookingSettings.maxPartySize}?{" "}
              <a href={business.whatsappHref} className="text-mustard hover:underline">
                Message us on WhatsApp
              </a>
              .
            </p>
          </div>
        )}

        {/* STEP 2: service per person */}
        {step === 2 && (
          <div className="space-y-10">
            {people.map((person, index) => (
              <div key={index}>
                <h2 className="font-display text-2xl">
                  {people.length > 1 ? `Person ${index + 1}` : "Choose a service"}
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setPersonService(index, s.id)}
                      className={`${cardService} ${
                        person.service === s.id ? cardSelected : cardIdle
                      }`}
                    >
                      <span className="font-display text-lg">{s.name}</span>
                      <span className="mt-1 block text-xs text-cream/60">
                        {s.duration} min · {formatPrice(s.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STEP 3: date & time */}
        {step === 3 && (
          <div>
            <h2 className="font-display text-2xl">Pick a date</h2>
            <div className="mt-4">
              <DateField
                dateKey={dateKey}
                dateOptions={dateOptions}
                onSelect={(key) => {
                  setDateKey(key);
                  setTime(null);
                }}
              />
            </div>

            {dateKey && (
              <div className="mt-8">
                <h3 className="font-display text-xl">Available times</h3>
                {timeOptions.length === 0 ? (
                  <p className="mt-3 text-sm text-cream/60">
                    No times left that fit your whole party on this day. Try another date.
                  </p>
                ) : (
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {timeOptions.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        className={`rounded-btn border px-4 py-3 text-center transition-colors ${
                          time === t ? cardSelected : cardIdle
                        }`}
                      >
                        <span className="font-display text-base">{t}</span>
                        <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wide text-mustard/80">
                          Available
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* STEP 4: barber, dropdown, optional */}
        {step === 4 && (
          <div className="space-y-10">
            <p className="text-sm text-cream/60">
              Leave it on &quot;Any available barber&quot; and we&apos;ll assign the best fit for
              each service.
            </p>
            {assignError && (
              <p className="rounded-btn border border-brick/50 bg-brick/10 p-4 text-sm text-brick">
                {assignError}
              </p>
            )}
            {people.map((person, index) => {
              const svc = services.find((s) => s.id === person.service);
              const qualified = barbersFor(person.service);
              return (
                <div key={index}>
                  <h2 className="font-display text-xl">
                    {svc?.name}
                    {people.length > 1 ? ` — person ${index + 1}` : ""}
                  </h2>
                  <div className="mt-4">
                    <BarberField
                      person={person}
                      qualified={qualified}
                      freeIds={freeIdsAtChosenSlot}
                      onSelect={(barberId) => setPersonBarber(index, barberId)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 5: details */}
        {step === 5 && (
          <div className="max-w-md space-y-5">
            <h2 className="font-display text-2xl">Your details</h2>
            <Field
              label="First name"
              value={customer.name}
              onChange={(v) => setCustomer((c) => ({ ...c, name: v }))}
              error={errors.name}
            />
            <Field
              label="Surname"
              value={customer.surname}
              onChange={(v) => setCustomer((c) => ({ ...c, surname: v }))}
              error={errors.surname}
            />
            <Field
              label="Contact number"
              value={customer.phone}
              onChange={(v) => setCustomer((c) => ({ ...c, phone: v }))}
              error={errors.phone}
              placeholder="082 123 4567"
            />
            <Field
              label="Email (optional)"
              value={customer.email}
              onChange={(v) => setCustomer((c) => ({ ...c, email: v }))}
              error={errors.email}
              placeholder="you@example.com"
            />
          </div>
        )}

        {/* STEP 6: review before submitting */}
        {step === 6 && (
          <div>
            <h2 className="font-display text-2xl">Review your booking</h2>
            <p className="mt-2 text-sm text-cream/60">
              Check everything below, then confirm to book your chair.
            </p>

            {assignError && (
              <p className="mt-4 rounded-btn border border-brick/50 bg-brick/10 p-4 text-sm text-brick">
                {assignError}
              </p>
            )}

            <div className="mt-6 space-y-4">
              {/* Date & time */}
              <div className="flex items-center justify-between rounded-btn border border-cream/15 bg-forest-light p-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-cream/50">
                    Date &amp; time
                  </p>
                  <p className="font-display mt-1 text-lg">
                    {dateKey ? fullDate(new Date(dateKey)) : "—"} · {time || "—"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-xs font-semibold uppercase tracking-wide text-mustard hover:underline"
                >
                  Edit
                </button>
              </div>

              {/* Services + barbers per person */}
              <div className="rounded-btn border border-cream/15 bg-forest-light p-5">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-cream/50">
                    {people.length > 1 ? `${people.length} guests` : "Service"}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs font-semibold uppercase tracking-wide text-mustard hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <ul className="mt-3 space-y-3">
                  {people.map((p, i) => {
                    const svc = services.find((s) => s.id === p.service);
                    const barber =
                      p.barber && p.barber !== "any"
                        ? barbers.find((b) => b.id === p.barber)
                        : null;
                    return (
                      <li key={i} className="flex items-center justify-between text-sm">
                        <span>
                          {people.length > 1 ? `Person ${i + 1}: ` : ""}
                          {svc?.name || "—"} with {barber ? barber.name : "any available barber"}
                        </span>
                        <span className="font-display text-mustard">
                          {formatPrice(svc?.price || 0)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-4 flex items-center justify-between border-t border-cream/15 pt-4 text-sm font-bold">
                  <span>Total</span>
                  <span className="font-display text-lg text-mustard">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Customer details */}
              <div className="rounded-btn border border-cream/15 bg-forest-light p-5">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-cream/50">
                    Your details
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep(5)}
                    className="text-xs font-semibold uppercase tracking-wide text-mustard hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <p className="font-display mt-2 text-lg">
                  {customer.name} {customer.surname}
                </p>
                <p className="mt-1 text-sm text-cream/70">{customer.phone}</p>
                {customer.email && (
                  <p className="mt-1 text-sm text-cream/70">{customer.email}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary + nav */}
      {step > 1 && step < 6 && (dateKey || step < 3) && (
        <div className="mt-8 rounded-btn border border-cream/15 bg-forest-light p-4 text-sm text-cream/70">
          {people.map((p, i) => {
            const svc = services.find((s) => s.id === p.service);
            return svc ? (
              <div key={i}>
                {svc.name} — {formatPrice(svc.price)}
              </div>
            ) : null;
          })}
          {dateKey && time && (
            <div className="mt-1 text-mustard">
              {fullDate(new Date(dateKey))} · {time}
            </div>
          )}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button type="button" onClick={back} disabled={step === 1 || submitting} className={btnGhost}>
          Back
        </button>
        <button type="button" onClick={next} disabled={!canContinue || submitting} className={btnPrimary}>
          {submitting ? "Booking..." : step === 6 ? "Confirm booking" : "Continue"}
        </button>
      </div>
    </BookingShell>
  );
}

/* ---------------------------------------------------------
   SMALL FIELD COMPONENT
--------------------------------------------------------- */
function Field({ label: labelText, value, onChange, error, placeholder }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-cream/60">
        {labelText}
      </span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-2 w-full rounded-btn border bg-transparent px-4 py-3 text-cream outline-none transition-colors ${
          error ? "border-brick" : "border-cream/25 focus:border-mustard"
        }`}
      />
      {error && <span className="mt-1 block text-xs text-brick">{error}</span>}
    </label>
  );
}