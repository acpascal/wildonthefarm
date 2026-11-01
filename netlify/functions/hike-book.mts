// POST /api/hikes/book — holds the seats of a new booking as "pending" until
// the deposit is confirmed, or the booking cancelled, from the admin page.

import { randomUUID } from 'node:crypto';
import { createBooking } from '../lib/hike-bookings';
import { bookingStore, json } from '../lib/hike-http';

export default async (request: Request) => {
  if (request.method !== 'POST') return json({ error: 'method' }, 405);
  let input: Record<string, unknown>;
  try {
    input = await request.json();
  } catch {
    return json({ error: 'invalid' }, 400);
  }
  // Hidden field no person fills in: a filled one is a bot, answered as if it had worked.
  if (input.website) return json({ ok: true });

  const result = await createBooking(bookingStore(), input, new Date(), randomUUID);
  if (!result.ok) return json({ error: result.reason, seatsLeft: result.seatsLeft }, result.reason === 'full' ? 409 : 400);
  return json({ ok: true, id: result.booking.id, deposit: result.booking.deposit });
};

export const config = { path: '/api/hikes/book' };
