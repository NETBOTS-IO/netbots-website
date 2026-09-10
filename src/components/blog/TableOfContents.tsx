'use client';

import React, { useEffect, useState } from 'react';
import { List, ChevronRight } from 'lucide-react';
import { slugify } from './PortableTextRenderer';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(body: any[]): Heading[] {
  if (!Array.isArray(body)) return [];
  const headings: Heading[] = [];

  body.forEach((block) => {
    if (block._type === 'block' && ['h2', 'h3'].includes(block.style)) {
      const text = block.children?.map((c: any) => c.text).join('') || '';
      if (text.trim()) {
        headings.push({
          id: slugify(text),
          text,
          level: block.style === 'h2' ? 2 : 3,
        });
      }
    }
  });

  return headings;
}

export function TableOfContents({ body }: { body: any[] }) {
  const headings = extractHeadings(body);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      style={{
        background: '#f8fafc',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.85rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#0f172a',
          marginBottom: '1rem',
        }}
      >
        <List size={16} color="#0052ff" /> Table of Contents
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li
              key={heading.id}
              style={{
                paddingLeft: heading.level === 3 ? '1rem' : '0',
              }}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(heading.id);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    setActiveId(heading.id);
                  }
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: heading.level === 3 ? '0.84rem' : '0.88rem',
                  color: isActive ? '#0052ff' : '#475569',
                  fontWeight: isActive ? 700 : 500,
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                  lineHeight: 1.4,
                }}
              >
                {isActive && <ChevronRight size={13} color="#0052ff" />}
                <span>{heading.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
