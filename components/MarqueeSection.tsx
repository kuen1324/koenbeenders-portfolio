'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const items = [
    'Creative Development',
    'Motion Design',
    'Heritage Aesthetics',
    'Brand Systems',
    'UX Strategy',
    'Digital Craftsmanship',
    'TypeScript',
    'Next.js',
    'Visual Identity',
    'Refined Interaction',
];

export default function MarqueeSection() {
    const trackRef = useRef<HTMLDivElement>(null);
    const doubled = [...items, ...items];

    useGSAP(() => {
        const track = trackRef.current;
        if (!track) return;
        const totalWidth = track.scrollWidth / 2;
        gsap.to(track, {
            x: -totalWidth,
            duration: 28,
            ease: 'none',
            repeat: -1,
        });
    }, []);

    return (
        <div className="marquee-section section-border" style={{ padding: 'var(--space-12) 0', overflow: 'hidden' }}>
            <div className="marquee-track" ref={trackRef} style={{ display: 'flex', willChange: 'transform' }}>
                {doubled.map((item, i) => (
                    <span key={i} className="marquee-item">
                        <span className="dot" />
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}
