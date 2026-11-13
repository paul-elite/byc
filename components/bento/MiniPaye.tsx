'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculatePaye, naira } from '@/lib/tax';

export default function MiniPaye() {
    const [monthly, setMonthly] = useState(500_000);
    const r = calculatePaye({
        grossAnnual: monthly * 12,
        pensionablePay: monthly * 12,
        contributesPension: true,
        basicAnnual: 0,
        contributesNhf: false,
        annualRent: 0,
        otherDeductions: 0,
    });
    const share = monthly > 0 ? r.monthlyTax / monthly : 0;

    return (
        <div className="flex h-full flex-col">
            <p className="text-sm text-primary-200">Quick PAYE check</p>
            <label htmlFor="mini-paye" className="mt-4 block text-sm text-primary-100">Monthly salary</label>
            <div className="mt-1.5 flex h-11 items-center rounded-lg bg-white/10 ring-1 ring-white/15 focus-within:ring-sun-300">
                <span className="pl-3 text-primary-200">₦</span>
                <input
                    id="mini-paye"
                    inputMode="numeric"
                    value={monthly ? monthly.toLocaleString('en-NG') : ''}
                    onChange={(e) => setMonthly(Number(e.target.value.replace(/[^0-9]/g, '')) || 0)}
                    className="h-full w-full bg-transparent px-2 text-white tabular-nums outline-none"
                />
            </div>
            <input
                type="range"
                min={50_000}
                max={3_000_000}
                step={10_000}
                value={Math.min(Math.max(monthly, 50_000), 3_000_000)}
                onChange={(e) => setMonthly(Number(e.target.value))}
                aria-label="Monthly salary slider"
                className="mt-4 w-full accent-sun-400"
            />
            <div className="mt-auto pt-6">
                <p className="text-sm text-primary-200">PAYE per month</p>
                <p className="text-4xl font-medium tabular-nums tracking-tight text-sun-300">{naira(r.monthlyTax)}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full origin-left rounded-full bg-sun-400 transition-transform duration-200 ease-out" style={{ transform: `scaleX(${Math.min(1, share * 4)})` }} />
                </div>
                <p className="mt-2 text-xs text-primary-200">{(share * 100).toFixed(1)}% of salary · after 8% pension</p>
                <Link href="/tools/paye-calculator" className="mt-4 inline-block text-sm font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">Full calculator →</Link>
            </div>
        </div>
    );
}
