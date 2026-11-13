'use client';

import { useMemo, useState } from 'react';
import { Check, X } from 'lucide-react';
import MoneyInput from '@/components/ui/MoneyInput';
import { classifyCompany, naira, SMALL_COMPANY_FIXED_ASSETS, SMALL_COMPANY_TURNOVER } from '@/lib/tax';

export default function SmallCompanyChecker() {
    const [turnover, setTurnover] = useState(80_000_000);
    const [assets, setAssets] = useState(30_000_000);
    const [profit, setProfit] = useState(12_000_000);
    const [professional, setProfessional] = useState(false);

    const r = useMemo(
        () => classifyCompany({ turnover, fixedAssets: assets, professionalServices: professional, assessableProfit: profit }),
        [turnover, assets, profit, professional]
    );

    const tests = [
        { ok: r.meetsTurnover, label: `Annual turnover of ${naira(SMALL_COMPANY_TURNOVER, { compact: true })} or less` },
        { ok: r.meetsAssets, label: `Fixed assets not above ${naira(SMALL_COMPANY_FIXED_ASSETS, { compact: true })}` },
        { ok: !professional, label: 'Not a professional services business' },
    ];

    return (
        <div className="grid overflow-hidden rounded-xl border border-neutral-200 bg-white lg:grid-cols-2">
            <div className="space-y-6 p-6 md:p-8">
                <h3 className="text-lg text-neutral-900">Your company</h3>
                <MoneyInput label="Annual turnover" value={turnover} onChange={setTurnover} />
                <MoneyInput label="Total fixed assets (cost or book value)" value={assets} onChange={setAssets} hint="Land, buildings, vehicles, equipment, furniture." />
                <MoneyInput label="Assessable profit (estimate)" value={profit} onChange={setProfit} hint="Used only to estimate the tax amounts." />
                <fieldset>
                    <legend className="mb-1.5 text-sm font-medium text-neutral-800">Do you sell professional services?</legend>
                    <p className="mb-3 text-xs text-neutral-500">For example legal, accounting, consulting, engineering or architectural services.</p>
                    <div className="inline-flex rounded-md border border-neutral-200 bg-neutral-50 p-0.5 text-sm">
                        {[false, true].map((v) => (
                            <button
                                key={String(v)}
                                type="button"
                                onClick={() => setProfessional(v)}
                                aria-pressed={professional === v}
                                className={`rounded px-4 py-1.5 transition-colors ${professional === v ? 'bg-white font-medium text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-800'}`}
                            >
                                {v ? 'Yes' : 'No'}
                            </button>
                        ))}
                    </div>
                </fieldset>
            </div>

            <div className="border-t border-neutral-200 bg-canvas p-6 md:p-8 lg:border-l lg:border-t-0" aria-live="polite">
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${r.isSmall ? 'bg-lime-200 text-primary-900' : 'bg-neutral-200 text-neutral-800'}`}>
                    <span className={`h-2 w-2 rounded-full ${r.isSmall ? 'bg-primary-600' : 'bg-neutral-500'}`} />
                    {r.isSmall ? 'Likely a small company' : 'Not a small company'}
                </span>

                <ul className="mt-6 space-y-3">
                    {tests.map((t) => (
                        <li key={t.label} className="flex items-center gap-3 text-[15px]">
                            <span className={`flex h-5 w-5 items-center justify-center rounded-full ${t.ok ? 'bg-primary-600 text-white' : 'bg-neutral-300 text-neutral-600'}`}>
                                {t.ok ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                            </span>
                            <span className={t.ok ? 'text-neutral-800' : 'text-neutral-500'}>{t.label}</span>
                        </li>
                    ))}
                </ul>

                <dl className="mt-8 divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white text-[15px]">
                    <div className="flex justify-between px-4 py-3">
                        <dt className="text-neutral-600">Company income tax ({r.isSmall ? '0%' : '30%'})</dt>
                        <dd className="font-medium tabular-nums text-neutral-900">{naira(r.cit)}</dd>
                    </div>
                    <div className="flex justify-between px-4 py-3">
                        <dt className="text-neutral-600">Development levy ({r.isSmall ? 'exempt' : '4%'})</dt>
                        <dd className="font-medium tabular-nums text-neutral-900">{naira(r.levy)}</dd>
                    </div>
                    <div className="flex justify-between bg-neutral-50 px-4 py-3">
                        <dt className="font-medium text-neutral-900">Estimated total</dt>
                        <dd className="font-semibold tabular-nums text-neutral-900">{naira(r.total)}</dd>
                    </div>
                </dl>

                <div className="mt-6 text-sm text-neutral-600">
                    <p className="font-medium text-neutral-900">You still need to</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                        <li>File an annual company income tax return, even at 0%</li>
                        {!r.isSmall && <li>File monthly VAT returns by the 21st</li>}
                        <li>Deduct and remit PAYE and withholding tax where they apply</li>
                        <li>Keep records that prove your turnover and asset figures</li>
                        {r.minimumEtrApplies && <li>Check the 15% minimum effective tax rate rule, which applies from ₦50bn turnover</li>}
                    </ul>
                </div>
                <p className="mt-6 text-xs text-neutral-500">
                    Indicative only, based on the Nigeria Tax Act 2025. Group structures, exempt income and
                    sector rules can change the answer.
                </p>
            </div>
        </div>
    );
}
