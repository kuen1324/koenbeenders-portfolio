'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useScrollRevealAll } from '@/hooks/useScrollReveal';
import { use3DCursorTilt } from '@/hooks/use3DCursorTilt';
import { useCursorLighting } from '@/hooks/useCursorLighting';
import { useScrollLinkedGlow } from '@/hooks/useScrollLinkedGlow';
import { projects, type Project } from '@/lib/projects';
import { ClaricityLogoIcon } from './BrandLogos';

function ProjectCardArt({ slug }: { slug: string }) {
  if (slug === 'claricity') return <ClaricityLogoIcon />;
  return null;
}

function WorkCard({ p, index }: { p: Project; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);

  // Enable 3D cursor tilt on card
  use3DCursorTilt(cardInnerRef, {
    maxRotateX: 6,
    maxRotateY: 6,
    maxShiftX: 8,
    maxShiftY: 8,
    duration: 0.4,
  });

  const handleMouseEnter = () => {
    const tl = gsap.timeline({ defaults: { duration: 0.6, ease: 'power3.out' } });

    // Card lifts
    if (cardRef.current) {
      tl.to(cardRef.current, { y: -8 }, 0);
    }

    // Image zooms
    if (imageRef.current) {
      tl.to(imageRef.current, { scale: 1.05 }, 0);
    }

    // Overlay fades in
    if (overlayRef.current) {
      tl.to(overlayRef.current, { opacity: 1 }, 0);
    }

    // Metadata slides up
    if (metadataRef.current) {
      tl.to(metadataRef.current, { opacity: 1, y: 0 }, 0.1);
    }
  };

  const handleMouseLeave = () => {
    const tl = gsap.timeline({ defaults: { duration: 0.6, ease: 'power3.out' } });

    if (cardRef.current) {
      tl.to(cardRef.current, { y: 0 }, 0);
    }

    if (imageRef.current) {
      tl.to(imageRef.current, { scale: 1 }, 0);
    }

    if (overlayRef.current) {
      tl.to(overlayRef.current, { opacity: 0 }, 0);
    }

    if (metadataRef.current) {
      tl.to(metadataRef.current, { opacity: 0, y: 8 }, 0);
    }
  };

  return (
    <Link
      ref={cardRef}
      href={`/work/${p.slug}`}
      className="work__card reveal-fade-up"
      style={{
        display: 'block',
        textDecoration: 'none',
        transitionDelay: `${(index % 2) * 150}ms`,
        willChange: 'transform'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardInnerRef}
        className="work__card-inner"
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 'var(--radius-cinematic-sm)',
          aspectRatio: '4/5',
          background: p.grad || 'var(--surface-alt)',
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        }}
      >
        {p.coverImage ? (
          <Image
            ref={imageRef}
            src={p.coverImage}
            alt={p.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            style={{ willChange: 'transform' }}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ProjectCardArt slug={p.slug} />
          </div>
        )}

        {/* Hover Overlay */}
        <div ref={overlayRef} className="work__card-overlay" style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(11, 12, 14, 0.4)',
            opacity: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            willChange: 'opacity',
            backdropFilter: 'blur(4px)'
        }}>
            <span style={{ color: 'white', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: 'var(--fs-xs)', fontWeight: 600 }}>Explore</span>
        </div>
      </div>

      <div className="work__card-info" style={{ marginTop: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 className="display--md" style={{ marginBottom: 'var(--space-2)' }}>{p.title}</h3>
          <p ref={metadataRef} className="label" style={{ color: 'var(--text-tertiary)', opacity: 0, transform: 'translateY(8px)', willChange: 'opacity, transform' }}>{p.role}</p>
        </div>
        <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-tertiary)', fontWeight: 500 }}>{p.year}</span>
      </div>
    </Link>
  );
}

export default function WorkSection() {
  const sectionRef = useScrollRevealAll('.reveal-fade-up, .stagger-reveal', 'is-revealed', { threshold: 0.1 });
  const gridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Apply cursor-driven lighting overlay
  useCursorLighting(gridRef);

  // Apply scroll-linked glow to section heading
  useScrollLinkedGlow(headingRef);

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className="section work" id="work" aria-label="Selected Projects">
      <div className="container">
        <div className="stagger-reveal" style={{ marginBottom: 'var(--space-16)' }}>
          <p className="label" style={{ marginBottom: 'var(--space-4)' }}>Portfolio</p>
          <h2 ref={headingRef} className="display--lg">
            Selected Projects
          </h2>
        </div>

        {/* 2-Column Editorial Grid with Lighting Overlay */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-8)',
            rowGap: 'var(--space-16)',
            position: 'relative'
          }}
        >
          {/* Cursor-driven lighting overlay */}
          <div
            className="lighting-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              opacity: 0,
              background: 'radial-gradient(circle at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
              transition: 'opacity 0.3s ease',
              willChange: 'opacity',
              zIndex: 0
            }}
          />
          {projects.map((project, idx) => (
            <WorkCard key={project.slug} p={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
