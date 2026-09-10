import { createImageUrlBuilder } from '@sanity/image-url';
import { sanityClient } from './client';

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: any): string | null {
  if (!source) return null;
  if (typeof source === 'string') return source;
  if (source.asset?.url) return source.asset.url;
  if (source.url) return source.url;
  if (source.asset?._ref || source._ref) {
    try {
      return builder.image(source).auto('format').fit('max').url();
    } catch {
      return null;
    }
  }
  return null;
}

