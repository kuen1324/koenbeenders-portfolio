'use client';
import React from 'react';

const brands = [
    { name: 'Acme Corp', logo: <AcmeLogo /> },
    { name: 'Global Design', logo: <GlobalLogo /> },
    { name: 'Stellar Tech', logo: <StellarLogo /> },
    { name: 'Nexus Studio', logo: <NexusLogo /> },
    { name: 'Prism AI', logo: <PrismLogo /> },
];

export default function CredibilityMarquee() {
    return (
        <section className="credibility" aria-label="Trusted by industry leaders">
            <div className="container">
                <p className="credibility__label label">Trusted By</p>
                <div className="credibility__track">
                    <div className="credibility__logos">
                        {[...brands, ...brands].map((brand, i) => (
                            <div key={`${brand.name}-${i}`} className="credibility__logo">
                                {brand.logo}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// Minimal, elegant SVG placeholders for the "Flagship" look
function AcmeLogo() {
    return (
        <svg viewBox="0 0 120 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 10L25 30H5L15 10Z" />
            <text x="35" y="27" fontSize="18" fontWeight="700" letterSpacing="-0.5">ACME</text>
        </svg>
    );
}

function GlobalLogo() {
    return (
        <svg viewBox="0 0 140 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
            <circle cx="20" cy="20" r="4" fill="currentColor" />
            <text x="45" y="27" fontSize="18" fontWeight="600">GLOBAL</text>
        </svg>
    );
}

function StellarLogo() {
    return (
        <svg viewBox="0 0 140 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 5L24 15H35L26 22L30 32L20 25L10 32L14 22L5 15H16L20 5Z" />
            <text x="45" y="27" fontSize="18" fontWeight="600">STELLAR</text>
        </svg>
    );
}

function NexusLogo() {
    return (
        <svg viewBox="0 0 120 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="10" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="3" fill="none" />
            <path d="M12 17L18 23M18 17L12 23" stroke="currentColor" strokeWidth="2" />
            <text x="40" y="27" fontSize="18" fontWeight="700">NEXUS</text>
        </svg>
    );
}

function PrismLogo() {
    return (
        <svg viewBox="0 0 120 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 5L35 30H5L20 5ZM20 12L10 28H30L20 12Z" fill="currentColor" />
            <text x="45" y="27" fontSize="18" fontWeight="600">PRISM</text>
        </svg>
    );
}
