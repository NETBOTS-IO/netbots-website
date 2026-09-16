import React from 'react';

export function WebSiteSchema() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NetBots',
    alternateName: 'Net Bots (SMC-Private) Limited',
    url: 'https://netbots.io',
    description: 'Enterprise Web Development, AI Automation & Digital Marketing Agency based in Skardu, Gilgit-Baltistan.',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
