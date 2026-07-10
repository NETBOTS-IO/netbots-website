'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import styles from '../services/page.module.css';

export default function RefundPage() {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <span className={styles.preHeadline}>LEGAL</span>
          <h1 className={styles.heroTitle}>Refund & Cancellation Policy</h1>
        </section>

        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem 6rem 2rem', color: '#475569', lineHeight: 1.75 }}>
          <p style={{ marginBottom: '1.5rem' }}>Last updated: July 7, 2026</p>
          <p style={{ marginBottom: '1.5rem' }}>
            We work closely with clients to define technical milestones, architecture layouts, and feature checklists. This Refund & Cancellation Policy describes standard refund conditions.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>1. Custom Development Deposits</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Initial project deposits and milestone-based payments are non-refundable. They fund engineering allocations, system designs, and code deployments. If a project is cancelled by the client, outstanding completed milestones must be paid in full.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>2. SaaS Subscriptions</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Subscriptions for products like Accounta, Hotel Sync, and E-Pharma are billed monthly or annually. You can cancel your subscription at any time. Cancelled subscriptions remain active until the end of the current billing cycle, and no partial refunds are offered.
          </p>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem' }}>3. Dispute Resolution</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            We encourage open communication. If you are dissatisfied with a delivery phase, please reach out to your project coordinator or contact <strong>info@netbots.io</strong> to arrange a review.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
