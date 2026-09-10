'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, Calendar, Clock } from 'lucide-react';
import { BlogPost } from '@/lib/sanity/types';
import { BlogCard } from './BlogCard';
import { urlForImage } from '@/lib/sanity/image';
import styles from '@/app/blog/page.module.css';

const categories = [
  'All Articles',
  'Web Architecture',
  'AI & Automation',
  'Tech Entrepreneurship',
];

export function BlogListClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All Articles');

  const featuredPost = initialPosts.find((p) => p.featured) || initialPosts[0];
  const otherPosts = initialPosts.filter((p) => p._id !== featuredPost?._id);

  const filteredPosts =
    selectedCategory === 'All Articles'
      ? otherPosts
      : otherPosts.filter((p) => p.category === selectedCategory);

  const featuredSlug =
    typeof featuredPost?.slug === 'string'
      ? featuredPost.slug
      : featuredPost?.slug?.current;

  const featuredImg =
    featuredPost?.mainImageUrl ||
    (featuredPost?.mainImage ? urlForImage(featuredPost.mainImage) : null) ||
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';

  const authorAvatar =
    featuredPost?.author?.avatarUrl ||
    (featuredPost?.author?.image ? urlForImage(featuredPost.author.image) : null) ||
    (featuredPost?.author?.avatar ? urlForImage(featuredPost.author.avatar) : null) ||
    '/images/profileImage-ceo.avif';

  return (
    <>
      {/* Featured Article Spotlight */}
      {featuredPost && (
        <section className={styles.featuredContainer}>
          <div className={styles.featuredCard}>
            <div className={styles.featuredImageWrapper}>
              <Image
                src={featuredImg}
                alt={featuredPost.title}
                fill
                priority
                sizes="(max-width: 1080px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.featuredContent}>
              <div className={styles.featuredBadge}>
                <Sparkles size={12} /> Featured Insight • {featuredPost.category}
              </div>
              <h2 className={styles.featuredTitle}>
                <Link
                  href={`/blog/${featuredSlug}`}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {featuredPost.title}
                </Link>
              </h2>
              <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
              <div className={styles.featuredFooter}>
                <div className={styles.featuredAuthor}>
                  <div className={styles.authorAvatar}>
                    <Image
                      src={authorAvatar}
                      alt={featuredPost.author?.name || 'Author'}
                      fill
                      sizes="40px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className={styles.authorMeta}>
                    <span className={styles.authorName}>
                      {featuredPost.author?.name || 'NetBots Team'}
                    </span>
                    <span className={styles.publishDate}>
                      {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                      {featuredPost.estimatedReadTime && ` • ${featuredPost.estimatedReadTime}`}
                    </span>
                  </div>
                </div>

                <Link href={`/blog/${featuredSlug}`} className={styles.readBtn}>
                  Read Article <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter Pills */}
      <div className={styles.filterBar}>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`${styles.categoryPill} ${selectedCategory === cat ? styles.categoryPillActive : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <section className={styles.articlesSection}>
        <div className={styles.articlesGrid}>
          {filteredPosts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
