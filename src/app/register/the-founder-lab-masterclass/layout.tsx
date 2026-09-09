import { Metadata } from 'next';
import { JsonLd } from '@/components/structured-data/JsonLd';

export const metadata: Metadata = {
  title: 'The Founder Lab - 21-Day Masterclass by Saqlain Shah | NetBots',
  description:
    'Build the company. Not just the resume. A 21-day masterclass (90 min/day) led by Saqlain Shah (Founder & CEO, NetBots). Learn development, AI automation, high-ticket sales & startup leadership. On-site in Skardu & Live Online.',
  keywords: [
    'The Founder Lab',
    'The Founder Lab masterclass',
    'Saqlain Shah Masterclass',
    'Saqlain Shah NetBots',
    'NetBots Masterclass registration',
    '21 Day Masterclass Pakistan',
    'Startup masterclass for university students',
    'Entrepreneurship masterclass Skardu',
    'Tech startup training Gilgit Baltistan',
    'Full stack web development masterclass Pakistan',
    'AI automation training Skardu',
    'Software company building masterclass',
    'IT training in Skardu Gilgit Baltistan',
    'How to start software agency Pakistan',
    'Syed Saqlain Abbas NetBots',
    'netbots.io/register/the-founder-lab-masterclass',
    'Freelancer to founder masterclass',
  ],
  alternates: {
    canonical: 'https://netbots.io/register/the-founder-lab-masterclass',
  },
  openGraph: {
    title: 'The Founder Lab: 21-Day Masterclass | NetBots',
    description:
      'Build the company. Not just the resume. A 21-day hands-on masterclass led personally by Saqlain Shah, Founder & CEO of NetBots. Group Cohort (PKR 5,000) & 1-on-1 Mentorship (PKR 25,000). On-site & Online.',
    url: 'https://netbots.io/register/the-founder-lab-masterclass',
    siteName: 'NetBots',
    images: [
      {
        url: 'https://netbots.io/images/founder-lab/the-founder-lab-poster.avif',
        width: 1080,
        height: 1080,
        alt: 'The Founder Lab 21-Day Masterclass Poster - NetBots',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Founder Lab: 21-Day Masterclass by Saqlain Shah | NetBots',
    description:
      'Build the company. Not just the resume. 21-day masterclass on Development, Automation, Sales & Leadership. On-site & Online.',
    images: ['https://netbots.io/images/founder-lab/the-founder-lab-poster.avif'],
    creator: '@netbotsio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function FounderLabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Schema: Course with Pricing & Modes
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'The Founder Lab: 21-Day Masterclass',
    courseCode: 'NETBOTS-TFL-21',
    description:
      'A 21-day masterclass where Saqlain Shah, Founder & CEO of NetBots, shares the full playbook behind building a real company: development, automation, sales, and leadership. Available on-site in Skardu and live online across Pakistan.',
    provider: {
      '@type': 'Organization',
      name: 'NetBots (SMC-Private) Limited',
      sameAs: 'https://netbots.io',
      url: 'https://netbots.io',
      logo: 'https://netbots.io/images/netbots-logo-original.avif',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2nd Floor, Shah Plaza, Opp. Pakeeza Bakers, Near Karasmathang Chowk',
        addressLocality: 'Skardu',
        addressRegion: 'Gilgit-Baltistan',
        addressCountry: 'PK',
      },
    },
    instructor: {
      '@type': 'Person',
      name: 'Saqlain Shah',
      jobTitle: 'Founder & CEO',
      worksFor: {
        '@type': 'Organization',
        name: 'NetBots (SMC-Private) Limited',
      },
      sameAs: 'https://www.linkedin.com/in/syedsaqlainabbas110',
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Group Cohort',
        price: '5000',
        priceCurrency: 'PKR',
        category: 'Masterclass',
        availability: 'https://schema.org/LimitedAvailability',
        url: 'https://netbots.io/register/the-founder-lab-masterclass',
      },
      {
        '@type': 'Offer',
        name: '1-on-1 Founder Mentorship',
        price: '25000',
        priceCurrency: 'PKR',
        category: 'Private Mentorship',
        availability: 'https://schema.org/LimitedAvailability',
        url: 'https://netbots.io/register/the-founder-lab-masterclass',
      },
    ],
    courseMode: ['Blended', 'Online', 'Onsite'],
    timeRequired: 'P21D',
    educationalCredentialAwarded: 'Certificate of Completion & NetBots Incubation Consideration',
    audience: {
      '@type': 'Audience',
      audienceType: 'University students ready to think like founders, not employees',
    },
  };

  // 2. Schema: Breadcrumb Navigation
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://netbots.io',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Register',
        item: 'https://netbots.io/register/the-founder-lab-masterclass',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'The Founder Lab Masterclass',
        item: 'https://netbots.io/register/the-founder-lab-masterclass',
      },
    ],
  };

  // 3. Schema: FAQPage for Google Search SERP Rich Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is The Founder Lab 21-Day Masterclass?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Founder Lab is a 21-day intensive masterclass (90 minutes daily) led by Saqlain Shah, Founder & CEO of NetBots. It covers real-world software development, AI automation workflows, high-ticket sales pitching, and founder leadership.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the fee / pricing for The Founder Lab?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Group Cohort track is PKR 5,000 per student. The dedicated 1-on-1 Founder Mentorship track directly with CEO Saqlain Shah is PKR 25,000.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can students outside Skardu join online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Founder Lab offers both On-site physical sessions at NetBots Skardu office and Live Virtual interactive streaming for students joining from Islamabad, Lahore, Karachi, or anywhere in Pakistan.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who is eligible to apply for The Founder Lab?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The program is designed for university students, recent graduates, and aspiring technical entrepreneurs who want to build real products, launch software agencies, or start scalable tech companies.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the 4 core pillars taught in the masterclass?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The 4 pillars are: 1. Development (Build. Ship. Grow.), 2. Automation (Work Smarter with AI), 3. Sales (Turn Ideas Into Revenue), and 4. Leadership (Lead. Build. Inspire).',
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={courseSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      {children}
    </>
  );
}
