'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        const xDot = gsap.quickSetter(dot, 'x', 'px');
        const yDot = gsap.quickSetter(dot, 'y', 'px');

        const onMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            document.documentElement.style.setProperty('--mouse-x', `${x}%`);
            document.documentElement.style.setProperty('--mouse-y', `${y}%`);

            xDot(e.clientX);
            yDot(e.clientY);
            gsap.to(ring, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.55,
                ease: 'power3.out',
                overwrite: true,
            });
        };
        window.addEventListener('mousemove', onMove);

        const onEnter = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a, button, .work__card, .gallery-item') as HTMLElement | null;
            if (!target) return;
            const isWorkCard = target.classList.contains('work__card');
            gsap.to(ring, {
                scale: isWorkCard ? 3.5 : 2.4,
                opacity: isWorkCard ? 0.5 : 0.7,
                borderColor: 'white',
                duration: 0.4,
                ease: 'power3.out',
            });
            gsap.to(dot, { scale: isWorkCard ? 0 : 1, duration: 0.3 });
        };

        const onLeave = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a, button, .work__card, .gallery-item');
            if (!target) return;
            gsap.to(ring, {
                scale: 1,
                opacity: 0.85,
                borderColor: 'white',
                duration: 0.4,
                ease: 'power3.out',
            });
            gsap.to(dot, { scale: 1, duration: 0.3 });
        };

        // Event delegation — single pair of listeners, no polling
        document.addEventListener('mouseover', onEnter as EventListener, { passive: true });
        document.addEventListener('mouseout', onLeave as EventListener, { passive: true });

        return () => {
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseover', onEnter as EventListener);
            document.removeEventListener('mouseout', onLeave as EventListener);
        };
    }, []);

    return (
        <>
            <div className="cursor cursor--dot" ref={dotRef} aria-hidden="true" />
            <div className="cursor cursor--ring" ref={ringRef} aria-hidden="true" />
        </>
    );
}
