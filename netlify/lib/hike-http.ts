// Small helpers shared by the hike functions: the Blobs store, JSON replies
// and the admin password check.

import { timingSafeEqual } from 'node:crypto';
import { getStore } from '@netlify/blobs';
import type { BookingStore } from './hike-bookings';

// Strong consistency: a booking must see the seats another guest took a second ago.
export const bookingStore = (): BookingStore =>
  getStore({ name: 'hike-bookings', consistency: 'strong' }) as unknown as BookingStore;

export const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

/** True when the request carries the admin password set in HIKE_ADMIN_PASSWORD. */
export const isAdmin = (request: Request): boolean | 'unconfigured' => {
  const expected = process.env.HIKE_ADMIN_PASSWORD;
  if (!expected) return 'unconfigured';
  const given = request.headers.get('authorization')?.replace(/^Bearer /, '') ?? '';
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
};
