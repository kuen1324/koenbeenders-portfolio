'use client';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticEffectProps {
    children: React.ReactElement;
    strength?: number;
}

export default function MagneticEffect({ children, strength = 0.35 }: MagneticEffectProps) {
    const magnetic = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const m = magnetic.current;
        if (!m) return;

        const xTo = gsap.quickTo(m, "x", { duration: 0.75, ease: "elastic.out(0.8, 0.25)", overwrite: "auto" });
        const yTo = gsap.quickTo(m, "y", { duration: 0.75, ease: "elastic.out(0.8, 0.25)", overwrite: "auto" });
        const scaleTo = gsap.quickTo(m, "scale", { duration: 0.4, ease: "elastic.out(1.2, 0.4)", overwrite: "auto" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = m.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x * strength);
            yTo(y * strength);
        };

        const handleMouseEnter = () => {
            scaleTo(1.03);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
            scaleTo(1);
        };

        m.addEventListener("mousemove", handleMouseMove);
        m.addEventListener("mouseenter", handleMouseEnter);
        m.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            m.removeEventListener("mousemove", handleMouseMove);
            m.removeEventListener("mouseenter", handleMouseEnter);
            m.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [strength]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, react-hooks/refs
    return React.cloneElement(children as React.ReactElement<any>, { ref: magnetic });
}
