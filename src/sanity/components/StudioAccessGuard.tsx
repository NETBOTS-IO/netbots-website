'use client';

import React from 'react';
import type { LayoutProps } from 'sanity';
import { useCurrentUser } from 'sanity';

/**
 * Allowed emails and domains for Sanity Studio access.
 * - Specific emails are checked exactly.
 * - Allowed domains grant access to any email on that domain (e.g. *@netbots.io).
 * Primary security is managed at the Sanity project level (sanity.io/manage).
 * This is an additional UI-level guard.
 */
const ALLOWED_EMAILS = ['ceo.netbots@gmail.com'];
const ALLOWED_DOMAINS = ['netbots.io'];

function isEmailAllowed(email: string | undefined): boolean {
  if (!email) return false;
  const lower = email.toLowerCase();
  if (ALLOWED_EMAILS.includes(lower)) return true;
  const domain = lower.split('@')[1];
  return domain ? ALLOWED_DOMAINS.includes(domain) : false;
}

export function StudioAccessGuard(props: LayoutProps) {
  const currentUser = useCurrentUser();

  // Still loading or not logged in — let Studio handle the login flow
  if (!currentUser) {
    return props.renderDefault(props);
  }

  // Check if user's email is allowed
  if (!isEmailAllowed(currentUser.email)) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: '#101112',
          color: '#ffffff',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          padding: '2rem',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            maxWidth: '420px',
            padding: '2.5rem',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(239,68,68,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              fontSize: '1.5rem',
            }}
          >
            🚫
          </div>
          <h1
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              marginBottom: '0.75rem',
              color: '#ffffff',
            }}
          >
            Access Restricted
          </h1>
          <p
            style={{
              fontSize: '0.9rem',
              color: '#94a3b8',
              lineHeight: 1.6,
              marginBottom: '1rem',
            }}
          >
            This Studio is restricted to authorized NetBots team members only.
          </p>
          <p
            style={{
              fontSize: '0.8rem',
              color: '#64748b',
              padding: '0.75rem',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            Signed in as: <strong style={{ color: '#ef4444' }}>{currentUser.email || 'Unknown'}</strong>
          </p>
          <p
            style={{
              fontSize: '0.75rem',
              color: '#475569',
              marginTop: '1.25rem',
            }}
          >
            Contact <strong>ceo.netbots@gmail.com</strong> for access requests.
          </p>
        </div>
      </div>
    );
  }

  // Authorized — render the Studio normally
  return props.renderDefault(props);
}
