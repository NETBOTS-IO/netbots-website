import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * proxy.ts — Next.js 16 proxy convention (replaces middleware.ts)
 *
 * Handles:
 * 1. www → non-www canonical redirect (production only, netbots.io domain only)
 * 2. Per-request CSP nonce generation (passed via x-nonce header to layout.tsx)
 * 3. Content-Security-Policy header
 */

const CANONICAL_HOST = 'netbots.io';

function isLocalHost(host: string): boolean {
  const cleanHost = host.split(':')[0].toLowerCase();
  return (
    cleanHost === 'localhost' ||
    cleanHost === '127.0.0.1' ||
    cleanHost === '0.0.0.0' ||
    cleanHost === '::1' ||
    cleanHost.endsWith('.local') ||
    cleanHost.startsWith('192.168.') ||
    cleanHost.startsWith('10.') ||
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(cleanHost)
  );
}

function buildCsp(nonce: string, isLocal: boolean): string {
  const isProd = process.env.NODE_ENV === 'production' && !isLocal;

  const directives = [
    `default-src 'self'`,
    isProd
      ? `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.clarity.ms https://www.googletagmanager.com https://www.google-analytics.com`
      : `script-src 'self' 'nonce-${nonce}' 'unsafe-eval' 'unsafe-inline' https://www.clarity.ms https://www.googletagmanager.com https://www.google-analytics.com`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `font-src 'self' https://fonts.gstatic.com`,
    `img-src 'self' blob: data: https: http://localhost:* http://127.0.0.1:*`,
    `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.api.sanity.io https://*.sanity.io https://region1.google-analytics.com https://www.google-analytics.com https://www.clarity.ms https://*.clarity.ms https://c.bing.com`,
    `media-src 'self' blob: data: https:`,
    `object-src 'none'`,
    `frame-src 'self' https://challenges.cloudflare.com https://www.youtube.com https://www.youtube-nocookie.com`,
    `frame-ancestors 'self'`,
    `base-uri 'self'`,
    `form-action 'self'`,
  ];

  // In production on real domains, enforce HTTPS upgrade.
  // NEVER include upgrade-insecure-requests on localhost/dev as it breaks HTTP!
  if (isProd) {
    directives.push(`upgrade-insecure-requests`);
  }

  return directives.join('; ');
}

export function proxy(request: NextRequest) {
  const { nextUrl, headers } = request;

  // ── 0. Skip all /api/* and /studio/* routes ─────────────────────────────────
  // - /api/*: no CSP/nonce injection, allows scripts sending HTTP requests
  // - /studio/*: Sanity Studio needs its own scripts, workers, and relaxed headers
  if (nextUrl.pathname.startsWith('/api/') || nextUrl.pathname.startsWith('/studio')) {
    return NextResponse.next();
  }

  const host = headers.get('host') ?? '';
  const isLocal = isLocalHost(host) || process.env.NODE_ENV !== 'production';

  // ── 1. Enforce HTTPS & Canonical Domain ONLY on production netbots.io domain ──
  // NEVER divert localhost or local dev IP traffic to netbots.io!
  if (!isLocal) {
    const isNetBotsDomain = host.toLowerCase().includes('netbots.io');

    if (isNetBotsDomain) {
      // 1a. Enforce HTTPS in production
      const proto = headers.get('x-forwarded-proto');
      if (proto === 'http') {
        const httpsUrl = new URL(nextUrl.pathname + nextUrl.search, `https://${CANONICAL_HOST}`);
        return NextResponse.redirect(httpsUrl, { status: 301 });
      }

      // 1b. www → non-www canonical redirect
      if (host.startsWith('www.')) {
        const canonicalUrl = new URL(nextUrl.pathname + nextUrl.search, `https://${CANONICAL_HOST}`);
        return NextResponse.redirect(canonicalUrl, { status: 301 });
      }
    }
  }

  // ── 2. Per-request CSP nonce ───────────────────────────────────────────────
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const csp = buildCsp(nonce, isLocal);

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
      // Run on all routes except Next.js internals, studio, api, static assets, and media files
      source: '/((?!_next/static|_next/image|studio|api|favicon.ico|images|client-logos|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff2?|ttf|eot)).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};

