'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { upcomingDeadlines } from '@/lib/tax';
import { useToday } from '@/lib/useToday';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function NextDeadline() {
    const today = useToday();
    const t = today?.getTime();
    const items = useMemo(() => (t ? upcomingDeadlines(new Date(t), 3) : []), [t]);

    if (!today || !items.length) return <div className="h-full min-h-40 animate-pulse rounded-xl bg-loader" />;

    const [next, ...rest] = items;
    const days = Math.round((next.date.getTime() - new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()) / 86_400_000);
    const urgent = days <= 7;

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-500">Next tax deadline</p>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${urgent ? 'bg-red-100 text-red-700' : 'bg-sun-100 text-sun-800'}`}>
                    {days === 0 ? 'Today' : `${days} day${days === 1 ? '' : 's'}`}
                </span>
            </div>
            <div className="mt-4 flex items-end gap-3">
                <p className="text-5xl font-medium tabular-nums tracking-tight text-neutral-900">{next.date.getDate()}</p>
                <p className="pb-1.5 text-lg text-neutral-500">{MONTHS[next.date.getMonth()]}</p>
            </div>
            <p className="mt-1 font-medium text-neutral-900">{next.title}</p>
            <ul className="mt-auto space-y-1.5 border-t border-neutral-200 pt-4 text-sm">
                {rest.map((d) => (
                    <li key={d.title + d.date.toISOString()} className="flex justify-between gap-3 text-neutral-600">
                        <span className="truncate">{d.title}</span>
                        <span className="shrink-0 tabular-nums text-neutral-500">{d.date.getDate()} {MONTHS[d.date.getMonth()]}</span>
                    </li>
                ))}
            </ul>
            <Link href="/tools/tax-calendar" className="mt-3 text-sm font-medium text-primary-700 hover:text-primary-800">Full calendar →</Link>
        </div>
    );
}
