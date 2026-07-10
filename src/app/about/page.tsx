'use client';

import React, { useState } from 'react';
import { LocalBusinessSchema } from '@/components/structured-data/LocalBusinessSchema';
import { BreadcrumbListSchema } from '@/components/structured-data/BreadcrumbListSchema';
import { motion } from 'framer-motion';
import { Shield, Cpu, Zap, Mail, Phone } from 'lucide-react';
import styles from './page.module.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LeadCaptureModal } from '@/components/lead-capture/LeadCaptureModal';
import { companyInfo } from '@/lib/content';
import Image from 'next/image';
import Link from 'next/link';
import { FAQPageSchema } from '@/components/structured-data/FAQPageSchema';

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const philosophyCards = [
    {
      title: 'Uncompromising Security & Privacy',
      desc: 'We prioritize data sovereignty, including secure environments, Linux-based server protocols, and local-first AI implementations, meaning your proprietary data stays yours, never routed through third-party model providers unless you choose to.',
      icon: <Shield size={32} className="text-[#0052ff]" />,
    },
    {
      title: 'Scalability by Design',
      desc: 'No monolithic, brittle code. We build with Docker containerization and microservices so your platform performs identically at 10 users or 100,000.',
      icon: <Cpu size={32} className="text-[#0052ff]" />,
    },
    {
      title: 'Automated Efficiency',
      desc: 'Your people are your most valuable asset. We deploy autonomous agentic workflows to absorb repetitive logic, freeing your team for judgment calls, not data entry.',
      icon: <Zap size={32} className="text-[#0052ff]" />,
    },
  ];

  const aboutFaqs = [
    {
      question: "Where is NetBots headquartered?",
      answer: "NetBots is headquartered in Skardu, Gilgit-Baltistan, Pakistan, serving both local enterprises and global clients with high-end software solutions."
    },
    {
      question: "What core services does NetBots offer?",
      answer: "We specialize in enterprise web architecture, autonomous AI agents and integrations, and ROI-driven digital marketing campaigns."
    },
    {
      question: "Why choose an agency in Gilgit-Baltistan?",
      answer: "Our location enforces a disciplined engineering culture: we build systems that are inherently cost-effective, highly reliable, and optimized for performance under any infrastructure constraints."
    }
  ];

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.main}>
        <LocalBusinessSchema />
        <BreadcrumbListSchema
          items={[
            { name: 'Home', item: 'https://netbots.io/' },
            { name: 'About', item: 'https://netbots.io/about' },
          ]}
        />
        <FAQPageSchema faqs={aboutFaqs} />

        {/* Hero */}
        <section className={styles.heroSection}>
          <motion.span
            className={styles.preHeadline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ABOUT NETBOTS
          </motion.span>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Engineering Digital Sovereignty{' '}
            <span className={styles.highlight}>for Enterprises Worldwide</span>
          </motion.h1>
        </section>

        {/* Our Story */}
        <section className={styles.storySection}>
          <motion.div
            className={styles.storyContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className={styles.sectionTitle}>Our Story</h2>
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem', fontWeight: 600 }}>
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            <p className={styles.storyText}>
              <strong>Net Bots (SMC-Private) Limited</strong> is a premier B2B software engineering and digital marketing agency based in Skardu, Gilgit-Baltistan. We specialize in closing the gap between complex software engineering and measurable business growth by building custom <Link href="/products" prefetch={false} style={{ textDecoration: 'underline' }}>software products</Link> and deploying intelligent <Link href="/services#ai-integration" prefetch={false} style={{ textDecoration: 'underline' }}>AI automation</Link> tailored for enterprise scale.
            </p>
            <p className={styles.storyText}>
              Our team of systems architects, full-stack developers, AI engineers,
              and digital marketers operates on one shared principle:{' '}
              <strong>
                technology should be invisible, robust, and profitable for the
                client, never a burden they have to manage.
              </strong>
            </p>
          </motion.div>
        </section>

        {/* Leadership */}
        <section className={styles.leadershipSection}>
          <h2 className={styles.sectionTitle}>Leadership</h2>
          <motion.div
            className={styles.leaderCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className={styles.leaderAvatar} style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image src="/images/profileImage-ceo.avif" alt="Syed Saqlain Abbas" width={100} height={100} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className={styles.leaderInfo}>
              <h3 className={styles.leaderName}>Syed Saqlain Abbas</h3>
              <span className={styles.leaderRole}>Founder & CEO</span>
              <p className={styles.leaderBio}>
                With deep expertise in full-stack development, AI integration, and
                systems architecture, Syed Saqlain Abbas founded NetBots with a clear mission:
                bring enterprise-grade technical capability to businesses that have
                been underserved by the technology market. His philosophy centers on
                building systems that generate measurable ROI, not just impressive
                demos.
              </p>
              
              <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
                <a
                  href="https://www.linkedin.com/in/syedsaqlainabbas110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect with Syed Saqlain Abbas on LinkedIn"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#0052ff', fontSize: '0.9rem', fontWeight: 600 }}
                >
                  <LinkedinIcon size={16} />
                  LinkedIn
                </a>
                <a
                  href="mailto:saqlain@netbots.io"
                  aria-label="Email Syed Saqlain Abbas"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#0052ff', fontSize: '0.9rem', fontWeight: 600 }}
                >
                  <Mail size={16} />
                  saqlain@netbots.io
                </a>
                <a
                  href="tel:+923475484803"
                  aria-label="Call Syed Saqlain Abbas"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#0052ff', fontSize: '0.9rem', fontWeight: 600 }}
                >
                  <Phone size={16} />
                  +92-3475484803
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Engineering Philosophy */}
        <section className={styles.philosophySection}>
          <h2 className={styles.sectionTitle}>How We Think</h2>
          <div className={styles.philosophyGrid}>
            {philosophyCards.map((card, i) => (
              <motion.div
                key={i}
                className={styles.philosophyCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <div style={{ marginBottom: '1.5rem' }}>{card.icon}</div>
                <h3 className={styles.philosophyCardTitle}>{card.title}</h3>
                <p className={styles.philosophyCardDesc}>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Gilgit-Baltistan */}
        <section className={styles.locationSection}>
          <motion.div
            className={styles.locationContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className={styles.sectionTitleLight}>Why Gilgit-Baltistan</h2>
            <p className={styles.locationText}>
              Being headquartered in one of Pakistan's most underserved tech
              regions isn't incidental, it shapes how we build. We design for
              reliability under constrained infrastructure, cost-efficiency
              without cutting corners, and resilience by default.{' '}
              <strong>What works here works anywhere.</strong>
            </p>
            <div className={styles.addressBlock}>
              <p>{companyInfo.address}</p>
              <p>{companyInfo.email}</p>
              <p>{companyInfo.phone}</p>
            </div>
          </motion.div>
        </section>

        {/* FAQs */}
        <section className={styles.faqSection}>
          <div className={styles.faqContainer}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqGrid}>
              {aboutFaqs.map((faq, i) => (
                <div key={i} className={styles.faqItem}>
                  <h3 className={styles.faqQuestion}>{faq.question}</h3>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <motion.div
            className={styles.ctaContent}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.ctaTitle}>
              Meet the People Behind Your Next System
            </h2>
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
