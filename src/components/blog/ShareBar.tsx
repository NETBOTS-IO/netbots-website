'use client';

import React, { useState } from 'react';
import { Share2, Check, Link2 } from 'lucide-react';

interface ShareBarProps {
  title: string;
  url: string;
}

export function ShareBar({ title, url }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        flexWrap: 'wrap',
      }}
    >
      <span
        style={{
          fontSize: '0.78rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#64748b',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          marginRight: '0.25rem',
        }}
      >
        <Share2 size={14} /> Share
      </span>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        style={{
          background: '#f1f5f9',
          color: '#0a66c2',
          padding: '0.4rem 0.75rem',
          borderRadius: '8px',
          fontSize: '0.8rem',
          fontWeight: 700,
          textDecoration: 'none',
          transition: 'background 0.2s',
        }}
      >
        LinkedIn
      </a>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        style={{
          background: '#f1f5f9',
          color: '#0f172a',
          padding: '0.4rem 0.75rem',
          borderRadius: '8px',
          fontSize: '0.8rem',
          fontWeight: 700,
          textDecoration: 'none',
          transition: 'background 0.2s',
        }}
      >
        X (Twitter)
      </a>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        style={{
          background: '#f0fdf4',
          color: '#16a34a',
          border: '1px solid #bbf7d0',
          padding: '0.4rem 0.75rem',
          borderRadius: '8px',
          fontSize: '0.8rem',
          fontWeight: 700,
          textDecoration: 'none',
          transition: 'background 0.2s',
        }}
      >
        WhatsApp
      </a>

      {/* Copy Link Button */}
      <button
        type="button"
        onClick={handleCopy}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          background: copied ? '#ecfdf5' : '#f8fafc',
          color: copied ? '#10b981' : '#334155',
          border: copied ? '1px solid #a7f3d0' : '1px solid #e2e8f0',
          padding: '0.4rem 0.75rem',
          borderRadius: '8px',
          fontSize: '0.8rem',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        {copied ? <Check size={14} /> : <Link2 size={14} />}
        <span>{copied ? 'Copied!' : 'Copy Link'}</span>
      </button>
    </div>
  );
}
