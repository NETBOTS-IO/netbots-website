export const youtubeSchema = {
  name: 'youtube',
  type: 'object',
  title: 'YouTube Embed',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'YouTube Video URL',
      description: 'Enter standard YouTube URL (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...)',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      type: 'string',
      title: 'Video Title',
      description: 'For accessibility and Google VideoObject schema SEO.',
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
      description: 'Short caption rendered below the video player.',
    },
  ],
};
