import { defineCollection } from 'astro:content'
import type { Loader } from 'astro/loaders'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'c42ibxe8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

function sanityLoader(query: string): Loader {
  return {
    name: 'sanity-loader',
    load: async ({ store, parseData }) => {
      const results = await client.fetch(query)
      store.clear()
      for (const item of results) {
        const data = await parseData({ id: item._id, data: item })
        store.set({ id: item._id, data })
      }
    },
  }
}

const photos = defineCollection({
  loader: sanityLoader(
    `*[_type == "photo"] | order(displayOrder asc) {
      _id, title, slug, image, caption, location, dateTaken,
      camera, lens, settings, tags, featured, displayOrder,
      "collections": collections[]->{ _id, title, slug }
    }`
  ),
})

const photoCollections = defineCollection({
  loader: sanityLoader(
    `*[_type == "collection"] | order(displayOrder asc) {
      _id, title, slug, description, location, date, featured, displayOrder,
      coverPhoto->{ _id, title, image },
      "photos": photos[]->{ _id, title, slug, image, location }
    }`
  ),
})

const siteConfig = defineCollection({
  loader: sanityLoader(
    `*[_type == "siteConfig"][0...1] {
      _id, title, tagline, bio, profileImage, socialLinks, seo,
      "featuredPhotos": featuredPhotos[]->{ _id, title, slug, image, location, caption }
    }`
  ),
})

const pages = defineCollection({
  loader: sanityLoader(
    `*[_type == "page"] { _id, title, slug, body, seo }`
  ),
})

export const collections = { photos, photoCollections, siteConfig, pages }
