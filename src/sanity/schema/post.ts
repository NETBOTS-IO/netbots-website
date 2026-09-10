export const postSchema = {
  name: 'post',
  type: 'document',
  title: 'Blog Article',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Article Title',
      validation: (Rule: any) => Rule.required().max(100),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'URL Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published Date',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'excerpt',
      type: 'text',
      title: 'Short Excerpt / Meta Description',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: 'category',
      type: 'string',
      title: 'Primary Category',
      options: {
        list: [
          'Web Architecture',
          'AI & Automation',
          'Tech Entrepreneurship',
          'Cloud & DevOps',
          'Design & UI/UX',
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tags',
      type: 'array',
      title: 'Keywords / Tags',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'estimatedReadTime',
      type: 'string',
      title: 'Estimated Read Time',
      placeholder: 'e.g. 5 min read',
    },
    {
      name: 'featured',
      type: 'boolean',
      title: 'Feature on Blog Homepage Banner',
      initialValue: false,
    },
    {
      name: 'mainImage',
      type: 'image',
      title: 'Cover Image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text (SEO)',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    },
    {
      name: 'mainImageUrl',
      type: 'url',
      title: 'External Cover Image URL (Fallback)',
      description: 'Used when no Sanity image asset is uploaded. Provide a direct URL to an external image.',
    },
    {
      name: 'author',
      type: 'reference',
      title: 'Author',
      to: [{ type: 'author' }],
    },
    {
      name: 'body',
      type: 'array',
      title: 'Article Content (Rich Text & Media)',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          title: 'Inline Image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text (SEO)',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Image Caption',
            },
          ],
        },
        {
          type: 'youtube',
          title: 'YouTube Video Embed',
        },
      ],
    },
    {
      name: 'seo',
      type: 'object',
      title: 'Advanced SEO Overrides',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description' },
        { name: 'keywords', type: 'array', of: [{ type: 'string' }], title: 'SEO Keywords' },
      ],
    },
  ],
};
