import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://netbots.io';
  
  const routes = [
    '',
    '/about',
    '/services',
    '/services/software-dev',
    '/services/ai-automation',
    '/services/ui-ux',
    '/services/marketing',
    '/products',
    '/products/hotel-sync',
    '/products/hotel-sync/privacy',
    '/products/hotel-sync/terms',
    '/portfolio',
    '/case-studies',
    '/careers',
    '/contact',
    '/faq',
    '/training',
    '/privacy',
    '/terms',
    '/refund',
    '/cookies',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/products/') || route.startsWith('/services/') ? 0.8 : 0.6,
  }));
}
