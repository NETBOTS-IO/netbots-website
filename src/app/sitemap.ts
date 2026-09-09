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
    '/register/the-founder-lab-masterclass',
    '/privacy',
    '/terms',
    '/refund',
    '/cookies',
  ];

  return routes.map((route) => {
    const isFounderLab = route === '/register/the-founder-lab-masterclass';
    const isHome = route === '';
    const isProductOrService = route.startsWith('/products/') || route.startsWith('/services/');

    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: isHome || isFounderLab ? 'daily' : 'weekly',
      priority: isHome ? 1.0 : isFounderLab ? 0.9 : isProductOrService ? 0.8 : 0.6,
    };
  });
}
