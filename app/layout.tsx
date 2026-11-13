import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RevealObserver from "@/components/motion/RevealObserver";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: "BYC | Chartered Accountants & Tax Practitioners",
    template: "%s | BYC",
  },
  description: "Babatunde Yunus & Co. is a firm of Chartered Accountants and Tax Practitioners providing audit, tax, accounting and company secretarial services to organisations worldwide.",
  keywords: ["chartered accountants", "tax practitioners", "international", "Nigeria", "audit", "tax advisory", "accounting", "Abuja", "ICAN", "FRCN", "financial services"],
  authors: [{ name: "Babatunde Yunus & Co." }],
  creator: "Babatunde Yunus & Co.",
  openGraph: {
    type: "website",
    locale: "en",
    siteName: "BYC - Babatunde Yunus & Co.",
    title: "BYC | Chartered Accountants & Tax Practitioners",
    description: "Audit, tax, accounting and company secretarial services for organisations worldwide.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BYC | Chartered Accountants & Tax Practitioners",
    description: "Audit, tax, accounting and company secretarial services for organisations worldwide.",
  },
  icons: {
    icon: [
      { url: '/favicon-light.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/icon-mark.svg',
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
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        {children}
        <RevealObserver />
        <WhatsAppButton />
      </body>
    </html>
  );
}
