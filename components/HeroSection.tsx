'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { use3DCursorTilt } from '@/hooks/use3DCursorTilt';
import { useCursorLighting } from '@/hooks/useCursorLighting';
import MagneticEffect from './ui/MagneticEffect';
import HeroParticles from './HeroParticles';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const preambleRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const identityRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleSpanRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);

  // Subtle 3D cursor tilt (±2.5deg max - more refined)
  use3DCursorTilt(imageWrapRef, {
    maxRotateX: 2.5,
    maxRotateY: 2.5,
    maxShiftX: 4,
    maxShiftY: 4,
    duration: 0.6,
  });

  // Cursor-driven lighting overlay
  useCursorLighting(sectionRef);

  // PHASE 3-4: Cinematic entrance with premium motion choreography
  useGSAP(() => {
    // Exit early if refs not ready
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }, // Premium easing
      delay: 0.2,
    });

    // 1. Atmospheric background (foundation - sets cinematic mood)
    tl.fromTo(
      atmosphereRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.9 },
      0
    );

    // 2. Hero image enters (premium visual anchor)
    tl.fromTo(
      imageWrapRef.current,
      { opacity: 0, y: 36, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' },
      0.1
    );

    // 3. Preamble (narrative frame)
    tl.fromTo(
      preambleRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5 },
      0.5
    );

    // 4. Label (design role)
    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 },
      0.65
    );

    // 5. Identity (personal signature)
    tl.fromTo(
      identityRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.45 },
      0.8
    );

    // 6. Main headline (power moment)
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      0.9
    );

    // 7. "future" emphasis (signature interaction - the focal moment)
    if (titleSpanRef.current) {
      tl.fromTo(
        titleSpanRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        1.5
      );
    }

    // 8. Supporting subtext (editorial context)
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7 },
      1.7
    );

    // 9. CTAs (call to action - premium buttons)
    tl.fromTo(
      ctaContainerRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.6 },
      2.0
    );

    // 10. Scroll indicator (invites downward exploration)
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.5 },
      2.3
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      id="hero"
      aria-label="Cinematic Portfolio Opening"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg)',
        minHeight: '100dvh',
      }}
    >
      {/* LAYER 1: Structure + Atmospheric Background */}
      <div
        ref={atmosphereRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 70% 40%, rgba(27, 95, 214, 0.08) 0%, transparent 45%),
            linear-gradient(135deg,
              rgba(15, 23, 42, 0) 0%,
              rgba(20, 28, 50, 0.02) 40%,
              rgba(25, 35, 60, 0.04) 100%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <HeroParticles />

      {/* LAYER 2: Cursor-driven Lighting Overlay (Signature Interaction foundation) */}
      <div
        className="hero-lighting"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(circle 600px at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
          opacity: 0,
          transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'opacity',
          zIndex: 1,
          mixBlendMode: 'screen',
        }}
      />

      {/* LAYER 3: Premium Content Structure */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: 'clamp(2rem, 6vw, 5rem)',
          alignItems: 'center',
          minHeight: '100dvh',
          padding: 'clamp(2rem, 6vh, 4rem) clamp(1.5rem, 4vw, 3rem)',
          maxWidth: '1440px',
          margin: '0 auto',
        }}
      >
        {/* Content Column - Left */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-8)',
            maxWidth: '540px',
            paddingRight: 'clamp(1rem, 3vw, 2rem)',
          }}
        >
          {/* Preamble - Provocative framing */}
          <p
            ref={preambleRef}
            style={{
              fontSize: 'var(--fs-sm)',
              lineHeight: 1.5,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 600,
              margin: 0,
              opacity: 0,
            }}
          >
            Intersection of engineering & aesthetics
          </p>

          {/* Label - Role */}
          <p
            ref={labelRef}
            style={{
              fontSize: 'var(--fs-base)',
              color: 'var(--accent)',
              fontWeight: 600,
              margin: 0,
              letterSpacing: '0.02em',
              opacity: 0,
            }}
          >
            Strategic Design Director
          </p>

          {/* Identity - Name & Discipline */}
          <p
            ref={identityRef}
            style={{
              fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
              color: 'var(--text-tertiary)',
              fontWeight: 500,
              margin: 0,
              letterSpacing: '0.01em',
              opacity: 0,
            }}
          >
            Koen Beenders — Creative Developer
          </p>

          {/* Headline - The power moment */}
          <h1
            ref={titleRef}
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              margin: 0,
              paddingTop: 'var(--space-4)',
              opacity: 0,
            }}
          >
            Designing the<br />
            <span
              ref={titleSpanRef}
              style={{
                fontStyle: 'italic',
                color: 'var(--accent)',
                fontWeight: 400,
                opacity: 0,
                display: 'inline-block',
                transform: 'translateY(8px)',
              }}
            >
              future
            </span>
            .
          </h1>

          {/* Supporting text - Editorial context */}
          <p
            ref={subtitleRef}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              lineHeight: 1.6,
              color: 'var(--text-primary)',
              margin: 0,
              maxWidth: '500px',
              opacity: 0,
            }}
          >
            A cinematic approach to digital products. Architectural typography with purposeful motion. Building at the intersection of complex systems and premium experiences.
          </p>

          {/* CTAs - Call to action with magnetic feel */}
          <div
            ref={ctaContainerRef}
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              paddingTop: 'var(--space-4)',
              opacity: 0,
            }}
          >
            <MagneticEffect strength={0.3}>
              <Link
                href="#work"
                style={{
                  padding: '1rem 1.75rem',
                  fontSize: 'var(--fs-base)',
                  fontWeight: 600,
                  borderRadius: '0.5rem',
                  background: 'var(--accent)',
                  color: '#fff',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                View Work
              </Link>
            </MagneticEffect>
            <MagneticEffect strength={0.25}>
              <Link
                href="#about"
                style={{
                  padding: '1rem 1.75rem',
                  fontSize: 'var(--fs-base)',
                  fontWeight: 600,
                  borderRadius: '0.5rem',
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  border: '1px solid var(--border)',
                }}
              >
                The Mission
              </Link>
            </MagneticEffect>
          </div>
        </div>

        {/* Visual Column - Right (Portrait with 3D tilt) */}
        <div
          ref={imageWrapRef}
          style={{
            position: 'relative',
            aspectRatio: '3/4',
            perspective: '1200px',
            willChange: 'transform',
            opacity: 0,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
              borderRadius: '2rem',
              overflow: 'hidden',
              boxShadow: `
                0 20px 60px rgba(0, 0, 0, 0.15),
                0 0 1px rgba(0, 0, 0, 0.1)
              `,
            }}
          >
            <Image
              src="/portrait.jpg"
              alt="Koen Beenders — Creative Developer"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </div>
        </div>
      </div>

      {/* LAYER 4: Scroll Indicator - Invites exploration */}
      <div
        ref={scrollIndicatorRef}
        style={{
          position: 'absolute',
          bottom: 'clamp(2rem, 4vh, 3rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          pointerEvents: 'none',
          opacity: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
            opacity: 0.6,
            animation: 'scroll-bounce 2s ease-in-out infinite',
          }}
        >
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-secondary)' }}>
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </section>
  );
}
