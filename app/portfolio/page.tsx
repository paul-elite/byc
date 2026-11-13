import type { Metadata } from 'next';
import { Download } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PortfolioDocument from '@/components/portfolio/PortfolioDocument';
import PrintButton from '@/components/portfolio/PrintButton';
import { getPortfolioContent, PORTFOLIO_DOWNLOAD_PATH } from '@/lib/portfolio';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Firm profile',
    description: 'The Babatunde Yunus & Co. firm profile: registration details, beliefs, services, accreditations, strategy, clientele and contacts.',
};

export default async function PortfolioPage() {
    const portfolio = await getPortfolioContent();

    return (
        <main className="min-h-screen bg-neutral-100">
            <Navigation />

            <div className="sticky top-0 z-40 border-b border-neutral-200 bg-canvas/90 pt-16 backdrop-blur lg:pt-[72px]">
                <div className="container flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-neutral-500">Babatunde Yunus &amp; Co.</p>
                        <h1 className="text-xl text-neutral-900 sm:text-2xl">Firm profile</h1>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <PrintButton />
                        <a href={PORTFOLIO_DOWNLOAD_PATH} className="btn btn-primary btn-md">
                            <Download className="h-4 w-4" />
                            {portfolio.downloadLabel || 'Download Portfolio'}
                        </a>
                    </div>
                </div>
            </div>

            <div className="px-3 py-8 sm:px-6 sm:py-12">
                <PortfolioDocument content={portfolio} />
            </div>

            <Footer />
        </main>
    );
}
