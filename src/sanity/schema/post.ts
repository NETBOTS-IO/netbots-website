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
      name: 'lastReviewedAt',
      type: 'datetime',
      title: 'Last Reviewed / Updated Date',
      description: 'E-E-A-T: Content freshness signal for Google. Update when article is reviewed or revised.',
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

    // ─────────────────────────────────────────────────────────────────
    // E-E-A-T: EXPERIENCE (E)
    // ─────────────────────────────────────────────────────────────────
    {
      name: 'keyTakeaways',
      type: 'array',
      title: 'Key Takeaways / TL;DR (E-E-A-T: Experience)',
      description: 'Bullet-point list of what the reader will gain. Shown as a TL;DR box at the top. Feeds Google Featured Snippets.',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'experienceHighlight',
      type: 'string',
      title: 'Experience Highlight (E-E-A-T: First-hand Experience)',
      description: 'One-line statement of first-hand experience or case-study result. E.g. "60% faster load time achieved on 3 enterprise clients in 2025."',
      placeholder: 'e.g. Deployed at scale for 3 Pakistani enterprises — 60% faster load time.',
    },

    // ─────────────────────────────────────────────────────────────────
    // E-E-A-T: EXPERTISE (E)
    // ─────────────────────────────────────────────────────────────────
    {
      name: 'reviewedBy',
      type: 'object',
      title: 'Technical Reviewer / Expert Validator (E-E-A-T: Expertise)',
      description: 'Optional. Another expert who reviewed or fact-checked this article. Shown in author bar and injected into schema.org.',
      fields: [
        { name: 'name', type: 'string', title: 'Reviewer Full Name' },
        { name: 'role', type: 'string', title: 'Title / Role (e.g. Senior Software Engineer)' },
        { name: 'bio', type: 'text', title: 'Short Bio', rows: 2 },
        { name: 'credentials', type: 'string', title: 'Credentials / Certifications (e.g. AWS Certified, Google Cloud Expert)' },
        { name: 'linkedIn', type: 'url', title: 'LinkedIn Profile URL' },
        { name: 'avatarUrl', type: 'url', title: 'Avatar Image URL (External)' },
      ],
    },

    // ─────────────────────────────────────────────────────────────────
    // E-E-A-T: AUTHORITATIVENESS (A)
    // ─────────────────────────────────────────────────────────────────
    {
      name: 'citations',
      type: 'array',
      title: 'Authoritative Citations & Sources (E-E-A-T: Authoritativeness)',
      description: 'Links to authoritative external sources (Google, MDN, IEEE, peer-reviewed studies). Shown as a References section and injected into Article schema.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Source / Study Title', validation: (Rule: any) => Rule.required() },
            { name: 'url', type: 'url', title: 'URL', validation: (Rule: any) => Rule.required() },
            { name: 'publisher', type: 'string', title: 'Publisher / Organization (e.g. Google, MDN, IEEE)' },
            { name: 'year', type: 'string', title: 'Publication Year (e.g. 2025)' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────
    // E-E-A-T: TRUSTWORTHINESS (T)
    // ─────────────────────────────────────────────────────────────────
    {
      name: 'faqs',
      type: 'array',
      title: 'FAQs — Frequently Asked Questions (E-E-A-T: Trustworthiness)',
      description: 'Rendered at the end of the post. Feeds Google FAQPage structured data schema for rich search snippets.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question', validation: (Rule: any) => Rule.required() },
            { name: 'answer', type: 'text', title: 'Answer', rows: 3, validation: (Rule: any) => Rule.required() },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────
    // Cover Image
    // ─────────────────────────────────────────────────────────────────
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

