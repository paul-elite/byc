import type { Metadata } from 'next';
import ToolLayout from '@/components/tools/ToolLayout';
import TaxCalendar from '@/components/tools/TaxCalendar';
import UpcomingDeadlines from '@/components/tools/UpcomingDeadlines';

export const metadata: Metadata = {
    title: 'Nigerian tax deadline calendar',
    description: 'Monthly and annual tax filing deadlines for Nigerian businesses: PAYE, VAT, withholding tax and company income tax.',
};

export default function Page() {
    return (
        <ToolLayout
            slug="tax-calendar"
            title="Tax deadline calendar"
            intro="The filing and payment dates most Nigerian businesses have to meet. Pick a month to see what falls due, or check what is coming up next."
            tool={
                <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
                    <TaxCalendar />
                    <div>
                        <h2 className="mb-4 text-lg text-neutral-900">Coming up next</h2>
                        <UpcomingDeadlines count={4} showDetail={false} />
                    </div>
                </div>
            }
            related={{ href: '/blog/nigerian-tax-deadlines-2026', title: 'Every tax deadline a Nigerian business needs to know in 2026' }}
            explainer={
                <>
                    <h2>Monthly deadlines</h2>
                    <table className="w-full">
                        <thead><tr><th>Date</th><th>What</th><th>Paid to</th></tr></thead>
                        <tbody>
                            <tr><td>10th</td><td>PAYE deducted from the previous month’s salaries</td><td>State IRS of the employee’s residence</td></tr>
                            <tr><td>21st</td><td>VAT return and payment for the previous month (nil return if no sales)</td><td>NRS</td></tr>
                            <tr><td>21st</td><td>Withholding tax deducted from the previous month’s payments</td><td>NRS for companies, State IRS for individuals</td></tr>
                        </tbody>
                    </table>
                    <p>
                        PAYE: State Internal Revenue Services generally expect remittance by the 10th. The
                        Nigeria Tax Administration Act’s penalty provision refers to tax not remitted by the
                        21st. We advise clients to keep remitting by the 10th.
                    </p>
                    <h2>Annual deadlines</h2>
                    <table className="w-full">
                        <thead><tr><th>Date</th><th>What</th></tr></thead>
                        <tbody>
                            <tr><td>31 January</td><td>Employer’s annual PAYE return for the previous year</td></tr>
                            <tr><td>6 months after year-end</td><td>Company income tax return — 30 June for a 31 December year-end</td></tr>
                            <tr><td>New companies</td><td>First return within 18 months of incorporation, or 6 months after the first accounting period ends, whichever is earlier</td></tr>
                        </tbody>
                    </table>
                    <h2>If a date falls on a weekend</h2>
                    <p>
                        This calendar shows the statutory dates. When a deadline falls on a weekend or public
                        holiday, don’t assume you get extra days — file on the last working day before it.
                    </p>
                    <h2>Penalties went up</h2>
                    <p>
                        The Nigeria Tax Administration Act 2025 raised penalties for late filing and late
                        payment, and adds interest on unpaid tax. Unremitted PAYE and withholding tax carry
                        extra penalties because the money was collected from someone else.
                    </p>
                </>
            }
            faqs={[
                { question: 'Do I have to file a VAT return if I made no sales?', answer: 'Yes, unless you are a small business. Registered businesses must file a nil return for months with no taxable supplies.' },
                { question: 'Our year-end is not 31 December. When is our CIT return due?', answer: 'Six months after your accounting year-end. For a 31 March year-end, that is 30 September.' },
                { question: 'Who receives PAYE — the NRS or the state?', answer: 'PAYE for most employees goes to the Internal Revenue Service of the state where the employee lives. The NRS collects PAYE for a few categories of employees, such as members of the armed forces and the police.' },
                { question: 'Can you remind us before each deadline?', answer: 'Yes. As part of a monthly compliance engagement we can track your deadlines and prepare each return for your approval before it falls due.' },
            ]}
            sources={[
                { title: 'PwC Worldwide Tax Summaries — Nigeria, tax administration', url: 'https://taxsummaries.pwc.com/Nigeria/Individual/Tax-administration' },
                { title: 'Banwo & Ighodalo — Tax Digest, December 2025', url: 'https://www.banwo-ighodalo.com/media-files/2025/12/Tax-Digest.pdf' },
                { title: 'Nigeria Tax Administration Act 2025 (Official Gazette)', url: 'https://gazettengr.com/wp-content/uploads/NIGERIA-TAX-ADMINISTRATION-ACT-2025.pdf' },
            ]}
        />
    );
}
