'use client';

import { useEffect, useState } from 'react';
import { upcomingDeadlines, type Deadline } from '@/lib/tax';

const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function daysUntil(date: Date, today: Date) {
    const ms = date.getTime() - new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    return Math.round(ms / 86_400_000);
}

export default function UpcomingDeadlines({ count = 4, showDetail = true }: { count?: number; showDetail?: boolean }) {
    const [today, setToday] = useState<Date | null>(null);
    const [items, setItems] = useState<Deadline[]>([]);

    // Computed on the client so the list always reflects the visitor's current date.
    useEffect(() => {
        const now = new Date();
        setToday(now);
        setItems(upcomingDeadlines(now, count));
    }, [count]);

    if (!today) {
        return (
            <ul className="space-y-3" aria-busy="true">
                {Array.from({ length: count }).map((_, i) => (
                    <li key={i} className="h-[72px] animate-pulse rounded-lg bg-neutral-100" />
                ))}
            </ul>
        );
    }

    return (
        <ul className="space-y-3">
            {items.map((d) => {
                const days = daysUntil(d.date, today);
                const urgent = days <= 7;
                return (
                    <li key={`${d.title}-${d.date.toISOString()}`} className="flex items-center gap-4 rounded-lg border border-neutral-200 bg-white p-4 transition-colors hover:border-neutral-300">
                        <div className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-md ${urgent ? 'bg-primary-700 text-white' : 'bg-neutral-100 text-neutral-800'}`}>
                            <span className="text-[11px] font-medium uppercase leading-none tracking-wide opacity-80">{SHORT_MONTHS[d.date.getMonth()]}</span>
                            <span className="mt-1 text-xl font-semibold leading-none tabular-nums">{d.date.getDate()}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                                <p className="font-medium text-neutral-900">{d.title}</p>
                                <p className={`text-sm tabular-nums ${urgent ? 'font-medium text-primary-700' : 'text-neutral-500'}`}>
                                    {days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `In ${days} days`}
                                </p>
                            </div>
                            {showDetail && <p className="mt-0.5 text-sm text-neutral-600">{d.detail}</p>}
                            <p className="mt-1 text-xs text-neutral-400">{d.authority}</p>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
