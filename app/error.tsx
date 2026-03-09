'use client';
import { useEffect } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const magRef = useMagnetic(0.3) as React.RefObject<HTMLButtonElement>;

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="section" style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
        }}>
            <div className="container">
                <span className="label" style={{ marginBottom: 'var(--space-4)', display: 'block' }}>System Error</span>
                <h1 className="display display--xl" style={{ marginBottom: 'var(--space-8)' }}>
                    Something <br />
                    <em style={{ color: 'var(--accent)' }}>diverged.</em>
                </h1>
                <p style={{
                    maxWidth: '40ch',
                    margin: '0 auto var(--space-12)',
                    color: 'var(--muted)',
                }}>
                    An unexpected error occurred in the grid.
                    We suggest trying to refresh the experience.
                </p>
                <button
                    onClick={() => reset()}
                    className="btn"
                    ref={magRef}
                >
                    <span>Retry session</span>
                    <span>↻</span>
                </button>
            </div>
        </main>
    );
}
