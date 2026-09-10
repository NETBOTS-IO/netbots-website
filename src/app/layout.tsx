import type { Metadata } from 'next';
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { OrganizationSchema } from '@/components/structured-data/OrganizationSchema';
import { WebSiteSchema } from '@/components/structured-data/WebSiteSchema';
import { Analytics } from '@/components/tracking/Analytics';
import { UTMTracker } from '@/components/tracking/UTMTracker';
import { Suspense } from 'react';
import Script from 'next/script';
import { headers } from 'next/headers';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
  display: "swap",
});

// IMPORTANT: Do NOT add a root-level canonical here.
// Each page/layout sets its own canonical via alternates.canonical.
// A root canonical would be inherited by all pages and override their own.
export const metadata: Metadata = {
  metadataBase: new URL('https://netbots.io'),
  // hreflang: single-language English site, explicitly declare for Google
  alternates: {
    languages: {
      'en': 'https://netbots.io',
      'x-default': 'https://netbots.io',
    },
  },
  // Staging/preview noindex guard — production only
  robots: process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production'
    ? { index: true, follow: true }
    : { index: false, follow: false },
  title: {
    default: 'Enterprise Web Development, AI Automation & Digital Marketing Agency | NetBots Pakistan',
    template: '%s | NetBots',
  },
  description: 'NetBots architects scalable web platforms, secure AI agents, and high-ROI marketing systems for enterprises. Based in Gilgit-Baltistan, serving clients globally. Book your free audit.',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  // Focused primary keywords only — Google ignores keyword meta since 2009,
  // keeping only a small set of brand + location terms to avoid Bing spam signal.
  keywords: [
    'web development company skardu',
    'AI automation agency Pakistan',
    'digital marketing agency Gilgit-Baltistan',
    'software house skardu',
    'NetBots',
    'net bots smc private limited',
  ],
  openGraph: {
    title: 'Enterprise Web Development, AI Automation & Digital Marketing | NetBots',
    description: 'NetBots architects scalable web platforms, secure AI agents, and high-ROI marketing systems for enterprises. Based in Gilgit-Baltistan, serving clients globally.',
    url: 'https://netbots.io',
    siteName: 'NetBots',
    images: [
      {
        url: 'https://netbots.io/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NetBots — Custom Software, AI Automation & Growth Marketing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise Web Development, AI Automation & Digital Marketing | NetBots',
    description: 'NetBots architects scalable web platforms, secure AI agents, and high-ROI marketing systems for enterprises.',
    images: ['https://netbots.io/twitter-image.jpg'],
    creator: '@thenetbots',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get('x-nonce') || '';

  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://scripts.clarity.ms" />
        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="alternate" href="https://netbots.io" hrefLang="en-US" />
        {process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' && (
          <meta name="robots" content="noindex, nofollow" />
        )}
      </head>
      <body style={{ minHeight: '100vh', fontFamily: 'var(--font-inter), system-ui, sans-serif', WebkitFontSmoothing: 'antialiased' }}>
        <Script id="clarity-script" strategy="afterInteractive" nonce={nonce}>
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xke511l3gu");
          `}
        </Script>
        <OrganizationSchema />
        <WebSiteSchema />
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <Suspense fallback={null}>
          <UTMTracker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
