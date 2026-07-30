import type { UiKey } from '../i18n/ui';

export interface NavLink {
  key: UiKey;
  href: string;
}

export interface NavDropdown extends NavLink {
  items: NavLink[];
}

export type NavItem = NavLink | NavDropdown;

export function isDropdown(item: NavItem): item is NavDropdown {
  return 'items' in item;
}

// English (unprefixed, default locale) paths. Locale-aware hrefs land in
// Phase 7 alongside pageTranslations.ts and the language switcher.
export const navItems: NavItem[] = [
  {
    key: 'nav.farmAndStay',
    href: '/the-farm/',
    items: [
      { key: 'nav.theFarm', href: '/the-farm/' },
      { key: 'nav.stay', href: '/stay/' },
      { key: 'nav.kitchen', href: '/kitchen/' },
      { key: 'nav.garden', href: '/garden/' },
      { key: 'nav.organicMacadamia', href: '/journal/french-visionary-of-boquete/' },
    ],
  },
  { key: 'nav.wildlife', href: '/wildlife/' },
  {
    key: 'nav.experience',
    href: '/hiking/',
    items: [
      { key: 'nav.birdwatching', href: '/birdwatching/' },
      { key: 'nav.hiking', href: '/hiking/' },
    ],
  },
  { key: 'nav.journal', href: '/journal/' },
  { key: 'nav.shop', href: '/shop/' },
  { key: 'nav.ratesRetreats', href: '/rates-retreats/' },
];
