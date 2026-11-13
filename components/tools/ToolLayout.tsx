import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Accordion, { type AccordionItem } from '@/components/ui/Accordion';
import { tools } from '@/lib/tools';

export default function ToolLayout({
    slug,
    title,
    intro,
    tool,
    explainer,
    faqs,
    related,
    sources,
}: {
    slug: string;
    title: string;
    intro: string;
    tool: ReactNode;
    explainer: ReactNode;
    faqs: AccordionItem[];
    related?: { href: string; title: string };
    sources: { title: string; url: string }[];
}) {
    const others = tools.filter((t) => t.slug !== slug);
    return (
        <main>
            <Navigation />
            <section className="border-b border-neutral-200 bg-neutral-50 pt-16 lg:pt-[72px]">
                <div className="container pb-10 pt-12 lg:pt-16">
                    <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
                        <Link href="/tools" className="hover:text-primary-700">Tools</Link>
                        <span className="mx-2">/</span>
                        <span className="text-neutral-800">{title}</span>
                    </nav>
                    <h1 className="mt-4 max-w-3xl text-4xl text-neutral-900 md:text-5xl">{title}</h1>
                    <p className="mt-5 max-w-2xl text-lg text-neutral-600">{intro}</p>
                </div>
            </section>

            <section className="bg-neutral-50 pb-16">
                <div className="container">{tool}</div>
            </section>

            <section className="border-t border-neutral-200 bg-white py-16 lg:py-20">
                <div className="container grid gap-14 lg:grid-cols-[1fr_20rem] lg:gap-16">
                    <div className="min-w-0 max-w-3xl text-[16px] leading-relaxed text-neutral-700 [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:text-neutral-900 [&_h2:first-child]:mt-0 [&_li]:mb-2 [&_p]:mb-4 [&_table]:mb-6 [&_td]:border-b [&_td]:border-neutral-100 [&_td]:py-2.5 [&_td]:pr-4 [&_th]:border-b [&_th]:border-neutral-200 [&_th]:py-2.5 [&_th]:pr-4 [&_th]:text-left [&_th]:text-sm [&_th]:font-medium [&_th]:text-neutral-900 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5">
                        {explainer}
                        <h2>Common questions</h2>
                        <Accordion items={faqs} defaultOpen={null} />
                        <h2>Sources</h2>
                        <ul className="text-sm">
                            {sources.map((s) => (
                                <li key={s.url}>
                                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">{s.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
                        {related && (
                            <Link href={related.href} className="group block rounded-lg border border-neutral-200 p-5 transition-colors hover:border-primary-300">
                                <p className="text-sm text-neutral-500">Read the guide</p>
                                <p className="mt-1 font-medium text-neutral-900 group-hover:text-primary-700">{related.title}</p>
                            </Link>
                        )}
                        <div className="rounded-lg bg-primary-800 p-5 text-white">
                            <p className="font-medium">Want us to check your numbers?</p>
                            <p className="mt-1 text-sm text-primary-100">We can review your payroll, returns or company position properly.</p>
                            <Link href="/contact" className="btn btn-white btn-sm mt-4">Contact us</Link>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-neutral-500">More tools</p>
                            <ul className="mt-2 space-y-1">
                                {others.map((t) => (
                                    <li key={t.slug}>
                                        <Link href={`/tools/${t.slug}`} className="group flex items-center justify-between rounded-md px-3 py-2 text-[15px] text-neutral-700 hover:bg-neutral-100 hover:text-primary-700">
                                            {t.name}
                                            <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </section>
            <Footer />
        </main>
    );
}
