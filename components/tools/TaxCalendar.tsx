'use client';

import { useEffect, useState } from 'react';
import { deadlinesForMonth } from '@/lib/tax';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function TaxCalendar() {
    const [year, setYear] = useState(2026);
    const [month, setMonth] = useState(0);
    const [today, setToday] = useState<Date | null>(null);

    useEffect(() => {
        const now = new Date();
        setToday(now);
        setYear(now.getFullYear());
        setMonth(now.getMonth());
    }, []);

    const items = deadlinesForMonth(year, month);
    const isPast = (d: Date) => !!today && d < new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return (
        <div className="rounded-xl border border-neutral-200 bg-white">
            <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
                <button type="button" onClick={() => setYear(year - 1)} className="rounded-md px-2 py-1 text-sm text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900" aria-label="Previous year">←</button>
                <p className="font-medium tabular-nums text-neutral-900">{year}</p>
                <button type="button" onClick={() => setYear(year + 1)} className="rounded-md px-2 py-1 text-sm text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900" aria-label="Next year">→</button>
            </div>
            <div className="grid grid-cols-6 gap-1 border-b border-neutral-200 p-3 sm:grid-cols-12" role="tablist" aria-label="Month">
                {MONTHS.map((m, i) => {
                    const active = i === month;
                    const isCurrent = today && today.getFullYear() === year && today.getMonth() === i;
                    const hasAnnual = i === 0 || i === 5;
                    return (
                        <button
                            key={m}
                            type="button"
                            role="tab"
                            aria-selected={active}
                            onClick={() => setMonth(i)}
                            className={`relative rounded-md py-2 text-sm transition-colors ${active ? 'bg-primary-700 font-medium text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
                        >
                            {m}
                            {hasAnnual && <span className={`absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full ${active ? 'bg-white' : 'bg-primary-500'}`} aria-hidden />}
                            {isCurrent && !active && <span className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-primary-500" aria-hidden />}
                        </button>
                    );
                })}
            </div>
            <ol className="divide-y divide-neutral-100" role="tabpanel">
                {items.map((d) => (
                    <li key={d.title} className={`grid gap-1 px-5 py-4 sm:grid-cols-[5.5rem_1fr] sm:gap-6 ${isPast(d.date) ? 'opacity-50' : ''}`}>
                        <p className="text-sm font-medium tabular-nums text-neutral-900">
                            {d.date.getDate()} {MONTHS[d.date.getMonth()]}
                        </p>
                        <div>
                            <p className="flex flex-wrap items-center gap-2 font-medium text-neutral-900">
                                {d.title}
                                {d.kind === 'annual' && <span className="rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700">Annual</span>}
                                {isPast(d.date) && <span className="text-xs font-normal text-neutral-500">Passed</span>}
                            </p>
                            <p className="mt-1 text-sm text-neutral-600">{d.detail}</p>
                            <p className="mt-1 text-xs text-neutral-400">{d.authority}</p>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}
