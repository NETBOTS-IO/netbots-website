'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import styles from './services/page.module.css';

export default function NotFound() {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.main} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center', padding: '0 2rem' }}>
        <span className={styles.preHeadline} style={{ fontSize: '3rem', fontWeight: 800, padding: '1rem 2rem', background: 'rgba(0, 82, 255, 0.06)' }}>404</span>
        <h1 className={styles.heroTitle} style={{ marginTop: '2.5rem' }}>Page Not Found</h1>
        <p style={{ color: '#475569', fontSize: '1.15rem', maxWidth: '500px', margin: '1.5rem auto 2.5rem auto', lineHeight: 1.65 }}>
          The system architecture audit indicates that this URL does not exist or has been relocated.
        </p>
        <Link href="/" style={{
          background: '#0052ff',
          color: 'white',
          border: 'none',
          padding: '1rem 2.2rem',
          borderRadius: '40px',
          fontWeight: 700,
          fontSize: '1rem',
          cursor: 'pointer',
          textDecoration: 'none',
          transition: 'background-color 0.2s',
        }}>
          Return to Dashboard
        </Link>
      </main>
      <Footer />
    </div>
  );
}
