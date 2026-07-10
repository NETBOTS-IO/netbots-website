'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BarChart3, Hotel, Pill, Map, Activity } from 'lucide-react';
import styles from './page.module.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LeadCaptureModal } from '@/components/lead-capture/LeadCaptureModal';
import { ProductDemoModal } from '@/components/lead-capture/ProductDemoModal';
import { products } from '@/lib/content';

const productIcons: Record<string, React.ReactNode> = {
  accounta: <BarChart3 size={40} className="text-[#0052ff]" />,
  'hotel-sync': <Hotel size={40} className="text-[#0052ff]" />,
  'e-pharma': <Pill size={40} className="text-[#0052ff]" />,
  'gmap-scraper': <Map size={40} className="text-[#0052ff]" />,
  'clinical-system': <Activity size={40} className="text-[#0052ff]" />,
};

export default function ProductsPage() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');

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
            PRODUCTS & PLATFORMS
          </motion.span>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Intelligent Platforms,{' '}
            <span className={styles.highlight}>Ready for Deployment</span>
          </motion.h1>
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Purpose-built SaaS platforms for finance, hospitality, and healthcare,
            ready to deploy or customize to your requirements.
          </motion.p>
        </section>

        <section className={styles.productsSection}>
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              id={product.id}
              className={styles.productCard}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
            >
              <div className={styles.productLeft}>
                <div style={{ marginBottom: '1rem' }}>
                  {productIcons[product.id]}
                </div>
                <h2 className={styles.productName}>{product.name}</h2>
                <span className={styles.productTagline}>{product.tagline}</span>
              </div>

              <div className={styles.productRight}>
                <p className={styles.productDesc}>{product.description}</p>
                <p className={styles.productTarget}>
                  <strong>Target:</strong> {product.target}
                </p>
                {product.id === 'hotel-sync' ? (
                  <Link
                    href={product.href}
                    className={styles.productCta}
                    style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {product.cta}
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedProductId(product.name);
                      setIsDemoModalOpen(true);
                    }}
                    className={styles.productCta}
                  >
                    {product.cta}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
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
              Need a custom solution instead?
            </h2>
            <p className={styles.ctaDesc}>
              Our platforms are a starting point. We can build exactly what your
              business needs from the ground up.
            </p>
            <button
              onClick={() => setIsAuditModalOpen(true)}
              className={styles.ctaButton}
            >
              Book Your Free Architecture Audit
            </button>
          </motion.div>
        </section>
      </main>
      <Footer />
      <LeadCaptureModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />
      <ProductDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        initialProductId={selectedProductId}
      />
    </div>
  );
}
