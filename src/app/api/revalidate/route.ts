import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/revalidate
 *
 * Called by a Sanity webhook when a post is created/updated/deleted.
 * Instantly busts the sitemap and blog page cache so the new post
 * appears immediately — no waiting for the 1-hour revalidate interval.
 *
 * HOW TO SET UP THE SANITY WEBHOOK:
 * 1. Go to https://sanity.io/manage → your project → API → Webhooks
 * 2. Create a new webhook:
 *    - URL:     https://netbots.io/api/revalidate?secret=YOUR_SECRET
 *    - Dataset: production
 *    - Trigger on: Create, Update, Delete
 *    - Filter:  _type == "post"
 *    - Secret:  set SANITY_REVALIDATE_SECRET in your hosting env vars
 * 3. Save. Publishing a blog post will now instantly update the live site.
 */

// Next.js 16: revalidateTag requires (tag, profile) — pass empty CacheLifeConfig
const CACHE_PROFILE = {};

function revalidateAll(slug?: string | null) {
  revalidatePath('/sitemap.xml');
  revalidatePath('/blog', 'page');
  if (slug) revalidatePath(`/blog/${slug}`, 'page');
  revalidateTag('blog-posts', CACHE_PROFILE);
  revalidateTag('post-slugs', CACHE_PROFILE);
}

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;

  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const slug: string | null = body?.result?.slug?.current ?? body?.slug ?? null;

    revalidateAll(slug);
    console.log(`[Revalidate] Webhook received. Slug: ${slug ?? 'all'}`);

    return NextResponse.json({
      revalidated: true,
      slug: slug ?? 'all',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[Revalidate] Error:', err);
    return NextResponse.json({ message: 'Revalidation failed', error: String(err) }, { status: 500 });
  }
}

// GET for manual testing: /api/revalidate?secret=YOUR_SECRET
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;

  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  revalidateAll();

  return NextResponse.json({
    revalidated: true,
    timestamp: new Date().toISOString(),
    message: 'Sitemap and blog cache cleared.',
  });
}
