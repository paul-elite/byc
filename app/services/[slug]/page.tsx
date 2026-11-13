import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, FileText } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Accordion from '@/components/ui/Accordion';
import { getService, services } from '@/lib/services';

export function generateStaticParams() {
    return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const service = getService(slug);
    if (!service) return {};
    return { title: service.name, description: service.summary };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = getService(slug);
    if (!service) notFound();

    const others = services.filter((s) => s.slug !== service.slug);

    return (
        <main>
            <Navigation />

            <section className="border-b border-neutral-200 bg-neutral-50 pt-16 lg:pt-[72px]">
                <div className="container grid items-center gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-16">
                    <div>
                        <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
                            <Link href="/services" className="hover:text-primary-700">Services</Link>
                            <span className="mx-2">/</span>
                            <span className="text-neutral-800">{service.name}</span>
                        </nav>
                        <h1 className="mt-4 text-4xl text-neutral-900 md:text-5xl">{service.name}</h1>
                        <p className="mt-5 text-lg text-neutral-600">{service.intro[0]}</p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link href="/contact" className="btn btn-primary btn-lg">Discuss your needs</Link>
                            <a href="#faq" className="btn btn-outline btn-lg">Common questions</a>
                        </div>
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-200">
                        <Image src={service.photo.src} alt={service.photo.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" priority />
                    </div>
                </div>
            </section>

            <div className="container grid gap-14 py-16 lg:grid-cols-[1fr_18rem] lg:gap-16 lg:py-20">
                <div className="min-w-0 space-y-16">
                    <section>
                        <p className="max-w-2xl text-lg text-neutral-700">{service.intro[1]}</p>
                        <h2 className="mt-12 text-2xl text-neutral-900">Who this is for</h2>
                        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                            {service.forWho.map((item) => (
                                <li key={item} className="flex gap-3 rounded-lg border border-neutral-200 p-4 text-[15px] text-neutral-700">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl text-neutral-900">What’s included</h2>
                        <dl className="mt-6 grid gap-px overflow-hidden rounded-lg border border-neutral-200 bg-neutral-200 sm:grid-cols-2">
                            {service.included.map((item) => (
                                <div key={item.title} className="bg-white p-6 transition-colors hover:bg-neutral-50">
                                    <dt className="font-medium text-neutral-900">{item.title}</dt>
                                    <dd className="mt-2 text-[15px] text-neutral-600">{item.detail}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>

                    <section>
                        <h2 className="text-2xl text-neutral-900">How we work</h2>
                        <ol className="relative mt-8 space-y-8 border-l border-neutral-200 pl-8">
                            {service.process.map((step, i) => (
                                <li key={step.title} className="relative">
                                    <span className="absolute -left-[45px] flex h-7 w-7 items-center justify-center rounded-full border border-primary-200 bg-white text-xs font-semibold text-primary-700">
                                        {i + 1}
                                    </span>
                                    <h3 className="font-medium text-neutral-900">{step.title}</h3>
                                    <p className="mt-1 text-[15px] text-neutral-600">{step.detail}</p>
                                </li>
                            ))}
                        </ol>
                    </section>

                    <section className="rounded-lg bg-primary-800 p-8 text-white">
                        <h2 className="text-2xl">What you receive</h2>
                        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                            {service.deliverables.map((d) => (
                                <li key={d} className="flex gap-3 text-[15px] text-primary-50">
                                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary-200" />
                                    {d}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section id="faq" className="scroll-mt-28">
                        <h2 className="text-2xl text-neutral-900">Common questions</h2>
                        <div className="mt-6">
                            <Accordion items={service.faqs} />
                        </div>
                    </section>

                    {service.relatedArticle && (
                        <Link href={`/blog/${service.relatedArticle.slug}`} className="group flex items-center justify-between gap-6 rounded-lg border border-neutral-200 p-6 transition-colors hover:border-primary-300 hover:bg-primary-50/40">
                            <div>
                                <p className="text-sm text-neutral-500">Related reading</p>
                                <p className="mt-1 font-medium text-neutral-900 group-hover:text-primary-700">{service.relatedArticle.title}</p>
                            </div>
                            <ArrowRight className="h-5 w-5 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-primary-700" />
                        </Link>
                    )}
                </div>

                <aside className="lg:sticky lg:top-28 lg:self-start">
                    <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6">
                        <h2 className="text-lg text-neutral-900">Talk to us about {service.name.toLowerCase()}</h2>
                        <p className="mt-2 text-sm text-neutral-600">Tell us where you are now and what you need. We will suggest a scope and fee.</p>
                        <Link href="/contact" className="btn btn-primary btn-md mt-5 w-full">Contact us</Link>
                        <a href="tel:+2349018811877" className="mt-3 block text-center text-sm font-medium text-neutral-700 hover:text-primary-700">+234 901 881 1877</a>
                    </div>
                    <nav aria-label="Other services" className="mt-8">
                        <h2 className="text-sm font-medium text-neutral-500">Other services</h2>
                        <ul className="mt-3 space-y-1">
                            {others.map((s) => (
                                <li key={s.slug}>
                                    <Link href={`/services/${s.slug}`} className="group flex items-center justify-between rounded-md px-3 py-2 text-[15px] text-neutral-700 hover:bg-neutral-100 hover:text-primary-700">
                                        {s.name}
                                        <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
            </div>

            <Footer />
        </main>
    );
}
