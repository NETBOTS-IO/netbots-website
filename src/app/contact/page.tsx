'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { companyInfo } from '@/lib/content';

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    objective: '',
    challenge: '',
    honeypot: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;
    setIsSubmitting(true);

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          name: formData.name,
          email: formData.email,
          company: formData.company,
          objective: formData.objective,
          challenge: formData.challenge,
          honeypot: formData.honeypot,
        }),
      });

      setShowPopup(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        objective: '',
        challenge: '',
        honeypot: '',
      });
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch {
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.main}>

        <section className={styles.heroSection}>
          <motion.span
            className={styles.preHeadline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            CONTACT
          </motion.span>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Let's Architect Your{' '}
            <span className={styles.highlight}>Next Phase of Growth</span>
          </motion.h1>
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Whether you need a full digital transformation, an AI workflow
            integration, or a high-converting marketing strategy, our architects
            are ready.
          </motion.p>
        </section>

        <section className={styles.contactSection}>
          <motion.div
            className={styles.formWrapper}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <form onSubmit={handleSubmit} className={styles.form}>
              <h2 className={styles.formTitle}>
                Book Your Free Architecture Audit
              </h2>

              {/* Honeypot */}
              <input
                type="text"
                name="website_url"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                onChange={(e) =>
                  setFormData({ ...formData, honeypot: e.target.value })
                }
              />

              <div className={styles.formGrid}>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Full Name *</label>
                  <input
                    required
                    type="text"
                    name="name"
                    className={styles.formInput}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your name"
                  />
                </div>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Work Email *</label>
                  <input
                    required
                    type="email"
                    name="email"
                    className={styles.formInput}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className={styles.formField}>
                <label className={styles.formLabel}>
                  Company / Organization
                </label>
                <input
                  type="text"
                  name="company"
                  className={styles.formInput}
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="Your company name"
                />
              </div>

              <div className={styles.formField}>
                <label className={styles.formLabel}>
                  Primary Objective *
                </label>
                <select
                  required
                  name="objective"
                  className={styles.formSelect}
                  value={formData.objective}
                  onChange={(e) =>
                    setFormData({ ...formData, objective: e.target.value })
                  }
                >
                  <option value="">Select your primary objective</option>
                  <option value="custom-software">
                    Develop Custom Software / Web App
                  </option>
                  <option value="ai-automation">
                    Integrate AI / Automate Workflows
                  </option>
                  <option value="digital-marketing">
                    Digital Marketing & Lead Generation
                  </option>
                  <option value="marketing">
                    Marketing
                  </option>
                  <option value="designing">
                    Designing
                  </option>
                  <option value="consulting">
                    Consulting & Architecture Audit
                  </option>
                </select>
              </div>

              <div className={styles.formField}>
                <label className={styles.formLabel}>
                  Describe your challenge
                </label>
                <textarea
                  name="challenge"
                  className={styles.formTextarea}
                  rows={4}
                  value={formData.challenge}
                  onChange={(e) =>
                    setFormData({ ...formData, challenge: e.target.value })
                  }
                  placeholder="Tell us about your current technical or business challenge..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.formSubmit}
              >
                {isSubmitting ? 'Sending...' : 'Request Strategy Call'}
              </button>
            </form>
          </motion.div>

          <motion.div
            className={styles.infoWrapper}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Direct Channels</h3>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email</span>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className={styles.infoValue}
                >
                  {companyInfo.email}
                </a>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>
                  WhatsApp / Priority Support
                </span>
                <a
                  href={`https://wa.me/923433757372`}
                  className={styles.infoValue}
                >
                  {companyInfo.phone}
                </a>
              </div>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Headquarters</h3>
              <p className={styles.infoAddress}>{companyInfo.name}</p>
              <p className={styles.infoAddress}>
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
              <div style={{ marginTop: '1.25rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0, 82, 255, 0.1)' }}>
                <a
                  href="https://share.google/r6YFZyg2zUWz9tVaX"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    background: '#f8fafc',
                    padding: '1rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: '#0052ff',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0, 82, 255, 0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.background = '#f8fafc'}
                >
                  📍 View on Google Maps
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
