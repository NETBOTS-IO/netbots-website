import React from 'react';

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Net Bots (SMC-Private) Limited',
    image: 'https://netbots.io/netbots-logo-original.png',
    '@id': 'https://netbots.io',
    url: 'https://netbots.io',
    telephone: '+923433757373',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2nd Floor, Shah Plaza, Opp. Pakeeza Bakers, Near Karasmathang Chowk',
      addressLocality: 'Skardu',
      addressRegion: 'Gilgit-Baltistan',
      postalCode: '16100',
      addressCountry: 'PK'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 35.3023,
      longitude: 75.6416
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      opens: '09:00',
      closes: '18:00'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
