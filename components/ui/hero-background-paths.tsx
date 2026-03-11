'use client';

import { motion } from 'framer-motion';

/**
 * HeroBackgroundPaths - Animated background for Hero section
 *
 * Renders elegant mirrored SVG paths with deterministic animation.
 * Scoped absolutely to Hero bounds only.
 *
 * Safety features:
 * - Pure background layer (no state, no effects, no listeners)
 * - Deterministic animation timing (no random values)
 * - Safe for hydration and HMR
 * - No layout impact
 * - Paths-only animation
 */

function FloatingPaths({ position }: { position: number }) {
  // Generate 36 animated paths with deterministic positioning
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
      className="absolute inset-0 w-full h-full text-slate-900 dark:text-slate-50"
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
          stroke="currentColor"
          strokeWidth={path.width}
          strokeOpacity={0.08 + path.id * 0.02}
          initial={{ pathLength: 0.3, opacity: 0.5 }}
          animate={{
            pathLength: 1,
            opacity: [0.2, 0.5, 0.2],
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

export default function HeroBackgroundPaths() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Mirrored path groups for depth */}
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />

      {/* Subtle readability veil - soft gradient toward edges */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0) 0%, rgba(0,0,0,0.03) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
