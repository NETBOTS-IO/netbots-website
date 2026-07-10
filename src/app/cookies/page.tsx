'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import styles from '../services/page.module.css';

export default function CookiesPage() {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <span className={styles.preHeadline}>LEGAL</span>
          <h1 className={styles.heroTitle}>Cookie Policy</h1>
        </section>

        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem 6rem 2rem', color: '#475569', lineHeight: 1.75 }}>
          <p style={{ marginBottom: '1.5rem' }}>Last updated: July 7, 2026</p>
          <p style={{ marginBottom: '1.5rem' }}>
            This Cookie Policy explains how Net Bots (SMC-Private) Limited uses cookies and similar tracking technologies when you interact with our websites and applications.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>1. What Are Cookies?</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Cookies are small text files stored on your device that help websites recognize you, load page variables, and save preferences.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>2. Categories of Cookies We Use</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            We classify our cookies into the following categories:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', listStyleType: 'disc' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Essential Cookies:</strong> Critical for navigation, user login sessions, and secure form submissions.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Analytics Cookies:</strong> Help us measure site activity, traffic flow, and identify performance bottlenecks.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Marketing Cookies:</strong> Used to track high-converting advertising campaigns and direct-response signals.</li>
          </ul>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>3. How to Manage Cookies</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            You can modify your browser settings to decline cookies or choose to delete specific cookies. Note that disabling essential cookies may impact web application functionality.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
