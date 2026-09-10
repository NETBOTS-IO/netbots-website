import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin'
  }
];

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },

  async redirects() {
    return [
      // ── Legacy / broken URLs from GSC ──────────────────────────────────────
      {
        source: '/pk',
        destination: '/',
        permanent: true,
      },
      {
        source: '/apply-training',
        destination: '/training',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination: '/privacy',
        permanent: true,
      },
      // ── Canonical host enforcement (www → non-www) ─────────────────────────
      // These fire if your hosting/CDN does NOT already handle www→non-www.
      // If Vercel/Cloudflare handles it, these are harmless no-ops in practice.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.netbots.io' }],
        destination: 'https://netbots.io/:path*',
        permanent: true,
      },
      // ── Permanent route renames ─────────────────────────────────────────────
      // NOTE: The page file at src/app/case-studies/page.tsx used next/navigation
      // redirect() which issues a 307 (temp). This 301 here takes precedence and
      // preserves link equity from any backlinks to /case-studies.
      {
        source: '/case-studies',
        destination: '/portfolio',
        permanent: true,
      },
    ];
  },


  async headers() {
    return [
      {
        // ── API routes: permissive CORS so local PC scripts can hit them without CORS errors ──
        // Applies to all /api/* routes including /api/blog/publish
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization, X-API-KEY, x-api-key, Accept' },
          { key: 'Access-Control-Max-Age', value: '86400' },
          // Override COOP to allow cross-origin API calls from non-browser scripts
          { key: 'Cross-Origin-Opener-Policy', value: 'unsafe-none' },
        ],
      },
      {
        // Apply strict security headers to all routes EXCEPT /studio and /api
        source: '/((?!studio|api).*)',
        headers: securityHeaders,
      },
      {
        // Studio needs relaxed headers for Sanity auth (OAuth popups + cross-origin API)
        source: '/studio/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Allow OAuth popup to communicate back to Studio window
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
          // SAMEORIGIN (not DENY) so Sanity auth popups are not blocked
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;
