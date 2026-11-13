'use client';

import { useId } from 'react';

export default function MoneyInput({
    label,
    value,
    onChange,
    hint,
    suffix,
}: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    hint?: string;
    suffix?: string;
}) {
    const id = useId();
    return (
        <div>
            <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-neutral-800">{label}</label>
            <div className="flex h-11 items-center rounded-md border border-neutral-300 bg-white transition focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-600/20">
                <span className="pl-3.5 text-neutral-400">₦</span>
                <input
                    id={id}
                    inputMode="numeric"
                    value={value ? value.toLocaleString('en-NG') : ''}
                    placeholder="0"
                    onChange={(e) => onChange(Number(e.target.value.replace(/[^0-9]/g, '')) || 0)}
                    className="h-full w-full bg-transparent px-2 text-neutral-900 tabular-nums outline-none placeholder:text-neutral-300"
                />
                {suffix && <span className="pr-3.5 text-sm text-neutral-400">{suffix}</span>}
            </div>
            {hint && <p className="mt-1.5 text-xs text-neutral-500">{hint}</p>}
        </div>
    );
}
