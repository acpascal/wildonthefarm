import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale, type Locale } from '../i18n/ui';

export type JournalEntry = CollectionEntry<'journal'>;
export type JournalSection = JournalEntry['data']['section'];

/** Content collection ids look like "en/nettle" — this is the locale prefix. */
export function localeFromId(id: string): string {
  return id.split('/')[0];
}

/** Strips the locale prefix, so "en/nettle" becomes "nettle" for routing. */
export function slugFromId(id: string): string {
  return id.split('/').slice(1).join('/');
}

export async function getJournal(locale: string): Promise<JournalEntry[]> {
  const all = await getCollection('journal');
  return all
    .filter((entry) => localeFromId(entry.id) === locale && !entry.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** An entry's cross-locale grouping key — its own translationKey, or its own slug when unset (the default for English articles). */
function translationKeyOf(entry: JournalEntry): string {
  return entry.data.translationKey ?? slugFromId(entry.id);
}

function journalHref(locale: Locale, slug: string): string {
  return locale === defaultLocale ? `/journal/${slug}/` : `/${locale}/journal/${slug}/`;
}

/** Every locale this article (or one of its translations) exists in, keyed by locale, valued by that page's path. */
export async function getJournalTranslations(entry: JournalEntry): Promise<Partial<Record<Locale, string>>> {
  const key = translationKeyOf(entry);
  const all = await getCollection('journal', (e) => !e.data.draft);
  const alternates: Partial<Record<Locale, string>> = {};
  for (const e of all) {
    if (translationKeyOf(e) !== key) continue;
    const locale = localeFromId(e.id) as Locale;
    alternates[locale] = journalHref(locale, slugFromId(e.id));
  }
  return alternates;
}

const SECTION_ORDER: JournalSection[] = ['what-we-grow', 'farm-notes', 'travel-panama'];

export function groupBySection(entries: JournalEntry[]): Array<[JournalSection, JournalEntry[]]> {
  const groups = new Map<JournalSection, JournalEntry[]>(SECTION_ORDER.map((s) => [s, []]));
  for (const entry of entries) {
    groups.get(entry.data.section)?.push(entry);
  }
  return SECTION_ORDER.map((section) => [section, groups.get(section) ?? []]);
}
