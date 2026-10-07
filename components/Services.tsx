import Image from 'next/image';
import Link from 'next/link';

export default function Services() {
    const services = [
        ['Accountancy', 'Bookkeeping, management accounts, financial statements, and reporting structures for growing organisations.'],
        ['Audit & Assurance', 'Statutory audit, internal audit, control reviews, and assurance work designed for stakeholder confidence.'],
        ['Tax Advisory', 'Company income tax, VAT, PAYE, planning, dispute support, and FIRS-facing advisory with practical direction.'],
        ['Corporate Secretarial', 'CAC filings, company changes, governance records, AGM support, and compliance housekeeping.'],
        ['Internal Control', 'Process mapping, fraud-risk checks, control design, and monitoring systems for stronger finance operations.'],
        ['Finance Training', 'Professional training for finance teams on tax, reporting, controls, and accounting systems.'],
    ];

    return (
        <section id="services" className="bg-[#f7f1e4] py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-end mb-14">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary-700">What BYC handles</p>
                        <h2 className="mt-5 text-4xl md:text-6xl text-primary-950">
                            A complete advisory bench for financial confidence.
                        </h2>
                    </div>
                    <p className="max-w-2xl text-lg text-[#4b5b50]">
                        The homepage now carries a wider scope: audit, tax, corporate compliance, training, controls, accounting systems, and finance operations. Each service is designed to move from diagnosis to implementation.
                    </p>
                </div>

                <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-6">
                    <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] bg-primary-950 p-8 text-[#fffaf0]">
                        <Image src="/brand/byc-abstract-ledger.png" alt="" fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover opacity-38" />
                        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/20 via-primary-950/66 to-primary-950" />
                        <div className="relative flex h-full flex-col justify-between">
                            <div>
                                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#dcc781]">Operating model</p>
                                <h3 className="mt-5 max-w-sm text-3xl text-[#fffaf0]">From books to boardroom evidence.</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {['Assess', 'Structure', 'File', 'Defend'].map((item) => (
                                    <div key={item} className="rounded-2xl border border-white/12 bg-white/9 p-4 backdrop-blur">
                                        <p className="text-lg font-bold">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {services.map(([title, description], index) => (
                            <article key={title} className="group rounded-[1.4rem] border border-primary-100 bg-[#fffaf0] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(3,23,17,0.12)]">
                                <div className="mb-7 flex items-center justify-between">
                                    <span className="text-sm font-bold text-primary-700">0{index + 1}</span>
                                    <span className="h-10 w-10 rounded-full bg-primary-900 text-[#dcc781] flex items-center justify-center transition-transform group-hover:rotate-45">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </span>
                                </div>
                                <h3 className="text-2xl text-primary-950">{title}</h3>
                                <p className="mt-4 text-sm text-[#5c675f]">{description}</p>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="mt-12 flex justify-center">
                    <Link href="/services" className="btn btn-primary btn-lg">
                        Explore the full service map
                    </Link>
                </div>
            </div>
        </section>
    );
}
