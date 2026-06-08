import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from 'react';
import "./globals.css";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import Providers from "./providers";
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'BAKR AI | منصة أدوات الذكاء الاصطناعي',
  description: 'اكتشف أفضل أدوات الذكاء الاصطناعي مع خصومات وعروض حصرية',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-[#020817] text-slate-50"
        suppressHydrationWarning
      >
        {/* ✅ Suspense يحل مشكلة MetadataWrapper hydration conflict في Next.js 16 */}
        <Suspense fallback={null}>
          <Providers>
            {children}
          </Providers>
        </Suspense>

        <Script
          src="https://s.skimresources.com/js/304413X1792591.skimlinks.js"
          strategy="lazyOnload"
          type="text/javascript"
        />
      </body>
    </html>
  );
}