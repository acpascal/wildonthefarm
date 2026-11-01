// GET /api/hikes/availability?hike=<slug> — seats taken per departure, read
// by the booking form's calendar.

import { findHike, loadBookings, panamaToday, seatsFor } from '../lib/hike-bookings';
import { bookingStore, json } from '../lib/hike-http';

export default async (request: Request) => {
  const hike = findHike(new URL(request.url).searchParams.get('hike'));
  if (!hike) return json({ error: 'unknown-hike' }, 404);
  const now = new Date();
  const bookings = await loadBookings(bookingStore(), hike, panamaToday(now));
  return json({ seats: seatsFor(hike, bookings, now) });
};

export const config = { path: '/api/hikes/availability' };
