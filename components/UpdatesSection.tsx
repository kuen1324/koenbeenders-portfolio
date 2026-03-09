'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import MagneticEffect from './ui/MagneticEffect';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const updates = [
    { text: 'Available for new projects starting March 2025', link: null, short: 'KB' },
    { text: 'Built high-performance e-commerce for Elevation Group → ', link: 'View Case', short: 'EG' },
    { text: 'Shipped VoltMatch EV platform — 2k+ users', link: null, short: 'VM' },
    { text: 'Speaking at Amsterdam Web Summit 2025', link: null, short: 'AW' },
];

export default function UpdatesSection() {
    const imgRef = useScrollReveal('is-revealed', { threshold: 0.2 }) as React.RefObject<HTMLDivElement>;
    const listRef = useRef<HTMLUListElement>(null);
    const headingRef = useScrollReveal('is-revealed', { threshold: 0.2 }) as React.RefObject<HTMLDivElement>;

    useEffect(() => {
        const list = listRef.current;
        if (!list) return;
        const cards = list.querySelectorAll<HTMLElement>('.update-card');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );
        cards.forEach((c) => observer.observe(c));
        return () => observer.disconnect();
    }, []);

    return (
        <section className="section updates" id="updates" aria-label="Recent activity and updates">
            <div className="container">
                <div className="grid-2">
                    {/* Left: large rounded image */}
                    <div className="updates__img-wrap" ref={imgRef} aria-hidden="true">
                        <div className="clip-curtain" />
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(160deg, var(--bg-up) 0%, var(--bg-card) 100%)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 'var(--space-6)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Geometric background pattern — top third */}
                        <svg
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                width: '100%',
                                height: '45%',
                                opacity: 1,
                                pointerEvents: 'none',
                            }}
                            viewBox="0 0 400 200"
                            preserveAspectRatio="xMidYMid slice"
                            fill="none"
                            aria-hidden="true"
                        >
                            <circle cx="380" cy="0" r="120" stroke="rgba(123,159,194,0.09)" strokeWidth="1" />
                            <circle cx="380" cy="0" r="180" stroke="rgba(123,159,194,0.07)" strokeWidth="1" />
                            <circle cx="380" cy="0" r="240" stroke="rgba(123,159,194,0.05)" strokeWidth="1" />
                            <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                            <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                            <line x1="0" y1="150" x2="400" y2="150" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                            <line x1="80" y1="0" x2="80" y2="200" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                            <line x1="160" y1="0" x2="160" y2="200" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                            <line x1="240" y1="0" x2="240" y2="200" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                            <line x1="320" y1="0" x2="320" y2="200" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                            <circle cx="60" cy="80" r="2" fill="rgba(123,159,194,0.18)" />
                            <circle cx="80" cy="60" r="1.5" fill="rgba(123,159,194,0.14)" />
                            <circle cx="100" cy="90" r="1.5" fill="rgba(123,159,194,0.12)" />
                        </svg>

                        {/* Profile content */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 'var(--space-4)',
                                position: 'relative',
                                zIndex: 1,
                                textAlign: 'center',
                                padding: '0 var(--space-8)',
                            }}
                        >
                            {/* Monogram avatar */}
                            <div
                                style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '50%',
                                    background: 'var(--bg-up)',
                                    border: '1px solid rgba(123,159,194,0.25)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '1.4rem',
                                    fontWeight: 700,
                                    fontStyle: 'italic',
                                    color: 'var(--accent)',
                                    letterSpacing: '-0.02em',
                                    marginBottom: 'var(--space-2)',
                                }}
                            >
                                KB
                            </div>

                            {/* Name */}
                            <span
                                style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                                    fontWeight: 700,
                                    color: 'var(--white)',
                                    letterSpacing: '-0.02em',
                                    lineHeight: 1.1,
                                }}
                            >
                                Koen Beenders
                            </span>

                            {/* Role */}
                            <span
                                style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '0.72rem',
                                    fontWeight: 500,
                                    letterSpacing: '0.18em',
                                    textTransform: 'uppercase',
                                    color: 'var(--muted)',
                                }}
                            >
                                Creative Developer
                            </span>

                            {/* Availability badge */}
                            <div
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: 'rgba(34,197,94,0.08)',
                                    border: '1px solid rgba(34,197,94,0.20)',
                                    borderRadius: 'var(--radius-full)',
                                    padding: '0.35rem 0.9rem',
                                    marginTop: 'var(--space-2)',
                                }}
                            >
                                <span
                                    style={{
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: 'rgb(34,197,94)',
                                        display: 'block',
                                        flexShrink: 0,
                                        animation: 'pulse 2s ease-in-out infinite',
                                    }}
                                />
                                <span
                                    style={{
                                        fontSize: '0.68rem',
                                        fontWeight: 500,
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        color: 'rgba(34,197,94,0.85)',
                                    }}
                                >
                                    Available
                                </span>
                            </div>

                            {/* Location */}
                            <span
                                style={{
                                    fontSize: '0.68rem',
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    color: 'var(--accent)',
                                    opacity: 0.7,
                                    marginTop: 'var(--space-1)',
                                }}
                            >
                                Amsterdam, NL
                            </span>
                        </div>

                        {/* Bottom accent line */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: '10%',
                                right: '10%',
                                height: '1px',
                                background: 'linear-gradient(to right, transparent, rgba(123,159,194,0.25), transparent)',
                            }}
                        />
                    </div>
                    </div>

                    {/* Right: heading + card list */}
                    <div className="updates__right">
                        <div ref={headingRef}>
                            <p className="label" style={{ marginBottom: 'var(--space-4)' }}>Updates</p>
                            <h2 className="display display--lg updates__heading word-reveal">
                                {['Recent', 'Activity'].map((w, i) => (
                                    <span key={i} className="word"><span>{w}&nbsp;</span></span>
                                ))}
                            </h2>
                        </div>

                        <ul className="updates__list" ref={listRef} style={{ listStyle: 'none' }}>
                            {updates.map((u, i) => (
                                <li key={i} className="update-card">
                                    <div className="update-card__avatar">{u.short}</div>
                                    <div className="update-card__text">
                                        {u.text}
                                        {u.link && <Link href="/work/elevation-commerce">{u.link} →</Link>}
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <MagneticEffect>
                            <a href="#work" className="updates__cta">
                                Explore full archive →
                            </a>
                        </MagneticEffect>
                    </div>
                </div>
            </div>
        </section>
    );
}
