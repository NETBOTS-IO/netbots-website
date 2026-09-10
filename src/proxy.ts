import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * proxy.ts — Next.js 16 proxy convention (replaces middleware.ts)
 *
 * Handles:
 * 1. www → non-www canonical redirect (production only)
 * 2. Per-request CSP nonce generation (passed via x-nonce header to layout.tsx)
 * 3. Content-Security-Policy header with Trusted Types
 */

const CANONICAL_HOST = 'netbots.io';

function buildCsp(nonce: string): string {
  const isProd = process.env.NODE_ENV === 'production';

  const directives = [
    `default-src 'self'`,
    isProd
      ? `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.clarity.ms https://www.googletagmanager.com https://www.google-analytics.com`
      : `script-src 'self' 'nonce-${nonce}' 'unsafe-eval' https://www.clarity.ms https://www.googletagmanager.com https://www.google-analytics.com`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `font-src 'self' https://fonts.gstatic.com`,
    `img-src 'self' blob: data: https://cdn.sanity.io https://images.unsplash.com https://img.youtube.com https://i.ytimg.com https://www.googletagmanager.com https://c.bing.com`,
    `connect-src 'self' https://*.api.sanity.io https://*.sanity.io https://region1.google-analytics.com https://www.google-analytics.com https://www.clarity.ms https://*.clarity.ms https://c.bing.com`,
    `media-src 'none'`,
    `object-src 'none'`,
    `frame-src 'self' https://challenges.cloudflare.com`,
    `frame-ancestors 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    // NOTE: require-trusted-types-for 'script' removed — breaks Clarity, GTM, and
    // other third-party scripts that don't implement the Trusted Types API.
    `upgrade-insecure-requests`,

  ];

  return directives.join('; ');
}

export function proxy(request: NextRequest) {
  const { nextUrl, headers } = request;

  // ── 0. Skip all /api/* routes — no CSP/nonce injection on API endpoints ──────
  // This allows local PC scripts sending HTTP (not HTTPS) requests to /api/ without
  // the `upgrade-insecure-requests` CSP directive blocking or mutating the request.
  if (nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // ── 1. www → non-www canonical redirect ───────────────────────────────────
  const host = headers.get('host') ?? '';
  if (host.startsWith('www.') && process.env.NODE_ENV === 'production') {
    const canonicalUrl = new URL(nextUrl.pathname + nextUrl.search, `https://${CANONICAL_HOST}`);
    return NextResponse.redirect(canonicalUrl, { status: 301 });
  }

  // ── 2. Per-request CSP nonce ───────────────────────────────────────────────
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const csp = buildCsp(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('Content-Security-Policy', csp);

  return response;
}

export const config = {
  matcher: [
    {
      // Run on all routes except Next.js internals, static assets, and media files
      source: '/((?!_next/static|_next/image|favicon.ico|images|client-logos|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff2?|ttf|eot)).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
