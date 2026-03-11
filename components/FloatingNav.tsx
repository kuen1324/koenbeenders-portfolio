"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import MagneticEffect from "./ui/MagneticEffect";
import Link from "next/link";

const navItems = [
    { id: "work", label: "Work" },
    { id: "gallery", label: "Gallery" },
    { id: "about", label: "About" },
];

// A section becomes active when its top edge has scrolled to this fraction
// of the viewport height. 0.45 = just below mid-screen — natural "dominant" feel.
const ACTIVATION_THRESHOLD = 0.45;

export default function FloatingNav() {
    const [active, setActive] = useState("");
    const [scrolled, setScrolled] = useState(false);
    const [indicatorStyle, setIndicatorStyle] = useState({ translateX: 0, width: 0, opacity: 0 });

    // itemWrapperRefs — placed OUTSIDE MagneticEffect so cloneElement cannot override.
    const itemWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
    // linksContainerRef — the position:relative parent of the indicator.
    const linksContainerRef = useRef<HTMLDivElement>(null);
    // Mirrors active state so event handlers always see the current value
    // without needing it in their dependency arrays (avoids stale closures).
    const activeRef = useRef("");
    // Prevents scroll spy from overriding active during smooth-scroll navigation.
    const clickLockRef = useRef(false);
    const clickLockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    // rAF handle for scroll throttling.
    const scrollRaf = useRef<number | null>(null);

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

    // Reposition indicator when active section changes.
    useEffect(() => {
        const idx = navItems.findIndex((item) => item.id === active);
        updateIndicator(idx);
    }, [active, updateIndicator]);

    // Resize: re-measure without depending on active state in deps
    // (reads from activeRef to avoid stale closure).
    useEffect(() => {
        const onResize = () => {
            const idx = navItems.findIndex((item) => item.id === activeRef.current);
            updateIndicator(idx);
        };
        window.addEventListener("resize", onResize, { passive: true });
        return () => window.removeEventListener("resize", onResize);
    }, [updateIndicator]);

    // Scroll background state: transparent at top, glass pill on scroll.
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // ─── Core scrollspy ───────────────────────────────────────────────────────
    // Position-based, not ratio-based. Ratio-based approaches fail when sections
    // are taller than the viewport (ratio never reaches the threshold).
    //
    // Algorithm:
    //   For each nav section, compute how far its top edge is ABOVE the activation
    //   threshold line. The section with the smallest positive distance wins —
    //   meaning it most recently crossed the threshold while scrolling down.
    //   When scrolling back past all sections, active clears ("").
    useEffect(() => {
        const getActiveSection = (): string => {
            const thresholdPx = window.innerHeight * ACTIVATION_THRESHOLD;
            let result = "";
            let minDist = Infinity;

            for (const { id } of navItems) {
                const el = document.getElementById(id);
                if (!el) continue;
                const top = el.getBoundingClientRect().top;
                // dist > 0: section top is above the threshold (has entered the active zone)
                const dist = thresholdPx - top;
                if (dist >= 0 && dist < minDist) {
                    minDist = dist;
                    result = id;
                }
            }
            return result;
        };

        const syncActive = () => {
            // Don't fight the smooth-scroll initiated by handleClick
            if (clickLockRef.current) return;
            const newActive = getActiveSection();
            if (newActive !== activeRef.current) {
                activeRef.current = newActive;
                setActive(newActive);
            }
        };

        const onScroll = () => {
            // rAF throttle: one measurement per frame maximum
            if (scrollRaf.current !== null) return;
            scrollRaf.current = requestAnimationFrame(() => {
                scrollRaf.current = null;
                syncActive();
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });

        // Initial sync — dynamic imports mean sections may not be in the DOM yet.
        // Poll up to 3 seconds (20 × 150ms) until at least one section appears.
        let attempts = 0;
        const tryInit = () => {
            const hasSections = navItems.some(({ id }) => !!document.getElementById(id));
            if (hasSections) {
                syncActive();
            } else if (attempts < 20) {
                attempts++;
                setTimeout(tryInit, 150);
            }
        };
        setTimeout(tryInit, 80);

        return () => {
            window.removeEventListener("scroll", onScroll);
            if (scrollRaf.current !== null) cancelAnimationFrame(scrollRaf.current);
        };
    }, []); // stable: only refs and setActive (stable setter) used inside

    const handleClick = useCallback((id: string) => {
        // Engage click lock so scroll spy doesn't clear active while smooth-scrolling.
        // Lock duration covers max smooth-scroll animation time (~1s).
        if (clickLockTimer.current) clearTimeout(clickLockTimer.current);
        clickLockRef.current = true;
        clickLockTimer.current = setTimeout(() => {
            clickLockRef.current = false;
        }, 1200);

        // Move pill immediately on click — don't wait for scroll to reach section.
        activeRef.current = id;
        setActive(id);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, []);

    return (
        <div
            className="floating-nav floating-nav--visible"
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

                {/* Center links — position:relative is the indicator's offset parent */}
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
                        // Wrapper div is the measurement anchor — lives outside MagneticEffect
                        // so React.cloneElement inside MagneticEffect never touches this ref.
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
