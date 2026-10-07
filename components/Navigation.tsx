"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 16);
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/services', label: 'Services' },
        { href: '/portfolio', label: 'Portfolio' },
        { href: '/blog', label: 'Insights' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#f7f1e4]/92 shadow-[0_16px_50px_rgba(3,23,17,0.10)] backdrop-blur-xl' : 'bg-[#031711]/70 backdrop-blur-md'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link href="/" className="flex items-center rounded-2xl bg-[#fffaf0] p-1.5 shadow-sm">
                        <Image src="/logo.svg" alt="BYC" width={178} height={48} priority />
                    </Link>

                    <div className="hidden md:flex items-center gap-7">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-semibold transition-colors ${isScrolled ? 'text-[#26362d] hover:text-primary-700' : 'text-[#fffaf0]/86 hover:text-white'}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link href="/contact" className="btn btn-primary btn-sm">
                            Start a Conversation
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`md:hidden p-3 rounded-xl transition-colors ${isScrolled ? 'text-primary-950 hover:bg-primary-100' : 'text-[#fffaf0] hover:bg-white/10'}`}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            {isMobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>
            </div>

            <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="mx-4 mb-4 rounded-3xl bg-[#fffaf0] border border-primary-100 shadow-xl p-3 space-y-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="block py-3 px-4 text-primary-950 hover:text-primary-700 hover:bg-primary-50 rounded-2xl font-semibold transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="block bg-primary-900 text-[#fffaf0] px-4 py-3 rounded-2xl text-center font-semibold transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Start a Conversation
                    </Link>
                </div>
            </div>
        </nav>
    );
}
