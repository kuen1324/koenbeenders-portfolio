'use client';
import { useEffect, useRef, useState } from 'react';

function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
}

export function useAnimatedCounter(target: number, duration = 1800) {
    const [value, setValue] = useState(0);
    const ref = useRef<HTMLElement>(null);
    const started = useRef(false);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setValue(target);
        }
    }, [target]);

    useEffect(() => {
        const el = ref.current;
        if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const start = performance.now();

                    const tick = (now: number) => {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        setValue(Math.round(easeOutCubic(progress) * target));
                        if (progress < 1) requestAnimationFrame(tick);
                    };

                    requestAnimationFrame(tick);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [target, duration]);

    return { ref, value };
}
