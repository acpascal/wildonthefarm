import type { UiKey } from '../i18n/ui';

export interface NavLink {
  key: UiKey;
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
    pageId: 'the-farm',
    items: [
      { key: 'nav.theFarm', pageId: 'the-farm' },
      { key: 'nav.stay', pageId: 'stay' },
      { key: 'nav.kitchen', pageId: 'kitchen' },
      { key: 'nav.garden', pageId: 'garden' },
      { key: 'nav.organicMacadamia', href: '/journal/french-visionary-of-boquete/' },
    ],
  },
  { key: 'nav.wildlife', pageId: 'wildlife' },
  {
    key: 'nav.experience',
    pageId: 'hiking',
    items: [
      { key: 'nav.birdwatching', pageId: 'birdwatching' },
      { key: 'nav.hiking', pageId: 'hiking' },
    ],
  },
  { key: 'nav.journal', pageId: 'journal' },
  { key: 'nav.shop', pageId: 'shop' },
  { key: 'nav.ratesRetreats', pageId: 'rates-retreats' },
];
