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
            <div className="overflow-hidden rounded-[2rem] bg-mist">
                <div className="container pt-14 lg:pt-20">
                    {showCta && (
                        <div className="mb-14 flex flex-col gap-6 border-b border-neutral-200 pb-14 md:flex-row md:items-end md:justify-between lg:mb-16 lg:pb-16">
                            <p className="max-w-xl text-3xl font-medium tracking-tight text-neutral-900 md:text-4xl">
                                Need help with an audit, tax or your accounts?
                            </p>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Link href="/contact" className="btn btn-primary btn-lg">Contact us</Link>
                                <a href="tel:+2349018811877" className="btn btn-outline btn-lg">+234 901 881 1877</a>
                            </div>
                        </div>
                    )}

                    <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
                        <div>
                            <Image src="/logo.svg" alt="Babatunde Yunus & Co." width={165} height={48} />
                            <p className="mt-6 max-w-xs text-[15px] text-neutral-600">
                                Chartered Accountants and Tax Practitioners. Audit, tax and accounting for Nigerian organisations.
                            </p>
                            <div className="mt-8 space-y-4 text-sm">
                                <div>
                                    <p className="text-neutral-500">Abuja</p>
                                    <p className="mt-0.5 text-neutral-800">Suite B5, Melita Plaza, Gimbiya Street, Area 11, Garki</p>
                                </div>
                                <div>
                                    <p className="text-neutral-500">Ilorin</p>
                                    <p className="mt-0.5 text-neutral-800">No 2, Babatunde Yunus Street, Irewolede, Kwara State</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
                            <nav aria-label="Company">
                                <h2 className="text-sm font-medium text-neutral-900">Company</h2>
                                <ul className="mt-4 space-y-3 text-[15px]">
                                    {company.map(([label, href]) => (
                                        <li key={href}><Link href={href} className="text-neutral-600 transition-colors hover:text-primary-700">{label}</Link></li>
                                    ))}
                                </ul>
                            </nav>
                            <nav aria-label="Services">
                                <h2 className="text-sm font-medium text-neutral-900">Services</h2>
                                <ul className="mt-4 space-y-3 text-[15px]">
                                    {services.map((s) => (
                                        <li key={s.slug}><Link href={`/services/${s.slug}`} className="text-neutral-600 transition-colors hover:text-primary-700">{s.name.replace(' & forensic review', '')}</Link></li>
                                    ))}
                                </ul>
                            </nav>
                            <nav aria-label="Tax tools">
                                <h2 className="text-sm font-medium text-neutral-900">Tax tools</h2>
                                <ul className="mt-4 space-y-3 text-[15px]">
                                    {tools.map((t) => (
                                        <li key={t.slug}><Link href={`/tools/${t.slug}`} className="text-neutral-600 transition-colors hover:text-primary-700">{t.name}</Link></li>
                                    ))}
                                </ul>
                                <h2 className="mt-8 text-sm font-medium text-neutral-900">Get in touch</h2>
                                <ul className="mt-4 space-y-3 text-[15px]">
                                    <li><a href="mailto:info@byc.com.ng" className="text-neutral-600 transition-colors hover:text-primary-700">info@byc.com.ng</a></li>
                                    <li>
                                        <a href="https://wa.me/2349018811877" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-neutral-600 transition-colors hover:text-primary-700">
                                            WhatsApp <ArrowUpRight className="h-3.5 w-3.5" />
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div className="mt-16 flex flex-col gap-2 border-t border-neutral-200 py-6 text-xs text-neutral-500 md:flex-row md:justify-between">
                        <p>&copy; {year} Babatunde Yunus &amp; Co. All rights reserved.</p>
                        <p>CAC BN 2861419 · Practising licence 050839</p>
                    </div>
                </div>

                <div aria-hidden className="pointer-events-none -mt-4 h-[13vw] select-none overflow-hidden">
                    <p className="whitespace-nowrap text-center text-[20vw] font-semibold leading-[0.8] tracking-[-0.06em] text-neutral-200/90">
                        BYC
                    </p>
                </div>
            </div>
        </footer>
    );
}
