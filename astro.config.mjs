import { defineConfig } from 'astro/config'
import sanity from '@sanity/astro'

export default defineConfig({
  site: 'https://lukecartledge.com',
  output: 'static',
  integrations: [
    sanity({
      projectId: 'c42ibxe8',
      dataset: 'production',
      apiVersion: '2024-01-01',
      useCdn: false,
    }),
  ],
})
