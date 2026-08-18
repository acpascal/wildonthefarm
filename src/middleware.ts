import { defineMiddleware } from 'astro:middleware';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * Dev-only mirror of netlify.toml's [[redirects]] rules. This site builds
 * to static output, so this middleware never runs in production — Netlify's
 * own edge applies netlify.toml there. It exists purely so `astro dev`
 * (the normal local workflow) also honors those same redirects, without
 * needing `netlify dev` or a second port. netlify.toml stays the single
 * source of truth; this just parses it at startup instead of duplicating it.
 */
function loadRedirects(): Map<string, string> {
  const tomlPath = fileURLToPath(new URL('../netlify.toml', import.meta.url));
  const content = readFileSync(tomlPath, 'utf-8');
  const rules = new Map<string, string>();
  const blockRe = /from = "([^"]+)"\s*\n\s*to = "([^"]+)"/g;
  for (const match of content.matchAll(blockRe)) {
    const [, from, to] = match;
    if (from.startsWith('/')) rules.set(from, to);
  }
  return rules;
}

const redirects = loadRedirects();

export const onRequest = defineMiddleware((context, next) => {
  const to = redirects.get(context.url.pathname);
  if (to) return context.redirect(to, 301);
  return next();
});
