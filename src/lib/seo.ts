import type { Locale } from '../i18n/ui';

export function absoluteUrl(site: URL | string, path: string): string {
  const base = typeof site === 'string' ? site : site.toString();
  return new URL(path, base).toString();
}

export interface PageSeo {
  title: string;
  description: string;
  /** Page path, e.g. '/stay/' — must match the site's trailingSlash config. */
  path: string;
  /** Relative path to an OG/Twitter image, e.g. '/images/stay/hero.jpg'. */
  image?: string;
  /** True for pages that shouldn't be indexed (e.g. 404). */
  noindex?: boolean;
  /** Every locale this page has a real translation for, keyed by locale, valued by that page's path. */
  alternates?: Partial<Record<Locale, string>>;
}

export interface ResolvedSeo {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  noindex: boolean;
  alternates?: Partial<Record<Locale, string>>;
}

/** Resolves a page's SEO fields to absolute URLs against astro.config.mjs's `site`. */
export function buildSeo(site: URL, page: PageSeo): ResolvedSeo {
  const alternates = page.alternates
    ? (Object.fromEntries(
        Object.entries(page.alternates).map(([locale, path]) => [locale, absoluteUrl(site, path)])
      ) as Partial<Record<Locale, string>>)
    : undefined;

  return {
    title: page.title,
    description: page.description,
    canonical: absoluteUrl(site, page.path),
    image: page.image ? absoluteUrl(site, page.image) : undefined,
    noindex: page.noindex ?? false,
    alternates,
  };
}
