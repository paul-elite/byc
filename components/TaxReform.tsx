'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { brandTones } from '@/components/ui/BrandBars';

const tabs = [
    {
        id: 'individuals',
        label: 'Employees',
        stats: [
            ['₦800k', 'Annual income taxed at 0%'],
            ['25%', 'Top rate, above ₦50m'],
            ['₦500k', 'Maximum rent relief a year'],
        ],
        points: [
            'Six new bands replace the old ones: 0%, 15%, 18%, 21%, 23% and 25%.',
            'The consolidated relief allowance has been removed.',
            'You can deduct 20% of the rent you pay, up to ₦500,000, plus pension, NHF, NHIS, life insurance and home-loan interest.',
            'Employees must file their own annual return, even when PAYE is deducted.',
        ],
        link: { href: '/tools/paye-calculator', label: 'Calculate your PAYE' },
    },
    {
        id: 'small',
        label: 'Small companies',
        stats: [
            ['0%', 'Company income tax'],
            ['₦100m', 'Maximum annual turnover'],
            ['₦250m', 'Maximum fixed assets'],
        ],
        points: [
            'Small companies pay no company income tax, capital gains tax or development levy.',
            'Professional services businesses do not qualify, whatever their size.',
            'Small businesses do not file monthly VAT returns.',
            'You still file an annual tax return and remit PAYE and withholding tax.',
        ],
        link: { href: '/tools/small-company-check', label: 'Check if you qualify' },
    },
    {
        id: 'companies',
        label: 'Other companies',
        stats: [
            ['30%', 'Company income tax rate'],
            ['4%', 'Development levy on assessable profit'],
            ['15%', 'Minimum effective rate for the largest groups'],
        ],
        points: [
            'The separate medium-company rate is gone: companies are either small or pay the full rate.',
            'One 4% development levy replaces tertiary education tax and several other levies.',
            'Capital gains of companies are taxed in line with the company income tax rate.',
            'Companies with ₦50bn+ turnover, or in large multinational groups, face a 15% minimum effective tax rate.',
        ],
        link: { href: '/blog/nigeria-tax-reform-2026-what-changed-for-businesses', label: 'Read the full summary' },
    },
    {
        id: 'admin',
        label: 'Filing & admin',
        stats: [
            ['NRS', 'Replaced FIRS on 1 Jan 2026'],
            ['21st', 'Monthly VAT and WHT deadline'],
            ['10th', 'Monthly PAYE deadline (states)'],
        ],
        points: [
            'The Nigeria Revenue Service is now the federal tax authority.',
            'One Tax Administration Act sets registration, filing and penalty rules for every level of government.',
            'Penalties for late filing and payment are higher, and interest runs on unpaid tax.',
            'Every taxable person must register and hold a tax ID.',
        ],
        link: { href: '/tools/tax-calendar', label: 'See the tax calendar' },
    },
];

export default function TaxReform() {
    const [active, setActive] = useState(tabs[0].id);
    const tab = tabs.find((t) => t.id === active)!;

    return (
        <section className="bg-sun-100 py-20 lg:py-28">
            <div className="container">
                <div className="max-w-2xl">
                    <p className="eyebrow">New tax laws</p>
                    <h2 className="mt-3 text-3xl text-neutral-900 md:text-4xl">What changed on 1 January 2026</h2>
                    <p className="mt-4 text-lg text-neutral-600">
                        The Nigeria Tax Act and the Nigeria Tax Administration Act replaced most of the old tax
                        laws. Pick the part that applies to you.
                    </p>
                </div>

                <div className="mt-10 flex gap-1 overflow-x-auto border-b border-sun-300" role="tablist" aria-label="Who the changes affect">
                    {tabs.map((t) => (
                        <button
                            key={t.id}
                            role="tab"
                            id={`tab-${t.id}`}
                            aria-selected={active === t.id}
                            aria-controls={`panel-${t.id}`}
                            onClick={() => setActive(t.id)}
                            className={`-mb-px shrink-0 border-b-2 px-4 py-3 text-[15px] transition-colors ${active === t.id ? 'border-primary-700 font-medium text-primary-900' : 'border-transparent text-neutral-500 hover:text-neutral-900'}`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                <div key={tab.id} id={`panel-${tab.id}`} role="tabpanel" aria-labelledby={`tab-${tab.id}`} className="grid gap-10 pt-10 [animation:fadeUp_.4s_ease-out] lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                    <div className="grid gap-4 sm:grid-cols-3">
                        {tab.stats.map(([value, label], i) => (
                            <div key={label} className="rounded-xl bg-white p-6 shadow-[0_1px_2px_rgba(60,40,0,0.06)]">
                                <span aria-hidden className={`block h-1 w-8 rounded-full ${brandTones[i].solid}`} />
                                <p className={`mt-4 text-4xl font-semibold tracking-tight ${brandTones[i].text}`}>{value}</p>
                                <p className="mt-3 text-sm text-neutral-600">{label}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <ul className="space-y-3">
                            {tab.points.map((p) => (
                                <li key={p} className="flex gap-3 text-[15px] text-neutral-700">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                                    {p}
                                </li>
                            ))}
                        </ul>
                        <Link href={tab.link.href} className="mt-6 inline-flex items-center gap-2 font-medium text-primary-700 hover:text-primary-800">
                            {tab.link.label} <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
