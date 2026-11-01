import type { Locale } from '../i18n/ui';

// Guided hikes that guests book by date are declared here, once. The booking
// form (HikeBooking.astro), its departure calendar and its totals all follow
// from this file — prices, days and rules are never hand-written in a page.

export interface GuidedHike {
  /** URL-safe id — used in the form's anchor (`#reserver-<slug>`), so don't rename once shared. */
  slug: string;
  title: string;
  /** Departure days, as JS weekday numbers (0 = Sunday … 6 = Saturday). */
  weekdays: number[];
  /** Meeting point in each language, and time — shown as-is in the summary and the request. */
  meetingPoint: Record<Locale, string>;
  /** Unset while the start time is still to be decided. */
  startTime?: string;
  /** The departure only runs once this many people are booked on it. */
  minPeople: number;
  maxPeople: number;
  /** USD per person. */
  pricePerPerson: number;
  /** Optional meal, booked with the hike. `pricePerPerson` stays unset until
   *  the price is decided: the guest can still ask for it, without a total. */
  meal?: { pricePerPerson?: number };
  /** Share of the total paid by PayPal when booking; the rest is due before departure. */
  depositRate: number;
  /** No refund once the departure is this many days away or fewer. */
  noRefundDays: number;
  /** Earliest bookable departure, in days from today. */
  minNoticeDays: number;
  /** Last departure the calendar offers, 'YYYY-MM-DD'. */
  lastDate: string;
  /** Seats taken per departure, as { 'YYYY-MM-DD': { confirmed, pending } }:
   *  `confirmed` have paid their deposit, `pending` have booked and not paid yet
   *  (they keep their seat until we cancel them). Both count against `maxPeople`; the calendar
   *  shows them apart so a guest can see a full date may still open up. Set
   *  `confirmed` to `maxPeople` to close a departure that is not running. */
  seats: Record<string, { confirmed?: number; pending?: number }>;
}

export const amistadWildCrossing: GuidedHike = {
  slug: 'amistad-wild-crossing',
  title: 'Amistad Wild Crossing',
  weekdays: [0, 3],
  meetingPoint: { en: 'El Pianista', es: 'El Pianista', fr: 'El Pianista', ja: 'エル・ピアニスタ (El Pianista)' },
  startTime: '8:00',
  minPeople: 2,
  maxPeople: 6,
  pricePerPerson: 100,
  depositRate: 0.5,
  noRefundDays: 15,
  minNoticeDays: 2,
  lastDate: '2027-12-31',
  seats: {},
};

export const cloudForestWaterfall: GuidedHike = {
  slug: 'cloud-forest-waterfall',
  title: 'Cloud Forest and Waterfall',
  weekdays: [1, 4],
  meetingPoint: {
    en: 'Camino del Español',
    es: 'Camino del Español',
    fr: 'Camino del Español',
    ja: 'カミノ・デル・エスパニョール (Camino del Español)',
  },
  startTime: '9:00',
  minPeople: 2,
  maxPeople: 6,
  pricePerPerson: 70,
  depositRate: 0.5,
  noRefundDays: 15,
  minNoticeDays: 2,
  lastDate: '2027-12-31',
  seats: {},
};

export const farmTourCloudForest: GuidedHike = {
  slug: 'farm-tour-cloud-forest',
  title: 'Farm Tour and Cloud Forest',
  weekdays: [5],
  meetingPoint: {
    en: 'Bottom of the farm',
    es: 'Parte baja de la finca',
    fr: 'En bas de la ferme',
    ja: '農園の下 (Bottom of the farm)',
  },
  startTime: '9:00',
  minPeople: 2,
  maxPeople: 6,
  pricePerPerson: 50,
  meal: { pricePerPerson: 30 },
  depositRate: 0.5,
  noRefundDays: 15,
  minNoticeDays: 2,
  lastDate: '2027-12-31',
  seats: {},
};

/** One card of the booking form's first step (HikeBooking.astro). The card's
 *  wording lives in the page, in the page's language. */
export interface HikeOption {
  /** The bookable hike from this file — leave unset while its
   *  days and price are still to come: the card then shows as "coming soon". */
  hike?: GuidedHike;
  title: string;
  /** Who it is for, e.g. 'Randonneurs confirmés'. */
  level?: string;
  /** Two or three short facts shown on the card. */
  details?: string[];
}

/** Every bookable hike — the booking functions look a hike up here by its slug. */
export const guidedHikes: GuidedHike[] = [amistadWildCrossing, cloudForestWaterfall, farmTourCloudForest];
