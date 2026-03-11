'use client';
import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const bar = barRef.current;
        if (!bar) return;

        // Direct DOM mutation — no React re-render on every scroll event
        const onScroll = () => {
            const doc = document.documentElement;
            const scrolled = doc.scrollTop;
            const total = doc.scrollHeight - doc.clientHeight;
            const pct = total > 0 ? (scrolled / total) * 100 : 0;
            bar.style.width = `${pct}%`;
            bar.setAttribute('aria-valuenow', String(Math.round(pct)));
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div
            ref={barRef}
            className="scroll-progress"
            role="progressbar"
            aria-valuenow={0}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Page scroll progress"
        />
    );
}
