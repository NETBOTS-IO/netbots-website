'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export interface UTMData {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  timestamp?: string;
}

export function getStoredUTM(): UTMData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('utm_data');
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

export function UTMTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const source = searchParams?.get('utm_source');
    const medium = searchParams?.get('utm_medium');
    const campaign = searchParams?.get('utm_campaign');
    const term = searchParams?.get('utm_term');
    const content = searchParams?.get('utm_content');

    if (source || medium || campaign || term || content) {
      const utmData: UTMData = {
        source: source || '',
        medium: medium || '',
        campaign: campaign || '',
        term: term || '',
        content: content || '',
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
