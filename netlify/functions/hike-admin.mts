// POST /api/hikes/admin — the private bookings list and its actions
// (deposit received, cancel, put back to pending), behind HIKE_ADMIN_PASSWORD.

import { guidedHikes } from '../../src/data/guidedHikes';
import { loadBookings, panamaToday, seatsFor, setBookingStatus, bookingKey } from '../lib/hike-bookings';
import { bookingStore, isAdmin, json } from '../lib/hike-http';

export default async (request: Request) => {
  if (request.method !== 'POST') return json({ error: 'method' }, 405);
  const admin = isAdmin(request);
  if (admin === 'unconfigured') return json({ error: 'unconfigured' }, 503);
  if (!admin) return json({ error: 'unauthorized' }, 401);

  let input: Record<string, unknown> = {};
  try {
    input = await request.json();
  } catch {
    // An empty body just lists the bookings.
  }
  const store = bookingStore();
  const now = new Date();

  if (input.action === 'set-status') {
    const result = await setBookingStatus(store, String(input.key), input.status as never, now);
    if (!result.ok) return json({ error: result.reason, seatsLeft: result.seatsLeft }, result.reason === 'full' ? 409 : 400);
  }

  const today = panamaToday(now);
  const hikes = await Promise.all(
    guidedHikes.map(async (hike) => {
      const bookings = await loadBookings(store, hike);
      return {
        slug: hike.slug,
        title: hike.title,
        maxPeople: hike.maxPeople,
        seats: seatsFor(hike, bookings.filter((booking) => booking.date >= today), now),
        bookings: bookings
          .map((booking) => ({ ...booking, key: bookingKey(booking) }))
          .sort((a, b) => a.date.localeCompare(b.date) || a.createdAt.localeCompare(b.createdAt)),
      };
    })
  );
  return json({ today, hikes });
};

export const config = { path: '/api/hikes/admin' };
