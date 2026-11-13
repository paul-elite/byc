'use client';

import { useState } from 'react';
import { CIT_RATE, DEVELOPMENT_LEVY_RATE, naira } from '@/lib/tax';
import { useWidth } from './useWidth';

// Same validated pair as the PAYE chart: company income tax = primary-700, levy = sun-600.
const CIT = '#127a3e';
const LEVY = '#c98a0c';
const GRID = '#ece6d6';
const profits = [5e6, 10e6, 20e6, 35e6, 50e6];
const MAX = 20e6;

export default function CompanyTaxChart({ height = 280 }: { height?: number }) {
    const [ref, width] = useWidth<HTMLDivElement>();
    const [hover, setHover] = useState<number | null>(null);

    const m = { top: 24, right: 8, bottom: 40, left: 44 };
    const w = Math.max(260, width) - m.left - m.right;
    const h = height - m.top - m.bottom;
    const band = w / profits.length;
    const barW = Math.min(24, band * 0.5);
    const y = (v: number) => h - (v / MAX) * h;
    const yTicks = [0, 5e6, 10e6, 15e6, 20e6];

    return (
        <figure className="m-0">
            <div className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-neutral-600" aria-hidden>
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: CIT }} />Company income tax (30%)</span>
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: LEVY }} />Development levy (4%)</span>
            </div>
            <div ref={ref} className="relative w-full">
                <svg width={width} height={height} role="img" aria-label="Tax payable by a company that is not a small company, at five profit levels. A small company pays nothing at every level.">
                    <g transform={`translate(${m.left},${m.top})`}>
                        {yTicks.map((t) => (
                            <g key={t}>
                                <line x1={0} x2={w} y1={y(t)} y2={y(t)} stroke={GRID} />
                                <text x={-8} y={y(t)} dy="0.32em" textAnchor="end" className="fill-neutral-500 text-[11px] tabular-nums">{t === 0 ? '₦0' : `₦${t / 1e6}m`}</text>
                            </g>
                        ))}
                        {profits.map((p, i) => {
                            const cit = p * CIT_RATE;
                            const levy = p * DEVELOPMENT_LEVY_RATE;
                            const cx = band * i + band / 2;
                            const citTop = y(cit);
                            const levyTop = y(cit + levy);
                            const r = 4;
                            return (
                                <g key={p} onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)} opacity={hover === null || hover === i ? 1 : 0.45} className="transition-opacity">
                                    <rect x={cx - band / 2} y={0} width={band} height={h} fill="transparent" />
                                    <rect x={cx - barW / 2} y={citTop} width={barW} height={h - citTop} fill={CIT} />
                                    {/* levy on top with 2px surface gap and rounded data-end */}
                                    <path d={`M${cx - barW / 2},${citTop - 2} V${levyTop + r} Q${cx - barW / 2},${levyTop} ${cx - barW / 2 + r},${levyTop} H${cx + barW / 2 - r} Q${cx + barW / 2},${levyTop} ${cx + barW / 2},${levyTop + r} V${citTop - 2} Z`} fill={LEVY} />
                                    <text x={cx} y={levyTop - 8} textAnchor="middle" className="fill-neutral-900 text-[12px] font-medium tabular-nums">{naira(cit + levy, { compact: true })}</text>
                                    <text x={cx} y={h + 18} textAnchor="middle" className="fill-neutral-500 text-[11px] tabular-nums">{`₦${p / 1e6}m`}</text>
                                </g>
                            );
                        })}
                        <text x={w / 2} y={h + 34} textAnchor="middle" className="fill-neutral-500 text-[11px]">Assessable profit</text>
                    </g>
                </svg>
                {hover !== null && (
                    <div className="pointer-events-none absolute z-10 w-52 rounded-lg border border-neutral-200 bg-white p-3 text-xs shadow-lg" style={{ left: Math.min(m.left + (w / profits.length) * hover + 8, width - 216), top: 4 }}>
                        <p className="font-medium text-neutral-900">Profit of {naira(profits[hover])}</p>
                        <p className="mt-2 flex justify-between text-neutral-700"><span>Company income tax</span><span className="tabular-nums">{naira(profits[hover] * CIT_RATE)}</span></p>
                        <p className="mt-1 flex justify-between text-neutral-700"><span>Development levy</span><span className="tabular-nums">{naira(profits[hover] * DEVELOPMENT_LEVY_RATE)}</span></p>
                        <p className="mt-1 flex justify-between border-t border-neutral-100 pt-1 font-medium text-neutral-900"><span>Small company</span><span>₦0</span></p>
                    </div>
                )}
            </div>
            <figcaption className="mt-2 text-xs text-neutral-500">A company that is not a small company. A qualifying small company pays ₦0 at every level shown.</figcaption>
        </figure>
    );
}
