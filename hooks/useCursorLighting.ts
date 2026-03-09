'use client';

import { useEffect, useRef } from 'react';

/**
 * Cursor-driven lighting simulation hook
 * Creates radial gradient lighting that follows cursor position
 * Adds perceived depth and premium visual refinement
 */
export function useCursorLighting(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!ref.current) return;

    // Check if reduced motion is preferred
    if (window.matchMedia('(prefers-reduce-motion: reduce)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate percentage position (0-100%)
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      // Apply CSS custom properties for lighting gradient
      ref.current.style.setProperty('--cursor-x', `${xPercent}%`);
      ref.current.style.setProperty('--cursor-y', `${yPercent}%`);

      // Show lighting overlay
      const overlay = ref.current.querySelector('.lighting-overlay') as HTMLElement;
      if (overlay) {
        overlay.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      if (!ref.current) return;

      // Hide lighting overlay
      const overlay = ref.current.querySelector('.lighting-overlay') as HTMLElement;
      if (overlay) {
        overlay.style.opacity = '0';
      }
    };

    ref.current.addEventListener('mousemove', handleMouseMove);
    ref.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ref.current?.removeEventListener('mousemove', handleMouseMove);
      ref.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);
}
