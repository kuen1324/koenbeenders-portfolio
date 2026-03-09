'use client';
import { useEffect, useRef, RefObject } from 'react';

export function useScrollReveal(
    className = 'is-revealed',
    options: IntersectionObserverInit = { threshold: 0.15 },
    staggerDelay = 0
): RefObject<HTMLDivElement> {
    const ref = useRef<HTMLDivElement>(null);
    const optionsRef = useRef(options);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                if (staggerDelay > 0) {
                    const children = el.children;
                    Array.from(children).forEach((child, i) => {
                        (child as HTMLElement).style.transitionDelay = `${i * staggerDelay}ms`;
                    });
                }
                el.classList.add(className);
                observer.disconnect();
            }
        }, optionsRef.current);

        observer.observe(el);
        return () => observer.disconnect();
    }, [className, staggerDelay]);

    return ref as RefObject<HTMLDivElement>;
}

export function useScrollRevealAll(
    selector: string,
    className = 'is-revealed',
    options: IntersectionObserverInit = { threshold: 0.15 }
) {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const els = container.querySelectorAll<HTMLElement>(selector);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(className);
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [selector, className, options]);

    return containerRef;
}
