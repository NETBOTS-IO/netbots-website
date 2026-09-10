import { MetadataRoute } from 'next';
import { getPostSlugs } from '@/lib/sanity/client';

// Sitemap revalidates every hour automatically.
// New blog posts published in Sanity Studio will appear in the sitemap within ~1 hour.
// For INSTANT updates on publish, configure a Sanity webhook → /api/revalidate.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://netbots.io';

  // BUILD_DATE: static pages use the deployment date, not today.
  // Update this when doing major content revisions to static pages.
  const BUILD_DATE = process.env.BUILD_DATE || new Date().toISOString().split('T')[0];

  const staticRoutes = [
    // Core pages
    { path: '', priority: 1.0, freq: 'daily' as const },
    { path: '/about', priority: 0.7, freq: 'monthly' as const },
    { path: '/contact', priority: 0.8, freq: 'monthly' as const },
    { path: '/portfolio', priority: 0.8, freq: 'weekly' as const },
    { path: '/careers', priority: 0.6, freq: 'weekly' as const },
    { path: '/sitemap', priority: 0.3, freq: 'monthly' as const },
    // Services
    { path: '/services', priority: 0.9, freq: 'weekly' as const },
    { path: '/services/software-dev', priority: 0.85, freq: 'weekly' as const },
    { path: '/services/ai-automation', priority: 0.85, freq: 'weekly' as const },
    { path: '/services/ui-ux', priority: 0.8, freq: 'weekly' as const },
    { path: '/services/marketing', priority: 0.8, freq: 'weekly' as const },
    // Products
    { path: '/products', priority: 0.8, freq: 'monthly' as const },
    { path: '/products/hotel-sync', priority: 0.75, freq: 'monthly' as const },
    { path: '/products/hotel-sync/privacy', priority: 0.3, freq: 'yearly' as const },
    { path: '/products/hotel-sync/terms', priority: 0.3, freq: 'yearly' as const },
    // Content + Lead gen
    { path: '/blog', priority: 0.9, freq: 'daily' as const },
    { path: '/training', priority: 0.85, freq: 'weekly' as const },
    { path: '/register/the-founder-lab-masterclass', priority: 0.9, freq: 'daily' as const },
    { path: '/faq', priority: 0.65, freq: 'monthly' as const },
    // Legal
    { path: '/privacy', priority: 0.3, freq: 'yearly' as const },
    { path: '/terms', priority: 0.3, freq: 'yearly' as const },
    { path: '/refund', priority: 0.3, freq: 'yearly' as const },
    { path: '/cookies', priority: 0.3, freq: 'yearly' as const },
    // NOTE: /case-studies is intentionally omitted — 301 redirects to /portfolio
    // NOTE: /pricing/* omitted — pages don't exist yet, will be added when created
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ path, priority, freq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: BUILD_DATE,
    changeFrequency: freq,
    priority,
  }));


  // Dynamic Blog Posts — fetched live from Sanity, auto-revalidates every hour.
  // Each post uses its own _updatedAt date so Google sees accurate freshness per post.
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPostSlugs();
    blogEntries = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: (post._updatedAt || post.publishedAt || new Date().toISOString()).split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }));
  } catch (err) {
    console.error('[Sitemap] Failed to fetch blog post slugs for sitemap:', err);
  }

  return [...staticEntries, ...blogEntries];
}
