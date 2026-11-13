import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const coreServices = [
    ['Accounting', 'Bookkeeping, payroll, reconciliations, management accounts and annual financial statements.'],
    ['Audit & assurance', 'Statutory audits, internal audits, due diligence and special-purpose reviews.'],
    ['Tax advisory', 'Company income tax, VAT, WHT and PAYE — planning, returns, FIRS audits and disputes.'],
    ['Corporate secretarial', 'CAC registrations and annual returns, AGMs, board minutes and statutory registers.'],
    ['Internal control', 'Process reviews, control design, fraud-risk assessments and forensic investigations.'],
    ['Finance training', 'Practical courses for finance teams on tax, IFRS reporting, controls and accounting software.'],
];

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

                <div className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                    {coreServices.map(([title, description]) => (
                        <div key={title} className="border-t border-neutral-200 py-7">
                            <h3 className="text-lg text-neutral-900">{title}</h3>
                            <p className="mt-2 text-[15px] text-neutral-600">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
