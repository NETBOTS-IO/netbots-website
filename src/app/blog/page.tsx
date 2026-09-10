import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { getPosts } from '@/lib/sanity/client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogListClient } from '@/components/blog/BlogListClient';
import styles from './page.module.css';

export const revalidate = 60; // ISR revalidation every minute

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.main}>
        {/* Ambient Top Glow */}
        <div className={styles.ambientGlowTop} />

        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.preHeadline}>
            <BookOpen size={14} /> Knowledge & Engineering Insights
          </div>
          <h1 className={styles.heroTitle}>
            Architectural Insights &amp;{' '}
            <span className={styles.brandGradient}>AI Engineering</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Battlefield-tested playbooks on building sub-second web platforms, autonomous AI agents, and scaling modern technology agencies.
          </p>
        </section>

        {/* Blog Listing & Interactive Category Filters */}
        <BlogListClient initialPosts={posts} />

        {/* Bottom CTA Banner */}
        <section className={styles.ctaBanner}>
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Ready to Build Something Extraordinary?</h2>
            <p className={styles.ctaDesc}>
              Whether you need to architect an enterprise platform, integrate autonomous AI agents, or join our 21-Day Founder Lab masterclass, let's connect.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className={styles.ctaBtn}>
                Book Strategy Audit <ArrowRight size={16} />
              </Link>
              <Link
                href="/register/the-founder-lab-masterclass"
                className={styles.ctaBtn}
                style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)' }}
              >
                The Founder Lab Masterclass
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
