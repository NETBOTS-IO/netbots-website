'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './page.module.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LeadCaptureModal } from '@/components/lead-capture/LeadCaptureModal';
import { GeometricIcon } from '@/components/ui/GeometricIcons';
import { services } from '@/lib/content';

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const serviceDetails = [
    {
      ...services[0],
      id: 'web-architecture',
      tech: 'React, Next.js, Node.js, Express, MongoDB',
      approach:
        'Progressive Web Apps (PWAs) and enterprise portals with Server-Side Rendering (SSR) for near-instant load times.',
      impact:
        'Higher search rankings, zero user drop-off from lag, and a UI/UX built to convert.',
    },
    {
      ...services[1],
      id: 'ai-integration',
      tech: 'LLM APIs, agentic workflows, local-first models, RAG (Retrieval-Augmented Generation)',
      approach:
        'Bespoke AI agents built around your specific business context, from intelligent customer service to automated data pipelines.',
      impact:
        'Drastic reduction in operational overhead; your business runs 24/7 on real-time, data-driven decisions.',
    },
    {
      ...services[2],
      id: 'digital-marketing',
      tech: 'SEO, Precision PPC, CRO, Full-funnel Analytics',
      approach:
        'SEO, precision PPC, and conversion rate optimization (CRO), mapping full customer psychology from first click to final sale.',
      impact:
        'A predictable, scalable pipeline of qualified leads and a dominant digital footprint.',
    },
    {
      ...services[3],
      id: 'secure-devops',
      tech: 'Docker, Nginx, Advanced Linux Security, CI/CD Pipelines',
      approach:
        'Seamless SSL deployment, isolated container environments, robust database management.',
      impact:
        'Maximum uptime, hardened data security, seamless scaling during traffic spikes.',
    },
  ];

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
            SERVICES
          </motion.span>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Comprehensive Software, AI{' '}
            <span className={styles.highlight}>& Marketing Services</span>
          </motion.h1>
        </section>

        <section className={styles.servicesListSection}>
          {serviceDetails.map((service, i) => (
            <motion.div
              key={service.id}
              id={service.id}
              className={styles.serviceBlock}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
            >
              <div className={styles.serviceBlockHeader}>
                <div className={styles.serviceBlockIcon}>
                  <GeometricIcon type={service.iconType} size={60} />
                </div>
                <div>
                  <span className={styles.serviceBlockNum}>0{i + 1}</span>
                  <h2 className={styles.serviceBlockTitle}>{service.title}</h2>
                </div>
              </div>

              <div className={styles.serviceBlockBody}>
                <div className={styles.serviceBlockCol}>
                  <h3 className={styles.serviceBlockLabel}>Technology</h3>
                  <p className={styles.serviceBlockText}>{service.tech}</p>
                </div>
                <div className={styles.serviceBlockCol}>
                  <h3 className={styles.serviceBlockLabel}>Approach</h3>
                  <p className={styles.serviceBlockText}>{service.approach}</p>
                </div>
                <div className={styles.serviceBlockCol}>
                  <h3 className={styles.serviceBlockLabel}>Business Impact</h3>
                  <p className={styles.serviceBlockText}>{service.impact}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Technologies Grid */}
        <section style={{ maxWidth: '1280px', margin: '6rem auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className={styles.preHeadline}>EXPERTISE</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '1rem', letterSpacing: '-0.03em' }}>Technologies We Excel In</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '1rem auto 0 auto', lineHeight: 1.6 }}>
              We stay at the forefront of technology, mastering the latest tools and frameworks to deliver exceptional solutions.
            </p>
          </div>

          <div className={styles.techGrid}>
            {[
              {
                category: 'Frontend Development',
                skills: [
                  { name: 'Next.js 14', desc: 'The React Framework for Production' },
                  { name: 'React 18', desc: 'A JavaScript library for building user interfaces' },
                  { name: 'WordPress', desc: "World's most popular CMS platform" },
                  { name: 'Shopify', desc: 'Leading e-commerce platform' }
                ]
              },
              {
                category: 'Backend Development',
                skills: [
                  { name: 'Node.js', desc: "JavaScript runtime built on Chrome's V8 engine" },
                  { name: 'Python', desc: 'Programming language for AI and web development' },
                  { name: 'Go', desc: 'Open source programming language by Google' },
                  { name: 'Rust', desc: 'Systems programming language for performance' }
                ]
              },
              {
                category: 'Cloud & DevOps',
                skills: [
                  { name: 'Docker', desc: 'Container platform for modern applications' },
                  { name: 'Kubernetes', desc: 'Container orchestration platform' },
                  { name: 'AWS', desc: 'Leading cloud computing platform' },
                  { name: 'Azure', desc: "Microsoft's cloud computing service" }
                ]
              },
              {
                category: 'AI & Machine Learning',
                skills: [
                  { name: 'TensorFlow', desc: 'Open source machine learning framework' },
                  { name: 'PyTorch', desc: 'Machine learning library for Python' },
                  { name: 'Jupyter', desc: 'Interactive computing and data science' },
                  { name: 'Pandas', desc: 'Data manipulation and analysis' }
                ]
              },
              {
                category: 'Database & Storage',
                skills: [
                  { name: 'MongoDB', desc: 'NoSQL database for modern applications' },
                  { name: 'PostgreSQL', desc: 'Advanced open source database' },
                  { name: 'Redis', desc: 'In-memory data structure store' },
                  { name: 'MySQL', desc: 'Popular open-source database' }
                ]
              },
              {
                category: 'Tools & Testing',
                skills: [
                  { name: 'Jest', desc: 'JavaScript testing framework' },
                  { name: 'Git', desc: 'Version control system' },
                  { name: 'GitHub', desc: 'Development platform and hosting' },
                  { name: 'VS Code', desc: 'Popular code editor' }
                ]
              }
            ].map((techGroup, i) => (
              <div key={i} style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,82,255,0.1)', paddingBottom: '0.75rem' }}>
                  {techGroup.category}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {techGroup.skills.map((skill, idx) => (
                    <div key={idx}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0052ff', margin: '0 0 0.25rem 0' }}>{skill.name}</h4>
                      <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>{skill.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.ctaSection}>
          <motion.div
            className={styles.ctaContainer}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.ctaTitle}>
              Not sure which service fits your challenge?
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
