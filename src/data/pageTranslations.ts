import { languages, type Locale } from '../i18n/ui';

export interface PageTranslation {
  id: string;
  en: string;
  es?: string;
}

// One entry per top-level page. Only `en` is required — `es` is added once
// that page actually has a translated route. A page with no es entry here
// simply has no translation yet; Nav and LanguageSwitcher both fall back to
// the English page rather than link to a 404.
export const pageTranslations: PageTranslation[] = [
  { id: 'home', en: '/', es: '/es/' },
  { id: 'farm', en: '/farm/', es: '/es/finca/' },
  { id: 'story', en: '/story/', es: '/es/historia/' },
  { id: 'lodge', en: '/lodge/', es: '/es/lodge/' },
  { id: 'food', en: '/food/', es: '/es/comida/' },
  { id: 'garden', en: '/garden/', es: '/es/jardin/' },
  { id: 'wildlife', en: '/wildlife/' },
  { id: 'hiking', en: '/hiking/' },
  { id: 'birdwatching', en: '/birdwatching/' },
  { id: 'journal', en: '/journal/', es: '/es/journal/' },
  { id: 'shop', en: '/shop/' },
  { id: 'rates-retreats', en: '/rates-retreats/' },
  { id: 'faqs-contact', en: '/faqs-contact/' },
];

const locales = Object.keys(languages) as Locale[];

/** The href for a given page id in a given locale, falling back to the English page. */
export function pageHref(id: string, locale: Locale): string {
  const entry = pageTranslations.find((p) => p.id === id);
  if (!entry) return '/';
  return entry[locale] ?? entry.en;
}

/**
 * Every locale a page has a real translation for, derived from its own
 * canonical `path` — no page-side wiring required. Pass whatever `path` you
 * already give `PageLayout`; if that path matches an entry below (in any
 * locale), every locale that entry has gets included. A path with no match
 * (or a dynamic per-article path, e.g. journal articles) yields `{}`, which
 * simply means no language switcher.
 */
export function pageAlternatesForPath(path: string): Partial<Record<Locale, string>> {
  const entry = pageTranslations.find((p) => locales.some((loc) => p[loc] === path));
  if (!entry) return {};
  const alternates: Partial<Record<Locale, string>> = {};
  for (const loc of locales) {
    if (entry[loc]) alternates[loc] = entry[loc];
  }
  return alternates;
}
