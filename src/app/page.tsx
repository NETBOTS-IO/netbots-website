'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './page.module.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GeometricIcon } from '@/components/ui/GeometricIcons';
import { LeadCaptureModal } from '@/components/lead-capture/LeadCaptureModal';
import Link from 'next/link';
import { LocalBusinessSchema } from '@/components/structured-data/LocalBusinessSchema';
import { FAQPageSchema } from '@/components/structured-data/FAQPageSchema';

import {
  services,
  stats,
  successStories,
  featuredReport,
  cSuiteBook,
  partners,
  blogPosts,
  faqItems,
  companyInfo,
} from '@/lib/content';

const CLIENT_LOGOS = [
  { src: '/client-logos/allied.avif', alt: 'Allied' },
  { src: '/client-logos/avicena.avif', alt: 'Avicena' },
  { src: '/client-logos/belenia.avif', alt: 'Belenia' },
  { src: '/client-logos/blocket.avif', alt: 'Blocket' },
  { src: '/client-logos/bzangmo.avif', alt: 'Bzangmo' },
  { src: '/client-logos/dhs.avif', alt: 'DHS' },
  { src: '/client-logos/ecoutourism.avif', alt: 'Ecoutourism' },
  { src: '/client-logos/fjwc.avif', alt: 'FJWC' },
  { src: '/client-logos/harriot.avif', alt: 'Harriot' },
  { src: '/client-logos/hasansadpara.avif', alt: 'Hasan Sadpara' },
  { src: '/client-logos/holiday-resort.avif', alt: 'Holiday Resort' },
  { src: '/client-logos/ilyas.avif', alt: 'Ilyas' },
  { src: '/client-logos/klooma.avif', alt: 'Klooma' },
  { src: '/client-logos/mapseeker.avif', alt: 'Mapseeker' },
  { src: '/client-logos/mtp.avif', alt: 'MTP' },
  { src: '/client-logos/nazararesort.avif', alt: 'Nazara Resort' },
  { src: '/client-logos/noregna.avif', alt: 'Noregna' },
  { src: '/client-logos/northscape.avif', alt: 'Northscape' },
  { src: '/client-logos/rinor.avif', alt: 'Rinor' },
  { src: '/client-logos/rmc.avif', alt: 'RMC' },
  { src: '/client-logos/summit.avif', alt: 'Summit' },
  { src: '/client-logos/tourmaker.avif', alt: 'Tourmaker' },
  { src: '/client-logos/trans-karakoram.avif', alt: 'Trans Karakoram' },
  { src: '/client-logos/yakandbullcafe.avif', alt: 'Yak and Bull Cafe' },
  { src: '/client-logos/yham.avif', alt: 'YHAM' },
  { src: '/client-logos/zamitix.avif', alt: 'Zamitix' }
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const extendedPartners = [...partners, ...partners, ...partners];

  const faqPreview = faqItems.slice(0, 4);

  return (
    <main className={styles.main}>
      <LocalBusinessSchema />
      <FAQPageSchema faqs={faqPreview} />
      <Header />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.span
            className={styles.preHeadline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            NET BOTS (SMC-PRIVATE) LIMITED
          </motion.span>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Custom Software, AI Automation{' '}
            <br />& Growth Marketing,{' '}
            <span className={styles.heroTitleBlue}>Engineered to Scale.</span>
          </motion.h1>

          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            NetBots is a premier B2B software and digital marketing agency based in <strong>Skardu, Gilgit-Baltistan</strong>. We specialize in engineering enterprise-grade <Link href="/services#web-architecture" style={{ textDecoration: 'underline' }}>web platforms</Link>, deploying secure autonomous <Link href="/services#ai-integration" style={{ textDecoration: 'underline' }}>AI agents</Link>, and executing high-ROI <Link href="/services#digital-marketing" style={{ textDecoration: 'underline' }}>growth marketing campaigns</Link>. Our custom software solutions transform traditional operations into measurable, self-improving growth engines for businesses across Pakistan and globally.
          </motion.p>

          <motion.div
            className={styles.heroActions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className={styles.heroCta}
            >
              Book Your Free Architecture Audit
            </button>
            <a href="#approach" className={styles.heroSecondary}>
              See how it works ↓
            </a>
          </motion.div>

          <motion.div
            className={styles.heroStatsRow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {stats.map((stat, idx) => (
              <div key={idx} className={styles.heroStatItem}>
                <span className={styles.heroStatVal}>{stat.value}</span>
                <span className={styles.heroStatLabel}>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero decorative element */}
        <div className={styles.heroVisual}>
          <motion.div
            className={styles.heroOrbOuter}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <div className={styles.heroOrbRing} />
          </motion.div>
          <motion.div
            className={styles.heroOrbInner}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className={styles.heroOrbDot1}
            animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className={styles.heroOrbDot2}
            animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </div>
      </section>

      {/* Trust Bar */}
      <section className={styles.trustBar}>
        <p className={styles.trustText}>{companyInfo.tagline}</p>
      </section>

      {/* Clients Marquee Segment */}
      <section style={{ background: '#f8fafc', padding: '3.5rem 0', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto 1.5rem auto', padding: '0 2rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#64748b', textAlign: 'center', margin: 0 }}>Trusted by Operations & Infrastructure Leaders</p>
        </div>
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeContent}>
            {CLIENT_LOGOS.concat(CLIENT_LOGOS, CLIENT_LOGOS).map((client, idx) => (
              <div key={idx} className={styles.marqueeItem}>
                <Image
                  src={client.src}
                  alt={client.alt}
                  width={120}
                  height={42}
                  style={{
                    height: '42px',
                    width: 'auto',
                    objectFit: 'contain',
                    filter: 'grayscale(100%) opacity(70%)',
                    transition: 'filter 0.3s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.filter = 'grayscale(0%) opacity(100%)'}
                  onMouseOut={(e) => e.currentTarget.style.filter = 'grayscale(100%) opacity(70%)'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={styles.servicesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our services</h2>
          <Link href="/services" className={styles.viewAllLink} prefetch={false}>
            View all services &rarr;
          </Link>
        </div>

        <div className={styles.servicesGrid}>
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link href={service.href} className={styles.serviceCard}>
                <div className={styles.serviceIconWrapper}>
                  <GeometricIcon type={service.iconType} size={80} />
                </div>
                <h3 className={styles.serviceCardTitle}>{service.title}</h3>
                <p className={styles.serviceCardDesc}>
                  {service.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Banner Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          <h2 className={styles.statsHeader}>
            We're committed to lead your digital journey to success
          </h2>
          <div className={styles.statsGrid}>
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className={styles.statItem}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Agitate Section */}
      <section id="approach" className={styles.problemSection}>
        <div className={styles.problemContainer}>
          <motion.div
            className={styles.problemLeft}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className={styles.problemTitle}>
              The Real Cost of Outdated Systems
            </h2>
            <p className={styles.problemDesc}>
              Disconnected software, manual data entry, and a weak digital
              footprint aren't just inconveniences; they're a recurring tax on
              your revenue. Off-the-shelf tools force your business to bend
              around their limits instead of the other way around.
            </p>
          </motion.div>

          <motion.div
            className={styles.problemRight}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className={styles.problemTitle}>The NetBots Approach in GB & Beyond</h2>
            <p className={styles.problemDesc}>
              We build technology that adapts to <em>you</em>. Serving from Skardu, Gilgit-Baltistan to the rest of the world, we use modern
              frameworks, containerized deployments, and agentic AI workflows to
              architect bespoke <Link href="/products" style={{ textDecoration: 'underline' }}>software products</Link> that absorb the operational load, so you
              get your time back, and your business gets its momentum back.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success-stories" className={styles.storiesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Results, Not Promises</h2>
          <Link href="/case-studies" className={styles.viewAllLink} prefetch={false}>
            View all case studies &rarr;
          </Link>
        </div>

        <div className={styles.storiesGrid}>
          {successStories.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{ height: '100%' }}
            >
              <Link href={story.link} className={styles.storyCard}>
                <div>
                  <div className={styles.storyCategory}>{story.category}</div>
                  <h3 className={styles.storyTitle}>{story.title}</h3>
                  <p className={styles.storyDesc}>{story.description}</p>
                </div>
                <div className={styles.storyTags}>
                  {story.tags.map((tag, tagIdx) => (
                    <span key={tagIdx} className={styles.storyTag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Highlight / Approach Banner */}
      <section className={styles.highlightSection}>
        <motion.div
          className={styles.highlightContainer}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.highlightTag}>{featuredReport.tag}</span>
          <h2 className={styles.highlightTitle}>{featuredReport.title}</h2>
          <p className={styles.highlightDesc}>{featuredReport.description}</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className={styles.highlightButton}
          >
            {featuredReport.buttonText}
          </button>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section style={{ maxWidth: '1280px', margin: '6rem auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className={styles.preHeadline}>TESTIMONIALS</span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '1rem', letterSpacing: '-0.03em' }}>What Our Clients Say</h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '1rem auto 0 auto', lineHeight: 1.6 }}>
            Read how we have helped companies automate, scale, and capture markets.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className={styles.testimonialsGrid}>
          {[
            {
              quote: "NetBots transformed our manual auditing process into an automated, sub-second workspace. Their custom AI agents saved our operations over 30 hours a week.",
              author: "Hamza Ali",
              role: "Director of Operations",
              company: "Apex Global Solutions"
            },
            {
              quote: "The Hotel Sync platform is incredibly responsive. We saw a 40% increase in direct bookings in our first two months of deployment.",
              author: "Zeeshan Ahmed",
              role: "General Manager",
              company: "Karakoram Resorts"
            },
            {
              quote: "Accounta has made financial reconciliation effortless across our multi-currency operations. Highly recommended systems architecture team.",
              author: "Sara Khan",
              role: "Chief Financial Officer",
              company: "Lumina Tech Group"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '20px', border: '1px solid rgba(0,82,255,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <p style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.7, fontStyle: 'italic', margin: '0 0 2rem 0', position: 'relative' }}>
                "{item.quote}"
              </p>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem 0' }}>{item.author}</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>{item.role}, <span style={{ color: '#0052ff', fontWeight: 600 }}>{item.company}</span></p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Partners / Tech Marquee Section */}
      <section id="partners" className={styles.partnersSection}>
        <h2 className={styles.partnersTitle}>
          Industries & Technologies We Specialize In
        </h2>
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeRow}>
            {extendedPartners.map((partner, idx) => (
              <span key={idx} className={styles.partnerName}>
                {partner.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Snippet Section */}
      <section className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <Link href="/faq" className={styles.viewAllLink} prefetch={false}>
              See all FAQs &rarr;
            </Link>
          </div>

          <div className={styles.faqGrid}>
            {faqPreview.map((item, i) => (
              <motion.div
                key={i}
                className={styles.faqCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <h4 className={styles.faqQuestion}>{item.question}</h4>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversations / Blog Section */}
      <section className={styles.blogSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Conversations that go beyond the code
          </h2>
          <Link href="/case-studies" className={styles.viewAllLink} prefetch={false}>
            Read more &rarr;
          </Link>
        </div>

        <div className={styles.blogGrid}>
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link href={post.link} className={styles.blogCard}>
                <div>
                  <div className={styles.blogCategoryRow}>
                    <span className={styles.blogCategory}>
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className={styles.blogTitle}>{post.title}</h3>
                </div>
                <div className={styles.blogReadMore}>Read Article &rarr;</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA Band */}
      <section className={styles.finalCtaSection}>
        <motion.div
          className={styles.finalCtaContainer}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className={styles.finalCtaTitle}>
            {cSuiteBook.title}
          </h2>
          <p className={styles.finalCtaDesc}>
            {cSuiteBook.description}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className={styles.heroCta}
          >
            {cSuiteBook.buttonText}
          </button>
        </motion.div>
      </section>

      <Footer />

      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
