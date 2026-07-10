import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers | Join Net Bots',
  description: 'Join Net Bots in Skardu, Pakistan. We are hiring Next.js developers, AI Engineers, and SEO professionals. Build high-performance applications with us.',
  keywords: ['careers Net Bots', 'jobs in Skardu', 'software developer jobs Gilgit-Baltistan'],
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
