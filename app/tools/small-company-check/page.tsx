import type { Metadata } from 'next';
import ToolLayout from '@/components/tools/ToolLayout';
import SmallCompanyChecker from '@/components/tools/SmallCompanyChecker';
import CompanyTaxChart from '@/components/charts/CompanyTaxChart';

export const metadata: Metadata = {
    title: 'Small company checker',
    description: 'Check whether your company qualifies as a small company under the Nigeria Tax Act 2025 and pays 0% company income tax.',
};

export default function Page() {
    return (
        <ToolLayout
            slug="small-company-check"
            title="Does your company qualify as a small company?"
            intro="Under the Nigeria Tax Act 2025, small companies pay no company income tax, no capital gains tax and no development levy. Enter your figures to see where you stand."
            tool={<SmallCompanyChecker />}
            related={{ href: '/blog/small-company-exemption-who-qualifies', title: 'The small company exemption: who qualifies and what you still have to file' }}
            explainer={
                <>
                    <h2>The three tests</h2>
                    <p>A company is a small company only if all three are true at the same time:</p>
                    <ul>
                        <li>Its annual gross turnover is <strong>₦100 million or less</strong>.</li>
                        <li>Its total fixed assets are <strong>not more than ₦250 million</strong>.</li>
                        <li>It does <strong>not provide professional services</strong>.</li>
                    </ul>
                    <p>
                        The professional services exclusion matters. A law firm, consultancy or accounting
                        practice with ₦40 million turnover is <em>not</em> a small company and pays company
                        income tax at the normal rate.
                    </p>
                    <h2>What a small company saves</h2>
                    <table className="w-full">
                        <thead><tr><th>Tax</th><th>Small company</th><th>Other companies</th></tr></thead>
                        <tbody>
                            <tr><td>Company income tax</td><td>0%</td><td>30% of taxable profit</td></tr>
                            <tr><td>Development levy</td><td>Exempt</td><td>4% of assessable profit</td></tr>
                            <tr><td>Capital gains tax</td><td>Exempt</td><td>Taxed at the company income tax rate</td></tr>
                            <tr><td>Monthly VAT returns</td><td>Not required</td><td>Due by the 21st</td></tr>
                        </tbody>
                    </table>
                    <h2>What the exemption is worth</h2>
                    <p>Tax payable by a company that does not qualify, at different profit levels. A small company pays nothing.</p>
                    <div className="mb-8 rounded-2xl border border-neutral-200 p-5">
                        <CompanyTaxChart />
                    </div>
                    <h2>What does not change</h2>
                    <p>
                        A small company still files an annual company income tax return, deducts and remits PAYE
                        for its staff, deducts withholding tax where it applies, and keeps proper records. The
                        exemption depends on your figures, so you need accounts that prove them.
                    </p>
                    <h2>Larger companies</h2>
                    <p>
                        Companies with turnover of ₦50 billion or more, and members of multinational groups
                        with global turnover of at least €750 million, are subject to a 15% minimum effective
                        tax rate.
                    </p>
                </>
            }
            faqs={[
                { question: 'What counts as professional services?', answer: 'The Act excludes businesses that provide professional services, such as legal, accounting, consulting, engineering and architectural practices. If your main income is fees for expert advice or services, assume you are excluded and check with us.' },
                { question: 'What if we cross ₦100 million part-way through the year?', answer: 'The test looks at the company’s turnover for the year. If you expect to cross the threshold, plan for full company income tax and the development levy, and speak to us early about VAT registration and record-keeping.' },
                { question: 'Can we split the business into several companies to stay under the limits?', answer: 'Artificial splitting to get an exemption is risky. Tax authorities can look through arrangements whose main purpose is to avoid tax. Get advice before restructuring.' },
                { question: 'Do we still need audited accounts?', answer: 'That depends on company law, not the tax exemption. Many small companies are exempt from audit under CAMA 2020, but lenders, donors and tender processes often require audited accounts anyway.' },
            ]}
            sources={[
                { title: 'PwC Worldwide Tax Summaries — Nigeria, taxes on corporate income', url: 'https://taxsummaries.pwc.com/nigeria/corporate/taxes-on-corporate-income' },
                { title: 'Mondaq — The Nigeria Tax Reform Act 2025 and how it affects businesses', url: 'https://www.mondaq.com/nigeria/tax-authorities/1705160/the-nigeria-tax-reform-act-2025-and-how-it-affects-businesses' },
                { title: 'Banwo & Ighodalo — Tax Digest, December 2025', url: 'https://www.banwo-ighodalo.com/media-files/2025/12/Tax-Digest.pdf' },
            ]}
        />
    );
}
