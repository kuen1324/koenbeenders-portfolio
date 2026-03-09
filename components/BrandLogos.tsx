'use client';

import React from 'react';

export function VoltMatchLogo({ className = "" }: { className?: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className={className}>
            <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#33E8C1',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 40px -5px #33E8C1'
            }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0B0C0E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
            </div>
        </div>
    );
}

export function ClaricityLogoIcon({ className = "" }: { className?: string }) {
    return (
        <div style={{
            width: '180px',
            height: '180px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
        }} className={className}>
            {/* The Slanted Orbital Ring */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotate(-40deg) scale(1.15)' }} viewBox="0 0 100 100">
                <ellipse cx="50" cy="50" rx="42" ry="8" fill="none" stroke="white" strokeWidth="0.75" opacity="0.8" />
            </svg>

            {/* The Exact 4-Pointed Sparkle Star */}
            <svg width="68" height="68" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.5))' }}>
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="white" />
            </svg>
        </div>
    );
}

export function ClaricityLogo({ className = "" }: { className?: string }) {
    return <ClaricityLogoIcon className={className} />;
}

export function SimpleTextLogo({ text, accent = "var(--accent)" }: { text: string; accent?: string }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
                width: '60px',
                height: '4px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                marginBottom: '20px',
                borderRadius: '2px',
                overflow: 'hidden'
            }}>
                <div style={{ width: '40%', height: '100%', backgroundColor: 'rgba(255,255,255,0.6)' }} />
            </div>
            <span style={{
                fontSize: '32px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                color: 'white',
                textTransform: 'uppercase',
                fontStyle: 'italic',
                textShadow: `0 0 30px ${accent}`
            }}>
                {text}
            </span>
        </div>
    );
}
