'use client';

import { useRef } from 'react';
import Gallery from '@/components/ui/horizontal-scroll-carousel';

export default function GallerySection() {
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section ref={sectionRef} id="gallery" aria-label="Visual Gallery" className="gallery-section" style={{ minHeight: 'auto' }}>
            <div className="gallery-section__header container">
                <p className="label" style={{ letterSpacing: '0.3em', opacity: 0.55, color: 'var(--text-tertiary)' }}>Exploration</p>
                <h2 className="display--lg" style={{ letterSpacing: '-0.02em' }}>Beyond Client Work</h2>
            </div>
            <div className="container">
                <Gallery sectionRef={sectionRef as React.RefObject<HTMLElement>} />
            </div>
        </section>
    );
}

