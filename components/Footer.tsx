import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/lib/services';
import { tools } from '@/lib/tools';

const company = [
    ['About', '/about'],
    ['Services', '/services'],
    ['Insights', '/blog'],
    ['Firm profile', '/portfolio'],
    ['Contact', '/contact'],
];

export default function Footer({ showCta = true }: { showCta?: boolean }) {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-white px-3 pb-3 pt-6 md:px-4 md:pb-4">
            <div className="overflow-hidden rounded-[2rem] bg-primary-950 text-white">
                <div className="container pt-14 lg:pt-20">
                    {showCta && (
                        <div className="mb-14 flex flex-col gap-6 border-b border-white/10 pb-14 md:flex-row md:items-end md:justify-between lg:mb-16 lg:pb-16">
                            <p className="max-w-xl text-3xl font-medium tracking-tight text-white md:text-4xl">
                                Need help with an audit, tax or your accounts?
                            </p>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Link href="/contact" className="btn btn-sun btn-lg">Contact us</Link>
                                <a href="tel:+2349018811877" className="btn btn-outline-light btn-lg">+234 901 881 1877</a>
                            </div>
                        </div>
                    )}

                    <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
                        <div>
                            <p className="max-w-xs text-[15px] text-primary-100">
                                Chartered Accountants and Tax Practitioners. Audit, tax and accounting for Nigerian organisations.
                            </p>
                            <div className="mt-8 space-y-4 text-sm">
                                <div>
                                    <p className="text-primary-300">Abuja</p>
                                    <p className="mt-0.5 text-white/90">Suite B5, Melita Plaza, Gimbiya Street, Area 11, Garki</p>
                                </div>
                                <div>
                                    <p className="text-primary-300">Ilorin</p>
                                    <p className="mt-0.5 text-white/90">No 2, Babatunde Yunus Street, Irewolede, Kwara State</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
                            <nav aria-label="Company">
                                <h2 className="text-sm font-medium text-white">Company</h2>
                                <ul className="mt-4 space-y-3 text-[15px]">
                                    {company.map(([label, href]) => (
                                        <li key={href}><Link href={href} className="text-primary-100/80 transition-colors hover:text-sun-300">{label}</Link></li>
                                    ))}
                                </ul>
                            </nav>
                            <nav aria-label="Services">
                                <h2 className="text-sm font-medium text-white">Services</h2>
                                <ul className="mt-4 space-y-3 text-[15px]">
                                    {services.map((s) => (
                                        <li key={s.slug}><Link href={`/services/${s.slug}`} className="text-primary-100/80 transition-colors hover:text-sun-300">{s.name.replace(' & forensic review', '')}</Link></li>
                                    ))}
                                </ul>
                            </nav>
                            <nav aria-label="Tax tools">
                                <h2 className="text-sm font-medium text-white">Tax tools</h2>
                                <ul className="mt-4 space-y-3 text-[15px]">
                                    {tools.map((t) => (
                                        <li key={t.slug}><Link href={`/tools/${t.slug}`} className="text-primary-100/80 transition-colors hover:text-sun-300">{t.name}</Link></li>
                                    ))}
                                </ul>
                                <h2 className="mt-8 text-sm font-medium text-white">Get in touch</h2>
                                <ul className="mt-4 space-y-3 text-[15px]">
                                    <li><a href="mailto:info@byc.com.ng" className="text-primary-100/80 transition-colors hover:text-sun-300">info@byc.com.ng</a></li>
                                    <li>
                                        <a href="https://wa.me/2349018811877" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary-100/80 transition-colors hover:text-sun-300">
                                            WhatsApp <ArrowUpRight className="h-3.5 w-3.5" />
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div className="mt-16 flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-primary-200/70 md:flex-row md:justify-between">
                        <p>&copy; {year} Babatunde Yunus &amp; Co. All rights reserved.</p>
                        <p>CAC BN 2861419 · Practising licence 050839</p>
                    </div>
                </div>

                <div className="container pb-10 pt-4 lg:pb-14">
                    <Image src="/logo-white.svg" alt="Babatunde Yunus & Co. — Chartered Accountants & Tax Practitioners" width={485} height={110} className="h-auto w-full" />
                </div>
            </div>
        </footer>
    );
}
