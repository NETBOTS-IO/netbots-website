'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import styles from '../services/page.module.css';

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <span className={styles.preHeadline}>LEGAL</span>
          <h1 className={styles.heroTitle}>Privacy Policy</h1>
        </section>

        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem 6rem 2rem', color: '#475569', lineHeight: 1.75 }}>
          <p style={{ marginBottom: '1.5rem' }}>Last updated: July 7, 2026</p>
          <p style={{ marginBottom: '1.5rem' }}>
            At Net Bots (SMC-Private) Limited, we prioritize the confidentiality and integrity of your data. This Privacy Policy details how we collect, process, secure, and manage visitor and client information across our corporate systems, web applications, and services.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>1. Information We Collect</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            We collect information that you directly provide to us, including your name, email address, phone number, company details, and project objectives, specifically when you fill out contact forms or request technical audits.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>2. Data Sovereignty & AI Processing</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Our applied AI solutions prioritize local-first architectures. Sensitive data processed by our autonomous agents or models is executed in secure local environments. We do not transmit proprietary operational datasets to external third-party model providers without your explicit consent.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>3. How We Use Cookies</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            We use functional, analytical, and performance-based cookies to personalize experience, run site statistics, and facilitate high-converting campaign tracking.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>4. Security Measures</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            We implement industry-standard database isolation, containerized environments via Docker, and SSL-encrypted pipelines to guard your data against unauthorized access, modification, or exposure.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>5. Contact Us</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            For privacy inquiries or to request data removal, please contact our data compliance officer at: <strong>privacy@netbots.io</strong>.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
