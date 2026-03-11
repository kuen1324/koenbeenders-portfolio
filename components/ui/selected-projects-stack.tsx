'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Project } from '@/lib/projects';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SelectedProjectsStackProps {
  projects: Project[];
}

// ─── Shared ───────────────────────────────────────────────────────────────────

function ProjectLink({
  project,
  children,
  className,
  style,
}: {
  project: Project;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const href = project.liveUrl ?? `/work/${project.slug}`;
  const external = Boolean(project.liveUrl);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  );
}

// ─── Featured Project ─────────────────────────────────────────────────────────
//
// Large image with bottom-left overlay text. No card shell — the image IS the card.
// This is the visual anchor of the entire section.

function FeaturedProject({
  project,
  shouldReduceMotion,
}: {
  project: Project;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <ProjectLink
        project={project}
        className="work-featured"
        style={{
          display: 'block',
          position: 'relative',
          textDecoration: 'none',
          color: 'inherit',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        {/* Image — dominant, fills the entire card */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            overflow: 'hidden',
            background: project.grad ?? '#111',
          }}
        >
          {project.coverImage && (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
              priority
              style={{
                objectFit: 'cover',
                transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          )}

          {/* Gradient overlay — bottom half, for text legibility */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Outcome badge — top left */}
          {project.outcome && (
            <div
              style={{
                position: 'absolute',
                top: 'clamp(16px, 2vw, 24px)',
                left: 'clamp(16px, 2vw, 24px)',
                zIndex: 5,
                padding: '6px 12px',
                borderRadius: '6px',
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.1)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                color: 'rgba(255,255,255,0.88)',
              }}
            >
              {project.outcome}
            </div>
          )}

          {/* Content overlay — bottom left */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: 'clamp(20px, 3vw, 40px)',
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <div style={{ maxWidth: '560px' }}>
              <span
                style={{
                  display: 'block',
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.55)',
                  marginBottom: '8px',
                }}
              >
                {project.tag} · {project.year}
              </span>
              <h3
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.025em',
                  color: '#fff',
                  margin: 0,
                  lineHeight: 1.15,
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  fontSize: 'clamp(0.8125rem, 1.1vw, 0.9375rem)',
                  lineHeight: 1.55,
                  color: 'rgba(255,255,255,0.65)',
                  margin: '8px 0 0',
                  maxWidth: '50ch',
                }}
              >
                {project.subtitle}
              </p>
            </div>

            {/* Arrow — view cue */}
            <div
              className="work-featured__arrow"
              style={{
                flexShrink: 0,
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.7)',
                transition:
                  'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </div>
          </div>
        </div>
      </ProjectLink>
    </motion.div>
  );
}

// ─── Project List Item ────────────────────────────────────────────────────────
//
// Minimal: small thumbnail + title + tag. No card shell, no badges.
// The list is secondary to the featured project.

function ProjectListItem({
  project,
  index,
  shouldReduceMotion,
}: {
  project: Project;
  index: number;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <ProjectLink
        project={project}
        className="work-list-item"
        style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(100px, 14vw, 160px) 1fr auto',
          alignItems: 'center',
          gap: 'clamp(16px, 2vw, 28px)',
          textDecoration: 'none',
          color: 'inherit',
          padding: 'clamp(14px, 1.5vw, 20px) 0',
          borderBottom: '1px solid var(--border)',
          transition: 'background 0.3s ease',
        }}
      >
        {/* Thumbnail */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '3 / 2',
            overflow: 'hidden',
            borderRadius: '8px',
            background: project.grad ?? '#111',
            flexShrink: 0,
          }}
        >
          {project.coverImage && (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="160px"
              style={{
                objectFit: 'cover',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          )}
        </div>

        {/* Title + tag */}
        <div style={{ minWidth: 0 }}>
          <h3
            style={{
              fontSize: 'clamp(0.9375rem, 1.4vw, 1.125rem)',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              color: 'var(--text-primary)',
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {project.title}
          </h3>
          <span
            style={{
              display: 'block',
              fontSize: '0.75rem',
              color: 'var(--text-tertiary)',
              marginTop: '4px',
              letterSpacing: '0.02em',
            }}
          >
            {project.tag} · {project.year}
          </span>
        </div>

        {/* Arrow */}
        <div
          className="work-list-item__arrow"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-tertiary)',
            flexShrink: 0,
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </div>
      </ProjectLink>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function SelectedProjectsStack({
  projects,
}: SelectedProjectsStackProps) {
  const shouldReduceMotion = useReducedMotion();

  if (projects.length === 0) return null;

  const [featured, ...rest] = projects;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(32px, 5vw, 48px)',
      }}
    >
      {/* Featured — visual anchor */}
      <FeaturedProject
        project={featured}
        shouldReduceMotion={shouldReduceMotion}
      />

      {/* Remaining projects — clean list */}
      {rest.length > 0 && (
        <div
          style={{
            borderTop: '1px solid var(--border)',
          }}
        >
          {rest.map((project, i) => (
            <ProjectListItem
              key={project.slug}
              project={project}
              index={i}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      )}
    </div>
  );
}
