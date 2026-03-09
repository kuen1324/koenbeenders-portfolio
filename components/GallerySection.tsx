'use client';

import { useRef } from 'react';
import { useDepthParallax } from '@/hooks/useDepthParallax';
import Gallery from '@/components/ui/horizontal-scroll-carousel';

export default function GallerySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Apply depth-based parallax (surface layer)
    useDepthParallax(containerRef, { depth: 0.5 });

    return (
        <section ref={sectionRef} id="gallery" aria-label="Visual Gallery" className="gallery-section">
            <div className="gallery-section__header container">
                <p className="label reveal-fade-up">Gallery</p>
                <h2 className="display display--lg reveal-fade-up" style={{ transitionDelay: '100ms' }}>Creative Experiments</h2>
            </div>
            <div ref={containerRef} className="container">
                <Gallery sectionRef={sectionRef as React.RefObject<HTMLElement>} />
            </div>
        </section>
    );
}

