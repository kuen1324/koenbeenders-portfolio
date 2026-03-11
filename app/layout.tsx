import type { Metadata } from 'next';
import { Archivo, Space_Grotesk } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';
import CustomCursor from '@/components/CustomCursor';
import BackToTop from '@/components/BackToTop';
import ScrollProgress from '@/components/ScrollProgress';

const bodyFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const displayFont = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://koenbeenders.com'),
  title: {
    template: '%s | Koen Beenders',
    default: 'Koen Beenders — Design Director & Creative Developer',
  },
  description:
    'Design director and creative developer building kinesthetic digital products with architectural typography and purposeful motion.',
  keywords: ['creative developer', 'web design', 'motion design', 'Next.js', 'Amsterdam', 'User Experience'],
  authors: [{ name: 'Koen Beenders' }],
  creator: 'Koen Beenders',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    minimumScale: 1,
  },
  openGraph: {
    title: 'Koen Beenders — Creative Developer',
    description: 'Kinetic portfolio built with scroll-driven animations and bold typography.',
    type: 'website',
    locale: 'en_US',
    url: 'https://koenbeenders.com',
    siteName: 'Koen Beenders Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Koen Beenders — Creative Developer',
    description: 'Kinetic portfolio built with scroll-driven animations and bold typography.',
    creator: '@koenbeenders',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/portrait.jpg" as="image" fetchPriority="high" />
      </head>
      <body className={`${bodyFont.variable} ${displayFont.variable}`} suppressHydrationWarning>
        <LenisProvider>
          <ScrollProgress />
          <CustomCursor />
          <div className="cinematic-noise" aria-hidden="true" />
          <div className="mood-bg" aria-hidden="true" />
          <div id="main">
            {children}
          </div>
          <BackToTop />
        </LenisProvider>
      </body>
    </html>
  );
}
