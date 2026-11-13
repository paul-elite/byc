import Link from 'next/link';
import { ArrowUpRight, Building2, Calculator, CalendarDays } from 'lucide-react';
import UpcomingDeadlines from '@/components/tools/UpcomingDeadlines';
import { tools } from '@/lib/tools';

const icons = { 'paye-calculator': Calculator, 'small-company-check': Building2, 'tax-calendar': CalendarDays } as const;

export default function ToolsTeaser() {
    return (
        <section className="bg-white py-20 lg:py-28">
            <div className="container grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
                <div>
                    <p className="eyebrow">Free tools</p>
                    <h2 className="mt-3 text-3xl text-neutral-900 md:text-4xl">Work it out yourself</h2>
                    <p className="mt-4 text-lg text-neutral-600">Quick answers on the 2026 rules. Nothing to sign up for.</p>
                    <ul className="mt-8 space-y-3">
                        {tools.map((t) => {
                            const Icon = icons[t.slug as keyof typeof icons];
                            return (
                                <li key={t.slug}>
                                    <Link href={`/tools/${t.slug}`} className="group flex items-start gap-4 rounded-xl border border-neutral-200 p-5 transition-all hover:border-primary-300 hover:bg-primary-50/30">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-700 group-hover:text-white">
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
                        <h3 className="text-lg text-neutral-900">Next tax deadlines</h3>
                        <Link href="/tools/tax-calendar" className="text-sm font-medium text-primary-700 hover:text-primary-800">Full calendar</Link>
                    </div>
                    <div className="mt-4">
                        <UpcomingDeadlines count={4} />
                    </div>
                </div>
            </div>
        </section>
    );
}
