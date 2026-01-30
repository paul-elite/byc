import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: {
    default: "BYC | Strategic Consulting for Nigerian Businesses",
    template: "%s | BYC Consulting",
  },
  description: "Nigeria's trusted strategic consulting partner. We help ambitious organizations solve complex challenges, drive sustainable growth, and unlock their full potential.",
  keywords: ["consulting", "Nigeria", "strategy", "business transformation", "Abuja", "operations excellence", "digital innovation", "financial advisory"],
  authors: [{ name: "BYC - Babatunde Yunus & Co" }],
  creator: "BYC Consulting",
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "BYC Consulting",
    title: "BYC | Strategic Consulting for Nigerian Businesses",
    description: "Nigeria's trusted strategic consulting partner since 2009. Strategy, operations, digital innovation, and financial advisory services.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BYC | Strategic Consulting for Nigerian Businesses",
    description: "Nigeria's trusted strategic consulting partner since 2009.",
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
