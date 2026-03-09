'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import MagneticEffect from './ui/MagneticEffect';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const preambleRef = useRef<HTMLParagraphElement>(null);
  const title1Ref = useRef<HTMLSpanElement>(null);
  const title2Ref = useRef<HTMLSpanElement>(null);
  const title3Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Premium entrance choreography (Safe, purely GSAP on refs)
    const tl = gsap.timeline({
      defaults: { ease: 'power4.out' },
      delay: 0.2, // Small delay for hydration safety
    });

    // 2. Image container reveals (translation and scale)
    tl.fromTo(imageWrapRef.current, 
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.8, ease: 'expo.out' }, 
      0.1
    );
    
    // Internal image subtle parallax/scale effect
    tl.fromTo(imageInnerRef.current,
      { scale: 1.1 },
      { scale: 1, duration: 2, ease: 'power3.out' },
      0.1
    );

    // 3. Text reveals with clipping effect (overflow hidden on parent)
    tl.fromTo(preambleRef.current, 
      { opacity: 0, x: -15 }, 
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, 
      0.4
    );

    // Staggered title lines vertically up
    tl.fromTo([title1Ref.current, title2Ref.current, title3Ref.current], 
      { yPercent: 120, opacity: 0 }, 
      { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'expo.out' }, 
      0.5
    );

    // Subtitle fade and slide
    tl.fromTo(subtitleRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 
      0.9
    );

    // CTAs
    tl.fromTo(ctaContainerRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 
      1.1
    );

    // Scroll Indicator
    tl.fromTo(scrollIndicatorRef.current, 
      { opacity: 0, y: 10 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, 
      1.5
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
      {/* LAYER 1: CSS-only ambient atmosphere (removed unstable shader background) */}

      {/* LAYER 2: Editorial Structure */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)',
          columnGap: 'clamp(2rem, 6vw, 6rem)',
          rowGap: '3rem',
          alignItems: 'center',
          minHeight: '100dvh',
          padding: 'clamp(4rem, 10vh, 6rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth: '1600px',
          margin: '0 auto',
        }}
        className="hero-grid"
      >
        {/* Content Column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          {/* Preamble container */}
          <div style={{ marginBottom: 'clamp(1.5rem, 4vh, 3rem)' }}>
            <p 
              ref={preambleRef} 
              style={{ 
                fontSize: '0.75rem', 
                lineHeight: 1.8, 
                color: 'var(--text-secondary)', 
                textTransform: 'uppercase', 
                letterSpacing: '0.2em', 
                fontWeight: 600, 
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                margin: 0, 
                opacity: 0 
              }}
            >
              <span style={{ width: '2.5rem', height: '1px', background: 'var(--accent)' }} />
              Strategic Design Director.
            </p>
          </div>

          {/* Headline - Editorial staggered reveal */}
          <h1 
            style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 6rem)', 
              fontWeight: 800, 
              fontFamily: 'var(--font-display)', 
              lineHeight: 1.05, 
              letterSpacing: '-0.02em', 
              color: 'var(--text-primary)', 
              margin: '0 0 clamp(1.5rem, 4vh, 3rem) 0',
            }}
          >
            <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.1em', marginTop: '-0.1em' }}>
              <span ref={title1Ref} style={{ display: 'block' }}>Intersection</span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.1em', marginTop: '-0.1em' }}>
              <span ref={title2Ref} style={{ display: 'block', color: 'var(--text-secondary)' }}>of design</span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.2em', marginTop: '-0.1em' }}>
              <span ref={title3Ref} style={{ display: 'block', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>& engineering.</span>
            </span>
          </h1>

          {/* Supporting Context & CTAs */}
          <div style={{ display: 'grid', gap: '2.5rem', maxWidth: '480px', marginLeft: 'clamp(0px, 4vw, 2rem)' }}>
            <p 
              ref={subtitleRef} 
              style={{ 
                fontSize: 'clamp(1rem, 1.25vw, 1.125rem)', 
                lineHeight: 1.7, 
                color: 'var(--text-secondary)', 
                margin: 0, 
                opacity: 0,
                fontWeight: 400,
              }}
            >
              I build cinematic digital products and premium architectures. Blending rigorous strategy with uncompromising aesthetics to create experiences that resonate deeply.
            </p>

            <div ref={ctaContainerRef} style={{ display: 'flex', gap: '1rem', opacity: 0, flexWrap: 'wrap' }}>
              <MagneticEffect strength={0.2}>
                <Link 
                  href="#work" 
                  style={{ 
                    padding: '1.125rem 2rem', 
                    fontSize: '0.875rem', 
                    fontWeight: 600, 
                    borderRadius: '2rem', 
                    background: 'var(--text-primary)', 
                    color: 'var(--bg)', 
                    textDecoration: 'none', 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)', 
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.backgroundColor = 'var(--accent)'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.backgroundColor = 'var(--text-primary)'; e.currentTarget.style.color = 'var(--bg)'; }}
                >
                  Explore Work
                </Link>
              </MagneticEffect>
              <MagneticEffect strength={0.15}>
                <Link 
                  href="#about" 
                  style={{ 
                    padding: '1.125rem 2rem', 
                    fontSize: '0.875rem', 
                    fontWeight: 600, 
                    borderRadius: '2rem', 
                    background: 'transparent', 
                    color: 'var(--text-primary)', 
                    textDecoration: 'none', 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)', 
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.border = '1px solid var(--text-primary)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.15)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  My Perspective
                </Link>
              </MagneticEffect>
            </div>
          </div>
        </div>

        {/* Visual Column */}
        <div 
          style={{ 
            position: 'relative', 
            height: 'clamp(400px, 80vh, 900px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="hero-image-col"
        >
          {/* Main image wrapped with a premium glass border and shadow */}
          <div
            ref={imageWrapRef}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              maxHeight: '800px',
              borderRadius: '24px',
              padding: '1px', // Border wrapper for ultra-fine sub-pixel border
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)',
              boxShadow: '0 30px 60px -10px rgba(0,0,0,0.5), 0 0 40px rgba(0,0,0,0.3)',
              opacity: 0,
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                borderRadius: '23px',
                overflow: 'hidden',
                background: '#0a0a0a',
              }}
            >
              <div 
                ref={imageInnerRef}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                }}
              >
                <Image
                  src="/portrait.jpg"
                  alt="Koen Beenders — Strategist & Developer"
                  fill
                  priority
                  sizes="(max-width: 992px) 100vw, 50vw"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    filter: 'contrast(1.05) brightness(0.95)',
                  }}
                />
                
                {/* Premium internal glow */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    boxShadow: 'inset 0 0 100px rgba(0,0,0,0.4)',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 3: Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        style={{
          position: 'absolute',
          bottom: 'clamp(1.5rem, 4vh, 3rem)',
          left: 'clamp(1.5rem, 5vw, 4rem)', // Aligned to left edge of grid padding instead of center
          zIndex: 3,
          pointerEvents: 'none',
          opacity: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            opacity: 0.6,
          }}
        >
          <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>Scroll to explore</span>
          <div style={{ width: '40px', height: '1px', background: 'var(--text-secondary)', position: 'relative', overflow: 'hidden' }}>
            <div 
              style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'var(--text-primary)', 
                animation: 'scroll-line 2s cubic-bezier(0.65, 0, 0.35, 1) infinite' 
              }} 
            />
          </div>
        </div>
      </div>
      
      {/* Safe embedded CSS for animations and responsive grid adjustments */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-line {
          0% { transform: scaleX(0); transform-origin: left; }
          49% { transform: scaleX(1); transform-origin: left; }
          50% { transform: scaleX(1); transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            row-gap: 3rem !important;
          }
          .hero-image-col {
            height: clamp(50vh, 600px, 70vh) !important;
            order: -1;
            margin-bottom: 1rem;
          }
        }
      `}} />
    </section>
  );
}
