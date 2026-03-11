'use client';

import { useMemo } from 'react';
import { projects } from '@/lib/projects';
import CircularTestimonials from './ui/circular-testimonials';

export default function WorkSection() {
    const projectShowcase = useMemo(
        () =>
            projects.map((p) => ({
                quote: p.summary,
                name: p.title,
                designation: `${p.role} · ${p.year}`,
                src: p.coverImage ?? '',
                coverIcon: p.coverIcon,
                coverIconWidth: p.coverIconWidth,
                coverBg: p.coverBg,
                liveUrl: p.liveUrl,
            })),
        []
    );

    return (
        <section
            className="section work"
            id="work"
            aria-label="Selected Projects"
        >
            <div className="container">
                {/* Section header — 2-col at desktop: heading left, description right */}
                <div className="work-header">
                    <div className="work-header__left">
                        <p className="label work-header__label">
                            Selected Work
                        </p>
                        <h2 className="display--lg work-header__title">
                            Recent Projects
                        </h2>
                    </div>
                    <p className="work-header__desc">
                        A selection of product design and development work —
                        from concept through production.
                    </p>
                </div>

                {/* Card module — full width, no extra wrapper margin */}
                <div className="work-showcase">
                    <CircularTestimonials
                        testimonials={projectShowcase}
                        autoplay
                        colors={{
                            name: 'var(--text-primary)',
                            designation: 'var(--text-tertiary)',
                            testimony: 'var(--text-secondary)',
                            arrowBackground: 'var(--text-primary)',
                            arrowForeground: 'var(--bg)',
                            arrowHoverBackground: 'var(--text-secondary)',
                        }}
                        fontSizes={{
                            name: 'clamp(1.75rem, 2.8vw, 2.75rem)',
                            designation: '0.9375rem',
                            quote: 'clamp(1.05rem, 1.35vw, 1.3rem)',
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
