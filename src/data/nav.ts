import type { Locale, UiKey } from '../i18n/ui';
import { JOURNAL_SECTION_KEYS, journalSections } from './journalSections';

export interface NavLink {
  /** UI-string key for the label. Omit only when `label` is given instead. */
  key?: UiKey;
  /** Ready-made label per locale — for links generated from data rather than ui.ts. */
  label?: Record<Locale, string>;
  /** Resolved per-locale via pageTranslations.ts — use this for any real page. */
  pageId?: string;
  /** Raw href, used as-is regardless of locale — for links with no per-locale entry. */
  href?: string;
}

export interface NavDropdown extends NavLink {
  items: NavLink[];
}

export type NavItem = NavLink | NavDropdown;

export function isDropdown(item: NavItem): item is NavDropdown {
  return 'items' in item;
}

export const navItems: NavItem[] = [
  {
    key: 'nav.farmAndStay',
    pageId: 'farm',
    items: [
      { key: 'nav.theFarm', pageId: 'farm' },
      { key: 'nav.stay', pageId: 'lodge' },
      { key: 'nav.kitchen', pageId: 'food' },
      { key: 'nav.garden', pageId: 'garden' },
      { key: 'nav.ourStory', pageId: 'story' },
    ],
  },
  {
    key: 'nav.experience',
    pageId: 'hiking',
    items: [
      { key: 'nav.wildlife', pageId: 'wildlife' },
      { key: 'nav.birdwatching', pageId: 'birdwatching' },
      { key: 'nav.hiking', pageId: 'hiking' },
    ],
  },
  {
    key: 'nav.journal',
    pageId: 'journal',
    items: [
      { key: 'nav.journalAll', pageId: 'journal' },
      // One entry per journal section, straight from data/journalSections.ts —
      // a section added there appears here on its own.
      ...JOURNAL_SECTION_KEYS.map((section) => {
        const { copy } = journalSections[section];
        return {
          pageId: `journal-${section}`,
          label: { en: copy.en.navLabel, es: copy.es.navLabel, fr: copy.fr.navLabel, ja: copy.ja.navLabel },
        };
      }),
    ],
  },
  { key: 'nav.shop', pageId: 'shop' },
  { key: 'nav.ratesRetreats', pageId: 'rates-retreats' },
];
