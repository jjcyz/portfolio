import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { generatePersonStructuredData, generateWebsiteStructuredData } from '@/lib/structured-data';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Jessica Zhou | Software Engineer',
  description: 'Computer Science and Business student at UBC, specializing in AI/ML, software development, and the intersection of technology and business. Based in Vancouver, BC.',
  keywords: [
    'Jessica Zhou',
    'Software Engineer',
    'Machine Learning',
    'Computer Science',
    'UBC',
    'Vancouver',
    'Python',
    'React',
    'PyTorch',
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
        url: '/images/og-image.jpg',
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
    images: ['/images/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personStructuredData = generatePersonStructuredData();
  const websiteStructuredData = generateWebsiteStructuredData();

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7c3aed" />
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
