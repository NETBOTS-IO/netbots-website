'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function UTMTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const source = searchParams?.get('utm_source');
    const medium = searchParams?.get('utm_medium');
    const campaign = searchParams?.get('utm_campaign');

    if (source || medium || campaign) {
      const utmData = {
        source: source || '',
        medium: medium || '',
        campaign: campaign || '',
        timestamp: new Date().toISOString()
      };
      
      // Persist in localStorage for cross-session tracking
      localStorage.setItem('utm_data', JSON.stringify(utmData));
      
      // Also persist in a first-party cookie for SSR/Middleware access
      document.cookie = `utm_data=${encodeURIComponent(JSON.stringify(utmData))}; path=/; max-age=2592000; SameSite=Lax`;
    }
  }, [searchParams]);

  return null;
}
