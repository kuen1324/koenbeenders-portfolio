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
                            name: 'clamp(1.25rem, 2vw, 1.5rem)',
                            designation: '0.8125rem',
                            quote: 'clamp(0.875rem, 1.1vw, 1rem)',
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
