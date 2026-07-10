'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Hotel, Menu, X } from 'lucide-react';
import styles from '../page.module.css';

export default function HotelSyncTermsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* Navigation */}
      <nav className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ''}`}>
        <div className={`${styles.container} ${styles.navContainer}`}>
          <Link href="/products/hotel-sync" className={styles.logo}>
            <Hotel className={styles.logoIcon} size={28} /> Hotel<span>Sync</span>
          </Link>
          
          <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.activeLinks : ''}`}>
            <Link href="/products/hotel-sync#home" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link href="/products/hotel-sync#features" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
            <Link href="/products/hotel-sync#showcase" onClick={() => setIsMobileMenuOpen(false)}>Capabilities</Link>
            <Link href="/products/hotel-sync#comparison" onClick={() => setIsMobileMenuOpen(false)}>Why HotelSync</Link>
            <Link href="/products/hotel-sync#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
            <Link href="/products/hotel-sync#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
            <Link href="/products/hotel-sync#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          </div>

          <div className={styles.navActions}>
            <Link href="/products/hotel-sync#contact" className={`${styles.btn} ${styles.btnPrimary}`}>Get Started</Link>
            <div className={styles.menuToggle} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className={styles.container} style={{ padding: '150px 20px 100px', minHeight: '60vh' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ color: 'var(--text-primary)', marginBottom: '20px', fontSize: '2.5rem', fontWeight: 700 }}>Terms of Service - HotelSync</h1>
          <p style={{ color: '#64748b', marginBottom: '40px' }}>Last updated: July 2026</p>
          
          <div style={{ color: 'var(--text-primary)', lineHeight: '1.8', fontSize: '1.1rem' }}>
            <h3 style={{ marginBottom: '10px', marginTop: '20px', color: 'var(--text-primary)', fontWeight: 700 }}>1. Acceptance of Terms</h3>
            <p style={{ marginBottom: '20px', color: '#475569' }}>By downloading, setting up, or deploying the HotelSync desktop software provided by NetBots (SMC Private) Limited, you agree to be bound by these Terms of Service.</p>
            
            <h3 style={{ marginBottom: '10px', marginTop: '20px', color: 'var(--text-primary)', fontWeight: 700 }}>2. Licensing Scope</h3>
            <p style={{ marginBottom: '20px', color: '#475569' }}>Based on your chosen subscription tier (Monthly, Yearly, Lifetime, or Commission), NetBots grants you a limited, non-exclusive, non-transferable desktop license key to run the HotelSync PMS software for your business property operations.</p>
            
            <h3 style={{ marginBottom: '10px', marginTop: '20px', color: 'var(--text-primary)', fontWeight: 700 }}>3. Billing & Payments</h3>
            <p style={{ marginBottom: '20px', color: '#475569' }}>If you purchase the Commission model (1% of whole season profit), you agree to submit correct financial summaries to NetBots at the end of each season cycle. Failure to pay monthly or yearly billing keys may result in local software deactivation.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerContainer}`}>
          <div className={styles.footerBrand}>
            <Link href="/products/hotel-sync" className={styles.logo} style={{ color: 'white' }}>
              <Hotel className={styles.logoIcon} size={28} /> Hotel<span style={{ color: 'var(--primary)' }}>Sync</span>
            </Link>
            <p>Powered by NetBots (SMC Private) Limited. Empowering hospitality businesses with intelligent desktop software.</p>
          </div>
          <div className={styles.footerLinks}>
            <h4>Product</h4>
            <Link href="/products/hotel-sync#features">Features</Link>
            <Link href="/products/hotel-sync#pricing">Pricing</Link>
            <Link href="/products">All Products</Link>
            <Link href="/services">Our Services</Link>
          </div>
          <div className={styles.footerLinks}>
            <h4>Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/products/hotel-sync/privacy">Privacy Policy</Link>
            <Link href="/products/hotel-sync/terms">Terms of Service</Link>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} NetBots (SMC Private) Limited. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
