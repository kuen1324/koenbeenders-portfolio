'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

interface TiltOptions {
  maxRotateX?: number;
  maxRotateY?: number;
  maxShiftX?: number;
  maxShiftY?: number;
  duration?: number;
}

/**
 * 3D cursor tilt hook for interactive panels
 * Calculates tilt based on cursor position relative to element bounds
 * Uses GSAP for smooth interpolation
 */
export function use3DCursorTilt(ref: React.RefObject<HTMLElement | HTMLDivElement | null>, options: TiltOptions = {}) {
  const {
    maxRotateX = 6,
    maxRotateY = 6,
    maxShiftX = 10,
    maxShiftY = 10,
    duration = 0.4,
  } = options;

  const tiltQuickToRef = useRef<any>(null);
  const shiftQuickToRef = useRef<any>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;

    // Check if reduced motion is preferred
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate normalized position (-1 to 1)
    const xPercent = (e.clientX - centerX) / (rect.width / 2);
    const yPercent = (e.clientY - centerY) / (rect.height / 2);

    // Clamp values
    const clampedX = Math.max(-1, Math.min(1, xPercent));
    const clampedY = Math.max(-1, Math.min(1, yPercent));

    // Calculate rotations
    const rotateY = clampedX * maxRotateY;
    const rotateX = clampedY * -maxRotateX; // Invert Y for natural feel

    // Calculate inner media shift (opposite direction)
    const shiftX = clampedX * -maxShiftX;
    const shiftY = clampedY * -maxShiftY;

    // Apply tilt to main container
    if (tiltQuickToRef.current && ref.current) {
      tiltQuickToRef.current(rotateX, rotateY);
    }

    // Apply shift to inner image if it exists
    if (shiftQuickToRef.current) {
      shiftQuickToRef.current(shiftX, shiftY);
    }
  }, [ref, maxRotateX, maxRotateY, maxShiftX, maxShiftY]);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;

    // Reset tilt
    if (tiltQuickToRef.current) {
      tiltQuickToRef.current(0, 0);
    }

    // Reset shift
    if (shiftQuickToRef.current) {
      shiftQuickToRef.current(0, 0);
    }
  }, [ref]);

  useEffect(() => {
    if (!ref.current) return;

    // Create quickTo functions for smooth interpolation
    // rotateX and rotateY
    tiltQuickToRef.current = gsap.quickTo(ref.current, 'rotateX', { duration, ease: 'power2.out' });
    const tiltYQuicKTo = gsap.quickTo(ref.current, 'rotateY', { duration, ease: 'power2.out' });

    // Override the tilt function to handle both at once
    const origTilt = tiltQuickToRef.current;
    tiltQuickToRef.current = (rotX: number, rotY: number) => {
      origTilt(rotX);
      tiltYQuicKTo(rotY);
    };

    // Look for inner image element
    const innerImage = ref.current.querySelector('img, [data-tilt-target]') as HTMLElement;
    if (innerImage) {
      const xQuickTo = gsap.quickTo(innerImage, 'x', { duration, ease: 'power2.out' });
      const yQuickTo = gsap.quickTo(innerImage, 'y', { duration, ease: 'power2.out' });
      shiftQuickToRef.current = (shiftX: number, shiftY: number) => {
        xQuickTo(shiftX);
        yQuickTo(shiftY);
      };
    }

    ref.current.addEventListener('mousemove', handleMouseMove as EventListener);
    ref.current.addEventListener('mouseleave', handleMouseLeave as EventListener);

    return () => {
      ref.current?.removeEventListener('mousemove', handleMouseMove as EventListener);
      ref.current?.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      // Kill all GSAP animations on this element
      if (ref.current) {
        gsap.killTweensOf(ref.current);
        const innerImage = ref.current.querySelector('img, [data-tilt-target]');
        if (innerImage) gsap.killTweensOf(innerImage);
      }
    };
  }, [handleMouseMove, handleMouseLeave, duration]);
}
