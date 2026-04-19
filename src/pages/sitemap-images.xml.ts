import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { imageUrl } from '@/lib/image'
import type { ContentfulAsset } from '@/lib/image'

const SITE_URL = 'https://lukecartledge.com'

type EntryImage = {
  url: string
  title?: string
}

function isDefined<T>(value: T | null): value is T {
  return value !== null
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function toAbsoluteUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).toString()
}

function imageEntryFromPhotoRef(ref: { fields: Record<string, unknown> }): EntryImage | null {
  const image = ref.fields.image as ContentfulAsset | undefined
  if (!image) return null

  return {
    url: imageUrl(image, 2400, 85),
    title: (ref.fields.title as string) ?? undefined,
  }
}

function renderUrlNode(pageUrl: string, images: EntryImage[]): string {
  const imageNodes = images
    .map((image) => {
      const titleNode = image.title ? `<image:title>${escapeXml(image.title)}</image:title>` : ''

      return `<image:image><image:loc>${escapeXml(image.url)}</image:loc>${titleNode}</image:image>`
    })
    .join('')

  return `<url><loc>${escapeXml(pageUrl)}</loc>${imageNodes}</url>`
}

export const GET: APIRoute = async () => {
  const allCollections = await getCollection('photoCollections')
  const siteConfigEntries = await getCollection('siteConfig')
  const allPhotos = await getCollection('photos')

  const collectionUrls = allCollections
    .map((entry) => {
      const collection = entry.data
      const slug = collection.slug as string
      const photoRefs = (collection.photos as Array<{ fields: Record<string, unknown> }>) ?? []

      const images = photoRefs.map((photoRef) => imageEntryFromPhotoRef(photoRef)).filter(isDefined)

      if (images.length === 0) return null

      return {
        pageUrl: toAbsoluteUrl(`/photography/${slug}`),
        images,
      }
    })
    .filter((item): item is { pageUrl: string; images: EntryImage[] } => item !== null)

  const config = siteConfigEntries[0]?.data
  const featuredPhotoRefs = (config?.featuredPhotos ?? []) as Array<{
    fields: Record<string, unknown>
  }>

  const homepageImages =
    featuredPhotoRefs.length > 0
      ? featuredPhotoRefs.map((photoRef) => imageEntryFromPhotoRef(photoRef)).filter(isDefined)
      : allPhotos
          .map((entry) => entry.data)
          .map((photo): EntryImage | null => {
            const image = photo.image as ContentfulAsset | undefined
            if (!image) return null

            return {
              url: imageUrl(image, 2400, 85),
              title: (photo.title as string | undefined) ?? undefined,
            }
          })
          .filter(isDefined)

  const urlNodes = [
    renderUrlNode(toAbsoluteUrl('/'), homepageImages),
    ...collectionUrls.map((item) => renderUrlNode(item.pageUrl, item.images)),
  ].join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urlNodes}</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
