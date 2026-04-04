import { defineCollection } from 'astro:content'
import type { Loader } from 'astro/loaders'
import { contentfulClient } from '@/lib/contentful'

type ContentfulEntry = {
  sys: { id: string }
  fields: Record<string, unknown>
}

function contentfulLoader<TData extends Record<string, unknown> = Record<string, unknown>>(
  contentTypeId: string,
  transform?: (entry: ContentfulEntry) => TData,
): Loader {
  return {
    name: `contentful-loader:${contentTypeId}`,
    load: async ({ store, parseData }) => {
      const results = await contentfulClient.getEntries({
        content_type: contentTypeId,
        include: 2,
      })

      store.clear()

      for (const entry of results.items as ContentfulEntry[]) {
        const transformedEntry = transform ? transform(entry) : (entry.fields as TData)
        const data = await parseData({
          id: entry.sys.id,
          data: transformedEntry,
        })

        store.set({ id: entry.sys.id, data })
      }
    },
  }
}

const photos = defineCollection({
  loader: contentfulLoader('photo', (entry) => ({
    ...entry.fields,
    image: entry.fields.image,
  })),
})

const photoCollections = defineCollection({
  loader: contentfulLoader('collection'),
})

const siteConfig = defineCollection({
  loader: contentfulLoader('siteConfig'),
})

const pages = defineCollection({
  loader: contentfulLoader('page'),
})

export const collections = { photos, photoCollections, siteConfig, pages }
