'use client';
import React, { ReactNode } from 'react';

interface AuroraBackgroundProps {
  children: ReactNode;
  className?: string;
}

export default function AuroraBackground({ children, className }: AuroraBackgroundProps) {
  return (
    <div className={`aurora-wrap${className ? ` ${className}` : ''}`}>
      {/* Orb A — large warm champagne, near-plane */}
      <div className="aurora-layer aurora-layer--a" aria-hidden="true" />
      {/* Orb B — mid linen-blue, mid-plane */}
      <div className="aurora-layer aurora-layer--b" aria-hidden="true" />
      {/* Orb C — small silver-haze, far-plane */}
      <div className="aurora-layer aurora-layer--c" aria-hidden="true" />
      {/* Grain texture — SVG feTurbulence noise for organic tactile richness */}
      <svg
        className="aurora-grain"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
      {children}
    </div>
  );
}
