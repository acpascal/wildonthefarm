import type { ImageMetadata } from 'astro';

const assets = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.{jpg,jpeg,png,webp}',
  { eager: true }
);

/**
 * Looks up an optimized image asset by its path relative to src/assets/,
 * e.g. img('journal/nettle/leaf.jpg'). Throws a clear error on a typo'd
 * path instead of failing silently, since content is edited by hand.
 */
export function img(path: string): ImageMetadata {
  const key = `/src/assets/${path}`;
  const mod = assets[key];
  if (!mod) {
    const available = Object.keys(assets).length;
    throw new Error(
      `img(): no asset found at "${path}" (looked for ${key}). ` +
        `Check the path and file extension. (${available} assets indexed.)`
    );
  }
  return mod.default;
}
