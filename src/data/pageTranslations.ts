import { defaultLocale, type Locale } from '../i18n/ui';

export interface PageTranslation {
  id: string;
  en: string;
  es?: string;
  fr?: string;
}

// One entry per top-level page. Only `en` is required — `es`/`fr` are added
// once that page actually has a translated route. A page with no es/fr
// entry here simply has no translation yet; Nav and LanguageSwitcher both
// fall back to the English page rather than link to a 404.
export const pageTranslations: PageTranslation[] = [
  { id: 'home', en: '/' },
  { id: 'the-farm', en: '/the-farm/' },
  { id: 'stay', en: '/stay/', es: '/es/estancia/', fr: '/fr/sejour/' },
  { id: 'kitchen', en: '/kitchen/' },
  { id: 'garden', en: '/garden/' },
  { id: 'wildlife', en: '/wildlife/' },
  { id: 'hiking', en: '/hiking/' },
  { id: 'birdwatching', en: '/birdwatching/' },
  { id: 'journal', en: '/journal/', es: '/es/journal/', fr: '/fr/journal/' },
  { id: 'shop', en: '/shop/' },
  { id: 'rates-retreats', en: '/rates-retreats/' },
  { id: 'faqs-contact', en: '/faqs-contact/' },
];

/** The href for a given page id in a given locale, falling back to the English page. */
export function pageHref(id: string, locale: Locale): string {
  const entry = pageTranslations.find((p) => p.id === id);
  if (!entry) return '/';
  return entry[locale] ?? entry.en;
}

/** Every locale this page actually has a real translation for — used for hreflang and the language switcher. */
export function pageAlternates(id: string): Partial<Record<Locale, string>> {
  const entry = pageTranslations.find((p) => p.id === id);
  if (!entry) return {};
  const alternates: Partial<Record<Locale, string>> = { [defaultLocale]: entry.en };
  if (entry.es) alternates.es = entry.es;
  if (entry.fr) alternates.fr = entry.fr;
  return alternates;
}
