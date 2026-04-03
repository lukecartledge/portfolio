import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Where it was taken (e.g. "Jökulsárlón, Iceland")',
    }),
    defineField({
      name: 'dateTaken',
      title: 'Date Taken',
      type: 'date',
    }),
    defineField({
      name: 'camera',
      title: 'Camera',
      type: 'string',
      description: 'Camera body (e.g. "Sony A7IV")',
    }),
    defineField({
      name: 'lens',
      title: 'Lens',
      type: 'string',
      description: 'Lens used (e.g. "24-70mm f/2.8 GM II")',
    }),
    defineField({
      name: 'settings',
      title: 'Camera Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'aperture',
          title: 'Aperture',
          type: 'string',
          description: 'e.g. "f/8"',
        }),
        defineField({
          name: 'shutterSpeed',
          title: 'Shutter Speed',
          type: 'string',
          description: 'e.g. "1/250"',
        }),
        defineField({
          name: 'iso',
          title: 'ISO',
          type: 'number',
        }),
        defineField({
          name: 'focalLength',
          title: 'Focal Length',
          type: 'string',
          description: 'e.g. "35mm"',
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'collection'}]}],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Quick filter for featured shots',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Manual sort order within collections',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'ogImage',
          title: 'OG Image',
          type: 'image',
          description: 'Falls back to the photo itself',
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{field: 'displayOrder', direction: 'asc'}],
    },
    {
      title: 'Date Taken (Newest)',
      name: 'dateTakenDesc',
      by: [{field: 'dateTaken', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'image',
    },
  },
})
