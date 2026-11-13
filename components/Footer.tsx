import Link from 'next/link';
import Image from 'next/image';
import { services } from '@/lib/services';
import { tools } from '@/lib/tools';
import BrandBars from '@/components/ui/BrandBars';

const links = [
    ['About', '/about'],
    ['Services', '/services'],
    ['Firm profile', '/portfolio'],
    ['Tax tools', '/tools'],
    ['Insights', '/blog'],
    ['Contact', '/contact'],
];


export default function Footer({ showCta = true }: { showCta?: boolean }) {
    const year = new Date().getFullYear();

    return (
        <footer>
            {showCta && (
            <div className="relative overflow-hidden bg-primary-900 text-white">
                <BrandBars size="lg" className="absolute -bottom-10 right-[8%] opacity-90" />
                <div className="container relative flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-2xl font-semibold tracking-tight">Need help with an audit, tax or your accounts?</p>
                        <p className="mt-2 text-primary-100">Call +234 901 881 1877 or send us a message.</p>
                    </div>
                    <Link href="/contact" className="btn btn-sun btn-lg shrink-0 md:mr-48">
                        Contact us
                    </Link>
                </div>
            </div>
            )}

            <div className="border-t border-neutral-200 bg-mist">
                <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.9fr_1.1fr]">
                    <div>
                        <Image src="/logo.svg" alt="Babatunde Yunus & Co." width={165} height={48} />
                        <p className="mt-5 max-w-xs text-sm text-neutral-600">
                            Chartered Accountants and Tax Practitioners serving organisations across Nigeria.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-sm font-medium text-neutral-900">Company</h2>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            {links.map(([label, href]) => (
                                <li key={href}>
                                    <Link href={href} className="text-neutral-600 hover:text-primary-700">{label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-sm font-medium text-neutral-900">Services</h2>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            {services.map((service) => (
                                <li key={service.slug}>
                                    <Link href={`/services/${service.slug}`} className="text-neutral-600 hover:text-primary-700">{service.name}</Link>
                                </li>
                            ))}
                        </ul>
                        <h2 className="mt-8 text-sm font-medium text-neutral-900">Tax tools</h2>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            {tools.map((t) => (
                                <li key={t.slug}>
                                    <Link href={`/tools/${t.slug}`} className="text-neutral-600 hover:text-primary-700">{t.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="text-sm">
                        <h2 className="font-medium text-neutral-900">Offices</h2>
                        <p className="mt-4 text-neutral-600">Suite B5, Melita Plaza, Gimbiya Street, Area 11, Garki, Abuja</p>
                        <p className="mt-3 text-neutral-600">No 2, Babatunde Yunus Street, Irewolede, Ilorin, Kwara State</p>
                        <p className="mt-3">
                            <a href="tel:+2349018811877" className="text-neutral-900 hover:text-primary-700">+234 901 881 1877</a>
                            <br />
                            <a href="mailto:info@byc.com.ng" className="text-neutral-900 hover:text-primary-700">info@byc.com.ng</a>
                        </p>
                    </div>
                </div>

                <div className="border-t border-neutral-200">
                    <div className="container flex flex-col gap-2 py-6 text-xs text-neutral-500 md:flex-row md:justify-between">
                        <p>&copy; {year} Babatunde Yunus &amp; Co. All rights reserved.</p>
                        <p>CAC: BN 2861419 · Practising licence: 050839</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
