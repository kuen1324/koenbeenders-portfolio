'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import MagneticEffect from './ui/MagneticEffect';
import { use3DCursorTilt } from '@/hooks/use3DCursorTilt';
import { Component as EtheralShadow } from './ui/etheral-shadow';

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Disable parallax when reduced motion is preferred
  const y1 = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 120]);
  const y2 = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  // Portrait hover tilt — GSAP attaches to portraitRef (plain div)
  // Framer Motion runs on inner layers — no transform conflict
  use3DCursorTilt(portraitRef, { maxRotateX: 4, maxRotateY: 4, maxShiftX: 5, maxShiftY: 5 });

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        background: '#070708',
        overflow: 'hidden',
      }}
    >
      {/* Nav protector */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '10rem',
          background: 'linear-gradient(to bottom, rgba(7,7,8,0.95) 0%, rgba(7,7,8,0.55) 60%, transparent 100%)',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      />

      {/* Layer 0: Etheral Shadow — animated background engine */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <EtheralShadow
          color="rgba(200, 200, 215, 0.75)"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 1, scale: 1.2 }}
          sizing="fill"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Layer 0a: Readability overlays — sit above background, below content */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
      >
        {/* Cinematic vignette — grounds the composition */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 90% 85% at 45% 45%, transparent 15%, rgba(7,7,8,0.55) 65%, rgba(7,7,8,0.92) 100%)',
        }} />

        {/* Bottom atmosphere fade */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '35%',
          background: 'linear-gradient(to top, rgba(7,7,8,0.5) 0%, transparent 100%)',
        }} />

        {/* Film grain — texture over everything */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.028,
          mixBlendMode: 'screen',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }} />
      </div>

      {/* Layer 1: Content grid */}
      <div
        className="hero-content-grid"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '96rem',
          margin: '0 auto',
          padding: 'clamp(5rem, 10vh, 7rem) clamp(2rem, 5vw, 5rem) clamp(4rem, 8vh, 6rem)',
          display: 'grid',
          gridTemplateColumns: '7fr 5fr',
          gap: 'clamp(2rem, 4vw, 3.5rem)',
          alignItems: 'center',
        }}
      >

        {/* Left: Typography */}
        <motion.div style={{ y: y1, opacity }}>

          {/* Eyebrow */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.9, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: 'clamp(2rem, 5vh, 3rem)' }}
          >
            <div style={{ width: '1.75rem', height: '1px', background: 'rgba(255,255,255,0.2)' }} />
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.32em',
              color: 'rgba(255,255,255,0.52)',
            }}>
              Design Director
            </span>
          </motion.div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(3.5rem, 7.5vw, 7.5rem)',
            lineHeight: 0.9,
            fontWeight: 600,
            letterSpacing: '-0.035em',
            color: 'white',
            margin: '0 0 clamp(2rem, 4vh, 2.75rem) 0',
          }}>
            <motion.span
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              style={{ display: 'block' }}
            >
              Intersection
            </motion.span>
            <motion.span
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
              style={{
                display: 'block',
                color: 'rgba(255,255,255,0.42)',
                paddingLeft: '7%',
                fontWeight: 400,
              }}
            >
              of design
            </motion.span>
            <motion.span
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.54 }}
              style={{
                display: 'block',
                fontStyle: 'italic',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.88)',
                letterSpacing: '-0.02em',
              }}
            >
              & engineering.
            </motion.span>
          </h1>

          {/* Subheading */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.65 }}
            style={{
              fontSize: 'clamp(0.875rem, 1vw, 1rem)',
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.58)',
              maxWidth: '26rem',
              fontWeight: 300,
              margin: '0 0 clamp(2.5rem, 5vh, 3.5rem) 0',
              letterSpacing: '0.015em',
            }}
          >
            I design and build digital products where every detail earns its place — from interface to infrastructure.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.75 }}
            style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.875rem' }}
          >
            <MagneticEffect strength={0.2}>
              <Link
                href="#work"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.9rem 2rem',
                  background: 'white',
                  color: '#070708',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  boxShadow: '0 0 60px -18px rgba(255,255,255,0.5)',
                  transition: 'all 0.35s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'rgba(255,255,255,0.9)';
                  el.style.boxShadow = '0 0 90px -20px rgba(255,255,255,0.7)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'white';
                  el.style.boxShadow = '0 0 60px -18px rgba(255,255,255,0.5)';
                }}
              >
                Explore Work
              </Link>
            </MagneticEffect>
            <MagneticEffect strength={0.15}>
              <Link
                href="#about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.9rem 2rem',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.35s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.border = '1px solid rgba(255,255,255,0.25)';
                  el.style.background = 'rgba(255,255,255,0.04)';
                  el.style.color = 'rgba(255,255,255,0.85)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.border = '1px solid rgba(255,255,255,0.1)';
                  el.style.background = 'transparent';
                  el.style.color = 'rgba(255,255,255,0.5)';
                }}
              >
                About Me
              </Link>
            </MagneticEffect>
          </motion.div>
        </motion.div>

        {/* Right: Portrait — 4-layer stack for isolation of FM + GSAP */}
        <motion.div
          style={{
            y: y2,
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {/* Directional bloom — top-right light source */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 2.5, delay: 1 }}
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-5%',
              width: '90%',
              height: '60%',
              background: 'radial-gradient(ellipse at 70% 20%, rgba(255,255,255,0.07) 0%, transparent 70%)',
              filter: 'blur(30px)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />

          {/* Layer B: GSAP tilt target — plain div, no FM transform conflict */}
          <div
            ref={portraitRef}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '410px',
              perspective: '1200px',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Layer C: Idle float animation */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -9, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Layer D: Entrance animation — existing portrait content */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 28 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4 / 5',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 50px 120px -30px rgba(0,0,0,0.98), 0 0 0 1px rgba(255,255,255,0.07)',
                }}
              >
                {/* Portrait image */}
                <div style={{ position: 'absolute', inset: 0, background: '#080809', zIndex: 0 }}>
                  <Image
                    src="/portrait.jpg"
                    alt="Koen Beenders"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 480px"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center 28%',
                      filter: 'brightness(0.9) contrast(1.1) saturate(0.88)',
                    }}
                  />
                </div>

                {/* Cinematic depth — inner shadow */}
                <div aria-hidden="true" style={{
                  position: 'absolute',
                  inset: 0,
                  boxShadow: 'inset 0 0 140px rgba(0,0,0,0.65)',
                  zIndex: 10,
                  pointerEvents: 'none',
                }} />

                {/* Bottom gradient — ground the portrait */}
                <div aria-hidden="true" style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '45%',
                  background: 'linear-gradient(to top, rgba(7,7,8,0.7) 0%, rgba(7,7,8,0.2) 60%, transparent 100%)',
                  zIndex: 10,
                  pointerEvents: 'none',
                }} />

                {/* Top rim light — directional, from upper right */}
                <div aria-hidden="true" style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  height: '1px',
                  background: 'linear-gradient(to right, transparent 5%, rgba(255,255,255,0.45) 40%, rgba(255,255,255,0.6) 65%, transparent 95%)',
                  zIndex: 20,
                  pointerEvents: 'none',
                }} />

                {/* Right edge rim — catching the light */}
                <div aria-hidden="true" style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: '20%',
                  width: '1px',
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(255,255,255,0.1) 60%, transparent)',
                  zIndex: 20,
                  pointerEvents: 'none',
                }} />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Bottom metadata strip + scroll indicator */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.4, delay: 1.0 }}
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 'clamp(1.75rem, 3.5vh, 2.75rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.125rem',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {/* Identity / location line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <span style={{
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.28)',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}>
            Koen Beenders
          </span>
          <div style={{ width: '2px', height: '2px', borderRadius: '50%', background: 'rgba(255,255,255,0.18)' }} />
          <span style={{
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.28)',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}>
            Amsterdam
          </span>
          <div style={{ width: '2px', height: '2px', borderRadius: '50%', background: 'rgba(255,255,255,0.18)' }} />
          <span style={{
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.28)',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}>
            Available
          </span>
        </div>

        {/* Animated scroll line */}
        {!shouldReduceMotion ? (
          <motion.div
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
            style={{
              width: '1px',
              height: '44px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
              transformOrigin: 'top',
            }}
          />
        ) : (
          <div style={{
            width: '1px',
            height: '44px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)',
          }} />
        )}
      </motion.div>

    </section>
  );
}
