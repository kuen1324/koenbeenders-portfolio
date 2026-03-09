'use client';
import React from 'react';

export default function GrainOverlay() {
    return (
        <div
            className="grain-overlay"
            aria-hidden="true"
            style={{
                position: 'fixed',
                inset: '-200%',
                width: '400%',
                height: '400%',
                zIndex: 9999,
                pointerEvents: 'none',
                opacity: 0.04, // Extremely subtle for that premium look
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                animation: 'grain-drift 8s steps(10) infinite',
            }}
        />
    );
}
