'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Enhanced button interaction hook
 * Adds premium tactile feedback to buttons
 * Combines scale, shadow, and position transforms
 */
export function useButtonEnhance(ref: React.RefObject<HTMLButtonElement | HTMLAnchorElement | null>) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Check if reduced motion is preferred
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const el = ref.current;

    const handleMouseEnter = () => {
      gsap.to(el, {
        scale: 1.04,
        duration: 0.2,
        ease: 'back.out(1.2)',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.2)',
        overwrite: 'auto',
      });
    };

    const handleMouseDown = () => {
      gsap.to(el, {
        scale: 0.98,
        duration: 0.1,
        overwrite: 'auto',
      });
    };

    const handleMouseUp = () => {
      gsap.to(el, {
        scale: 1.04,
        duration: 0.15,
        ease: 'back.out(1.2)',
        overwrite: 'auto',
      });
    };

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseup', handleMouseUp);

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mouseup', handleMouseUp);
    };
  }, [ref]);
}
