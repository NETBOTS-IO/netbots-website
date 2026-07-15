'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navigation, companyInfo } from '@/lib/content';
import { LeadCaptureModal } from '@/components/lead-capture/LeadCaptureModal';
import styles from './Footer.module.css';

export function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.container}>
          {/* Top Banner section */}
          <div className={styles.topBanner}>
            <div className={styles.bannerLeft}>
              <h2 className={styles.bannerTitle}>
                Ready to Architect Your Next Phase of Growth?
              </h2>
              <p className={styles.bannerSubtitle}>
                Book a free, no-obligation technical audit with our architects.
              </p>
            </div>
            <div className={styles.bannerRight}>
              <button
                onClick={() => setIsModalOpen(true)}
                className={styles.bannerCta}
              >
                Book Your Free Audit
              </button>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Links Grid */}
          <div className={styles.linksGrid}>
            <div className={styles.brandCol}>
              <Link href="/" className={styles.logo} style={{ display: 'flex', alignItems: 'center' }}>
                <Image src="/images/netbots_logo_white.avif" alt="NetBots" width={120} height={36} style={{ objectFit: 'contain' }} />
              </Link>
              <p className={styles.brandDesc}>
                Custom software, AI automation, and growth marketing, engineered
                to scale. Based in Gilgit-Baltistan, serving clients globally.
              </p>
              {/* NAP Block */}
              <div className={styles.napBlock}>
                <p>
                  <a
                    href="https://share.google/r6YFZyg2zUWz9tVaX"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                    onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                  >
                    {companyInfo.address}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                    onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                  >
                    {companyInfo.email}
                  </a>
                </p>
                <p>
                  <a
                    href="https://wa.me/923433757372"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                    onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                  >
                    {companyInfo.phone} (WhatsApp)
                  </a>
                </p>
              </div>

              {/* Social Links */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <a
                  href="https://facebook.com/thenetbots"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#94a3b8', transition: 'color 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#0052ff'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/thenetbots"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#94a3b8', transition: 'color 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#0052ff'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/thenetbots"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#94a3b8', transition: 'color 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#0052ff'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>

            {navigation.footer.map((group, groupIdx) => (
              <div key={groupIdx} className={styles.linkGroup}>
                <h4 className={styles.groupTitle}>{group.title}</h4>
                <ul className={styles.linkList}>
                  {group.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link href={link.href} className={styles.footerLink}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.divider} />



          {/* Copyright Bar */}
          <div className={styles.bottomBar}>
            <div className={styles.copy}>
              &copy; {new Date().getFullYear()} {companyInfo.name}. All rights
              reserved.
            </div>
            <div className={styles.legalLinks}>
              <Link href="/sitemap" className={styles.legalLink}>
                Sitemap
              </Link>
              <Link href="/privacy" className={styles.legalLink}>
                Privacy Policy
              </Link>
              <Link href="/terms" className={styles.legalLink}>
                Terms & Conditions
              </Link>
              <Link href="/refund" className={styles.legalLink}>
                Refund Policy
              </Link>
              <Link href="/cookies" className={styles.legalLink}>
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
