import type { ImageMetadata } from 'astro';

export type PhotoSize = 'lg' | 'wide' | 'tall' | 'normal';

export interface PhotoItem {
  image: ImageMetadata;
  alt: string;
  size?: PhotoSize;
}
