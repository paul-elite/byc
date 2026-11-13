import Link from 'next/link';
import Accordion from '@/components/ui/Accordion';

const faqs = [
    {
        question: 'What services does Babatunde Yunus & Co. offer?',
        answer: 'Accounting and payroll, statutory and internal audit, tax advisory and compliance, corporate secretarial work with the CAC, internal control and forensic reviews, and finance training. Most clients use more than one service.',
    },
    {
        question: 'Do you work with small businesses?',
        answer: 'Yes. We work with small and growing businesses as well as larger companies, public bodies and NGOs. Small businesses often benefit most from getting their records and tax position right early.',
    },
    {
        question: 'How do Nigeria’s 2026 tax reforms affect my business?',
        answer: 'If you operate or employ people in Nigeria, it depends on your turnover, fixed assets, sector and staff. Small companies may now pay 0% company income tax, while other companies pay the 4% development levy and need to update payroll for the new PAYE bands. Our tax reform summary and small company checker are good places to start.',
    },
    {
        question: 'Can you take over our books or tax filings from another firm?',
        answer: 'Yes. With your permission we request handover information from your previous adviser, review the most recent filings, and pick up from the next deadline.',
    },
    {
        question: 'Where are you based?',
        answer: 'Our offices are in Abuja and Ilorin, Nigeria. We take on clients wherever they are based: most of the work is done remotely, with site visits where an engagement needs them.',
    },
    {
        question: 'Are you registered with the professional bodies?',
        answer: 'Yes. The firm is registered with the Corporate Affairs Commission (BN 2861419), holds a practising licence (050839), and the firm and its partners are members of ICAN, CITN and the FRCN, among others.',
    },
];

export default function Faq() {
    return (
        <section className="border-t border-neutral-100 bg-white py-20 lg:py-28">
            <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                <div>
                    <h2 className="text-3xl text-neutral-900 md:text-4xl">Questions we often get</h2>
                    <p className="mt-4 text-lg text-neutral-600">Can’t find what you’re looking for? Ask us directly.</p>
                    <Link href="/contact" className="btn btn-outline btn-md mt-8">Ask a question</Link>
                </div>
                <Accordion items={faqs} />
            </div>
        </section>
    );
}
