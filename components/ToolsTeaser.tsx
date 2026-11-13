import Link from 'next/link';
import { ArrowUpRight, Building2, Calculator, CalendarDays } from 'lucide-react';
import UpcomingDeadlines from '@/components/tools/UpcomingDeadlines';
import { tools } from '@/lib/tools';

const iconTone = ['bg-primary-500 text-white', 'bg-sun-400 text-primary-950', 'bg-blue-500 text-white'];

const icons = { 'paye-calculator': Calculator, 'small-company-check': Building2, 'tax-calendar': CalendarDays } as const;

export default function ToolsTeaser() {
    return (
        <section className="bg-primary-900 py-20 text-white lg:py-28">
            <div className="container grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
                <div>
                    <h2 className="text-3xl text-white md:text-4xl">Work it out yourself</h2>
                    <p className="mt-4 text-lg text-primary-100">Quick answers on the 2026 rules. Nothing to sign up for.</p>
                    <ul className="mt-8 space-y-3">
                        {tools.map((t, i) => {
                            const Icon = icons[t.slug as keyof typeof icons];
                            return (
                                <li key={t.slug}>
                                    <Link href={`/tools/${t.slug}`} className="group flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-sun-400">
                                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:-rotate-6 ${iconTone[i]}`}>
                                            <Icon className="h-5 w-5" />
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="block font-medium text-neutral-900">{t.name}</span>
                                            <span className="mt-1 block text-sm text-neutral-600">{t.summary}</span>
                                        </span>
                                        <ArrowUpRight className="h-5 w-5 shrink-0 text-neutral-300 transition-colors group-hover:text-primary-700" />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div>
                    <div className="flex items-baseline justify-between">
                        <h3 className="text-lg text-white">Next tax deadlines</h3>
                        <Link href="/tools/tax-calendar" className="text-sm font-medium text-lime-300 hover:text-lime-200">Full calendar</Link>
                    </div>
                    <div className="mt-4">
                        <UpcomingDeadlines count={4} />
                    </div>
                </div>
            </div>
        </section>
    );
}
