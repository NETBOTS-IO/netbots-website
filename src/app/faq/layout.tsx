import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: 'https://netbots.io/faq' },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
