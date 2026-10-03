import type { ImageMetadata } from 'astro';

export type PhotoSize = 'lg' | 'wide' | 'tall' | 'normal';

export interface PhotoItem {
  image: ImageMetadata;
  alt: string;
  size?: PhotoSize;
  /** Public URL of a video (e.g. '/videos/hike-4h-en.mp4'). When set, `image`
   *  is its poster and the tile opens the video in the lightbox. */
  video?: string;
}
