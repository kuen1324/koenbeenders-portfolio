'use client';

import { useEffect, useRef } from 'react';

/**
 * Scroll-linked glow effect hook
 * Text gets subtle glow effect as user scrolls
 * Creates premium visual refinement on headings
 */
export function useScrollLinkedGlow(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!ref.current) return;

    // Check if reduced motion is preferred
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.abs(elementCenter - viewportCenter);
      const maxDistance = window.innerHeight / 2;

      // Calculate glow intensity (stronger when centered in viewport)
      const intensity = Math.max(0, 1 - distance / maxDistance);
      const glowAmount = intensity * 8;

      // Apply text shadow glow
      ref.current.style.textShadow = `
        0 0 ${glowAmount}px rgba(27, 95, 214, ${intensity * 0.3}),
        0 0 ${glowAmount * 2}px rgba(27, 95, 214, ${intensity * 0.15})
      `;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);
}
