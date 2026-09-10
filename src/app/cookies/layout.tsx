import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: 'https://netbots.io/cookies' },
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
