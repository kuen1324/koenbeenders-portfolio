'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        // Add browser class to <html> for CSS-based Safari overrides
        document.documentElement.classList.add(isSafari ? 'safari' : 'not-safari');

        if (isSafari) {
            // Safari: use native scroll. Lenis's RAF loop conflicts with Safari's
            // native momentum compositing, causing severe scroll jank.
            // ScrollTrigger will automatically use native scroll events.
            return;
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
        });

        lenis.on('scroll', ScrollTrigger.update);
        const rafCallback = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(rafCallback);
        gsap.ticker.lagSmoothing(500, 33);

        return () => {
            gsap.ticker.remove(rafCallback);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
