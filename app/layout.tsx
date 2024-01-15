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
  title: 'DevFlow',
  description: '这是一个正在学习制作的网站, 由next.js 13.5 作为技术栈, 该网站会与区块链交互, 并拥有自己的智能合约',
  icons: {
    icon: '/public/assets/images/site-logo.svg'
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
