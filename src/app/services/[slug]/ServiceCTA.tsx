'use client';

import { useState } from 'react';
import { LeadCaptureModal } from '@/components/lead-capture/LeadCaptureModal';
import styles from './page.module.css';

export function ServiceCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Not sure which service fits?</h2>
          <p className={styles.ctaDesc}>
            Book a free architecture audit and we'll recommend the right
            approach for your challenge.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className={styles.ctaButton}
          >
            Book Your Free Architecture Audit
          </button>
        </div>
      </section>
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
