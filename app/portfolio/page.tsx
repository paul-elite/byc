import Image from 'next/image';
import type { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getPortfolioContent, PORTFOLIO_DOWNLOAD_PATH } from '@/lib/portfolio';
import { ArrowUpRight, BadgeCheck, Building2, Download, Mail, MapPin, Phone } from 'lucide-react';

export const dynamic = 'force-dynamic';

function SectionLabel({ children }: { children: ReactNode }) {
    return (
        <p className="[font-family:var(--font-inter)] text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-700">
            {children}
        </p>
    );
}

function A4Sheet({
    children,
    className = '',
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <section className={`portfolio-a4-sheet relative mx-auto w-full overflow-hidden bg-canvas text-neutral-900 shadow-sm ring-1 ring-neutral-200 ${className}`}>
            {children}
        </section>
    );
}

export default async function PortfolioPage() {
    const portfolio = await getPortfolioContent();

    const heroStats = portfolio.stats.slice(0, 4);
    const operatingStats = portfolio.stats.slice(4);
    const firstAccreditations = portfolio.accreditations.slice(0, 6);
    const secondAccreditations = portfolio.accreditations.slice(6);

    return (
        <main className="portfolio-shell min-h-screen bg-neutral-100 [font-family:var(--font-inter)]">
            <Navigation />

            <div className="sticky top-0 z-40 border-b border-neutral-200 bg-canvas/90 pt-16 backdrop-blur lg:pt-[72px]">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-700">Babatunde Yunus &amp; Co.</p>
                        <h1 className="mt-1 [font-family:var(--font-inter)] text-xl font-semibold tracking-normal text-neutral-900 sm:text-2xl">Firm profile</h1>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <a href={PORTFOLIO_DOWNLOAD_PATH} className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary-700 px-4 text-sm font-medium text-white transition hover:bg-primary-800">
                            <Download className="h-4 w-4" />
                            {portfolio.downloadLabel || 'Download Portfolio'}
                        </a>
                    </div>
                </div>
            </div>

            <div className="portfolio-document mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-3 py-8 sm:px-6 lg:px-8">
                <A4Sheet className="grid min-h-[calc(100vh-11rem)] grid-rows-[auto_1fr_auto]">
                    <div className="relative z-10 flex items-center justify-between border-b border-neutral-200 px-6 py-6 sm:px-10">
                        <Image src="/logo.svg" alt="BYC" width={150} height={48} className="w-32 sm:w-40" style={{ height: 'auto' }} priority />
                        <div className="text-right">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">Distinction</p>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">Precision</p>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">Excellence</p>
                        </div>
                    </div>

                    <div className="relative z-10 grid content-center gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[0.92fr_1.08fr]">
                        <div className="max-w-2xl">
                            <SectionLabel>{portfolio.title}</SectionLabel>
                            <h2 className="mt-5 max-w-[12ch] text-4xl font-semibold leading-[0.98] tracking-normal text-neutral-900 sm:text-6xl">
                                {portfolio.subtitle}
                            </h2>
                            <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-600">
                                {portfolio.intro}
                            </p>
                            <div className="mt-10 grid gap-3 sm:grid-cols-2">
                                {heroStats.map((stat) => (
                                    <div key={stat.label} className="border-t border-neutral-200 pt-4">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">{stat.label}</p>
                                        <p className="mt-2 text-base font-semibold leading-6 text-neutral-900 [overflow-wrap:anywhere]">{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-primary-800 p-6 text-white shadow-xl sm:p-8">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-200">Firm Profile</p>
                            <p className="mt-5 text-xl font-medium leading-9 text-white">
                                {portfolio.firmProfile}
                            </p>
                            <div className="mt-8 grid gap-3">
                                {operatingStats.map((stat) => (
                                    <div key={stat.label} className="flex items-start justify-between gap-4 border-t border-white/15 pt-3">
                                        <p className="text-xs uppercase tracking-[0.14em] text-white/60">{stat.label}</p>
                                        <p className="max-w-[55%] text-right text-sm font-semibold text-white">{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 grid border-t border-neutral-200 sm:grid-cols-3">
                        {['Assurance', 'Tax Advisory', 'Management Consulting'].map((item) => (
                            <div key={item} className="flex items-center gap-3 px-6 py-5 sm:px-10">
                                <BadgeCheck className="h-5 w-5 text-primary-700" />
                                <p className="text-sm font-semibold text-neutral-900">{item}</p>
                            </div>
                        ))}
                    </div>
                </A4Sheet>

                <A4Sheet className="grid gap-10 px-6 py-8 sm:px-10">
                    <div className="grid gap-8 border-b border-neutral-200 pb-8 lg:grid-cols-[0.85fr_1.15fr]">
                        <div>
                            <SectionLabel>Vision & Mission</SectionLabel>
                            <h2 className="mt-4 max-w-md [font-family:var(--font-inter)] text-4xl font-semibold leading-tight tracking-normal text-neutral-900">A practice built for trust, clarity, and useful counsel.</h2>
                        </div>
                        <div className="grid gap-4">
                            <div className="bg-white p-6 ring-1 ring-neutral-200">
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">Vision</p>
                                <p className="mt-3 text-base leading-7 text-neutral-600">{portfolio.vision}</p>
                            </div>
                            <div className="bg-primary-800 p-6 text-white">
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-200">Mission</p>
                                <p className="mt-3 text-base leading-7 text-white/85">{portfolio.mission}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                        <div>
                            <SectionLabel>What We Do</SectionLabel>
                            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                {portfolio.services.map((service, index) => (
                                    <div key={service} className="group flex min-h-16 items-center justify-between gap-4 border-b border-neutral-200 py-3">
                                        <span className="text-base font-semibold text-neutral-900">{service}</span>
                                        <span className="text-xs font-semibold text-neutral-500">{String(index + 1).padStart(2, '0')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-neutral-50 p-6 ring-1 ring-neutral-200">
                            <SectionLabel>Beliefs</SectionLabel>
                            <div className="mt-5 space-y-5">
                                {portfolio.beliefs.map((belief) => (
                                    <div key={belief.title}>
                                        <h3 className="[font-family:var(--font-inter)] text-xl font-semibold tracking-normal text-neutral-900">{belief.title}</h3>
                                        <p className="mt-2 text-sm leading-6 text-neutral-600">{belief.body}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </A4Sheet>

                <A4Sheet className="grid gap-8 px-6 py-8 sm:px-10">
                    <div className="flex flex-col gap-5 border-b border-neutral-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <SectionLabel>Professional Standing</SectionLabel>
                            <h2 className="mt-4 max-w-2xl [font-family:var(--font-inter)] text-4xl font-semibold leading-tight tracking-normal text-neutral-900">Recognized memberships, sectors served, and client strategy.</h2>
                        </div>
                        <Building2 className="h-10 w-10 text-primary-600" />
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
                        <div>
                            <h3 className="[font-family:var(--font-inter)] text-xl font-semibold tracking-normal text-neutral-900">Accreditations</h3>
                            <div className="mt-5 grid gap-2">
                                {[...firstAccreditations, ...secondAccreditations].map((item) => (
                                    <div key={item} className="flex items-start gap-3 border-b border-neutral-200 py-2.5">
                                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary-600" />
                                        <p className="text-sm leading-6 text-neutral-600">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid content-start gap-6">
                            <div className="bg-primary-800 p-6 text-white">
                                <h3 className="[font-family:var(--font-inter)] text-xl font-semibold tracking-normal text-white">Client Base</h3>
                                <p className="mt-3 text-sm leading-7 text-white/80">{portfolio.clientBase}</p>
                            </div>
                            <div>
                                <h3 className="[font-family:var(--font-inter)] text-xl font-semibold tracking-normal text-neutral-900">Sectors</h3>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {portfolio.sectors.map((sector) => (
                                        <span key={sector} className="border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-600">
                                            {sector}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </A4Sheet>

                <A4Sheet className="grid gap-8 px-6 py-8 sm:px-10">
                    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                        <div>
                            <SectionLabel>Our Method</SectionLabel>
                            <h2 className="mt-4 [font-family:var(--font-inter)] text-4xl font-semibold leading-tight tracking-normal text-neutral-900">Careful attention. Fast response. Excellent delivery.</h2>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {portfolio.strategy.map((item, index) => (
                                <div key={item.title} className="border-l-2 border-primary-600 bg-white p-5 ring-1 ring-neutral-200">
                                    <p className="text-xs font-semibold text-neutral-400">{String(index + 1).padStart(2, '0')}</p>
                                    <h3 className="mt-3 [font-family:var(--font-inter)] text-xl font-semibold tracking-normal text-neutral-900">{item.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-8 border-t border-neutral-200 pt-8 lg:grid-cols-[1fr_1fr]">
                        <div>
                            <SectionLabel>Core Values</SectionLabel>
                            <div className="mt-5 grid grid-cols-2 gap-3">
                                {portfolio.values.map((value) => (
                                    <div key={value} className="bg-neutral-50 ring-1 ring-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-900">
                                        {value}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-primary-800 p-6 text-white">
                            <SectionLabel>Contact</SectionLabel>
                            <div className="mt-6 space-y-5">
                                <a href={`mailto:${portfolio.contactEmail}`} className="flex items-center gap-3 text-base font-semibold text-white">
                                    <Mail className="h-5 w-5 text-primary-200" />
                                    {portfolio.contactEmail}
                                </a>
                                <a href={`tel:${portfolio.contactPhone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-base font-semibold text-white">
                                    <Phone className="h-5 w-5 text-primary-200" />
                                    {portfolio.contactPhone}
                                </a>
                                <div className="grid gap-4 pt-2">
                                    {portfolio.offices.map((office) => (
                                        <div key={office.title} className="flex gap-3 border-t border-white/15 pt-4">
                                            <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary-200" />
                                            <div>
                                                <p className="text-sm font-semibold text-white">{office.title}</p>
                                                <p className="mt-1 text-sm leading-6 text-white/70">{office.body}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <a href={PORTFOLIO_DOWNLOAD_PATH} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-200">
                                Download the official PDF
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </A4Sheet>
            </div>

            <Footer />
        </main>
    );
}
