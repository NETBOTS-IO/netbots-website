import React from 'react';
import Image from 'next/image';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { YouTubeEmbed } from './YouTubeEmbed';
import { urlForImage } from '@/lib/sanity/image';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const portableTextComponents: PortableTextComponents = {
  types: {
    youtube: ({ value }) => {
      return (
        <YouTubeEmbed
          url={value?.url}
          title={value?.title}
          caption={value?.caption}
        />
      );
    },
    image: ({ value }) => {
      const imgUrl = value?.url || urlForImage(value);
      if (!imgUrl) return null;

      return (
        <figure style={{ margin: '2.5rem 0', width: '100%' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <Image
              src={typeof imgUrl === 'string' ? imgUrl : imgUrl.url()}
              alt={value?.alt || 'NetBots Architecture Article Illustration'}
              width={1000}
              height={560}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
          {value?.caption && (
            <figcaption
              style={{
                marginTop: '0.75rem',
                textAlign: 'center',
                fontSize: '0.85rem',
                color: '#64748b',
                fontStyle: 'italic',
              }}
            >
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => {
      const text = String(children || '');
      const id = slugify(text);
      return (
        <h2
          id={id}
          style={{
            fontSize: 'clamp(1.5rem, 2.8vw, 1.95rem)',
            fontWeight: 800,
            color: '#0f172a',
            letterSpacing: '-0.025em',
            margin: '2.5rem 0 1rem 0',
            lineHeight: 1.25,
            scrollMarginTop: '100px',
          }}
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const text = String(children || '');
      const id = slugify(text);
      return (
        <h3
          id={id}
          style={{
            fontSize: 'clamp(1.25rem, 2.2vw, 1.5rem)',
            fontWeight: 800,
            color: '#0f172a',
            letterSpacing: '-0.02em',
            margin: '2rem 0 0.75rem 0',
            lineHeight: 1.3,
            scrollMarginTop: '100px',
          }}
        >
          {children}
        </h3>
      );
    },
    h4: ({ children }) => (
      <h4
        style={{
          fontSize: '1.15rem',
          fontWeight: 700,
          color: '#0f172a',
          margin: '1.75rem 0 0.5rem 0',
        }}
      >
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p
        style={{
          fontSize: '1.08rem',
          color: '#334155',
          lineHeight: 1.8,
          marginBottom: '1.5rem',
        }}
      >
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          margin: '2rem 0',
          padding: '1.25rem 1.5rem',
          background: 'rgba(0, 82, 255, 0.04)',
          borderLeft: '4px solid #0052ff',
          borderRadius: '0 12px 12px 0',
          fontSize: '1.12rem',
          fontStyle: 'italic',
          color: '#0f172a',
          lineHeight: 1.7,
        }}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul
        style={{
          margin: '0 0 1.75rem 1.5rem',
          paddingLeft: '1rem',
          color: '#334155',
          fontSize: '1.05rem',
          lineHeight: 1.75,
        }}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        style={{
          margin: '0 0 1.75rem 1.5rem',
          paddingLeft: '1rem',
          color: '#334155',
          fontSize: '1.05rem',
          lineHeight: 1.75,
        }}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li style={{ marginBottom: '0.5rem' }}>{children}</li>
    ),
    number: ({ children }) => (
      <li style={{ marginBottom: '0.5rem' }}>{children}</li>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const isExternal = (value?.href || '').startsWith('http');
      return (
        <a
          href={value?.href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          style={{
            color: '#0052ff',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            fontWeight: 600,
          }}
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => (
      <code
        style={{
          background: '#f1f5f9',
          color: '#0f172a',
          padding: '0.2rem 0.45rem',
          borderRadius: '6px',
          fontSize: '0.9em',
          fontFamily: 'var(--font-space-mono), monospace',
        }}
      >
        {children}
      </code>
    ),
  },
};

interface PortableTextRendererProps {
  value: any;
}

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value) return null;
  return <PortableText value={value} components={portableTextComponents} />;
}
