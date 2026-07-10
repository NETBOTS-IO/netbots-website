'use client';

import React, { useState } from 'react';
import { ProfessionalServiceSchema } from '@/components/structured-data/ProfessionalServiceSchema';
import { BreadcrumbListSchema } from '@/components/structured-data/BreadcrumbListSchema';
import { motion } from 'framer-motion';
import styles from './page.module.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LeadCaptureModal } from '@/components/lead-capture/LeadCaptureModal';
import { useParams } from 'next/navigation';

const serviceData: Record<
  string,
  {
    title: string;
    desc: string;
    stack: string[];
    approach: string;
    impact: string;
  }
> = {
  'software-dev': {
    title: 'Custom Web & System Architecture',
    desc: 'Progressive Web Apps (PWAs) and enterprise portals with Server-Side Rendering (SSR) for near-instant load times.',
    stack: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB'],
    approach:
      'We architect from the ground up, using no templates and no shortcuts. Every system is built for your specific scale, security, and performance requirements using the MERN stack and modern SSR frameworks.',
    impact:
      'Higher search rankings, zero user drop-off from lag, and a UI/UX built to convert visitors into customers.',
  },
  'ai-automation': {
    title: 'AI Integration & Autonomous Workflows',
    desc: 'Bespoke AI agents built around your specific business context, from intelligent customer service to automated data pipelines.',
    stack: ['LLM APIs', 'Agentic Workflows', 'Local-First Models', 'RAG'],
    approach:
      'We deploy AI that respects your data. Local-first models process sensitive information without ever routing through third-party providers, which is critical for finance and healthcare clients.',
    impact:
      'Drastic reduction in operational overhead; your business runs 24/7 on real-time, data-driven decisions without human bottlenecks.',
  },
  'ui-ux': {
    title: 'Data-Driven Digital Marketing',
    desc: 'SEO, precision PPC, and conversion rate optimization (CRO), mapping full customer psychology from first click to final sale.',
    stack: ['SEO', 'PPC', 'CRO', 'Analytics'],
    approach:
      'We don\'t guess; we map. Every campaign is built on customer psychology data, search intent analysis, and conversion funnel architecture that turns clicks into revenue.',
    impact:
      'A predictable, scalable pipeline of qualified leads and a dominant digital footprint in your target market.',
  },
  marketing: {
    title: 'Secure Infrastructure & DevOps',
    desc: 'Seamless SSL deployment, isolated container environments, robust database management for maximum uptime.',
    stack: ['Docker', 'Nginx', 'Linux Security', 'CI/CD'],
    approach:
      'Infrastructure as code, containerized deployments, and hardened security protocols. We build systems that scale seamlessly and survive anything.',
    impact:
      'Maximum uptime, hardened data security, and seamless scaling during traffic spikes, without manual intervention.',
  },
};

export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const data = serviceData[slug] || serviceData['software-dev'];
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.main}>
        <ProfessionalServiceSchema
          name={data.title}
          description={data.desc}
          url={`https://netbots.io/services/${slug}`}
        />
        <BreadcrumbListSchema
          items={[
            { name: 'Home', item: 'https://netbots.io/' },
            { name: 'Services', item: 'https://netbots.io/services' },
            { name: data.title, item: `https://netbots.io/services/${slug}` },
          ]}
        />

        <section className={styles.heroSection}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.preHeadline}>SERVICE</span>
            <h1 className={styles.title}>{data.title}</h1>
            <p className={styles.description}>{data.desc}</p>

            <div className={styles.stackGrid}>
              {data.stack.map((tech, i) => (
                <motion.span
                  key={tech}
                  className={styles.stackTag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </section>

        <section className={styles.detailsSection}>
          <div className={styles.detailsGrid}>
            <motion.div
              className={styles.detailCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={styles.detailLabel}>Our Approach</h2>
              <p className={styles.detailText}>{data.approach}</p>
            </motion.div>

            <motion.div
              className={styles.detailCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h2 className={styles.detailLabel}>Business Impact</h2>
              <p className={styles.detailText}>{data.impact}</p>
            </motion.div>
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
