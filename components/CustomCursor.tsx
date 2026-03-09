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
            const target = e.currentTarget as HTMLElement;
            const isWorkCard = target.classList.contains('work__card');

            gsap.to(ring, {
                scale: isWorkCard ? 3.5 : 2.4,
                opacity: isWorkCard ? 0.4 : 0.6,
                borderColor: isWorkCard ? 'var(--white)' : 'rgba(127, 168, 209, 0.6)',
                duration: 0.4,
                ease: 'power3.out',
            });
            gsap.to(dot, {
                scale: isWorkCard ? 0 : 1,
                duration: 0.3,
            });
        };

        const onLeave = () => {
            gsap.to(ring, {
                scale: 1,
                opacity: 1,
                borderColor: 'rgba(127, 168, 209, 0.6)',
                duration: 0.4,
                ease: 'power3.out',
            });
            gsap.to(dot, {
                scale: 1,
                duration: 0.3,
            });
        };

        const addListeners = () => {
            const targets = document.querySelectorAll('a, button, .work__card, .gallery-item');
            targets.forEach((el) => {
                el.addEventListener('mouseenter', onEnter as EventListener);
                el.addEventListener('mouseleave', onLeave);
            });
        };
        addListeners();

        // Refresh listeners for dynamic content
        const timer = setInterval(addListeners, 2000);

        return () => {
            clearInterval(timer);
            window.removeEventListener('mousemove', onMove);
            document.querySelectorAll('a, button, .work__card, .gallery-item').forEach((el) => {
                el.removeEventListener('mouseenter', onEnter as EventListener);
                el.removeEventListener('mouseleave', onLeave);
            });
        };
    }, []);

    return (
        <>
            <div className="cursor cursor--dot" ref={dotRef} aria-hidden="true" />
            <div className="cursor cursor--ring" ref={ringRef} aria-hidden="true" />
        </>
    );
}
