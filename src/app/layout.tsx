import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/providers/toast-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "@/components/blocks/navbar/navbar";
import { Footer } from "@/components/landing/components";
import { generateMetadata } from "@/lib/metadata/metadata";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Use generateMetadata to create the metadata
export const metadata: Metadata = generateMetadata({
  title: `LinkZap - Enterprise Link Shortening for Professionals`,
  description: `LinkZap is a powerful link-shortening solution designed for enterprise professionals. Simplify your URLs, track performance, and enhance engagement effortlessly. Boost your digital presence with smarter links today.`,
  icons: [
    {
      rel: "icon",
      url: "/icons/icon-dark.png",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      url: "/icons/icon.png",
      media: "(prefers-color-scheme: dark)",
    },
  ],
  noIndex: false,
  keywords: [
    "link shortening",
    "enterprise tools",
    "URL management",
    "link tracking",
    "digital marketing",
    "professional software",
    "engagement analytics",
    "short link generator",
    "business productivity",
    "smart links",
  ],
  author: process.env.NEXT_PUBLIC_AUTHOR_NAME,
  type: "website",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider />
            <Navbar />
            <main className="mt-20 mx-auto w-full z-0 relative">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}