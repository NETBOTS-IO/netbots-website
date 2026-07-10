'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'granted');
    setShowBanner(false);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'denied');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t shadow-lg border-border"
        >
          <div className="container flex flex-col items-center justify-between gap-4 mx-auto md:flex-row max-w-7xl">
            <div className="flex-1 text-sm text-muted-foreground">
              We use cookies and telemetry (GA4, Microsoft Clarity) to optimize our ecosystem and analyze performance. 
              By accepting, you consent to our use of these technologies in accordance with our Privacy Policy.
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={handleDecline}
                className="px-4 py-2 text-sm transition-colors border rounded-md border-border hover:bg-muted"
              >
                Decline
              </button>
              <button 
                onClick={handleAccept}
                className="px-4 py-2 text-sm text-white transition-colors rounded-md bg-primary hover:bg-primary/90"
              >
                Accept & Proceed
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
