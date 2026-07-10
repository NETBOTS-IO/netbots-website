import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export function FourPointStar({ className, size = 100 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="star-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2F7BFF" />
          <stop offset="60%" stopColor="#0052FF" />
          <stop offset="100%" stopColor="#0035A8" stopOpacity="0.8" />
        </radialGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <path
        d="M 50 0 C 50 35 65 50 100 50 C 65 50 50 65 50 100 C 50 65 35 50 0 50 C 35 50 50 35 50 0 Z"
        fill="url(#star-grad)"
        filter="url(#glow)"
      />
    </svg>
  );
}

export function TorusRing({ className, size = 100 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8AB4FF" />
          <stop offset="50%" stopColor="#0052FF" />
          <stop offset="100%" stopColor="#002D8C" />
        </linearGradient>
        <filter id="ring-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="32"
        stroke="url(#ring-grad)"
        strokeWidth="15"
        fill="none"
        filter="url(#ring-glow)"
      />
    </svg>
  );
}

export function FourCircleCluster({ className, size = 100 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="blob-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2F7BFF" stopOpacity="1" />
          <stop offset="70%" stopColor="#0052FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0052FF" stopOpacity="0" />
        </radialGradient>
        <filter id="cluster-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <g filter="url(#cluster-glow)">
        <circle cx="36" cy="36" r="18" fill="url(#blob-grad)" />
        <circle cx="64" cy="36" r="18" fill="url(#blob-grad)" />
        <circle cx="36" cy="64" r="18" fill="url(#blob-grad)" />
        <circle cx="64" cy="64" r="18" fill="url(#blob-grad)" />
      </g>
    </svg>
  );
}

export function CylinderPill({ className, size = 100 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="pill-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#AEC9FF" />
          <stop offset="40%" stopColor="#0052FF" />
          <stop offset="100%" stopColor="#002266" />
        </linearGradient>
        <filter id="pill-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <g transform="rotate(-30 50 50)" filter="url(#pill-glow)">
        {/* We can draw a nice pill or dynamic overlapping wave shape */}
        <path
          d="M 30 20 C 30 10, 45 10, 45 20 L 45 80 C 45 90, 30 90, 30 80 Z"
          fill="url(#pill-grad)"
          opacity="0.9"
        />
        <path
          d="M 55 20 C 55 10, 70 10, 70 20 L 70 80 C 70 90, 55 90, 55 80 Z"
          fill="url(#pill-grad)"
          opacity="0.95"
        />
      </g>
    </svg>
  );
}

export function GeometricIcon({ type, className, size }: { type: 'star' | 'ring' | 'cluster' | 'cylinder'; className?: string; size?: number }) {
  switch (type) {
    case 'star':
      return <FourPointStar className={className} size={size} />;
    case 'ring':
      return <TorusRing className={className} size={size} />;
    case 'cluster':
      return <FourCircleCluster className={className} size={size} />;
    case 'cylinder':
      return <CylinderPill className={className} size={size} />;
    default:
      return null;
  }
}
