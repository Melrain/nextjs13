import './globals.css';
import '../styles//prism.css';
import type { Metadata } from 'next';
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from 'next/font/google';
import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/context/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter'
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-spaceGrotesk'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://leerob.io'),
  title: {
    default: 'Lee Robinson',
    template: '%s | Lee Robinson'
  },
  description: 'Developer, writer, and creator.',
  openGraph: {
    title: 'Lee Robinson',
    description: 'Developer, writer, and creator.',
    url: 'https://leerob.io',
    siteName: 'Lee Robinson',
    locale: 'en_US',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  twitter: {
    title: 'Lee Robinson',
    card: 'summary_large_image'
  },
  verification: {
    google: 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
    yandex: '14d2e73487fa6c71'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          elements: {
            formButtonPrimary: 'primary-gradient',
            footerActionLink: 'primary-text-gradient hover:text-primary-500'
          }
        }}>
        <ThemeProvider>
          <body className={`${inter.variable}${spaceGrotesk.variable}`}>{children}</body>
        </ThemeProvider>
      </ClerkProvider>
    </html>
  );
}
