import { languages, type Locale } from '../i18n/ui';

export interface PageTranslation {
  id: string;
  en: string;
  es?: string;
  fr?: string;
  ja?: string;
}

// One entry per top-level page. Only `en` is required — `es`/`fr`/`ja` are
// added once that page actually has a translated route. A page with no
// es/fr/ja entry here simply has no translation yet; Nav and
// LanguageSwitcher both fall back to the English page rather than link to a
// 404.
//
// `ja` slugs are kept in English/romaji (mirroring the `en` path under a
// `/ja/` prefix) rather than translated into Japanese — the same convention
// this site already uses for `journal`, which stays "journal" in es/fr
// rather than becoming "diario"/"journal-fr". Keeping URL segments in Latin
// script is standard practice for Japanese-language sites and avoids
// percent-encoded URLs.
export const pageTranslations: PageTranslation[] = [
  { id: 'home', en: '/', es: '/es/', fr: '/fr/', ja: '/ja/' },
  { id: 'farm', en: '/farm/', es: '/es/finca/', fr: '/fr/ferme/', ja: '/ja/farm/' },
  { id: 'story', en: '/story/', es: '/es/historia/', fr: '/fr/histoire/', ja: '/ja/story/' },
  { id: 'lodge', en: '/lodge/', es: '/es/lodge/', fr: '/fr/lodge/', ja: '/ja/lodge/' },
  { id: 'food', en: '/food/', es: '/es/comida/', fr: '/fr/cuisine/', ja: '/ja/food/' },
  { id: 'garden', en: '/garden/', es: '/es/jardin/', fr: '/fr/jardin/', ja: '/ja/garden/' },
  {
    id: 'wildlife',
    en: '/wildlife/',
    es: '/es/fauna-silvestre/',
    fr: '/fr/faune-sauvage/',
    ja: '/ja/wildlife/',
  },
  { id: 'hiking', en: '/hiking/', es: '/es/senderismo/', fr: '/fr/randonnee/', ja: '/ja/hiking/' },
  {
    id: 'birdwatching',
    en: '/birdwatching/',
    es: '/es/avistamiento-de-aves/',
    fr: '/fr/observation-des-oiseaux/',
    ja: '/ja/birdwatching/',
  },
  { id: 'journal', en: '/journal/', es: '/es/journal/', fr: '/fr/journal/', ja: '/ja/journal/' },
  { id: 'shop', en: '/shop/', es: '/es/tienda/', fr: '/fr/boutique/', ja: '/ja/shop/' },
  {
    id: 'rates-retreats',
    en: '/rates-retreats/',
    es: '/es/tarifas-y-retiros/',
    fr: '/fr/tarifs-et-retraites/',
    ja: '/ja/rates-retreats/',
  },
  {
    id: 'faq',
    en: '/faq/',
    es: '/es/preguntas-frecuentes/',
    fr: '/fr/faq/',
    ja: '/ja/faq/',
  },
  {
    id: 'contact',
    en: '/contact/',
    es: '/es/contacto/',
    fr: '/fr/contact/',
    ja: '/ja/contact/',
  },
  {
    id: 'reserve',
    en: '/reserve/',
    es: '/es/reservar/',
    fr: '/fr/reserver/',
    ja: '/ja/reserve/',
  },
  {
    id: 'legal-notice',
    en: '/legal-notice/',
    es: '/es/aviso-legal/',
    fr: '/fr/mentions-legales/',
    ja: '/ja/legal-notice/',
  },
  { id: 'cabin-1', en: '/cabin-1/', es: '/es/cabana-1/', fr: '/fr/cabane-1/', ja: '/ja/cabin-1/' },
  { id: 'cabin-2', en: '/cabin-2/', es: '/es/cabana-2/', fr: '/fr/cabane-2/', ja: '/ja/cabin-2/' },
  { id: 'cabin-3', en: '/cabin-3/', es: '/es/cabana-3/', fr: '/fr/cabane-3/', ja: '/ja/cabin-3/' },
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
