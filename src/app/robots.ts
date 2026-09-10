import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Block URL-parameter variants (duplicate content) and internal routes.
      // Standard robots.txt Disallow pattern: /*?param= (no non-standard *? combo)
      disallow: [
        '/api/',
        '/studio/',
        '/studio',
        '/*?course=',
        '/*?category=',
      ],
    },
    sitemap: 'https://netbots.io/sitemap.xml',
  }
}
