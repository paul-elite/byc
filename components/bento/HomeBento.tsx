import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Building2, CalendarDays, Calculator } from 'lucide-react';
import EffectiveRateChart from '@/components/charts/EffectiveRateChart';
import MiniPaye from './MiniPaye';
import NextDeadline from './NextDeadline';
import { photos } from '@/lib/images';
import { newRegimeTax, oldRegimeTax } from '@/lib/tax';

const compare = [3_000_000, 12_000_000, 30_000_000].map((g) => ({ g, n: newRegimeTax(g) / g, o: oldRegimeTax(g) / g }));

const tile = 'rounded-3xl p-6 lg:p-7';

const toolLinks = [
    { href: '/tools/paye-calculator', label: 'PAYE calculator', note: 'Monthly tax and take-home pay', icon: Calculator, tone: 'bg-primary-500 text-white' },
    { href: '/tools/small-company-check', label: 'Small company checker', note: 'Do you pay 0% company tax?', icon: Building2, tone: 'bg-sun-400 text-primary-950' },
    { href: '/tools/tax-calendar', label: 'Tax deadline calendar', note: 'Every monthly and annual date', icon: CalendarDays, tone: 'bg-blue-500 text-white' },
];

export default function HomeBento() {
    return (
        <section className="bg-white py-20 lg:py-28">
            <div className="container">
                <div className="max-w-2xl">
                    <h2 className="text-3xl text-neutral-900 md:text-4xl">Nigeria’s 2026 tax rules at a glance</h2>
                    <p className="mt-4 text-lg text-neutral-600">For businesses and employees in Nigeria: what the new tax laws mean in numbers, and what is due next.</p>
                </div>

                <div className="mt-12 grid gap-4 md:grid-cols-6">
                    {/* Chart: the large tile */}
                    <div className={`${tile} border border-neutral-200 bg-white md:col-span-4 md:row-span-2`}>
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <h3 className="text-xl text-neutral-900">Who pays more under the new PAYE rules?</h3>
                                <p className="mt-1 text-sm text-neutral-600">Effective tax rate by annual salary. Hover to compare.</p>
                            </div>
                            <Link href="/blog/paye-under-the-nigeria-tax-act-2025" className="text-sm font-medium text-primary-700 hover:text-primary-800">Read the guide →</Link>
                        </div>
                        <div className="mt-6">
                            <EffectiveRateChart height={300} />
                        </div>
                        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
                            {compare.map(({ g, n, o }) => {
                                const lower = n < o;
                                return (
                                    <div key={g} className="rounded-2xl bg-neutral-50 p-4">
                                        <dt className="text-sm text-neutral-500">₦{g / 1e6}m a year</dt>
                                        <dd className="mt-1 flex items-baseline gap-2">
                                            <span className="text-2xl font-medium tabular-nums tracking-tight text-neutral-900">{(n * 100).toFixed(1)}%</span>
                                            <span className="text-sm tabular-nums text-neutral-500 line-through decoration-neutral-300">{(o * 100).toFixed(1)}%</span>
                                        </dd>
                                        <dd className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${lower ? 'bg-primary-100 text-primary-800' : 'bg-red-50 text-red-700'}`}>
                                            {lower ? 'Pays less in 2026' : 'Pays more in 2026'}
                                        </dd>
                                    </div>
                                );
                            })}
                        </dl>
                    </div>

                    {/* Mini calculator: the one dark tile */}
                    <div className={`${tile} bg-primary-900 text-white md:col-span-2`}>
                        <MiniPaye />
                    </div>

                    {/* Next deadline */}
                    <div className={`${tile} bg-neutral-100 md:col-span-2`}>
                        <NextDeadline />
                    </div>

                    {/* Small company stat */}
                    <Link href="/tools/small-company-check" className={`${tile} group relative overflow-hidden bg-mist md:col-span-2`}>
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-500 text-primary-950 transition-transform duration-200 ease-out motion-safe:group-hover:-rotate-6"><Building2 className="h-5 w-5" /></span>
                        <p className="mt-6 text-5xl font-medium tracking-tight text-neutral-900">0%</p>
                        <p className="mt-2 text-[15px] text-neutral-700">Company income tax for small companies: turnover up to ₦100m and fixed assets up to ₦250m.</p>
                        <p className="mt-4 text-sm font-medium text-primary-700">Check if you qualify →</p>
                        <span aria-hidden className="absolute -bottom-6 -right-6 h-28 w-28 rounded-full border-[14px] border-lime-500/25" />
                    </Link>

                    {/* Development levy stat */}
                    <div className={`${tile} border border-neutral-200 bg-neutral-50 md:col-span-2`}>
                        <div className="flex items-baseline gap-2">
                            <p className="text-5xl font-medium tracking-tight text-neutral-900">4%</p>
                            <p className="text-sm text-neutral-500">of assessable profit</p>
                        </div>
                        <p className="mt-2 text-[15px] text-neutral-700">One development levy replaces tertiary education tax and several other levies.</p>
                        <div className="mt-5 flex h-2 gap-0.5 overflow-hidden rounded-full" aria-hidden>
                            <span className="w-[88%] bg-primary-600" />
                            <span className="w-[12%] bg-sun-500" />
                        </div>
                        <p className="mt-2 text-xs text-neutral-500">30% CIT + 4% levy on profit for companies that are not small</p>
                    </div>

                    {/* Photo + team */}
                    <div className="relative min-h-64 overflow-hidden rounded-3xl bg-loader md:col-span-2">
                        <Image src={photos.team.src} alt={photos.team.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                        <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/95 p-4 backdrop-blur">
                            <p className="text-sm text-neutral-900">
                                <span className="font-medium">3 partners · 12 accountants</span>
                                <br />
                                <span className="text-neutral-600">Offices in Abuja and Ilorin, Nigeria</span>
                            </p>
                        </div>
                    </div>

                    {/* Tools row */}
                    <div className={`${tile} border border-neutral-200 bg-white md:col-span-6`}>
                        <div className="grid gap-3 md:grid-cols-3">
                            {toolLinks.map(({ href, label, note, icon: Icon, tone }) => (
                                <Link key={href} href={href} className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-neutral-50">
                                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 ease-out motion-safe:group-hover:-rotate-6 ${tone}`}>
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block font-medium text-neutral-900">{label}</span>
                                        <span className="block text-sm text-neutral-500">{note}</span>
                                    </span>
                                    <ArrowUpRight className="h-5 w-5 text-neutral-300 group-hover:text-primary-700" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
