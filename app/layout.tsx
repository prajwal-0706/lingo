import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lingo | Made by Prajwal',
  description: 'A simple language learning app, made by Prajwal.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={nunito.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
