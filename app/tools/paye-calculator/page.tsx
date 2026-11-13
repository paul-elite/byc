import type { Metadata } from 'next';
import ToolLayout from '@/components/tools/ToolLayout';
import PayeCalculator from '@/components/tools/PayeCalculator';
import EffectiveRateChart from '@/components/charts/EffectiveRateChart';

export const metadata: Metadata = {
    title: 'PAYE calculator 2026',
    description: 'Calculate monthly PAYE and take-home pay under the Nigeria Tax Act 2025 bands, including rent relief, pension and NHF.',
};

const bands = [
    ['First ₦800,000', '0%', '₦0'],
    ['Next ₦2,200,000', '15%', '₦330,000'],
    ['Next ₦9,000,000', '18%', '₦1,620,000'],
    ['Next ₦13,000,000', '21%', '₦2,730,000'],
    ['Next ₦25,000,000', '23%', '₦5,750,000'],
    ['Above ₦50,000,000', '25%', '—'],
];

export default function Page() {
    return (
        <ToolLayout
            slug="paye-calculator"
            title="PAYE calculator for 2026"
            intro="See how much tax comes out of a salary under the Nigeria Tax Act 2025, which applies to income earned from 1 January 2026. Change the figures and the breakdown updates as you type."
            tool={<PayeCalculator />}
            related={{ href: '/blog/paye-under-the-nigeria-tax-act-2025', title: 'PAYE under the Nigeria Tax Act 2025: a worked guide for employers' }}
            explainer={
                <>
                    <h2>How the calculation works</h2>
                    <p>
                        PAYE is worked out on your <strong>chargeable income</strong>: your total income for the year
                        minus the deductions the law allows. The calculator takes your gross pay, subtracts
                        those deductions, and applies the six tax bands in order.
                    </p>
                    <h2>The 2026 tax bands</h2>
                    <p>Each band is taxed only on the slice of income that falls inside it.</p>
                    <table className="w-full">
                        <thead>
                            <tr><th>Chargeable income</th><th>Rate</th><th>Maximum tax in band</th></tr>
                        </thead>
                        <tbody>
                            {bands.map(([band, rate, max]) => (
                                <tr key={band}><td>{band}</td><td>{rate}</td><td>{max}</td></tr>
                            ))}
                        </tbody>
                    </table>
                    <p>
                        So someone with ₦3,000,000 of chargeable income pays nothing on the first ₦800,000 and
                        15% on the remaining ₦2,200,000 — ₦330,000 for the year, an effective rate of 11%.
                    </p>
                    <h2>Old rules vs 2026 rules</h2>
                    <p>
                        With no deductions, the 2026 rules tax less than the old rules on salaries below about
                        ₦17.5 million a year, and more above it. Pension contributions and rent relief move the
                        lines, so try your own figures in the calculator above.
                    </p>
                    <div className="not-prose mb-8 rounded-2xl border border-neutral-200 p-5">
                        <EffectiveRateChart height={280} />
                    </div>
                    <h2>Deductions you can claim</h2>
                    <ul>
                        <li><strong>Pension</strong> — your employee contribution under the Pension Reform Act, normally 8% of basic, housing and transport pay.</li>
                        <li><strong>National Housing Fund</strong> — 2.5% of basic salary, if you contribute.</li>
                        <li><strong>National Health Insurance</strong> contributions.</li>
                        <li><strong>Life insurance and deferred annuity</strong> premiums for yourself or your spouse.</li>
                        <li><strong>Interest on a loan</strong> to build or buy the home you live in.</li>
                        <li><strong>Rent relief</strong> — 20% of the rent you pay each year, capped at ₦500,000.</li>
                    </ul>
                    <p>
                        The old consolidated relief allowance (₦200,000 or 1% of gross, plus 20% of gross) no
                        longer exists. That is why some higher earners with no rent or pension pay more tax in
                        2026 than before, even though the bands are wider.
                    </p>
                    <h2>What the calculator does not cover</h2>
                    <ul>
                        <li>Benefits in kind such as a company car or housing, which may be taxable.</li>
                        <li>Bonuses or arrears paid in a single month, which your employer may tax differently.</li>
                        <li>Income from other sources, which you must declare on your own annual return.</li>
                    </ul>
                </>
            }
            faqs={[
                { question: 'Who is exempt from PAYE?', answer: 'If your chargeable income is ₦800,000 a year or less, the tax due is zero. Earners on the national minimum wage are also exempt.' },
                { question: 'Do I still need to file my own tax return if my employer deducts PAYE?', answer: 'Yes. The Nigeria Tax Administration Act requires individuals to file an annual return of their income from all sources, separately from the return your employer files.' },
                { question: 'How do I claim rent relief?', answer: 'Give your employer evidence of the rent you pay, such as your tenancy agreement and receipts, so it can be reflected in payroll. Keep copies — the tax authority can ask for them.' },
                { question: 'Why is my payslip different from this estimate?', answer: 'Your employer may use a different pensionable pay figure, include benefits in kind, or spread annual items differently across the months. Ask your payroll team for the computation, or send it to us to review.' },
            ]}
            sources={[
                { title: 'PwC Worldwide Tax Summaries — Nigeria, individual taxes', url: 'https://taxsummaries.pwc.com/nigeria/individual' },
                { title: 'Mondaq — Personal income tax deductions under the Nigeria Tax Act 2025', url: 'https://www.mondaq.com/nigeria/tax-authorities/1751764/comprehensive-guide-personal-income-tax-deductions-under-the-nigeria-tax-act-2025' },
                { title: 'Banwo & Ighodalo — Tax Digest, December 2025', url: 'https://www.banwo-ighodalo.com/media-files/2025/12/Tax-Digest.pdf' },
            ]}
        />
    );
}
