'use client';

import { useEffect, useRef } from 'react';

interface ScrollLinkedBackgroundOptions {
  speed?: number; // How fast the gradient moves (0-1)
  colorStart?: string;
  colorEnd?: string;
}

/**
 * Scroll-linked background gradient hook
 * Background gradient shifts based on scroll position
 * Creates layered depth and visual interest
 */
export function useScrollLinkedBackground(
  ref: React.RefObject<HTMLElement | null>,
  options: ScrollLinkedBackgroundOptions = {}
) {
  const { speed = 0.3, colorStart = 'rgba(100, 120, 140, 0.02)', colorEnd = 'rgba(60, 80, 100, 0.05)' } = options;

  useEffect(() => {
    if (!ref.current) return;

    // Check if reduced motion is preferred
    if (window.matchMedia('(prefers-reduce-motion: reduce)').matches) {
      return;
    }

    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = elementCenter - viewportCenter;

      // Calculate gradient position based on scroll
      const yPercent = Math.max(0, Math.min(100, 50 + (distance / window.innerHeight) * speed * 50));

      // Apply background gradient
      ref.current.style.backgroundImage = `
        radial-gradient(
          ellipse at 50% ${yPercent}%,
          ${colorStart} 0%,
          ${colorEnd} 100%
        )
      `;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, speed, colorStart, colorEnd]);
}
