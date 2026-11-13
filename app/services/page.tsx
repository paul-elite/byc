import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import Accordion from '@/components/ui/Accordion';
import { services } from '@/lib/services';
import { photos } from '@/lib/images';

export const metadata: Metadata = {
    title: 'Services',
    description: 'Accounting, audit, tax advisory, corporate secretarial, internal control, forensic review and finance training from Babatunde Yunus & Co.',
};

const alsoAvailable = [
    ['Finance consultancy', 'Business plans, valuations, budgeting and performance reviews.'],
    ['Accounting software', 'Selection, set-up, data migration and staff training.'],
    ['Tax audit & monitoring', 'Ongoing review of filings and representation during tax authority audits.'],
    ['Tax planning & administration', 'Structuring transactions and operations so tax is planned, not discovered.'],
];

const engagementFaqs = [
    {
        question: 'How do you charge?',
        answer: 'Fees depend on the scope and complexity of the work. Once we understand what you need, we confirm the scope, timing and fee in an engagement letter before any work starts.',
    },
    {
        question: 'What happens after I get in touch?',
        answer: 'We arrange a call or meeting to understand your situation, ask for a few documents if needed, and then send a proposal with scope, timing and fees.',
    },
    {
        question: 'Do you work with clients outside Abuja and Kwara?',
        answer: 'Yes. Most of our work can be done remotely, and we travel for fieldwork when an engagement needs it.',
    },
    {
        question: 'Can you take over from our current accountant or tax adviser?',
        answer: 'Yes. With your permission we contact the previous adviser for handover information, review the last filings, and take over from the next deadline.',
    },
];

export default function ServicesPage() {
    return (
        <main>
            <Navigation />
            <PageHeader eyebrow="Services" title="Our services">
                Six core services, each run by qualified practitioners. Choose one to see what is included,
                how we work and what you receive.
            </PageHeader>

            <section className="bg-canvas py-16 lg:py-20">
                <div className="container">
                    <ul className="border-t border-neutral-200">
                        {services.map((service, i) => (
                            <li key={service.slug} className="border-b border-neutral-200">
                                <Link href={`/services/${service.slug}`} className="group grid items-center gap-2 py-7 md:grid-cols-[3rem_1fr_1.2fr_2rem] md:gap-8">
                                    <span className="text-sm tabular-nums text-neutral-400">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="text-2xl font-medium tracking-tight text-neutral-900 transition-colors group-hover:text-primary-700 md:text-[1.75rem]">
                                        {service.name}
                                    </span>
                                    <span className="text-[15px] text-neutral-600">{service.summary}</span>
                                    <ArrowUpRight className="hidden h-6 w-6 text-neutral-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-700 md:block" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="border-t border-neutral-200 bg-mist py-16 lg:py-20">
                <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-loader">
                        <Image src={photos.colleagues.src} alt={photos.colleagues.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                    </div>
                    <div>
                        <h2 className="text-3xl text-neutral-900">Also available</h2>
                        <dl className="mt-8 space-y-6">
                            {alsoAvailable.map(([title, desc]) => (
                                <div key={title} className="border-l-2 border-primary-600 pl-5">
                                    <dt className="font-medium text-neutral-900">{title}</dt>
                                    <dd className="mt-1 text-[15px] text-neutral-600">{desc}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>

            <section className="bg-canvas py-16 lg:py-24">
                <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                    <div>
                        <h2 className="text-3xl text-neutral-900">Working with us</h2>
                        <p className="mt-4 text-lg text-neutral-600">How engagements start, how fees work and what to expect.</p>
                        <Link href="/contact" className="btn btn-primary btn-md mt-8">Start a conversation</Link>
                    </div>
                    <Accordion items={engagementFaqs} />
                </div>
            </section>
            <Footer />
        </main>
    );
}
