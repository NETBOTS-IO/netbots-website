import React from 'react';

export function OrganizationSchema() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Net Bots',
    legalName: 'Net Bots (SMC-Private) Limited',
    url: 'https://netbots.io',
    logo: 'https://netbots.io/logo.png',
    foundingDate: '2023',
    founders: [
      {
        '@type': 'Person',
        name: 'Saqlain Shah',
        jobTitle: 'CEO',
      },
      {
        '@type': 'Person',
        name: 'Karamat Ali',
        jobTitle: 'COO',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hameed Ghar, District Bar Building',
      addressLocality: 'Skardu',
      addressRegion: 'Gilgit-Baltistan',
      addressCountry: 'PK',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'hello@netbots.io',
      availableLanguage: ['English', 'Urdu'],
    },
    sameAs: [
      'https://www.linkedin.com/company/netbots',
      'https://twitter.com/netbots',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
