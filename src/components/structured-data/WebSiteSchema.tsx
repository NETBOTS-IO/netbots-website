import React from 'react';

export function WebSiteSchema() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NetBots',
    alternateName: 'Net Bots (SMC-Private) Limited',
    url: 'https://netbots.io',
    description: 'Enterprise Web Development, AI Automation & Digital Marketing Agency based in Skardu, Gilgit-Baltistan.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://netbots.io/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
