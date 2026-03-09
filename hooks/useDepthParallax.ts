'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DepthParallaxOptions {
  depth?: number; // 0.2 (background), 0.5 (surface), 0.8 (foreground)
  duration?: number;
}

/**
 * Depth-based parallax hook
 * Different layers move at different speeds based on scroll position
 * Creates cinematic depth effect
 */
export function useDepthParallax(ref: React.RefObject<HTMLElement | null>, options: DepthParallaxOptions = {}) {
  const { depth = 0.5, duration = 0.1 } = options;
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Check if reduced motion is preferred
    if (window.matchMedia('(prefers-reduce-motion: reduce)').matches) {
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const parallaxOffset = scrollY * (1 - depth);

      if (tweenRef.current) {
        tweenRef.current.kill();
      }

      tweenRef.current = gsap.to(ref.current, {
        y: parallaxOffset,
        duration,
        overwrite: 'auto',
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, [ref, depth, duration]);
}
