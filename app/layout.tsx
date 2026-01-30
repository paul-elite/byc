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
    default: "BYC | Chartered Accountants & Tax Practitioners",
    template: "%s | BYC",
  },
  description: "Babatunde Yunus & Co. - Chartered Accountants and Tax Practitioners in Nigeria. Fast. Accurate. Affordable. Expert audit, tax, and financial management services.",
  keywords: ["chartered accountants", "tax practitioners", "Nigeria", "audit", "tax advisory", "accounting", "Abuja", "ICAN", "FRCN", "financial services"],
  authors: [{ name: "Babatunde Yunus & Co." }],
  creator: "Babatunde Yunus & Co.",
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "BYC - Babatunde Yunus & Co.",
    title: "BYC | Chartered Accountants & Tax Practitioners",
    description: "World-class audit, tax, and financial management services in Nigeria. Fast. Accurate. Affordable.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BYC | Chartered Accountants & Tax Practitioners",
    description: "World-class audit, tax, and financial management services in Nigeria.",
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
