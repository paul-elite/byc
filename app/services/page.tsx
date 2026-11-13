import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { photos } from '@/lib/images';

export const metadata: Metadata = {
    title: 'Services',
    description: 'Accounting, audit, tax advisory, corporate secretarial, internal control, forensic audit and finance training from Babatunde Yunus & Co.',
};

const services = [
    ['Accounting', 'Financial reporting, bookkeeping, payroll, bank reconciliations and monthly management accounts.'],
    ['Auditing', 'Statutory audits, internal audits, due diligence and assurance reviews.'],
    ['Tax advisory', 'Tax planning, VAT, WHT and PAYE compliance, tax health checks and dispute support.'],
    ['Tax audit & monitoring', 'Representation during FIRS and state tax audits, compliance monitoring and remediation.'],
    ['Corporate secretarial', 'CAC company registration, annual returns, AGMs and statutory records.'],
    ['Internal control', 'Control design, fraud-risk assessments and process improvement.'],
    ['Forensic audit', 'Fraud investigation, asset tracing, litigation support and fraud prevention.'],
    ['Finance consultancy', 'Business planning, valuations, risk management and performance reviews.'],
    ['Training', 'Courses for finance teams on tax, accounting, internal controls and IFRS reporting.'],
    ['Accounting software', 'Software selection, setup, data migration, staff training and support.'],
];

export default function ServicesPage() {
    return (
        <main>
            <Navigation />
            <PageHeader eyebrow="Services" title="Our services">
                We work across audit, tax, accounting, compliance and finance operations — and we stay
                involved through implementation, not just the report.
            </PageHeader>

            <section className="bg-white py-16 lg:py-24">
                <div className="container grid gap-12 lg:grid-cols-[1fr_0.75fr] lg:gap-16">
                    <dl className="divide-y divide-neutral-200 border-y border-neutral-200">
                        {services.map(([title, description]) => (
                            <div key={title} className="grid gap-2 py-6 sm:grid-cols-[14rem_1fr] sm:gap-8">
                                <dt className="text-lg font-medium text-neutral-900">{title}</dt>
                                <dd className="text-neutral-600">{description}</dd>
                            </div>
                        ))}
                    </dl>

                    <aside className="lg:sticky lg:top-28 lg:self-start">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100">
                            <Image src={photos.colleagues.src} alt={photos.colleagues.alt} fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
                        </div>
                        <div className="mt-6 rounded-lg border border-neutral-200 bg-neutral-50 p-6">
                            <h2 className="text-lg text-neutral-900">Not sure where to start?</h2>
                            <p className="mt-2 text-[15px] text-neutral-600">
                                Tell us what&apos;s going on and we&apos;ll recommend the right service.
                            </p>
                            <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                                <Link href="/contact" className="btn btn-primary btn-md">Contact us</Link>
                                <a href="tel:+2349018811877" className="btn btn-outline btn-md">Call +234 901 881 1877</a>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
            <Footer />
        </main>
    );
}
