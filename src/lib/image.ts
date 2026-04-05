export type ContentfulAsset = {
  fields: {
    file: {
      url: string
      details?: {
        image?: {
          width: number
          height: number
        }
      }
    }
    title?: string
  }
}

function ensureHttps(url: string): string {
  return url.startsWith('//') ? `https:${url}` : url
}

function assetUrl(asset: ContentfulAsset): string {
  return ensureHttps(asset.fields.file.url)
}

type ImageParams = {
  w?: number
  h?: number
  q?: number
  fm?: string
  fit?: string
  f?: string
}

function buildUrl(asset: ContentfulAsset, params: ImageParams = {}): string {
  const base = assetUrl(asset)
  const searchParams = new URLSearchParams()

  if (params.w) searchParams.set('w', String(params.w))
  if (params.h) searchParams.set('h', String(params.h))
  searchParams.set('q', String(params.q ?? 80))
  searchParams.set('fm', params.fm ?? 'webp')
  if (params.fit) searchParams.set('fit', params.fit)
  if (params.f) searchParams.set('f', params.f)

  return `${base}?${searchParams.toString()}`
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

const MASONRY_SIZES: ImageSize[] = [
  { width: 400, quality: 75 },
  { width: 600, quality: 75 },
  { width: 800, quality: 80 },
  { width: 1000, quality: 80 },
]

const LIGHTBOX_SIZES: ImageSize[] = [
  { width: 640, quality: 80 },
  { width: 1024, quality: 85 },
  { width: 1440, quality: 85 },
  { width: 1920, quality: 85 },
  { width: 2560, quality: 85 },
]

const OG_SIZE: ImageSize = { width: 1200, height: 630, quality: 85 }

export function imageUrl(asset: ContentfulAsset, width: number, quality = 80): string {
  return buildUrl(asset, { w: width, q: quality })
}

export function heroSrcset(asset: ContentfulAsset): string {
  return HERO_SIZES.map(
    ({ width, quality }) => `${buildUrl(asset, { w: width, q: quality })} ${width}w`,
  ).join(', ')
}

export function gridSrcset(asset: ContentfulAsset): string {
  return GRID_SIZES.map(
    ({ width, quality }) =>
      `${buildUrl(asset, { w: width, h: Math.round(width / 1.5), q: quality, fit: 'fill', f: 'faces' })} ${width}w`,
  ).join(', ')
}

export function lightboxSrcset(asset: ContentfulAsset): string {
  return LIGHTBOX_SIZES.map(
    ({ width, quality }) => `${buildUrl(asset, { w: width, q: quality })} ${width}w`,
  ).join(', ')
}

export function masonrySrcset(asset: ContentfulAsset): string {
  return MASONRY_SIZES.map(
    ({ width, quality }) => `${buildUrl(asset, { w: width, q: quality })} ${width}w`,
  ).join(', ')
}

export function ogImageUrl(asset: ContentfulAsset): string {
  return buildUrl(asset, {
    w: OG_SIZE.width,
    h: OG_SIZE.height,
    q: OG_SIZE.quality,
    fit: 'fill',
    f: 'faces',
  })
}

export function blurPlaceholder(asset: ContentfulAsset): string {
  return buildUrl(asset, { w: 20, q: 30 })
}

/** Get the natural dimensions of a Contentful image asset */
export function assetDimensions(asset: ContentfulAsset): { width: number; height: number } {
  const dims = asset.fields.file.details?.image
  return {
    width: dims?.width ?? 800,
    height: dims?.height ?? 600,
  }
}
