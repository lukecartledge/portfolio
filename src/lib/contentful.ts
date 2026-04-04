import { createClient } from 'contentful'

const spaceId = import.meta.env.CONTENTFUL_SPACE_ID
const accessToken = import.meta.env.CONTENTFUL_DELIVERY_TOKEN

if (!spaceId || !accessToken) {
  throw new Error(
    'Missing Contentful credentials. Set CONTENTFUL_SPACE_ID and CONTENTFUL_DELIVERY_TOKEN in .env',
  )
}

export const contentfulClient = createClient({
  space: spaceId,
  accessToken,
})
