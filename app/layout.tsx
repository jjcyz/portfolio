import type { Metadata } from 'next';
import { Instrument_Serif, Inter } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
});

export const metadata: Metadata = {
  title: 'Jessica Zhou | Software Engineer',
  description: 'Computer Science and Business student at UBC, specializing in AI, automations, software development, and the intersection of technology and business. Based in Vancouver, BC.',
  keywords: [
    'Jessica Zhou',
    'Software Engineer',
    'Web Development',
    'Machine Learning',
    'Computer Science',
    'University of British Columbia',
    'Vancouver, Canada',
    'JavaScript',
    'React',
    'Next.js',
    'Tailwind CSS',
    'TypeScript',
    'Portfolio',
  ],
  authors: [{ name: 'Jessica Zhou' }],
  creator: 'Jessica Zhou',
  publisher: 'Jessica Zhou',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://jjcyz.github.io/portfolio/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Jessica Zhou | Software Engineer',
    description: 'Computer Science and Business student at UBC, specializing in AI/ML, software development, and the intersection of technology and business.',
    url: 'https://jjcyz.github.io/portfolio/',
    siteName: 'Jessica Zhou Portfolio',
    images: [
      {
        url: '/images/coding.PNG',
        width: 1200,
        height: 630,
        alt: 'Jessica Zhou Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jessica Zhou | Software Engineer',
    description: 'Computer Science and Business student at UBC, specializing in AI/ML, software development, and the intersection of technology and business.',
    images: ['/images/coding.PNG'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {

  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F9F9F7" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
