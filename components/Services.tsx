import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { services } from '@/lib/services';

export default function Services() {
    return (
        <section id="services" className="bg-white py-20 lg:py-28">
            <div className="container">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <p className="eyebrow">Services</p>
                        <h2 className="mt-3 text-3xl text-neutral-900 md:text-4xl">What we do</h2>
                        <p className="mt-4 text-lg text-neutral-600">
                            Most clients start with one service — an audit, a tax problem, a set of accounts — and
                            stay with us for the rest.
                        </p>
                    </div>
                    <Link href="/services" className="inline-flex items-center gap-2 font-medium text-primary-700 hover:text-primary-800">
                        All services <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <Link key={service.slug} href={`/services/${service.slug}`} className="group relative bg-white p-7 transition-colors hover:bg-neutral-50">
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="text-lg text-neutral-900 transition-colors group-hover:text-primary-700">{service.name}</h3>
                                <ArrowUpRight className="h-5 w-5 shrink-0 text-neutral-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-700" />
                            </div>
                            <p className="mt-2 text-[15px] text-neutral-600">{service.summary}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
