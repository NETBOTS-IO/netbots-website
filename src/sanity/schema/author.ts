export const authorSchema = {
  name: 'author',
  type: 'document',
  title: 'Author',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Full Name',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      type: 'string',
      title: 'Job Title / Role',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Avatar Photo',
      options: { hotspot: true },
    },
    {
      name: 'avatarUrl',
      type: 'url',
      title: 'External Avatar URL (Fallback)',
      description: 'Used when no Sanity image asset is uploaded. Provide a direct URL to an external avatar.',
    },
    {
      name: 'bio',
      type: 'text',
      title: 'Short Bio',
    },
    {
      name: 'linkedIn',
      type: 'url',
      title: 'LinkedIn URL',
    },
    {
      name: 'twitter',
      type: 'url',
      title: 'Twitter / X URL',
    },
  ],
};
