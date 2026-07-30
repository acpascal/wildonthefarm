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
}

export interface ResolvedSeo {
  title: string;
  description: string;
  canonical: string;
  image?: string;
}

/** Resolves a page's SEO fields to absolute URLs against astro.config.mjs's `site`. */
export function buildSeo(site: URL, page: PageSeo): ResolvedSeo {
  return {
    title: page.title,
    description: page.description,
    canonical: absoluteUrl(site, page.path),
    image: page.image ? absoluteUrl(site, page.image) : undefined,
  };
}
