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
    const [indicatorStyle, setIndicatorStyle] = useState({ translateX: 0, width: 0, opacity: 0 });

    // itemWrapperRefs measure each nav item — placed OUTSIDE MagneticEffect so
    // React.cloneElement inside MagneticEffect cannot override these refs.
    const itemWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
    // linksContainerRef is the position:relative parent of the indicator element.
    const linksContainerRef = useRef<HTMLDivElement>(null);

    const updateIndicator = useCallback((index: number) => {
        const wrapper = itemWrapperRefs.current[index];
        const container = linksContainerRef.current;
        if (!wrapper || !container || index === -1) {
            setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
            return;
        }
        const wrapperRect = wrapper.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        setIndicatorStyle({
            translateX: wrapperRect.left - containerRect.left,
            width: wrapperRect.width,
            opacity: 1,
        });
    }, []);

    // Update indicator on active change and resize
    useEffect(() => {
        const idx = navItems.findIndex((item) => item.id === active);
        updateIndicator(idx);

        const onResize = () => {
            const i = navItems.findIndex((item) => item.id === active);
            updateIndicator(i);
        };
        window.addEventListener("resize", onResize, { passive: true });
        return () => window.removeEventListener("resize", onResize);
    }, [active, updateIndicator]);

    // Scroll state: transparent at top, background on scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Scrollspy via IntersectionObserver
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
                style={{
                    background: scrolled ? 'rgba(250, 248, 244, 0.6)' : 'rgba(255, 255, 255, 0.06)',
                    border: scrolled ? '1px solid rgba(255, 255, 255, 0.45)' : '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: scrolled ? '0 10px 40px -10px rgba(0, 0, 0, 0.12)' : 'none',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    transition: 'background 0.5s cubic-bezier(0.215, 0.61, 0.355, 1), border 0.5s cubic-bezier(0.215, 0.61, 0.355, 1), box-shadow 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)'
                }}
            >
                {/* Logo / Name */}
                <Link
                    href="#hero"
                    style={{
                        color: scrolled ? 'var(--text-primary)' : 'rgba(255, 255, 255, 0.9)',
                        marginLeft: '8px',
                        zIndex: 10,
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        letterSpacing: '-0.02em',
                        textDecoration: 'none',
                        opacity: 1,
                        transition: 'color 0.4s ease, opacity 0.2s ease'
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.6'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
                >
                    Koen Beenders
                </Link>

                {/* Center Links — position:relative parent of the indicator */}
                <div style={{ display: 'flex', position: 'relative' }} ref={linksContainerRef}>
                    <div
                        className="floating-nav__indicator"
                        style={{
                            transform: `translateX(${indicatorStyle.translateX}px)`,
                            width: indicatorStyle.width,
                            opacity: indicatorStyle.opacity,
                        }}
                    />

                    {navItems.map((item, i) => (
                        // Wrapper div is the measurement anchor — outside MagneticEffect so
                        // its ref is never overridden by MagneticEffect's cloneElement call.
                        <div
                            key={item.id}
                            ref={(el) => { itemWrapperRefs.current[i] = el; }}
                            style={{ display: 'inline-flex' }}
                        >
                            <MagneticEffect strength={0.2}>
                                <button
                                    className={`floating-nav__item ${active === item.id ? "floating-nav__item--active" : ""}`}
                                    onClick={() => handleClick(item.id)}
                                    aria-label={`Navigate to ${item.label}`}
                                    aria-current={active === item.id ? "page" : undefined}
                                    style={{
                                        display: 'block',
                                        color: scrolled
                                            ? (active === item.id ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.4)')
                                            : (active === item.id ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.6)'),
                                        transition: 'color 0.4s ease',
                                    }}
                                >
                                    <span className="floating-nav__label" style={{ display: 'block' }}>{item.label}</span>
                                </button>
                            </MagneticEffect>
                        </div>
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
                        Let&apos;s Talk
                    </Link>
                </MagneticEffect>
            </div>
        </div>
    );
}
