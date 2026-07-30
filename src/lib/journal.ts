import { getCollection, type CollectionEntry } from 'astro:content';

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

const SECTION_ORDER: JournalSection[] = ['what-we-grow', 'farm-notes', 'travel-panama'];

export function groupBySection(entries: JournalEntry[]): Array<[JournalSection, JournalEntry[]]> {
  const groups = new Map<JournalSection, JournalEntry[]>(SECTION_ORDER.map((s) => [s, []]));
  for (const entry of entries) {
    groups.get(entry.data.section)?.push(entry);
  }
  return SECTION_ORDER.map((section) => [section, groups.get(section) ?? []]);
}
