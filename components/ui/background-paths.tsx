'use client';

import { motion } from 'framer-motion';

/**
 * BackgroundPaths - Animated decorative SVG paths for the dark Contact section.
 *
 * Fixed: converted all Tailwind utility classNames to inline styles.
 * Tailwind is not installed in this project — those classes had zero effect.
 * SVG stroke is now explicit white (rgba) instead of relying on `currentColor`
 * which was controlled by the non-functional Tailwind `text-slate-50` class.
 */

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
    duration: 20 + i * 0.35,
  }));

  return (
    <svg
      viewBox="0 0 696 316"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          stroke="rgba(255,255,255,1)"
          strokeWidth={path.width}
          strokeOpacity={0.08 + path.id * 0.018}
          initial={{ pathLength: 0.3, opacity: 0.6 }}
          animate={{
            pathLength: 1,
            opacity: [0.3, 0.6, 0.3],
            pathOffset: [0, 1, 0],
          }}
          transition={{
            duration: path.duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </svg>
  );
}

export default function BackgroundPaths() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />

      {/* Radial veil — keeps text readable at center */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, transparent 0%, rgba(0,0,0,0.25) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
