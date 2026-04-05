import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://lukecartledge.com',
  output: 'static',
  integrations: [sitemap()],
})
