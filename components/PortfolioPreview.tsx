import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download, FileText } from 'lucide-react';
import { getPortfolioContent, PORTFOLIO_DOWNLOAD_PATH } from '@/lib/portfolio';

export default async function PortfolioPreview() {
    const portfolio = await getPortfolioContent();

    return (
        <section className="relative overflow-hidden bg-primary-950 py-24 text-[#fffaf0]">
            <div className="absolute inset-0 opacity-26">
                <Image src="/brand/byc-abstract-ledger.png" alt="" fill sizes="100vw" className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-950 via-primary-950/92 to-primary-900/76" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-center">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#dcc781]">Firm portfolio</p>
                        <h2 className="mt-5 text-4xl md:text-6xl text-[#fffaf0]">
                            A polished web profile with one-click download.
                        </h2>
                        <p className="mt-6 text-lg text-[#e7efe4]/78">
                            {portfolio.intro}
                        </p>
                        <div className="mt-9 flex flex-col sm:flex-row gap-4">
                            <Link href="/portfolio" className="btn btn-white btn-lg">
                                View portfolio
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <a href={PORTFOLIO_DOWNLOAD_PATH} download className="btn btn-ghost btn-lg border-white/25 text-[#fffaf0] hover:bg-white/10 hover:text-white hover:border-white/60">
                                <Download className="w-5 h-5" />
                                {portfolio.downloadLabel}
                            </a>
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-white/12 bg-white/8 p-5 backdrop-blur">
                        <div className="rounded-[1.5rem] bg-[#fffaf0] p-6 text-primary-950">
                            <div className="flex items-center gap-4 border-b border-primary-100 pb-6">
                                <div className="w-14 h-14 bg-primary-950 rounded-2xl flex items-center justify-center text-[#dcc781]">
                                    <FileText className="w-7 h-7" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{portfolio.subtitle}</p>
                                    <p className="text-sm text-primary-700">Editable backend profile</p>
                                </div>
                            </div>
                            <div className="mt-6 grid sm:grid-cols-2 gap-4">
                                {portfolio.stats.slice(0, 4).map((stat) => (
                                    <div key={stat.label} className="rounded-2xl bg-primary-50 p-5">
                                        <p className="text-sm text-[#657267]">{stat.label}</p>
                                        <p className="mt-2 text-lg font-bold text-primary-950">{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
