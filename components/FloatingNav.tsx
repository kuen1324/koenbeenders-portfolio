"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import MagneticEffect from "./ui/MagneticEffect";
import Link from "next/link";

const navItems = [
    { id: "work", label: "Work" },
    { id: "gallery", label: "Gallery" },
    { id: "about", label: "About" },
];

export default function FloatingNav() {
    const [active, setActive] = useState("");
    const [scrolled, setScrolled] = useState(false);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const pillRef = useRef<HTMLDivElement>(null);

    const updateIndicator = useCallback((index: number) => {
        const btn = buttonRefs.current[index];
        const pill = pillRef.current;
        if (!btn || !pill || index === -1) {
            setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
            return;
        }
        const btnRect = btn.getBoundingClientRect();
        const pillRect = pill.getBoundingClientRect();
        setIndicatorStyle({
            left: btnRect.left - pillRect.left,
            width: btnRect.width,
            opacity: 1
        });
    }, []);

    useEffect(() => {
        const idx = navItems.findIndex((item) => item.id === active);
        updateIndicator(idx);
    }, [active, updateIndicator]);

    // Handle scroll state for the "transparent at top, blurred on scroll" rule
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Track active section with IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                        setActive(entry.target.id);
                    }
                });
            },
            { threshold: [0.1, 0.3, 0.6], rootMargin: "-20% 0px -30% 0px" }
        );
        navItems.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    const handleClick = useCallback((id: string) => {
        setActive(id);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, []);

    return (
        <div
            className={`floating-nav floating-nav--visible`}
            role="navigation"
            aria-label="Main navigation"
        >
            <div 
                className="floating-nav__pill" 
                ref={pillRef}
                style={{
                    background: scrolled ? 'rgba(250, 248, 244, 0.6)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(16px)' : 'none',
                    border: scrolled ? '1px solid rgba(255, 255, 255, 0.45)' : '1px solid transparent',
                    boxShadow: scrolled ? '0 10px 40px -10px rgba(0, 0, 0, 0.12)' : 'none',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    transition: 'all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)'
                }}
            >
                {/* Logo / Name */}
                <Link href="#hero" className="font-display font-bold text-sm tracking-tight hover:opacity-70 transition-opacity" style={{ color: 'var(--text-primary)', marginLeft: '8px', zIndex: 10 }}>
                    Koen Beenders
                </Link>

                {/* Center Links */}
                <div style={{ display: 'flex', position: 'relative' }}>
                    <div
                        className="floating-nav__indicator"
                        style={{
                            left: indicatorStyle.left,
                            width: indicatorStyle.width,
                            opacity: indicatorStyle.opacity,
                        }}
                    />

                    {navItems.map((item, i) => (
                        <MagneticEffect key={item.id} strength={0.2}>
                            <button
                                ref={(el) => { buttonRefs.current[i] = el; }}
                                className={`floating-nav__item ${active === item.id ? "floating-nav__item--active" : ""}`}
                                onClick={() => handleClick(item.id)}
                                aria-label={`Navigate to ${item.label}`}
                                aria-current={active === item.id ? "page" : undefined}
                                style={{ display: 'block' }} // Override mobile hiding rule
                            >
                                <span className="floating-nav__label" style={{ display: 'block' }}>{item.label}</span>
                            </button>
                        </MagneticEffect>
                    ))}
                </div>

                {/* Contact CTA */}
                <MagneticEffect strength={0.2}>
                    <Link 
                        href="#contact" 
                        className="btn btn--primary" 
                        style={{ 
                            padding: '10px 20px', 
                            fontSize: '13px', 
                            borderRadius: '99px',
                            marginLeft: '8px'
                        }}
                    >
                        Let's Talk
                    </Link>
                </MagneticEffect>
            </div>
        </div>
    );
}
