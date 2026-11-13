'use client';

import { useMemo, useState } from 'react';
import { newRegimeTax, oldRegimeTax, naira } from '@/lib/tax';
import { useWidth } from './useWidth';

// Validated pair (dataviz validator, light surface): 2026 = primary-700, old = sun-600.
const NEW = '#127a3e';
const OLD = '#c98a0c';
const GRID = '#ece6d6';
const MAX_X = 60_000_000;
const STEP = 250_000;

const points = Array.from({ length: MAX_X / STEP }, (_, i) => {
    const g = (i + 1) * STEP;
    return { g, newRate: newRegimeTax(g) / g, oldRate: oldRegimeTax(g) / g };
});
const crossover = points.find((p) => p.g > 3_000_000 && p.newRate > p.oldRate)?.g ?? 0;

const pct = (v: number) => `${(v * 100).toFixed(1)}%`;

export default function EffectiveRateChart({ height = 300, compact = false }: { height?: number; compact?: boolean }) {
    const [ref, width] = useWidth<HTMLDivElement>();
    const [hover, setHover] = useState<number | null>(null);
    const [showTable, setShowTable] = useState(false);

    const m = { top: 16, right: compact ? 56 : 84, bottom: 32, left: 40 };
    const w = Math.max(240, width) - m.left - m.right;
    const h = height - m.top - m.bottom;
    const x = (g: number) => (g / MAX_X) * w;
    const y = (r: number) => h - (r / 0.25) * h;

    const paths = useMemo(() => {
        const line = (key: 'newRate' | 'oldRate') => points.map((p, i) => `${i ? 'L' : 'M'}${x(p.g).toFixed(1)},${y(p[key]).toFixed(1)}`).join('');
        return { n: line('newRate'), o: line('oldRate') };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [w, h]);

    const xTicks = compact ? [0, 20e6, 40e6, 60e6] : [0, 10e6, 20e6, 30e6, 40e6, 50e6, 60e6];
    const yTicks = [0, 0.05, 0.1, 0.15, 0.2, 0.25];
    const last = points[points.length - 1];
    const hp = hover !== null ? points[hover] : null;

    const onMove = (e: React.PointerEvent<SVGRectElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const g = ((e.clientX - rect.left) / rect.width) * MAX_X;
        setHover(Math.min(points.length - 1, Math.max(0, Math.round(g / STEP) - 1)));
    };

    return (
        <figure className="m-0">
            <div className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-neutral-600" aria-hidden>
                <span className="flex items-center gap-2"><span className="h-0.5 w-5 rounded-full" style={{ background: NEW }} />2026 rules</span>
                <span className="flex items-center gap-2"><span className="h-0.5 w-5 rounded-full" style={{ background: OLD }} />Old rules</span>
            </div>
            <div ref={ref} className="relative w-full select-none">
                <svg width={width} height={height} role="img" aria-label={`Effective PAYE rate by annual gross income. The 2026 rules are lower than the old rules below about ${naira(crossover, { compact: true })} a year and higher above it.`}>
                    <g transform={`translate(${m.left},${m.top})`}>
                        {yTicks.map((t) => (
                            <g key={t}>
                                <line x1={0} x2={w} y1={y(t)} y2={y(t)} stroke={GRID} strokeWidth={1} />
                                <text x={-8} y={y(t)} dy="0.32em" textAnchor="end" className="fill-neutral-500 text-[11px] tabular-nums">{t * 100}%</text>
                            </g>
                        ))}
                        {xTicks.map((t) => (
                            <text key={t} x={x(t)} y={h + 20} textAnchor={t === 0 ? 'start' : t === MAX_X ? 'end' : 'middle'} className="fill-neutral-500 text-[11px] tabular-nums">
                                {t === 0 ? '₦0' : `₦${t / 1e6}m`}
                            </text>
                        ))}
                        {crossover > 0 && (
                            <g>
                                <line x1={x(crossover)} x2={x(crossover)} y1={y(0.25)} y2={h} stroke="#d1c6aa" strokeWidth={1} />
                                {!compact && <text x={x(crossover) + 6} y={y(0.245)} className="fill-neutral-500 text-[11px]">Lines cross at {naira(crossover, { compact: true })}</text>}
                            </g>
                        )}
                        <path d={paths.o} fill="none" stroke={OLD} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                        <path d={paths.n} fill="none" stroke={NEW} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                        {/* end labels (text tokens, not series colour) */}
                        <circle cx={x(last.g)} cy={y(last.newRate)} r={4} fill={NEW} stroke="#fff" strokeWidth={2} />
                        <circle cx={x(last.g)} cy={y(last.oldRate)} r={4} fill={OLD} stroke="#fff" strokeWidth={2} />
                        <text x={x(last.g) + 8} y={y(last.newRate)} dy="0.32em" className="fill-neutral-900 text-[12px] font-medium tabular-nums">{pct(last.newRate)}</text>
                        <text x={x(last.g) + 8} y={y(last.oldRate)} dy="0.32em" className="fill-neutral-600 text-[12px] tabular-nums">{pct(last.oldRate)}</text>
                        {hp && (
                            <g pointerEvents="none">
                                <line x1={x(hp.g)} x2={x(hp.g)} y1={0} y2={h} stroke="#a69c80" strokeWidth={1} />
                                <circle cx={x(hp.g)} cy={y(hp.newRate)} r={4.5} fill={NEW} stroke="#fff" strokeWidth={2} />
                                <circle cx={x(hp.g)} cy={y(hp.oldRate)} r={4.5} fill={OLD} stroke="#fff" strokeWidth={2} />
                            </g>
                        )}
                        <rect x={0} y={0} width={w} height={h} fill="transparent" onPointerMove={onMove} onPointerLeave={() => setHover(null)} style={{ cursor: 'crosshair' }} />
                    </g>
                </svg>
                {hp && (
                    <div
                        className="pointer-events-none absolute z-10 w-48 rounded-lg border border-neutral-200 bg-white p-3 text-xs shadow-lg"
                        style={{ left: Math.min(m.left + x(hp.g) + 12, width - 200), top: m.top + 4 }}
                    >
                        <p className="font-medium text-neutral-900">{naira(hp.g)} a year</p>
                        <p className="mt-2 flex items-center justify-between gap-3 text-neutral-700"><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: NEW }} />2026</span><span className="tabular-nums">{pct(hp.newRate)} · {naira(newRegimeTax(hp.g), { compact: true })}</span></p>
                        <p className="mt-1 flex items-center justify-between gap-3 text-neutral-700"><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: OLD }} />Old</span><span className="tabular-nums">{pct(hp.oldRate)} · {naira(oldRegimeTax(hp.g), { compact: true })}</span></p>
                    </div>
                )}
            </div>
            <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
                <span>Annual gross income with no pension, rent or other deductions.</span>
                <button type="button" onClick={() => setShowTable(!showTable)} className="font-medium text-primary-700 hover:text-primary-800">{showTable ? 'Hide table' : 'Show as table'}</button>
            </figcaption>
            {showTable && (
                <table className="mt-3 w-full text-left text-sm">
                    <thead><tr className="border-b border-neutral-200 text-neutral-500"><th className="py-2 font-medium">Annual gross</th><th className="py-2 font-medium">2026 rate</th><th className="py-2 font-medium">Old rate</th></tr></thead>
                    <tbody>
                        {[1e6, 3e6, 5e6, 10e6, 20e6, 30e6, 50e6].map((g) => (
                            <tr key={g} className="border-b border-neutral-100 tabular-nums"><td className="py-2">{naira(g)}</td><td className="py-2">{pct(newRegimeTax(g) / g)}</td><td className="py-2">{pct(oldRegimeTax(g) / g)}</td></tr>
                        ))}
                    </tbody>
                </table>
            )}
        </figure>
    );
}
