'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import styles from '../services/page.module.css';

export default function TermsPage() {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <span className={styles.preHeadline}>LEGAL</span>
          <h1 className={styles.heroTitle}>Terms & Conditions</h1>
        </section>

        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem 6rem 2rem', color: '#475569', lineHeight: 1.75 }}>
          <p style={{ marginBottom: '1.5rem' }}>Last updated: July 7, 2026</p>
          <p style={{ marginBottom: '1.5rem' }}>
            Welcome to Net Bots (SMC-Private) Limited. By accessing our website, purchasing our platforms, or utilizing our software services, you agree to comply with and be bound by the following Terms & Conditions.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>1. Scope of Services</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            NetBots provides software engineering, full-stack web architectures, applied AI orchestration, and strategic digital marketing. Custom developments are subject to distinct master service agreements.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>2. Intellectual Property</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Unless indicated otherwise via specific contracts, all source code, design systems, layouts, assets, and SaaS engine technologies displayed or distributed remain the intellectual property of Net Bots (SMC-Private) Limited.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>3. Limitation of Liability</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            We build and test our software to premium reliability metrics. However, NetBots is not liable for indirect, punitive, or consequential damages resulting from operational down-times, server configurations, or database inconsistencies unless specifically guaranteed in writing.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>4. Governing Law</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            These Terms & Conditions are governed by and construed in accordance with the laws of Pakistan.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
