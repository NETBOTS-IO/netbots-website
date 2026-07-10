import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Sitemap | NetBots',
  description: 'Complete directory of all pages on the NetBots website.',
};

export default function SitemapPage() {
  const sitemapSections = [
    {
      title: 'Main Navigation',
      links: [
        { name: 'Home', url: '/' },
        { name: 'About Us', url: '/about' },
        { name: 'Services', url: '/services' },
        { name: 'Products', url: '/products' },
        { name: 'Portfolio', url: '/portfolio' },
        { name: 'Case Studies', url: '/case-studies' },
        { name: 'Careers', url: '/careers' },
        { name: 'Contact', url: '/contact' },
        { name: 'FAQ', url: '/faq' },
      ],
    },
    {
      title: 'Products',
      links: [
        { name: 'HotelSync PMS', url: '/products/hotel-sync' },
        { name: 'Accounta (Cloud ERP)', url: '/products#accounta' },
        { name: 'E-Pharma (Pharmacy Management)', url: '/products#e-pharma' },
        { name: 'G-Map Scraper (Lead Generation)', url: '/products#gmap-scraper' },
        { name: 'CMS Care (Clinical System)', url: '/products#clinical-system' },
      ],
    },
    {
      title: 'HotelSync Specialized Pages',
      links: [
        { name: 'HotelSync Privacy Policy', url: '/products/hotel-sync/privacy' },
        { name: 'HotelSync Terms of Service', url: '/products/hotel-sync/terms' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Web Architecture', url: '/services#web-architecture' },
        { name: 'AI Integration', url: '/services#ai-integration' },
        { name: 'Digital Marketing', url: '/services#digital-marketing' },
        { name: 'Secure DevOps', url: '/services#secure-devops' },
      ],
    },
    {
      title: 'Legal & Policies',
      links: [
        { name: 'Privacy Policy', url: '/privacy' },
        { name: 'Terms & Conditions', url: '/terms' },
        { name: 'Refund Policy', url: '/refund' },
        { name: 'Cookie Policy', url: '/cookies' },
      ],
    },
    {
      title: 'Academy / Training',
      links: [
        { name: 'Training Academy', url: '/training' },
      ],
    },
  ];

  return (
    <div className={styles.sitemapWrapper}>
      <div className={styles.header}>
        <div className={styles.container}>
          <h1>Website Sitemap</h1>
          <p>Find what you're looking for easily. A complete hierarchical directory of all our pages.</p>
        </div>
      </div>
      
      <div className={styles.container}>
        <div className={styles.sitemapGrid}>
          {sitemapSections.map((section, idx) => (
            <div key={idx} className={styles.sitemapSection}>
              <h2>{section.title}</h2>
              <ul className={styles.linkList}>
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link href={link.url} className={styles.sitemapLink}>
                      <ArrowRight size={16} className={styles.icon} />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
