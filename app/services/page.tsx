import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Calculator, FileSearch, Shield, FileText, Users, Building2, Search, Laptop, BarChart3, BookOpen } from 'lucide-react';

export default function ServicesPage() {
    const services = [
        ['Accountancy', 'Financial reporting, bookkeeping, payroll, reconciliations, and management accounts.', Calculator],
        ['Auditing', 'Statutory audit, internal audit, due diligence, and assurance reviews.', FileSearch],
        ['Tax Advisory', 'Tax planning, VAT, WHT, PAYE, health checks, and dispute support.', FileText],
        ['Tax Audit & Monitoring', 'FIRS liaison, audit representation, compliance monitoring, and remediation.', Search],
        ['Corporate Secretarial', 'CAC filings, company registration, AGMs, and governance records.', Building2],
        ['Internal Control', 'Control design, fraud-risk checks, forensic review, and process improvement.', Shield],
        ['Finance Consultancy', 'Planning, valuation, risk management, and performance improvement.', BarChart3],
        ['Human Capital Training', 'Training for tax, accounting, controls, leadership, and technical finance work.', Users],
        ['Software Solutions', 'Accounting software selection, setup, migration, training, and support.', Laptop],
        ['Forensic Audit', 'Fraud detection, asset tracing, litigation support, and prevention programs.', BookOpen],
    ] as const;

    return (
        <main className="bg-[#f7f1e4]">
            <Navigation />
            <section className="relative overflow-hidden bg-primary-950 pt-32 pb-20 text-[#fffaf0]">
                <Image src="/brand/byc-abstract-ledger.png" alt="" fill sizes="100vw" className="object-cover opacity-24" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-950 via-primary-950/92 to-primary-900/70" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#dcc781]">Services</p>
                    <h1 className="mt-5 max-w-4xl text-5xl md:text-7xl text-[#fffaf0]">Financial services with implementation behind the advice.</h1>
                    <p className="mt-7 max-w-3xl text-lg text-[#e7efe4]/80">BYC supports Nigerian organisations across audit, tax, accountancy, controls, corporate compliance, and finance transformation.</p>
                </div>
            </section>

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-5">
                        {services.map(([title, description, Icon], index) => (
                            <article key={title} className="rounded-[1.5rem] border border-primary-100 bg-[#fffaf0] p-6 shadow-sm">
                                <div className="flex items-start gap-5">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-950 text-[#dcc781]">
                                        <Icon className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-accent-600">0{index + 1}</p>
                                        <h2 className="mt-2 text-2xl text-primary-950">{title}</h2>
                                        <p className="mt-3 text-[#5c675f]">{description}</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-primary-950 py-20 text-[#fffaf0]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#dcc781]">Why BYC</p>
                    <h2 className="mt-5 text-4xl md:text-6xl text-[#fffaf0]">Fast, accurate, affordable, and defensible.</h2>
                    <p className="mt-6 text-[#e7efe4]/78">The goal is not just to complete assignments. It is to leave your organisation with cleaner records, clearer obligations, and better control over financial decisions.</p>
                    <div className="mt-9 flex flex-col sm:flex-row justify-center gap-4">
                        <a href="/contact" className="btn btn-white btn-lg">Start a service conversation</a>
                        <a href="tel:+2349018811877" className="btn btn-ghost btn-lg border-white/25 text-[#fffaf0] hover:bg-white/10 hover:text-white">Call BYC</a>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
