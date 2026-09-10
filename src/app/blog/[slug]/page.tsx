import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Calendar, ArrowLeft, ArrowRight, Sparkles, ExternalLink, CheckCircle2, BarChart3, ShieldCheck, BookOpen } from 'lucide-react';
import { getPostBySlug, getPostSlugs, getRelatedPosts } from '@/lib/sanity/client';
import { urlForImage } from '@/lib/sanity/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PortableTextRenderer } from '@/components/blog/PortableTextRenderer';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ShareBar } from '@/components/blog/ShareBar';
import { BlogCard } from '@/components/blog/BlogCard';
import styles from './page.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // ISR revalidate every 60s

export async function generateStaticParams() {
  const entries = await getPostSlugs();
  return entries.map((entry) => ({ slug: entry.slug }));
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | NetBots Engineering',
      description: 'The requested engineering article or case study could not be located.',
    };
  }

  const title = post.seo?.metaTitle || `${post.title} | NetBots Engineering Blog`;
  const description = post.seo?.metaDescription || post.excerpt;
  const canonicalUrl = `https://netbots.io/blog/${slug}`;

  const featuredImg =
    (post.mainImage ? urlForImage(post.mainImage) : null) ||
    post.mainImageUrl ||
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
  const imageUrl = featuredImg || '';

  return {
    title,
    description,
    keywords: post.seo?.keywords || post.tags,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'NetBots',
      type: 'article',
      publishedTime: post.publishedAt,
      // modifiedTime: signals content freshness to Google — uses _updatedAt from Sanity
      modifiedTime: (post as any)._updatedAt || post.publishedAt,
      authors: [post.author?.name || 'Saqlain Shah'],
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.category, slug);
  const currentUrl = `https://netbots.io/blog/${slug}`;

  const featuredImg =
    (post.mainImage ? urlForImage(post.mainImage) : null) ||
    post.mainImageUrl ||
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
  const imageUrl = featuredImg || '';

  const authorAvatar =
    post.author?.avatarUrl ||
    (post.author?.avatar ? urlForImage(post.author.avatar) : null) ||
    (post.author?.image ? urlForImage(post.author.image) : null) ||
    '/images/profileImage-ceo.avif';
  const authorAvatarUrl = authorAvatar || '/images/profileImage-ceo.avif';

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Extract YouTube block for Google Video Schema
  const youtubeBlock = Array.isArray(post.body)
    ? post.body.find((b: any) => b._type === 'youtube' && b.url)
    : null;

  let youtubeVideoId = '';
  if (youtubeBlock?.url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = youtubeBlock.url.match(regExp);
    if (match && match[2].length === 11) {
      youtubeVideoId = match[2];
    }
  }

  // Structured Data (JSON-LD): Article / BlogPosting
  const jsonLdArticle: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: imageUrl ? [imageUrl] : [],
    datePublished: post.publishedAt,
    dateModified: (post as any)._updatedAt || post.lastReviewedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Saqlain Shah',
      jobTitle: post.author?.role || 'Founder & CEO',
      url: post.author?.linkedIn || 'https://netbots.io',
    },
    publisher: {
      '@type': 'Organization',
      name: 'NetBots',
      url: 'https://netbots.io',
      logo: {
        '@type': 'ImageObject',
        url: 'https://netbots.io/images/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': currentUrl,
    },
    keywords: post.seo?.keywords?.join(', ') || post.tags?.join(', '),
    // E-E-A-T: Expertise — inject reviewedBy into schema.org
    ...(post.reviewedBy?.name && {
      reviewedBy: {
        '@type': 'Person',
        name: post.reviewedBy.name,
        jobTitle: post.reviewedBy.role || '',
        description: post.reviewedBy.credentials || '',
        url: post.reviewedBy.linkedIn || '',
      },
    }),
    // E-E-A-T: Authoritativeness — inject citations into schema.org
    ...(post.citations && post.citations.length > 0 && {
      citation: post.citations.map((c) => ({
        '@type': 'CreativeWork',
        name: c.title,
        url: c.url,
        publisher: c.publisher ? { '@type': 'Organization', name: c.publisher } : undefined,
        datePublished: c.year || undefined,
      })),
    }),
  };

  const jsonLdBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://netbots.io',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://netbots.io/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: currentUrl,
      },
    ],
  };

  // E-E-A-T: Trustworthiness — FAQPage schema for Google rich snippets
  const jsonLdFaq =
    post.faqs && post.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  const jsonLdVideo =
    youtubeBlock && youtubeVideoId
      ? {
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name: youtubeBlock.title || post.title,
          description: youtubeBlock.caption || post.excerpt,
          thumbnailUrl: [
            `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`,
            imageUrl,
          ],
          uploadDate: post.publishedAt,
          embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeVideoId}`,
        }
      : null;

  return (
    <div className={styles.pageWrapper}>
      {/* Inject Google SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />
      {jsonLdFaq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      )}
      {jsonLdVideo && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdVideo) }}
        />
      )}

      <Header />

      <main className={styles.main}>
        {/* Ambient Top Glow */}
        <div className={styles.ambientGlowTop} />

        {/* Header Content */}
        <article className={styles.articleHeader}>
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <span>/</span>
            <Link href="/blog" className={styles.breadcrumbLink}>Blog</Link>
            <span>/</span>
            <span style={{ color: '#0052ff', fontWeight: 600 }}>{post.category}</span>
          </nav>

          {/* Category Badge */}
          <span className={styles.categoryBadge}>{post.category}</span>

          {/* Title */}
          <h1 className={styles.articleTitle}>{post.title}</h1>

          {/* Excerpt */}
          <p className={styles.articleExcerpt}>{post.excerpt}</p>

          {/* Meta Information Bar */}
          <div className={styles.metaRow}>
            <div className={styles.authorMeta}>
              <div className={styles.authorAvatar}>
                <Image
                  src={authorAvatarUrl}
                  alt={post.author?.name || 'Author'}
                  fill
                  sizes="46px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{post.author?.name || 'Saqlain Shah'}</span>
                <span className={styles.publishMeta}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={13} /> {formattedDate}
                  </span>
                  <span>•</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={13} /> {post.estimatedReadTime || '5 min read'}
                  </span>
                </span>
                {/* E-E-A-T: Expertise — Reviewer Badge */}
                {post.reviewedBy?.name && (
                  <span className={styles.reviewerBadge}>
                    <ShieldCheck size={13} />
                    Fact-checked by {post.reviewedBy.name}
                    {post.reviewedBy.credentials && ` · ${post.reviewedBy.credentials}`}
                  </span>
                )}
              </div>
            </div>

            {/* Social Share Bar */}
            <ShareBar title={post.title} url={currentUrl} />
          </div>

          {/* E-E-A-T: Experience — Key Takeaways / TL;DR Box */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className={styles.keyTakeawaysBox}>
              <div className={styles.keyTakeawaysTitle}>
                <CheckCircle2 size={14} />
                Key Takeaways — TL;DR
              </div>
              <ul className={styles.keyTakeawaysList}>
                {post.keyTakeaways.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* E-E-A-T: Experience — Highlight Banner */}
          {post.experienceHighlight && (
            <div className={styles.experienceHighlightBanner}>
              <BarChart3 size={18} />
              <span>{post.experienceHighlight}</span>
            </div>
          )}
        </article>

        {/* Featured Image */}
        {imageUrl && (
          <div className={styles.heroImageContainer}>
            <div className={styles.heroImageWrapper}>
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1100px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        )}

        {/* Two-Column Reading Layout */}
        <section className={styles.contentLayout}>
          {/* Main Article Body */}
          <div className={styles.articleBody}>
            {/* PortableText Renderer supporting Rich Text, Headings with auto-IDs, YouTube, Images, Quotes */}
            <PortableTextRenderer value={post.body} />

            {/* E-E-A-T: Expertise — Technical Reviewer Box */}
            {post.reviewedBy?.name && (
              <div className={styles.reviewerBox}>
                {post.reviewedBy.avatarUrl && (
                  <div className={styles.reviewerAvatar}>
                    <Image
                      src={post.reviewedBy.avatarUrl}
                      alt={post.reviewedBy.name}
                      fill
                      sizes="52px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div className={styles.reviewerContent}>
                  <div className={styles.reviewerLabel}>Technically Reviewed By</div>
                  <h4 className={styles.reviewerName}>{post.reviewedBy.name}</h4>
                  {post.reviewedBy.role && (
                    <div className={styles.reviewerRole}>{post.reviewedBy.role}</div>
                  )}
                  {post.reviewedBy.credentials && (
                    <span className={styles.reviewerCredentials}>{post.reviewedBy.credentials}</span>
                  )}
                  {post.reviewedBy.bio && (
                    <p className={styles.reviewerBio}>{post.reviewedBy.bio}</p>
                  )}
                  {post.reviewedBy.linkedIn && (
                    <a
                      href={post.reviewedBy.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.reviewerBadge}
                      style={{ marginTop: '0.5rem' }}
                    >
                      <ExternalLink size={11} /> LinkedIn
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* E-E-A-T: Trustworthiness — FAQ Section */}
            {post.faqs && post.faqs.length > 0 && (
              <div className={styles.faqSection}>
                <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
                <div className={styles.faqList}>
                  {post.faqs.map((faq, i) => (
                    <div key={i} className={styles.faqItem}>
                      <div className={styles.faqQuestion}>
                        <span>{faq.question}</span>
                      </div>
                      <div className={styles.faqAnswer}>{faq.answer}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* E-E-A-T: Authoritativeness — Citations / References */}
            {post.citations && post.citations.length > 0 && (
              <div className={styles.citationsSection}>
                <div className={styles.citationsTitle}>
                  <BookOpen size={13} />
                  Authoritative Sources & References
                </div>
                <ul className={styles.citationsList}>
                  {post.citations.map((citation, i) => (
                    <li key={i} className={styles.citationItem}>
                      <a
                        href={citation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.citationLink}
                      >
                        {citation.title}
                      </a>
                      {(citation.publisher || citation.year) && (
                        <span className={styles.citationPublisher}>
                          — {[citation.publisher, citation.year].filter(Boolean).join(', ')}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.authorBox}>
              <div className={styles.authorBoxAvatar}>
                <Image
                  src={authorAvatarUrl}
                  alt={post.author?.name || 'Author'}
                  fill
                  sizes="64px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.authorBoxContent}>
                <span className={styles.authorBoxLabel}>Written by</span>
                <h3 className={styles.authorBoxName}>{post.author?.name || 'Saqlain Shah'}</h3>
                <span className={styles.authorBoxRole}>{post.author?.role || 'Founder & CEO, NetBots'}</span>
                <p className={styles.authorBoxBio}>
                  {post.author?.bio ||
                    'Founder and Systems Architect at NetBots, engineering enterprise platforms, sub-second web applications, and autonomous AI systems.'}
                </p>
                {post.author?.linkedIn && (
                  <div className={styles.authorSocials}>
                    <a
                      href={post.author.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                    >
                      Connect on LinkedIn <ExternalLink size={13} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className={styles.sidebar}>
            {/* Table of Contents */}
            <TableOfContents body={post.body} />

            {/* The Founder Lab Masterclass Promotion */}
            <div className={styles.sidebarCard}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0052ff', marginBottom: '0.5rem' }}>
                <Sparkles size={16} />
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Masterclass
                </span>
              </div>
              <h4 className={styles.sidebarCardTitle}>The Founder Lab: 21-Day Masterclass</h4>
              <p className={styles.sidebarCardText}>
                Accelerate from Developer to Agency Founder. Master fullstack systems, client acquisition, and high-ticket delivery with Saqlain Shah.
              </p>
              <Link href="/register/the-founder-lab-masterclass" className={styles.sidebarCtaBtn}>
                Explore Cohort &amp; Apply <ArrowRight size={14} />
              </Link>
            </div>

            {/* Enterprise Strategy Audit CTA */}
            <div className={styles.sidebarCard} style={{ background: '#09101d', color: '#ffffff', borderColor: '#1e293b' }}>
              <h4 className={styles.sidebarCardTitle} style={{ color: '#ffffff' }}>Build Enterprise Tech</h4>
              <p className={styles.sidebarCardText} style={{ color: '#94a3b8' }}>
                Need sub-second performance, high-throughput architectures, or autonomous AI agents for your business?
              </p>
              <Link
                href="/contact"
                className={styles.sidebarCtaBtn}
                style={{ background: '#0052ff', color: '#ffffff' }}
              >
                Schedule Technical Audit <ArrowRight size={14} />
              </Link>
            </div>

            {/* Back to all articles */}
            <Link
              href="/blog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.85rem',
                color: '#64748b',
                textDecoration: 'none',
                fontWeight: 600,
                marginTop: '0.5rem',
              }}
            >
              <ArrowLeft size={14} /> Back to all articles
            </Link>
          </aside>
        </section>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className={styles.relatedSection}>
            <div className={styles.relatedContainer}>
              <h2 className={styles.relatedTitle}>Related Engineering Insights</h2>
              <div className={styles.relatedGrid}>
                {relatedPosts.slice(0, 3).map((relatedPost) => {
                  const relSlug = typeof relatedPost.slug === 'string' ? relatedPost.slug : relatedPost.slug?.current;
                  return <BlogCard key={relatedPost._id || relSlug} post={relatedPost} />;
                })}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
