// Booking rules shared by the three hike functions (availability, book,
// admin). Kept free of Netlify APIs: the store is passed in, so the same
// rules run against Netlify Blobs in production and an in-memory store in
// tests. Prices and days all come from src/data/guidedHikes.ts.

import { guidedHikes, type GuidedHike } from '../../src/data/guidedHikes';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

/** What the server keeps for a booking — only what is needed to hold the
 *  seats and reach the guest. Ages, health and insurance details travel in
 *  the WhatsApp/e-mail request and are deliberately not stored here. */
export interface Booking {
  id: string;
  hike: string;
  /** Departure, 'YYYY-MM-DD'. */
  date: string;
  guests: number;
  /** The optional meal was asked for. */
  meal: boolean;
  name: string;
  email: string;
  whatsapp: string;
  total: number;
  deposit: number;
  status: BookingStatus;
  /** ISO timestamps. */
  createdAt: string;
  updatedAt: string;
}

/** The slice of the Netlify Blobs store API the rules rely on. */
export interface BookingStore {
  list(options: { prefix: string }): Promise<{ blobs: { key: string }[] }>;
  get(key: string, options: { type: 'json' }): Promise<unknown>;
  setJSON(key: string, value: unknown): Promise<unknown>;
  delete(key: string): Promise<void>;
}

export type Seats = Record<string, { confirmed: number; pending: number }>;

const DAY_MS = 24 * 60 * 60 * 1000;
// Departures are in Panama, which stays on UTC−5 all year.
const PANAMA_OFFSET_MS = -5 * 60 * 60 * 1000;

export const findHike = (slug: unknown): GuidedHike | undefined => guidedHikes.find((hike) => hike.slug === slug);

export const bookingKey = (booking: Pick<Booking, 'hike' | 'date' | 'id'>) =>
  `${booking.hike}/${booking.date}/${booking.id}`;

/** Today's date in Panama, as 'YYYY-MM-DD'. */
export const panamaToday = (now: Date): string => new Date(now.getTime() + PANAMA_OFFSET_MS).toISOString().slice(0, 10);

const addDays = (date: string, days: number): string =>
  new Date(Date.parse(`${date}T00:00:00Z`) + days * DAY_MS).toISOString().slice(0, 10);

/** Pending and confirmed bookings both hold their seats, until we cancel them. */
export const holdsSeats = (booking: Booking): boolean => booking.status !== 'cancelled';

/** Whether `date` is a departure of this hike that can still be booked today. */
export const isBookableDate = (hike: GuidedHike, date: string, now: Date): boolean => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const time = Date.parse(`${date}T00:00:00Z`);
  if (Number.isNaN(time)) return false;
  const today = panamaToday(now);
  return (
    hike.weekdays.includes(new Date(time).getUTCDay()) &&
    date >= addDays(today, hike.minNoticeDays) &&
    date <= hike.lastDate
  );
};

/** Bookings of a hike, optionally from one departure date onwards. */
export const loadBookings = async (store: BookingStore, hike: GuidedHike, fromDate = ''): Promise<Booking[]> => {
  const { blobs } = await store.list({ prefix: `${hike.slug}/` });
  const keys = blobs.map((blob) => blob.key).filter((key) => key.split('/')[1] >= fromDate);
  const bookings = await Promise.all(keys.map((key) => store.get(key, { type: 'json' })));
  return bookings.filter(Boolean) as Booking[];
};

/** Seats taken per departure: those in the data file plus the live bookings. */
export const seatsFor = (hike: GuidedHike, bookings: Booking[], now: Date): Seats => {
  const seats: Seats = {};
  const at = (date: string) => (seats[date] ??= { confirmed: 0, pending: 0 });
  for (const [date, taken] of Object.entries(hike.seats)) {
    at(date).confirmed += taken.confirmed ?? 0;
    at(date).pending += taken.pending ?? 0;
  }
  for (const booking of bookings) {
    if (!holdsSeats(booking)) continue;
    at(booking.date)[booking.status === 'confirmed' ? 'confirmed' : 'pending'] += booking.guests;
  }
  return seats;
};

const taken = (seats: Seats, date: string) => (seats[date]?.confirmed ?? 0) + (seats[date]?.pending ?? 0);

export type BookingResult =
  | { ok: true; booking: Booking }
  | { ok: false; reason: 'invalid' | 'full'; seatsLeft?: number };

const text = (value: unknown, max: number): string => (typeof value === 'string' ? value.trim().slice(0, max) : '');

/** Validates a request and, if the seats are free, holds them as a pending booking. */
export const createBooking = async (
  store: BookingStore,
  input: Record<string, unknown>,
  now: Date,
  newId: () => string
): Promise<BookingResult> => {
  const hike = findHike(input.hike);
  const date = text(input.date, 10);
  const guests = Number(input.guests);
  const name = text(input.name, 120);
  const email = text(input.email, 200);
  const whatsapp = text(input.whatsapp, 40);
  if (
    !hike ||
    !isBookableDate(hike, date, now) ||
    !Number.isInteger(guests) ||
    guests < 1 ||
    guests > hike.maxPeople ||
    !name ||
    !whatsapp ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return { ok: false, reason: 'invalid' };
  }

  const before = seatsFor(hike, await loadBookings(store, hike, date), now);
  if (taken(before, date) + guests > hike.maxPeople) {
    return { ok: false, reason: 'full', seatsLeft: Math.max(hike.maxPeople - taken(before, date), 0) };
  }

  const meal = Boolean(input.meal) && Boolean(hike.meal);
  const total = guests * (hike.pricePerPerson + (meal ? (hike.meal?.pricePerPerson ?? 0) : 0));
  const stamp = now.toISOString();
  const booking: Booking = {
    id: newId(),
    hike: hike.slug,
    date,
    guests,
    meal,
    name,
    email,
    whatsapp,
    total,
    deposit: total * hike.depositRate,
    status: 'pending',
    createdAt: stamp,
    updatedAt: stamp,
  };
  await store.setJSON(bookingKey(booking), booking);

  // The store has no transactions: if another request took the last seats in
  // the meantime, give this one back rather than overbook the group.
  const after = seatsFor(hike, await loadBookings(store, hike, date), now);
  if (taken(after, date) > hike.maxPeople) {
    await store.delete(bookingKey(booking));
    return { ok: false, reason: 'full', seatsLeft: Math.max(hike.maxPeople - taken(before, date), 0) };
  }
  return { ok: true, booking };
};

/** Changes a booking's status from the admin page; refuses to overbook a departure. */
export const setBookingStatus = async (
  store: BookingStore,
  key: string,
  status: BookingStatus,
  now: Date
): Promise<BookingResult> => {
  const booking = (await store.get(key, { type: 'json' })) as Booking | null;
  const hike = booking && findHike(booking.hike);
  if (!booking || !hike || !['pending', 'confirmed', 'cancelled'].includes(status)) {
    return { ok: false, reason: 'invalid' };
  }
  if (status !== 'cancelled' && !holdsSeats(booking)) {
    const seats = seatsFor(hike, await loadBookings(store, hike, booking.date), now);
    if (taken(seats, booking.date) + booking.guests > hike.maxPeople) {
      return { ok: false, reason: 'full', seatsLeft: Math.max(hike.maxPeople - taken(seats, booking.date), 0) };
    }
  }
  const updated: Booking = { ...booking, status, updatedAt: now.toISOString() };
  await store.setJSON(key, updated);
  return { ok: true, booking: updated };
};
