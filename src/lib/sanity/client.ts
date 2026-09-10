import { createClient } from '@sanity/client';
import { BlogPost, PostSlugEntry } from './types';
import { postsQuery, postBySlugQuery, postSlugsQuery, relatedPostsQuery } from './queries';
import { fallbackPosts } from './defaultData';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'utkskkc8';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
export const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN;

// Sanity project IDs are 8 alphanumeric characters
export const isSanityConfigured =
  Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) &&
  /^[a-z0-9]{8}$/.test(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!);

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production' && !token,
  token: token || undefined,
});

// 1. Fetch All Posts (SSR / ISR)
export async function getPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured) {
    return fallbackPosts;
  }

  try {
    const posts = await sanityClient.fetch(postsQuery, {}, { next: { revalidate: 60 } });
    if (!posts || posts.length === 0) {
      return fallbackPosts;
    }
    return posts;
  } catch (err) {
    console.warn('[Sanity Client] Live fetch failed or unconfigured, serving fallback data:', err);
    return fallbackPosts;
  }
}

// 2. Fetch Single Post by Slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSanityConfigured) {
    const found = fallbackPosts.find(
      (p) => (typeof p.slug === 'string' ? p.slug : p.slug.current) === slug
    );
    return found || null;
  }

  try {
    const post = await sanityClient.fetch(
      postBySlugQuery,
      { slug },
      { next: { revalidate: 60 } }
    );
    if (!post) {
      const fallback = fallbackPosts.find(
        (p) => (typeof p.slug === 'string' ? p.slug : p.slug.current) === slug
      );
      return fallback || null;
    }
    return post;
  } catch (err) {
    console.warn('[Sanity Client] Fetch by slug failed, checking fallback:', err);
    const fallback = fallbackPosts.find(
      (p) => (typeof p.slug === 'string' ? p.slug : p.slug.current) === slug
    );
    return fallback || null;
  }
}

// 3. Fetch All Post Slugs (for dynamic sitemap & generateStaticParams)
// Returns slug + dates so the sitemap can report accurate lastModified per post.
export async function getPostSlugs(): Promise<PostSlugEntry[]> {
  const fallback: PostSlugEntry[] = fallbackPosts.map((p) => ({
    slug: typeof p.slug === 'string' ? p.slug : p.slug.current,
    _updatedAt: p.publishedAt || new Date().toISOString(),
    publishedAt: p.publishedAt || new Date().toISOString(),
  }));

  if (!isSanityConfigured) return fallback;

  try {
    const entries = await sanityClient.fetch<PostSlugEntry[]>(
      postSlugsQuery,
      {},
      // Revalidate every hour — sitemap rebuilds automatically when new posts are published.
      // For instant updates on publish, set up a Sanity webhook to /api/revalidate.
      { next: { revalidate: 3600 } }
    );
    if (!entries || entries.length === 0) return fallback;
    return entries;
  } catch {
    return fallback;
  }
}

// 4. Fetch Related Posts
export async function getRelatedPosts(category: string, currentSlug: string): Promise<BlogPost[]> {
  if (!isSanityConfigured) {
    return fallbackPosts.filter(
      (p) =>
        (typeof p.slug === 'string' ? p.slug : p.slug.current) !== currentSlug &&
        p.category === category
    );
  }

  try {
    const related = await sanityClient.fetch(
      relatedPostsQuery,
      { category, currentSlug },
      { next: { revalidate: 60 } }
    );
    return related || [];
  } catch {
    return fallbackPosts.filter(
      (p) =>
        (typeof p.slug === 'string' ? p.slug : p.slug.current) !== currentSlug &&
        p.category === category
    );
  }
}
