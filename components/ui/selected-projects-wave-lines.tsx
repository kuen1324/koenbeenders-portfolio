'use client';

import { useEffect, useRef } from 'react';

/**
 * SelectedProjectsWaveLines
 *
 * Cinematic, premium wave-line background for Selected Projects section.
 *
 * Design:
 * - 7-layer topographic wave field moving like calm ocean contours
 * - Desaturated color palette (not SaaS-saturated blue)
 * - Very low opacity for atmospheric, restrained feel
 * - Subtle cursor phase interaction (barely noticeable)
 * - Long wavelengths, small amplitudes for organic elegance
 * - Scoped to section only, supports card stack composition
 *
 * Motion:
 * - Canvas-based geometry animation
 * - Time-based phase progression for flowing curves
 * - Cursor X position subtly shifts wave phase (2–3px effect)
 * - Different layer speeds create natural parallax depth
 * - Very slow progression for premium, meditative quality
 *
 * Branding:
 * - Desaturated brand blue (hsl 211 28% 45%, not 85%)
 * - Opacity: 0.08–0.22 range (atmospheric, not graphic)
 * - Line thickness: 0.9–1.2px (elegant, refined)
 */

export function SelectedProjectsWaveLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);
  const cursorXRef = useRef(0.5); // 0 = left, 1 = right

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    const updateCanvasSize = () => {
      if (canvas.parentElement) {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = Math.max(1, rect.width);
        canvas.height = Math.max(1, rect.height);
      }
    };

    updateCanvasSize();
    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    // Track cursor X position on parent element for phase shift interaction
    const handleParentMouseMove = (e: MouseEvent) => {
      if (canvas.parentElement) {
        const rect = canvas.parentElement.getBoundingClientRect();
        cursorXRef.current = (e.clientX - rect.left) / rect.width;
        // Clamp to 0-1
        cursorXRef.current = Math.max(0, Math.min(1, cursorXRef.current));
      }
    };

    const handleParentMouseLeave = () => {
      cursorXRef.current = 0.5; // Reset to center when cursor leaves
    };

    const parentElement = canvas.parentElement;
    if (parentElement) {
      parentElement.addEventListener('mousemove', handleParentMouseMove);
      parentElement.addEventListener('mouseleave', handleParentMouseLeave);
    }

    const drawWave = (
      yBase: number,
      amplitude: number,
      frequency: number,
      opacity: number,
      phase: number,
      strokeWidth: number
    ) => {
      // Desaturated brand blue instead of saturated SaaS blue
      ctx.strokeStyle = `hsla(211, 28%, 45%, ${opacity})`;
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();

      for (let x = 0; x <= canvas.width; x += 16) {
        // Normalize x to 0-1 range for wave calculation
        const normalizedX = x / canvas.width;

        // Calculate Y using sine wave with horizontal phase shift
        // The phase parameter creates the flowing horizontal motion
        const waveValue = Math.sin(
          (normalizedX * frequency + phase) * Math.PI * 2
        );
        const yDeviation = waveValue * amplitude;
        const y = yBase + yDeviation;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
    };

    const animate = () => {
      // Very slow time increment for calm, meditative quality
      timeRef.current += 0.0008;

      // Clear canvas
      ctx.fillStyle = 'rgba(250, 249, 246, 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Compute subtle cursor phase offset (2–3px max effect)
      const cursorOffset = (cursorXRef.current - 0.5) * 0.012;

      // 7-layer topographic wave field with cinematic parameters
      const layers = [
        {
          yPercent: 0.12,
          amplitude: 8,
          frequency: 0.65,
          opacity: 0.035,
          speedMultiplier: 0.22,
          strokeWidth: 1.0,
        },
        {
          yPercent: 0.24,
          amplitude: 10,
          frequency: 0.80,
          opacity: 0.055,
          speedMultiplier: 0.32,
          strokeWidth: 1.0,
        },
        {
          yPercent: 0.38,
          amplitude: 9,
          frequency: 1.0,
          opacity: 0.08,
          speedMultiplier: 0.45,
          strokeWidth: 1.0,
        },
        {
          yPercent: 0.52,
          amplitude: 12,
          frequency: 0.88,
          opacity: 0.10,
          speedMultiplier: 0.58,
          strokeWidth: 1.2,
        },
        {
          yPercent: 0.65,
          amplitude: 8,
          frequency: 1.1,
          opacity: 0.065,
          speedMultiplier: 0.38,
          strokeWidth: 0.9,
        },
        {
          yPercent: 0.78,
          amplitude: 10,
          frequency: 0.72,
          opacity: 0.045,
          speedMultiplier: 0.26,
          strokeWidth: 1.0,
        },
        {
          yPercent: 0.90,
          amplitude: 7,
          frequency: 1.3,
          opacity: 0.03,
          speedMultiplier: 0.34,
          strokeWidth: 0.9,
        },
      ];

      // Draw each wave layer with time-based and cursor-based phase
      layers.forEach((layer) => {
        const yBase = canvas.height * layer.yPercent;
        const phase = timeRef.current * layer.speedMultiplier + cursorOffset;

        drawWave(
          yBase,
          layer.amplitude,
          layer.frequency,
          layer.opacity,
          phase,
          layer.strokeWidth
        );
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      if (parentElement) {
        parentElement.removeEventListener('mousemove', handleParentMouseMove);
        parentElement.removeEventListener('mouseleave', handleParentMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        display: 'block',
        width: '100%',
        height: '100%',
      }}
      aria-hidden="true"
    />
  );
}
