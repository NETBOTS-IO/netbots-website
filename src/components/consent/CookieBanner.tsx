'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import styles from './CookieBanner.module.css';

const CONSENT_STORAGE_KEY = 'netbots_cookie_consent_v2';

export function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!consent) {
      setShowBanner(true);
    }

    // Expose dev trigger for quick manual verification in console
    if (typeof window !== 'undefined') {
      (window as any).openCookiePreferences = () => setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, 'granted');
    } catch {}
    setShowBanner(false);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
      });
    }
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, 'denied');
    } catch {}
    setShowBanner(false);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
      });
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <div className={styles.bannerOverlay}>
          <motion.aside
            role="region"
            aria-label="Enterprise Cookie and Privacy Notice"
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={styles.bannerCard}
          >
            <div className={styles.contentGroup}>
              <div className={styles.iconBadge} aria-hidden="true">
                <ShieldCheck size={22} strokeWidth={2.2} />
              </div>
              <div className={styles.textContent}>
                <p className={styles.title}>We value your privacy</p>
                <p className={styles.description}>
                  We use cookies to enhance your browsing experience, analyze site traffic, and deliver personalized content. 
                  Learn more in our{' '}
                  <Link href="/cookies" className={styles.link}>
                    Cookie Policy
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className={styles.link}>
                    Privacy Policy
                  </Link>.
                </p>
              </div>
            </div>

            <div className={styles.actionsGroup}>
              <button 
                onClick={handleDecline}
                className={styles.declineBtn}
                type="button"
                aria-label="Decline optional cookies"
              >
                Decline
              </button>
              <button 
                onClick={handleAccept}
                className={styles.acceptBtn}
                type="button"
                aria-label="Accept all cookies"
              >
                Accept All
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
