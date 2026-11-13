'use client';

import { useMemo, useState } from 'react';
import MoneyInput from '@/components/ui/MoneyInput';
import { calculatePaye, naira, percent } from '@/lib/tax';

const presets = [150_000, 400_000, 900_000, 2_500_000];
const bandShades = ['bg-white/25', 'bg-sun-200', 'bg-sun-400', 'bg-lime-500', 'bg-leaf-500', 'bg-primary-300'];

export default function PayeCalculator({ compact = false }: { compact?: boolean }) {
    const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly');
    const [gross, setGross] = useState(400_000);
    const [pensionable, setPensionable] = useState<number | null>(null);
    const [pension, setPension] = useState(true);
    const [nhf, setNhf] = useState(false);
    const [basic, setBasic] = useState(0);
    const [rent, setRent] = useState(0);
    const [other, setOther] = useState(0);
    const [showMore, setShowMore] = useState(false);

    const factor = period === 'monthly' ? 12 : 1;

    const result = useMemo(() => {
        const grossAnnual = gross * factor;
        return calculatePaye({
            grossAnnual,
            pensionablePay: (pensionable ?? gross) * factor,
            contributesPension: pension,
            basicAnnual: (basic || gross * 0.4) * factor,
            contributesNhf: nhf,
            annualRent: rent,
            otherDeductions: other,
        });
    }, [gross, pensionable, pension, nhf, basic, rent, other, factor]);

    const grossAnnual = gross * factor;
    const usedBands = result.bands.filter((b) => b.taxable > 0);

    return (
        <div className={`grid overflow-hidden rounded-xl border border-neutral-200 bg-white ${compact ? 'lg:grid-cols-2' : 'lg:grid-cols-[1.05fr_0.95fr]'}`}>
            {/* Inputs */}
            <div className="space-y-6 p-6 md:p-8">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg text-neutral-900">Your income</h3>
                    <div className="inline-flex rounded-md border border-neutral-200 bg-neutral-50 p-0.5 text-sm" role="group" aria-label="Income period">
                        {(['monthly', 'annual'] as const).map((p) => (
                            <button
                                key={p}
                                type="button"
                                onClick={() => {
                                    if (p === period) return;
                                    setGross(p === 'annual' ? gross * 12 : Math.round(gross / 12));
                                    if (pensionable !== null) setPensionable(p === 'annual' ? pensionable * 12 : Math.round(pensionable / 12));
                                    if (basic) setBasic(p === 'annual' ? basic * 12 : Math.round(basic / 12));
                                    setPeriod(p);
                                }}
                                aria-pressed={period === p}
                                className={`rounded px-3 py-1.5 capitalize transition-colors ${period === p ? 'bg-white font-medium text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-800'}`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                <MoneyInput label={`Gross salary (${period})`} value={gross} onChange={setGross} hint="Total pay before any deductions, including allowances." />

                <div className="flex flex-wrap gap-2">
                    {presets.map((p) => {
                        const v = period === 'monthly' ? p : p * 12;
                        return (
                            <button
                                key={p}
                                type="button"
                                onClick={() => setGross(v)}
                                className={`rounded-full border px-3 py-1 text-sm tabular-nums transition-colors ${gross === v ? 'border-sun-400 bg-sun-100 text-sun-800' : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'}`}
                            >
                                {naira(v, { compact: true })}
                            </button>
                        );
                    })}
                </div>

                <MoneyInput label="Annual rent you pay" value={rent} onChange={setRent} hint="Rent relief is 20% of annual rent, up to ₦500,000. Keep your tenancy agreement or receipts." />

                <label className="flex cursor-pointer items-start gap-3">
                    <input type="checkbox" checked={pension} onChange={(e) => setPension(e.target.checked)} className="mt-1 h-4 w-4 accent-primary-700" />
                    <span className="text-sm text-neutral-700">
                        <span className="font-medium text-neutral-900">I contribute to a pension (8%)</span>
                        <br />Employee contribution under the Pension Reform Act.
                    </span>
                </label>

                <button type="button" onClick={() => setShowMore(!showMore)} className="text-sm font-medium text-primary-700 hover:text-primary-800" aria-expanded={showMore}>
                    {showMore ? 'Hide' : 'Show'} more deductions
                </button>

                {showMore && (
                    <div className="space-y-5 rounded-lg bg-neutral-50 p-5">
                        <MoneyInput
                            label={`Pensionable pay (${period})`}
                            value={pensionable ?? gross}
                            onChange={setPensionable}
                            hint="Basic + housing + transport. Defaults to your gross salary."
                        />
                        <label className="flex cursor-pointer items-center gap-3 text-sm text-neutral-800">
                            <input type="checkbox" checked={nhf} onChange={(e) => setNhf(e.target.checked)} className="h-4 w-4 accent-primary-700" />
                            I contribute to the National Housing Fund (2.5% of basic)
                        </label>
                        {nhf && (
                            <MoneyInput label={`Basic salary (${period})`} value={basic} onChange={setBasic} hint="If left blank we assume 40% of gross." />
                        )}
                        <MoneyInput label="Other annual deductions" value={other} onChange={setOther} hint="NHIS, life insurance premiums, interest on a loan for your own home." />
                    </div>
                )}
            </div>

            {/* Results */}
            <div className="relative bg-primary-900 p-6 text-white md:p-8" aria-live="polite">
                <p className="text-sm text-primary-200">Estimated PAYE per month</p>
                <p className="mt-1 text-4xl font-semibold tabular-nums tracking-tight text-sun-300 md:text-5xl">{naira(result.monthlyTax)}</p>
                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                    <div>
                        <dt className="text-sm text-primary-200">Take-home per month</dt>
                        <dd className="mt-1 text-xl font-medium tabular-nums">{naira(result.takeHomeMonthly)}</dd>
                    </div>
                    <div>
                        <dt className="text-sm text-primary-200">Effective tax rate</dt>
                        <dd className="mt-1 text-xl font-medium tabular-nums">{percent(result.effectiveRate)}</dd>
                    </div>
                </dl>

                <div className="mt-8">
                    <p className="text-sm text-primary-200">How your chargeable income is taxed</p>
                    <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-white/10">
                        {usedBands.map((b, i) => (
                            <div
                                key={b.from}
                                className={`${bandShades[result.bands.indexOf(b)]} h-full ${i > 0 ? 'border-l border-primary-900' : ''}`}
                                style={{ width: `${(b.taxable / Math.max(result.chargeable, 1)) * 100}%` }}
                            />
                        ))}
                    </div>
                    <table className="mt-4 w-full text-sm">
                        <tbody>
                            {result.bands.map((b, i) => (
                                <tr key={b.from} className={`border-b border-white/10 ${b.taxable === 0 ? 'text-white/35' : ''}`}>
                                    <td className="py-2">
                                        <span className={`mr-2 inline-block h-2 w-2 rounded-full ${bandShades[i]}`} />
                                        {b.to === Infinity ? `Above ${naira(b.from, { compact: true })}` : `${naira(b.from, { compact: true })} – ${naira(b.to, { compact: true })}`}
                                    </td>
                                    <td className="py-2 text-right tabular-nums">{percent(b.rate, 0)}</td>
                                    <td className="py-2 text-right tabular-nums">{naira(b.tax)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {!compact && (
                    <dl className="mt-6 space-y-1.5 text-sm">
                        {([
                            ['Gross income (annual)', grossAnnual, true],
                            ['Pension', -result.pension, false],
                            ['NHF', -result.nhf, false],
                            ['Rent relief', -result.rent, false],
                            ['Other deductions', -result.other, false],
                            ['Chargeable income', result.chargeable, true],
                            ['Annual tax', result.tax, true],
                        ] as [string, number, boolean][])
                            .filter(([, v, always]) => always || v !== 0)
                            .map(([label, v]) => (
                                <div key={label} className="flex justify-between">
                                    <dt className="text-primary-200">{label}</dt>
                                    <dd className="tabular-nums">{v < 0 ? `– ${naira(-v)}` : naira(v)}</dd>
                                </div>
                            ))}
                    </dl>
                )}

                <p className="mt-6 text-xs leading-relaxed text-primary-200/80">
                    Estimate only, based on the Nigeria Tax Act 2025 bands in force from 1 January 2026. Your
                    employer’s payroll may differ. Not tax advice.
                </p>
            </div>
        </div>
    );
}
