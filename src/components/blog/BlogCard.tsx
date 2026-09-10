import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight, Calendar } from 'lucide-react';
import { BlogPost } from '@/lib/sanity/types';
import { urlForImage } from '@/lib/sanity/image';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const slug = typeof post.slug === 'string' ? post.slug : post.slug?.current;
  const href = `/blog/${slug}`;

  const imageSrc =
    post.mainImageUrl ||
    (post.mainImage ? urlForImage(post.mainImage) : null) ||
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80';

  const authorAvatar =
    post.author?.avatarUrl ||
    (post.author?.image ? urlForImage(post.author.image) : null) ||
    (post.author?.avatar ? urlForImage(post.author.avatar) : null) ||
    '/images/profileImage-ceo.avif';

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
      }}
      className="group"
    >
      {/* Cover Image Container */}
      <Link href={href} style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', overflow: 'hidden', display: 'block' }}>
        <Image
          src={imageSrc}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
          className="group-hover:scale-105"
        />
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            background: 'rgba(9, 16, 29, 0.75)',
            backdropFilter: 'blur(6px)',
            color: '#ffffff',
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '0.35rem 0.85rem',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          {post.category}
        </div>
      </Link>

      {/* Content */}
      <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Meta row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.78rem',
            color: '#64748b',
            marginBottom: '0.85rem',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <Calendar size={13} /> {formattedDate}
          </span>
          {post.estimatedReadTime && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={13} /> {post.estimatedReadTime}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: featured ? '1.5rem' : '1.25rem',
            fontWeight: 800,
            lineHeight: 1.35,
            color: '#0f172a',
            marginBottom: '0.75rem',
            letterSpacing: '-0.02em',
          }}
        >
          <Link
            href={href}
            style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
            className="hover:text-[#0052ff]"
          >
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p
          style={{
            fontSize: '0.92rem',
            color: '#475569',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
            flexGrow: 1,
          }}
        >
          {post.excerpt}
        </p>

        {/* Footer author & CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'relative',
                flexShrink: 0,
                border: '1.5px solid #0052ff',
              }}
            >
              <Image src={authorAvatar} alt={post.author?.name || 'Author'} fill sizes="32px" style={{ objectFit: 'cover' }} />
            </div>
            <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0f172a' }}>
              {post.author?.name || 'NetBots Team'}
            </span>
          </div>

          <Link
            href={href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.84rem',
              fontWeight: 800,
              color: '#0052ff',
              textDecoration: 'none',
            }}
          >
            Read <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
