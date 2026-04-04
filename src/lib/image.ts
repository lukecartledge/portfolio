import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { client } from './sanity'

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

type ImageSize = {
  width: number
  height?: number
  quality?: number
}

const HERO_SIZES: ImageSize[] = [
  { width: 640, quality: 80 },
  { width: 1024, quality: 80 },
  { width: 1440, quality: 80 },
  { width: 1920, quality: 80 },
  { width: 2560, quality: 80 },
]

const GRID_SIZES: ImageSize[] = [
  { width: 400, quality: 75 },
  { width: 600, quality: 75 },
  { width: 800, quality: 75 },
]

const OG_SIZE: ImageSize = { width: 1200, height: 630, quality: 85 }

export function heroSrcset(source: SanityImageSource): string {
  return HERO_SIZES.map(
    ({ width, quality }) =>
      `${urlFor(source).width(width).quality(quality!).auto('format').url()} ${width}w`,
  ).join(', ')
}

export function gridSrcset(source: SanityImageSource): string {
  return GRID_SIZES.map(
    ({ width, quality }) =>
      `${urlFor(source)
        .width(width)
        .height(Math.round(width / 1.5))
        .fit('crop')
        .quality(quality!)
        .auto('format')
        .url()} ${width}w`,
  ).join(', ')
}

export function ogImageUrl(source: SanityImageSource): string {
  return urlFor(source)
    .width(OG_SIZE.width)
    .height(OG_SIZE.height!)
    .fit('crop')
    .quality(OG_SIZE.quality!)
    .auto('format')
    .url()
}

export function blurPlaceholder(source: SanityImageSource): string {
  return urlFor(source).width(20).blur(50).quality(30).auto('format').url()
}
