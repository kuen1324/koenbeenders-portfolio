'use client';
import { useEffect, useRef } from 'react';

export function useMagnetic(strength = 0.35) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Disable magnetic effect for users who prefer reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const handleMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) * strength;
            const dy = (e.clientY - cy) * strength;
            el.style.transform = `translate(${dx}px, ${dy}px)`;
        };

        const handleLeave = () => {
            el.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
            el.style.transform = 'translate(0, 0)';
            setTimeout(() => { el.style.transition = ''; }, 500);
        };

        const handleEnter = () => {
            el.style.transition = 'transform 0.15s linear';
        };

        el.addEventListener('mousemove', handleMove);
        el.addEventListener('mouseleave', handleLeave);
        el.addEventListener('mouseenter', handleEnter);

        return () => {
            el.removeEventListener('mousemove', handleMove);
            el.removeEventListener('mouseleave', handleLeave);
            el.removeEventListener('mouseenter', handleEnter);
        };
    }, [strength]);

    return ref;
}
