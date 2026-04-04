import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'c42ibxe8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})
