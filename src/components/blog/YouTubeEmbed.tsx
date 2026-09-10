import React from 'react';

export function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

interface YouTubeEmbedProps {
  url: string;
  title?: string;
  caption?: string;
}

export function YouTubeEmbed({ url, title, caption }: YouTubeEmbedProps) {
  const videoId = getYouTubeId(url);

  if (!videoId) {
    return (
      <div
        style={{
          padding: '1.5rem',
          background: '#f8fafc',
          border: '1px dashed #cbd5e1',
          borderRadius: '12px',
          color: '#64748b',
          textAlign: 'center',
          fontSize: '0.9rem',
          margin: '2rem 0',
        }}
      >
        Invalid YouTube URL: {url}
      </div>
    );
  }

  return (
    <figure
      style={{
        margin: '2.5rem 0',
        width: '100%',
      }}
    >
      <div
        style={{
          position: 'relative',
          paddingBottom: '56.25%', // 16:9 aspect ratio
          height: 0,
          overflow: 'hidden',
          borderRadius: '16px',
          backgroundColor: '#09101d',
          boxShadow: '0 12px 36px rgba(0, 82, 255, 0.08), 0 4px 12px rgba(0,0,0,0.06)',
          border: '1px solid rgba(0, 82, 255, 0.15)',
        }}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
          title={title || 'Embedded YouTube Video - NetBots Articles'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0,
          }}
        />
      </div>
      {caption && (
        <figcaption
          style={{
            marginTop: '0.75rem',
            textAlign: 'center',
            fontSize: '0.85rem',
            color: '#64748b',
            fontStyle: 'italic',
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
