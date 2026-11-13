import Link from 'next/link';
import { Download } from 'lucide-react';
import { getPortfolioContent, PORTFOLIO_DOWNLOAD_PATH } from '@/lib/portfolio';

export default async function PortfolioPreview() {
    const portfolio = await getPortfolioContent();

    return (
        <section className="border-t border-neutral-200 bg-mist py-20 lg:py-28">
            <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                <div>
                    <p className="eyebrow">Firm profile</p>
                    <h2 className="mt-3 text-3xl text-neutral-900 md:text-4xl">Registration and credentials</h2>
                    <p className="mt-5 text-lg text-neutral-600">{portfolio.intro}</p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link href="/portfolio" className="btn btn-primary btn-md">
                            Read the firm profile
                        </Link>
                        <a href={PORTFOLIO_DOWNLOAD_PATH} download className="btn btn-outline btn-md">
                            <Download className="h-4 w-4" />
                            Download PDF
                        </a>
                    </div>
                </div>

                <dl className="divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
                    {portfolio.stats.slice(0, 6).map((stat) => (
                        <div key={stat.label} className="grid gap-1 px-6 py-4 sm:grid-cols-[1fr_1.2fr] sm:gap-6">
                            <dt className="text-sm text-neutral-500">{stat.label}</dt>
                            <dd className="text-[15px] font-medium text-neutral-900">{stat.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
