import type { Metadata } from 'next';
import Image from 'next/image';
import { Building2, HeartHandshake, Landmark } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { photos } from '@/lib/images';
import { defaultPortfolioContent } from '@/lib/portfolioData';
import CaseStudies from '@/components/CaseStudies';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
    title: 'About',
    description: 'Babatunde Yunus & Co. is a firm of Chartered Accountants and Tax Practitioners with offices in Abuja and Kwara State.',
};

const facts: [string, string][] = [
    ['3', 'Partners'],
    ['12', 'Professional accountants'],
    ['2', 'Offices, in Abuja and Ilorin'],
    [String(defaultPortfolioContent.accreditations.length + defaultPortfolioContent.accreditationNotes.length), 'Professional affiliations'],
];

const values = ['Service excellence', 'Customer care', 'Integrity', 'Professionalism', 'Hard work', 'Trustworthiness'];

// "Institute of Chartered Accountants of Nigeria (ICAN)" -> ['ICAN', 'Institute of ...']
const bodies = [
    ...defaultPortfolioContent.accreditations,
    'Financial Reporting Council of Nigeria (FRCN)',
    'International Financial Reporting Standard certification (IFRS)',
].map((raw) => {
    const item = raw.replace(/\s*\n\s*/g, ' ');
    const match = item.match(/^(.*)\s\(([^)]+)\)$/);
    return match ? [match[2], match[1]] : [item, ''];
});

export default function AboutPage() {
    return (
        <main>
            <Navigation />
            <PageHeader eyebrow="About BYC" title="Chartered accountants for Nigerian businesses and institutions.">
                Babatunde Yunus &amp; Co. provides accounting, audit, tax, training and financial management
                consultancy to companies, public-sector bodies and non-profits.
            </PageHeader>

            <section className="bg-canvas py-16 lg:py-20">
                <div className="container grid gap-4 md:grid-cols-4 md:grid-rows-2">
                    <div className="relative min-h-72 overflow-hidden rounded-3xl bg-loader md:col-span-2 md:row-span-2">
                        <Image src={photos.meeting.src} alt={photos.meeting.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                    </div>
                    {facts.map(([value, label], i) => (
                        <div key={label} className={`flex flex-col justify-between rounded-3xl p-6 ${['bg-neutral-100', 'bg-white border border-neutral-200', 'bg-mist border border-neutral-200/70', 'bg-neutral-50 border border-neutral-200/70'][i]}`}>
                            <span aria-hidden className={`h-1.5 w-10 rounded-full ${['bg-primary-500', 'bg-sun-400', 'bg-lime-500', 'bg-blue-500'][i]}`} />
                            <div className="mt-8">
                                <p className="text-5xl font-medium tracking-tight text-neutral-900">{value}</p>
                                <p className="mt-1 text-sm text-neutral-600">{label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-canvas py-20 lg:py-28">
                <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <h2 className="text-3xl text-neutral-900 md:text-4xl">The firm</h2>
                        <p className="mt-5 text-lg text-neutral-600">
                            We are a practice of chartered accountants and tax practitioners. Our team handles
                            the full range of statutory and advisory work a growing organisation needs.
                        </p>
                        <p className="mt-4 text-neutral-600">
                            Our principle is simple: your success is our business. We take time to understand
                            how each client operates, what regulators expect of them and the decisions their
                            leadership has to make.
                        </p>
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-loader">
                        <Image src={photos.review.src} alt={photos.review.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                    </div>
                </div>
            </section>

            <section className="border-t border-neutral-200 bg-canvas pb-20 lg:pb-28">
                <div className="container grid gap-10 pt-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:pt-28">
                    <div>
                        <h2 className="text-3xl text-neutral-900 md:text-4xl">Leadership</h2>
                        <p className="mt-4 text-lg text-neutral-600">The firm is led by its managing partner, supported by two partners and a team of twelve professional accountants.</p>
                    </div>
                    <div className="rounded-xl border border-neutral-200 p-8 bg-white">
                        <div className="flex items-center gap-5">
                            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-sun-400 text-xl font-semibold text-primary-950">IY</span>
                            <div>
                                <p className="text-xl font-medium text-neutral-900">Dr. Ismail Babatunde Yunus</p>
                                <p className="text-neutral-600">Managing Partner</p>
                            </div>
                        </div>
                        <dl className="mt-8 grid gap-6 border-t border-neutral-200 pt-6 sm:grid-cols-2">
                            <div>
                                <dt className="text-sm text-neutral-500">Qualifications</dt>
                                <dd className="mt-1 font-medium text-neutral-900">ACA, FCTI, ACE, FCMC, FCMA</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-neutral-500">FRC registration</dt>
                                <dd className="mt-1 break-all font-medium text-neutral-900">FRC/2019/CITN/00000019170</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </section>

            <section className="border-t border-neutral-200 bg-mist py-20 lg:py-28">
                <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                    <div>
                        <h2 className="text-3xl text-neutral-900 md:text-4xl">Who we work with</h2>
                    </div>
                    <div>
                        <p className="text-lg text-neutral-700">
                            Our clients range from government organisations and NGOs to private companies of every
                            size — micro, small, medium, large and multinational.
                        </p>
                        <div className="mt-8 grid gap-4 sm:grid-cols-3">
                            {([
                                ['Private companies', 'Accounts, audit, tax and company secretarial work as they grow.', Building2, 'bg-primary-500 text-white', 'bg-white'],
                                ['Public sector', 'Audit, financial management and capacity building for agencies and institutions.', Landmark, 'bg-blue-500 text-white', 'bg-neutral-50'],
                                ['NGOs and projects', 'Donor reporting, project audits and internal controls over restricted funds.', HeartHandshake, 'bg-sun-400 text-primary-950', 'bg-neutral-100'],
                            ] as const).map(([t, d, Icon, tile, card]) => (
                                <div key={t} className={`rounded-2xl border border-neutral-200/70 p-5 ${card}`}>
                                    <span className={`mb-5 flex h-10 w-10 items-center justify-center rounded-xl ${tile}`}><Icon className="h-5 w-5" /></span>
                                    <p className="font-medium text-neutral-900">{t}</p>
                                    <p className="mt-2 text-sm text-neutral-600">{d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <CaseStudies />

            <section className="border-t border-neutral-200 bg-mist py-20 lg:py-28">
                <div className="container">
                    <div className="grid gap-10 md:grid-cols-2">
                        <div>
                            <h2 className="text-2xl text-neutral-900">Vision</h2>
                            <p className="mt-3 text-neutral-600">
                                To provide excellent services in accountancy, auditing, taxation, human capacity
                                training and financial management consultancy in Nigeria.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl text-neutral-900">Mission</h2>
                            <p className="mt-3 text-neutral-600">
                                To be a reputable consulting firm of choice in Nigeria, delivering innovative and
                                excellent services to our clients.
                            </p>
                        </div>
                    </div>

                    <div className="mt-14 border-t border-neutral-200 pt-10">
                        <h2 className="text-2xl text-neutral-900">Our values</h2>
                        <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                            {values.map((value) => (
                                <li key={value} className="flex items-center gap-3 text-neutral-800">
                                    <span className="h-2 w-2 rounded-sm bg-lime-500" />
                                    {value}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="bg-canvas py-20 lg:py-28">
                <div className="container">
                    <h2 className="text-3xl text-neutral-900 md:text-4xl">Professional memberships</h2>
                    <p className="mt-4 max-w-2xl text-lg text-neutral-600">
                        The firm and its partners belong to these professional and regulatory bodies.
                    </p>
                    <dl className="mt-10 grid gap-px overflow-hidden rounded-lg border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-3">
                        {bodies.map(([abbr, name]) => (
                            <div key={abbr} className="bg-white p-5">
                                <dt className="font-semibold text-neutral-900">{abbr}</dt>
                                <dd className="mt-1 text-sm text-neutral-600">{name}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>
            <Faq />
            <Footer />
        </main>
    );
}
