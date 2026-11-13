import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpenCheck, Building2, Calculator, FileSearch, Percent, ShieldCheck } from 'lucide-react';
import { services } from '@/lib/services';

const look: Record<string, { icon: typeof Calculator; tile: string; card: string }> = {
    accounting: { icon: Calculator, tile: 'bg-primary-500 text-white', card: 'bg-white' },
    'audit-and-assurance': { icon: FileSearch, tile: 'bg-blue-500 text-white', card: 'bg-white' },
    'tax-advisory': { icon: Percent, tile: 'bg-sun-400 text-primary-950', card: 'bg-white' },
    'corporate-secretarial': { icon: Building2, tile: 'bg-lime-500 text-primary-950', card: 'bg-white' },
    'internal-control': { icon: ShieldCheck, tile: 'bg-leaf-500 text-white', card: 'bg-white' },
    'finance-training': { icon: BookOpenCheck, tile: 'bg-primary-700 text-white', card: 'bg-white' },
};

export default function Services() {
    return (
        <section id="services" className="bg-mist py-20 lg:py-28">
            <div className="container">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl text-neutral-900 md:text-4xl">What we do</h2>
                        <p className="mt-4 text-lg text-neutral-600">
                            Most clients start with one service — an audit, a tax problem, a set of accounts — and
                            stay with us for the rest.
                        </p>
                    </div>
                    <Link href="/services" className="inline-flex items-center gap-2 font-medium text-primary-700 hover:text-primary-800">
                        All services <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => {
                        const l = look[service.slug];
                        const Icon = l.icon;
                        return (
                            <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className={`group relative flex flex-col rounded-2xl border border-neutral-200/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_-18px_rgba(60,40,0,0.35)] ${l.card}`}
                            >
                                <div className="flex items-start justify-between">
                                    <span className={`flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 ${l.tile}`}>
                                        <Icon className="h-6 w-6" strokeWidth={1.75} />
                                    </span>
                                    <ArrowUpRight className="h-5 w-5 text-neutral-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-700" />
                                </div>
                                <h3 className="mt-8 text-xl text-neutral-900">{service.name}</h3>
                                <p className="mt-2 text-[15px] text-neutral-600">{service.summary}</p>
                                <span className="mt-6 text-sm font-medium text-primary-700 opacity-0 transition-opacity group-hover:opacity-100">Learn more →</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
