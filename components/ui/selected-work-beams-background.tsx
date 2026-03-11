'use client';

import React, { useEffect, useRef } from 'react';

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  angle: number;
  speed: number;
  opacity: number;
  length: number;
  pulse: number;
  pulseSpeed: number;
}

/**
 * SelectedWorkBeamsBackground — Minimal geometric accent lines
 *
 * Thin animated lines creating subtle geometric patterns:
 * - Brand-colored thin lines (#1B5FD6)
 * - Smooth floating and rotation animations
 * - Deterministic positioning
 * - Scoped to container, not fullscreen
 * - Refined, minimal aesthetic
 */

export function SelectedWorkBeamsBackground({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linesRef = useRef<Line[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = containerRef.current;
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size to container
    const resizeCanvas = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      initializeLines(width, height);
    };

    // Initialize thin accent lines
    const initializeLines = (width: number, height: number) => {
      const lines: Line[] = [];
      const lineCount = 4; // 4 elegant accent lines

      for (let i = 0; i < lineCount; i++) {
        // Deterministic diagonal positions
        const startAngle = (i / lineCount) * Math.PI * 2;
        const baseX = width / 2 + Math.cos(startAngle) * (width * 0.15);
        const baseY = height / 2 + Math.sin(startAngle) * (height * 0.15);

        // Varying line angles for geometric interest
        const angle = (i / lineCount) * Math.PI + (i % 2) * 0.3;

        // Line properties
        const length = Math.min(width, height) * (0.3 + (i % 2) * 0.1); // 30-40% of viewport
        const endX = baseX + Math.cos(angle) * length;
        const endY = baseY + Math.sin(angle) * length;

        lines.push({
          x1: baseX,
          y1: baseY,
          x2: endX,
          y2: endY,
          angle: angle,
          speed: 0.08 + (i % 2) * 0.04, // Slow, smooth movement
          opacity: 0.25 + (i % 2) * 0.1, // 0.25-0.35 opacity
          length: length,
          pulse: (i / lineCount) * Math.PI * 2,
          pulseSpeed: 0.008, // Very slow pulse
        });
      }

      linesRef.current = lines;
    };

    resizeCanvas();

    // Animation loop
    let time = 0;

    const animate = () => {
      // Clear canvas - completely transparent
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // Draw lines
      linesRef.current.forEach((line) => {
        // Flowing, organic motion - multiple sine waves for fluidity
        const floatX = Math.sin(time * line.speed * 0.004 + line.pulse) * 25 +
                       Math.sin(time * line.speed * 0.002 + line.pulse * 0.5) * 15;
        const floatY = Math.cos(time * line.speed * 0.003 + line.pulse) * 25 +
                       Math.cos(time * line.speed * 0.0025 + line.pulse * 0.7) * 15;

        // Flowing rotation with wave patterns
        const rotationAngle = Math.sin(time * line.pulseSpeed + line.pulse) * 0.15 +
                              Math.sin(time * line.pulseSpeed * 0.5) * 0.08;

        // Dynamic length variation - breathing effect
        const lengthWave = Math.sin(time * line.pulseSpeed + line.pulse) * 0.2 + 1;
        const dynamicLength = line.length * lengthWave;

        // Pulsing opacity for subtle breathing effect
        const opacityWave = Math.sin(time * line.pulseSpeed + line.pulse) * 0.3 + 0.7;
        const currentOpacity = line.opacity * opacityWave;

        // Calculate center with flowing motion
        const centerX = (line.x1 + line.x2) / 2 + floatX;
        const centerY = (line.y1 + line.y2) / 2 + floatY;
        const rotatedAngle = line.angle + rotationAngle;
        const halfLength = dynamicLength / 2;

        const x1 = centerX + Math.cos(rotatedAngle) * -halfLength;
        const y1 = centerY + Math.sin(rotatedAngle) * -halfLength;
        const x2 = centerX + Math.cos(rotatedAngle) * halfLength;
        const y2 = centerY + Math.sin(rotatedAngle) * halfLength;

        // Optional: add a subtle curve by drawing with quadratic curve instead of straight line
        const midX = centerX + Math.sin(time * line.pulseSpeed * 0.5) * 8;
        const midY = centerY + Math.cos(time * line.pulseSpeed * 0.5) * 8;

        // Draw thin brand-colored line with flowing curve
        ctx.strokeStyle = `hsla(211, 85%, 50%, ${currentOpacity})`;
        ctx.lineWidth = 1.5; // Thin, refined stroke
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(midX, midY, x2, y2); // Curved line for flowing effect
        ctx.stroke();
      });

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
      aria-hidden="true"
    />
  );
}
