import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Calculator, CalendarDays, Building2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import UpcomingDeadlines from '@/components/tools/UpcomingDeadlines';
import { tools } from '@/lib/tools';

const iconTone = ['bg-primary-500 text-white', 'bg-sun-400 text-primary-950', 'bg-blue-500 text-white'];

export const metadata: Metadata = {
    title: 'Free Nigeria tax tools',
    description: 'Free tools for anyone doing business or employing staff in Nigeria: PAYE calculator, small company checker and tax deadline calendar for 2026.',
};

const icons = { 'paye-calculator': Calculator, 'small-company-check': Building2, 'tax-calendar': CalendarDays } as const;

export default function ToolsPage() {
    return (
        <main>
            <Navigation />
            <PageHeader eyebrow="Tools" title="Free Nigeria tax tools for 2026">
                Quick answers on Nigeria’s new tax rules, for anyone who employs or does business there. No sign-up, nothing stored — the figures you enter stay in
                your browser.
            </PageHeader>

            <section className="bg-canvas py-16 lg:py-20">
                <div className="container grid gap-5 md:grid-cols-3">
                    {tools.map((tool, i) => {
                        const cardBg = ['bg-white', 'bg-neutral-50', 'bg-neutral-100'][i];
                        const Icon = icons[tool.slug as keyof typeof icons];
                        return (
                            <Link key={tool.slug} href={`/tools/${tool.slug}`} className={`group flex flex-col rounded-2xl border border-neutral-200/70 p-6 transition-[translate,box-shadow] duration-200 ease-out motion-safe:hover:-translate-y-1 active:translate-y-0 hover:shadow-[0_14px_40px_-18px_rgba(60,40,0,0.35)] ${cardBg}`}>
                                <div className="flex items-center justify-between">
                                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-200 ease-out motion-safe:group-hover:-rotate-6 ${iconTone[i]}`}>
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <ArrowUpRight className="h-5 w-5 text-neutral-300 transition-colors group-hover:text-primary-700" />
                                </div>
                                <p className="mt-6 text-xs font-medium uppercase tracking-wide text-neutral-400">{tool.label}</p>
                                <h2 className="mt-1 text-xl text-neutral-900">{tool.name}</h2>
                                <p className="mt-2 flex-1 text-[15px] text-neutral-600">{tool.summary}</p>
                                <span className="mt-6 text-sm font-medium text-primary-700">Open tool →</span>
                            </Link>
                        );
                    })}
                </div>
            </section>

            <section className="border-t border-neutral-200 bg-mist py-16 lg:py-20">
                <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                    <div>
                        <h2 className="text-3xl text-neutral-900">What’s due next</h2>
                        <p className="mt-4 text-lg text-neutral-600">The next filing dates for a typical company with staff and VAT-able sales.</p>
                        <Link href="/tools/tax-calendar" className="btn btn-outline btn-md mt-8">See the full calendar</Link>
                    </div>
                    <UpcomingDeadlines count={4} />
                </div>
            </section>
            <Footer />
        </main>
    );
}
