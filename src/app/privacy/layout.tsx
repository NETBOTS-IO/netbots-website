import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: 'https://netbots.io/privacy' },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
