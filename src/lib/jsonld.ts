type SchemaObject = Record<string, unknown>

export function websiteSchema(name: string, url: string, description: string): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
  }
}

type PersonSchemaInput = {
  name: string
  description: string
  url: string
  image?: string
  sameAs?: string[]
}

export function personSchema({
  name,
  description,
  url,
  image,
  sameAs,
}: PersonSchemaInput): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    description,
    url,
    ...(image ? { image } : {}),
    ...(sameAs && sameAs.length > 0 ? { sameAs } : {}),
  }
}

type ImageGallerySchemaInput = {
  name: string
  description: string
  url: string
  images: SchemaObject[]
}

export function imageGallerySchema({
  name,
  description,
  url,
  images,
}: ImageGallerySchemaInput): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name,
    description,
    url,
    hasPart: images,
  }
}

type ExifData = {
  camera?: string
  lens?: string
  aperture?: string
  shutterSpeed?: string
  iso?: string
  [key: string]: string | undefined
}

type ImageObjectSchemaInput = {
  name: string
  contentUrl: string
  description?: string
  creator?: string | SchemaObject
  locationCreated?: string
  width?: number
  height?: number
  exifData?: ExifData
}

export function imageObjectSchema({
  name,
  contentUrl,
  description,
  creator,
  locationCreated,
  width,
  height,
  exifData,
}: ImageObjectSchemaInput): SchemaObject {
  const exifProperties = Object.entries(exifData ?? {})
    .map(([propertyID, value]) => ({
      '@type': 'PropertyValue',
      propertyID,
      value,
    }))
    .filter((item) => item.value)

  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name,
    contentUrl,
    ...(description ? { description } : {}),
    ...(creator
      ? {
          creator:
            typeof creator === 'string'
              ? {
                  '@type': 'Person',
                  name: creator,
                }
              : creator,
        }
      : {}),
    ...(locationCreated
      ? {
          locationCreated: {
            '@type': 'Place',
            name: locationCreated,
          },
        }
      : {}),
    ...(typeof width === 'number' ? { width } : {}),
    ...(typeof height === 'number' ? { height } : {}),
    ...(exifProperties.length > 0 ? { exifData: exifProperties } : {}),
  }
}

type BreadcrumbItem = {
  name: string
  url?: string
}

export function breadcrumbSchema(items: BreadcrumbItem[]): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  }
}

type CollectionPageSchemaInput = {
  name: string
  url: string
  description: string
  hasPart: SchemaObject[]
}

export function collectionPageSchema({
  name,
  url,
  description,
  hasPart,
}: CollectionPageSchemaInput): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    url,
    description,
    hasPart,
  }
}
