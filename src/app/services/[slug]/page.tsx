// Server Component — no 'use client' here.
// Content is SSR'd and visible to crawlers on first HTML pass.
// Only the CTA button/modal (ServiceCTA) is a client leaf.

import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProfessionalServiceSchema } from '@/components/structured-data/ProfessionalServiceSchema';
import { BreadcrumbListSchema } from '@/components/structured-data/BreadcrumbListSchema';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceCTA } from './ServiceCTA';
import styles from './page.module.css';

// ── Service data ─────────────────────────────────────────────────────────────
// Keys must match the slug values used in the URL and sitemap.
const serviceData: Record<
  string,
  {
    title: string;
    metaTitle: string;
    metaDescription: string;
    desc: string;
    stack: string[];
    approach: string;
    impact: string;
  }
> = {
  'software-dev': {
    title: 'Custom Web & System Architecture',
    metaTitle: 'Custom Web Development & System Architecture Services | NetBots Pakistan',
    metaDescription: 'NetBots engineers scalable MERN-stack web platforms, PWAs, and enterprise portals with SSR for near-instant load times. Based in Skardu, Gilgit-Baltistan — serving clients globally. Book a free audit.',
    desc: 'Progressive Web Apps (PWAs) and enterprise portals with Server-Side Rendering (SSR) for near-instant load times.',
    stack: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB'],
    approach:
      'We architect from the ground up, using no templates and no shortcuts. Every system is built for your specific scale, security, and performance requirements using the MERN stack and modern SSR frameworks.',
    impact:
      'Higher search rankings, zero user drop-off from lag, and a UI/UX built to convert visitors into customers.',
  },
  'ai-automation': {
    title: 'AI Integration & Autonomous Workflows',
    metaTitle: 'AI Automation & Agentic Workflow Services | NetBots Pakistan',
    metaDescription: 'Bespoke AI agents, LLM integrations, and local-first models built for your business. NetBots deploys intelligent automation that runs 24/7 without manual bottlenecks. Book a free AI audit.',
    desc: 'Bespoke AI agents built around your specific business context, from intelligent customer service to automated data pipelines.',
    stack: ['LLM APIs', 'Agentic Workflows', 'Local-First Models', 'RAG'],
    approach:
      'We deploy AI that respects your data. Local-first models process sensitive information without ever routing through third-party providers, which is critical for finance and healthcare clients.',
    impact:
      'Drastic reduction in operational overhead; your business runs 24/7 on real-time, data-driven decisions without human bottlenecks.',
  },
  'ui-ux': {
    title: 'Data-Driven Digital Marketing',
    metaTitle: 'Data-Driven Digital Marketing & CRO Services | NetBots Pakistan',
    metaDescription: 'SEO, precision PPC, and conversion rate optimization that maps full customer psychology from first click to final sale. NetBots builds dominant digital footprints in Gilgit-Baltistan and beyond.',
    desc: 'SEO, precision PPC, and conversion rate optimization (CRO), mapping full customer psychology from first click to final sale.',
    stack: ['SEO', 'PPC', 'CRO', 'Analytics'],
    approach:
      "We don't guess; we map. Every campaign is built on customer psychology data, search intent analysis, and conversion funnel architecture that turns clicks into revenue.",
    impact:
      'A predictable, scalable pipeline of qualified leads and a dominant digital footprint in your target market.',
  },
  marketing: {
    title: 'Secure Infrastructure & DevOps',
    metaTitle: 'Secure Web Infrastructure & DevOps Services | NetBots Pakistan',
    metaDescription: 'Docker containers, Nginx deployments, Linux security hardening, and CI/CD pipelines for maximum uptime. NetBots builds infrastructure that scales and survives anything.',
    desc: 'Seamless SSL deployment, isolated container environments, robust database management for maximum uptime.',
    stack: ['Docker', 'Nginx', 'Linux Security', 'CI/CD'],
    approach:
      'Infrastructure as code, containerized deployments, and hardened security protocols. We build systems that scale seamlessly and survive anything.',
    impact:
      'Maximum uptime, hardened data security, and seamless scaling during traffic spikes, without manual intervention.',
  },
};

// ── generateStaticParams ─────────────────────────────────────────────────────
// Pre-generates all known service slug pages at build time (SSG).
export async function generateStaticParams() {
  return Object.keys(serviceData).map((slug) => ({ slug }));
}

// ── generateMetadata ─────────────────────────────────────────────────────────
// Each service slug gets a unique title, description, canonical, and OG tags.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = serviceData[slug];

  if (!data) {
    return {
      title: 'Service Not Found | NetBots',
      robots: { index: false },
    };
  }

  const canonicalUrl = `https://netbots.io/services/${slug}`;
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: canonicalUrl,
      siteName: 'NetBots',
      type: 'website',
      images: [{ url: 'https://netbots.io/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.metaTitle,
      description: data.metaDescription,
    },
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = serviceData[slug];

  // Unknown slugs get a proper 404 — no more "renders default content for any slug"
  if (!data) notFound();

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.main}>
        {/* JSON-LD injected server-side — visible to crawlers in initial HTML */}
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
          <span className={styles.preHeadline}>SERVICE</span>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.description}>{data.desc}</p>

          <div className={styles.stackGrid}>
            {data.stack.map((tech) => (
              <span key={tech} className={styles.stackTag}>
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className={styles.detailsSection}>
          <div className={styles.detailsGrid}>
            <div className={styles.detailCard}>
              <h2 className={styles.detailLabel}>Our Approach</h2>
              <p className={styles.detailText}>{data.approach}</p>
            </div>
            <div className={styles.detailCard}>
              <h2 className={styles.detailLabel}>Business Impact</h2>
              <p className={styles.detailText}>{data.impact}</p>
            </div>
          </div>
        </section>

        {/* Interactive CTA + modal isolated to a client leaf component */}
        <ServiceCTA />
      </main>
      <Footer />
    </div>
  );
}
