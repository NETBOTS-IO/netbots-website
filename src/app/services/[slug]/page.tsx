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
  'marketing': {
    title: 'Data-Driven Digital Marketing',
    metaTitle: 'Data-Driven Digital Marketing & SEO Services | NetBots Pakistan',
    metaDescription: 'Enterprise SEO, precision PPC, and conversion rate optimization engineered to drive measurable revenue. NetBots builds dominant digital footprints in Gilgit-Baltistan and globally.',
    desc: 'Full-funnel SEO, precision PPC, and conversion rate optimization (CRO), mapping complete customer psychology from first click to final conversion.',
    stack: ['Technical SEO', 'Precision PPC', 'Conversion Optimization', 'Full-Funnel Analytics'],
    approach:
      "We don't guess; we map. Every campaign is built on customer intent data, deep SERP analysis, and conversion funnel architecture that turns clicks into revenue.",
    impact:
      'A predictable, scalable pipeline of qualified leads and a dominant digital footprint in your target market.',
  },
  'devops': {
    title: 'Secure Infrastructure & DevOps',
    metaTitle: 'Secure Cloud Infrastructure & DevOps Services | NetBots Pakistan',
    metaDescription: 'Docker containerization, Nginx reverse proxies, Linux security hardening, and zero-downtime CI/CD pipelines. NetBots engineers resilient cloud infrastructure.',
    desc: 'Automated SSL deployment, isolated container environments, and robust database management for maximum enterprise uptime.',
    stack: ['Docker', 'Nginx', 'Linux Hardening', 'CI/CD Pipelines', 'Cloudflare'],
    approach:
      'Infrastructure as code, containerized microservices, and hardened security protocols. We build resilient systems engineered to scale seamlessly under heavy traffic.',
    impact:
      'Maximum uptime, hardened enterprise data security, and seamless auto-scaling during traffic spikes.',
  },
  'ui-ux': {
    title: 'UI/UX Design & Product Strategy',
    metaTitle: 'UI/UX Design & User Experience Engineering | NetBots Pakistan',
    metaDescription: 'Human-centric UI/UX design, interactive prototypes, and design systems built to maximize conversion and user retention. Book a design consultation with NetBots.',
    desc: 'User-centered interface design, interactive design systems, and friction-free user journeys engineered to maximize conversion.',
    stack: ['Figma', 'Design Systems', 'Interactive Prototyping', 'User Research', 'A/B Testing'],
    approach:
      'We combine behavioral psychology with modern aesthetic principles to craft digital interfaces that feel fluid, responsive, and intuitive.',
    impact:
      'Higher user engagement, reduced bounce rates, and intuitive workflows that drive customer retention and satisfaction.',
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
