import { COMPANY_LEGAL_NAME, COMPANY_NAME, OFFICE_ADDRESS } from "../constants/services";

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: COMPANY_NAME,
    legalName: COMPANY_LEGAL_NAME,
    url: 'https://netbots.io',
    logo: 'https://netbots.io/images/netbots-logo-original.avif',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2nd Floor, Shah Plaza, Opp. Pakeeza Bakers, Near Karasmathang Chowk, Skardu',
      addressLocality: 'Skardu',
      addressRegion: 'Gilgit-Baltistan',
      addressCountry: 'PK',
    },
    telephone: '+923433757372',
    email: 'info@netbots.io',
    areaServed: ['Skardu', 'Gilgit-Baltistan', 'Pakistan', 'Global'],
  };
}

export function getProfessionalServiceSchema(serviceName: string, serviceDescription: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: COMPANY_NAME,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Hameed Ghar, District Bar Building',
        addressLocality: 'Skardu',
        addressRegion: 'Gilgit-Baltistan',
        addressCountry: 'PK',
      }
    },
    url: url
  };
}

export function getBreadcrumbSchema(items: { name: string, url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': item.url,
        name: item.name
      }
    }))
  };
}
