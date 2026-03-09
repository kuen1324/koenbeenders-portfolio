'use client';

import { useRef } from 'react';
import Gallery from '@/components/ui/horizontal-scroll-carousel';

export default function GallerySection() {
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section ref={sectionRef} id="gallery" aria-label="Visual Gallery" className="gallery-section">
            <div className="gallery-section__header container">
                <p className="label">Gallery</p>
                <h2 className="display display--lg">Creative Experiments</h2>
            </div>
            <div className="container">
                <Gallery sectionRef={sectionRef as React.RefObject<HTMLElement>} />
            </div>
        </section>
    );
}

