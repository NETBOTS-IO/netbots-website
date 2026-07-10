'use client';

import React, { useState } from 'react';
import { BreadcrumbListSchema } from '@/components/structured-data/BreadcrumbListSchema';
import { motion } from 'framer-motion';
import styles from './page.module.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LeadCaptureModal } from '@/components/lead-capture/LeadCaptureModal';
import { successStories } from '@/lib/content';

const caseStudies = [
  {
    id: 'cs-1',
    industry: 'Finance & Operations',
    client: 'SME Finance Client',
    challenge:
      'Manual reconciliation processes consuming 40+ hours per month, with multi-currency reporting errors and delayed month-end closes.',
    solution:
      'Built Accounta, a full financial intelligence SaaS platform with automated reconciliation, multi-currency reporting, tax compliance modules, and predictive cash flow analytics.',
    outcome: 'Reduced monthly close time significantly. Eliminated manual data entry errors across multi-currency operations.',
    tags: ['SaaS', 'Finance', 'Automation', 'MERN Stack'],
    color: '#0052ff',
  },
  {
    id: 'cs-2',
    industry: 'Hospitality & Tourism',
    client: 'Regional Hotel Group',
    challenge:
      'Disconnected systems for front desk, housekeeping, and booking channels leading to double-bookings and guest complaints.',
    solution:
      'Designed Hotel Sync, a unified dashboard integrating front desk, housekeeping, and global booking engines with real-time synchronization.',
    outcome: 'Zero double-bookings since deployment. Staff efficiency improved across all departments.',
    tags: ['Dashboard', 'Integration', 'Real-Time', 'Next.js'],
    color: '#0052ff',
  },
  {
    id: 'cs-3',
    industry: 'Healthcare & Pharmacy',
    client: 'Pharmacy Chain',
    challenge:
      'No batch-level inventory tracking, expired medications reaching shelves, and manual supplier reordering causing stock-outs.',
    solution:
      'Implemented E-Pharma, a secure clinical POS system with batch- and expiry-level tracking, automated supplier reordering, and encrypted patient prescription records.',
    outcome: 'Eliminated expired stock incidents. Automated reordering reduced stock-outs to near zero.',
    tags: ['Healthcare', 'POS', 'Compliance', 'Security'],
    color: '#0052ff',
  },
];

export default function CaseStudiesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.main}>
        <BreadcrumbListSchema
          items={[
            { name: 'Home', item: 'https://netbots.io/' },
            { name: 'Case Studies', item: 'https://netbots.io/case-studies' },
          ]}
        />

        {/* Hero */}
        <section className={styles.heroSection}>
          <motion.span
            className={styles.preHeadline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            CASE STUDIES
          </motion.span>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Real Systems.{' '}
            <span className={styles.highlight}>Real Outcomes.</span>
          </motion.h1>
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            See how NetBots has helped enterprises across finance, hospitality, and
            healthcare automate operations and scale with custom software and AI.
          </motion.p>
        </section>

        {/* Case Study Cards */}
        <section className={styles.casesSection}>
          {caseStudies.map((cs, i) => (
            <motion.article
              key={cs.id}
              className={styles.caseCard}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
            >
              <div className={styles.caseHeader}>
                <span className={styles.caseIndustry}>{cs.industry}</span>
                <span className={styles.caseClient}>{cs.client}</span>
              </div>

              <div className={styles.caseBody}>
                <div className={styles.caseStep}>
                  <h3 className={styles.caseStepLabel}>The Challenge</h3>
                  <p className={styles.caseStepText}>{cs.challenge}</p>
                </div>
                <div className={styles.caseStep}>
                  <h3 className={styles.caseStepLabel}>What We Built</h3>
                  <p className={styles.caseStepText}>{cs.solution}</p>
                </div>
                <div className={styles.caseStep}>
                  <h3 className={styles.caseStepLabel}>The Outcome</h3>
                  <p className={styles.caseStepText}>{cs.outcome}</p>
                </div>
              </div>

              <div className={styles.caseTags}>
                {cs.tags.map((tag, tagIdx) => (
                  <span key={tagIdx} className={styles.caseTag}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <motion.div
            className={styles.ctaContainer}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className={styles.ctaTitle}>
              Ready to be our next success story?
            </h2>
            <p className={styles.ctaDesc}>
              Book a free technical audit and let's map the path from where you are
              to where you want to be.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className={styles.ctaButton}
            >
              Book Your Free Architecture Audit
            </button>
          </motion.div>
        </section>
      </main>
      <Footer />
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
