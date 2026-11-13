"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Firm profile' },
    { href: '/blog', label: 'Insights' },
];

export default function Navigation() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
            <nav className="container flex h-16 items-center justify-between lg:h-[72px]" aria-label="Main">
                <Link href="/" className="flex items-center" aria-label="BYC home">
                    <Image src="/logo.svg" alt="Babatunde Yunus & Co." width={164} height={35} priority />
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-[15px] transition-colors ${isActive(link.href) ? 'text-primary-700 font-medium' : 'text-neutral-600 hover:text-neutral-900'}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/contact" className="btn btn-primary btn-sm">
                        Contact us
                    </Link>
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="-mr-2 rounded-md p-2 text-neutral-700 hover:bg-neutral-100 md:hidden"
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isOpen}
                >
                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" viewBox="0 0 24 24" stroke="currentColor">
                        {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
                    </svg>
                </button>
            </nav>

            {isOpen && (
                <div className="border-t border-neutral-200 bg-white md:hidden">
                    <div className="container flex flex-col py-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`border-b border-neutral-100 py-3 text-base ${isActive(link.href) ? 'text-primary-700 font-medium' : 'text-neutral-800'}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link href="/contact" className="btn btn-primary btn-md mt-4" onClick={() => setIsOpen(false)}>
                            Contact us
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
