import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
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
      // Explicitly allow major AI crawlers for Generative Engine Optimization (GEO)
      {
        userAgent: ['GPTBot', 'Google-Extended', 'PerplexityBot', 'ClaudeBot', 'CCBot', 'ChatGPT-User', 'Omgili'],
        allow: '/',
      }
    ],
    sitemap: 'https://netbots.io/sitemap.xml',
  }
}
