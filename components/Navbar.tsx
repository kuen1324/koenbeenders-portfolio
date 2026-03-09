'use client';
import { useEffect, useRef, useState } from 'react';
import { brand } from '@/lib/brand';
import Link from 'next/link';

const links = ['Work', 'About', 'Contact'];

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const [active, setActive] = useState('hero');
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
                        setActive(entry.target.id);
                    }
                });
            },
            { threshold: [0.1, 0.4, 0.7], rootMargin: '-80px 0px -20% 0px' }
        );

        links.forEach((link) => {
            const el = document.getElementById(link.toLowerCase());
            if (el) observer.observe(el);
        });
        const hero = document.getElementById('hero');
        if (hero) observer.observe(hero);

        return () => {
            window.removeEventListener('scroll', onScroll);
            observer.disconnect();
        };
    }, []);

    // Close menu on anchor click
    const handleLinkClick = () => setMenuOpen(false);

    // Close menu on Escape
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMenuOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);


    return (
        <>
            <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`} ref={navRef} aria-label="Primary navigation">
                {/* Left: wordmark */}
                <Link href="/" className="nav__logo" aria-label={`${brand.name} Portfolio Home`}>
                    {brand.name}
                </Link>

                {/* Center: desktop links */}
                <ul className="nav__links" role="list">
                    {links.map((l) => (
                        <li key={l} role="listitem">
                            <a
                                href={`#${l.toLowerCase()}`}
                                className={`nav__link ${active === l.toLowerCase() ? 'nav__link--active' : ''}`}
                                aria-current={active === l.toLowerCase() ? 'page' : undefined}
                            >
                                {l}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Right: CTA (desktop) */}
                <a href="#contact" className="nav__cta" aria-label="Hire me for your next project">
                    {brand.availability}
                </a>

                {/* Mobile: hamburger toggle */}
                <button
                    className={`nav__hamburger ${menuOpen ? 'nav__hamburger--open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                >
                    <span className="nav__hamburger-line" />
                    <span className="nav__hamburger-line" />
                    <span className="nav__hamburger-line" />
                </button>
            </nav>

            {/* Mobile: full-screen menu overlay */}
            <div className={`nav__mobile ${menuOpen ? 'nav__mobile--open' : ''}`} aria-hidden={!menuOpen}>
                <div className="nav__mobile-inner">
                    {links.map((l, i) => (
                        <a
                            key={l}
                            href={`#${l.toLowerCase()}`}
                            className={`nav__mobile-link ${active === l.toLowerCase() ? 'nav__mobile-link--active' : ''}`}
                            onClick={handleLinkClick}
                            style={{ animationDelay: `${i * 0.08}s` }}
                        >
                            <span className="nav__mobile-num">0{i + 1}</span>
                            <span>{l}</span>
                        </a>
                    ))}
                    <a
                        href={`mailto:${brand.email}`}
                        className="btn"
                        onClick={handleLinkClick}
                        style={{ marginTop: 'var(--space-12)' }}
                    >
                        <span>{brand.cta.contact}</span>
                        <span>→</span>
                    </a>
                </div>
            </div>

            {/* Backdrop */}
            {menuOpen && (
                <div
                    className="nav__backdrop"
                    onClick={() => setMenuOpen(false)}
                    aria-hidden="true"
                />
            )}
        </>
    );
}
