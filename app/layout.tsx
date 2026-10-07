import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
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
  description: "Babatunde Yunus & Co. - Chartered Accountants and Tax Practitioners in Nigeria. Distinction. Precision. Excellence. Distinguished advisory, assurance, and financial management services.",
  keywords: ["chartered accountants", "tax practitioners", "Nigeria", "audit", "tax advisory", "accounting", "Abuja", "ICAN", "FRCN", "financial services"],
  authors: [{ name: "Babatunde Yunus & Co." }],
  creator: "Babatunde Yunus & Co.",
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "BYC - Babatunde Yunus & Co.",
    title: "BYC | Chartered Accountants & Tax Practitioners",
    description: "Distinguished advisory, assurance, and financial management services in Nigeria. Distinction. Precision. Excellence.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BYC | Chartered Accountants & Tax Practitioners",
    description: "Distinguished advisory, assurance, and financial management services in Nigeria.",
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
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
