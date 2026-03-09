'use client';
import { useEffect, useState } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const magRef = useMagnetic(0.3) as React.RefObject<HTMLButtonElement>;

    useEffect(() => {
        const onScroll = () => {
            setIsVisible(window.scrollY > 500);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            ref={magRef}
            onClick={scrollToTop}
            className={`back-to-top ${isVisible ? 'is-visible' : ''}`}
            aria-label="Back to top"
        >
            ↑
        </button>
    );
}
