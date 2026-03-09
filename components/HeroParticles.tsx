'use client';

import React, { useRef, useEffect } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
}

export default function HeroParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const isVisible = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const particleCount = 150; // Optimized count

        const resize = () => {
            if (!containerRef.current) return;
            const { width, height } = containerRef.current.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            initParticles(width, height);
        };

        const initParticles = (w: number, h: number) => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(createParticle(w, h));
            }
        };

        const createParticle = (w: number, h: number): Particle => {
            const r = Math.random();
            let color = 'rgba(212, 212, 216, 0.3)'; // Silver
            if (r > 0.95) color = 'rgba(27, 95, 214, 0.25)'; // Brand Accent
            else if (r > 0.75) color = 'rgba(235, 222, 196, 0.3)'; // Champagne

            return {
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.1,
                vy: (Math.random() - 0.5) * 0.1,
                size: Math.random() * 1.5 + 0.5,
                color,
            };
        };

        const update = () => {
            if (!isVisible.current || !ctx || !canvas) {
                animationFrameId = requestAnimationFrame(update);
                return;
            }

            const { width, height } = canvas.getBoundingClientRect();

            // Subtle trail effect
            ctx.fillStyle = 'rgba(250, 250, 249, 0.08)';
            ctx.fillRect(0, 0, width, height);

            particles.forEach((p) => {
                // Liquid flow
                const noiseFreq = 0.002;
                const angle = (Math.sin(p.x * noiseFreq) + Math.cos(p.y * noiseFreq)) * Math.PI * 2;

                p.vx += Math.cos(angle) * 0.01;
                p.vy += Math.sin(angle) * 0.01;

                p.vx *= 0.98;
                p.vy *= 0.98;

                p.x += p.vx;
                p.y += p.vy;

                // Wrap
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(update);
        };

        // Intersection Observer to pause when not in view
        observerRef.current = new IntersectionObserver((entries) => {
            isVisible.current = entries[0].isIntersecting;
        }, { threshold: 0 });

        if (containerRef.current) {
            observerRef.current.observe(containerRef.current);
        }

        window.addEventListener('resize', resize);
        resize();
        update();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
            observerRef.current?.disconnect();
        };
    }, []);

    return (
        <div ref={containerRef} className="particles-wrap" suppressHydrationWarning>
            <canvas ref={canvasRef} className="particles-canvas" suppressHydrationWarning />
        </div>
    );
}
