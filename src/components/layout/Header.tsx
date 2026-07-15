'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navigation } from '@/lib/content';
import { LeadCaptureModal } from '@/components/lead-capture/LeadCaptureModal';
import styles from './Header.module.css';

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo} style={{ display: 'flex', alignItems: 'center' }}>
            <Image src="/images/netbots-logo-original.avif" alt="NetBots" width={120} height={36} style={{ objectFit: 'contain' }} priority />
          </Link>

          <nav className={`${styles.nav} ${mobileMenuOpen ? styles.navActive : ''}`}>
            {navigation.header.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={styles.navLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className={styles.mobileContact}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <button
              onClick={() => {
                setIsModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className={styles.mobileCta}
            >
              Book Your Free Audit
            </button>
          </nav>

          <div className={styles.rightSection}>
            <Link href="/contact" className={styles.contactLink}>
              Contact
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className={styles.ctaButton}
            >
              Book Your Free Audit
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={styles.hamburger}
              aria-label="Toggle menu"
            >
              <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen : ''}`} />
              <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen : ''}`} />
              <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen : ''}`} />
            </button>
          </div>
        </div>
      </header>

      <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
