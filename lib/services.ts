import { photos } from './images';

export type Service = {
    slug: string;
    name: string;
    summary: string;
    intro: string[];
    forWho: string[];
    included: { title: string; detail: string }[];
    process: { title: string; detail: string }[];
    deliverables: string[];
    faqs: { question: string; answer: string }[];
    relatedArticle?: { slug: string; title: string };
    photo: { src: string; alt: string };
};

export const services: Service[] = [
    {
        slug: 'accounting',
        name: 'Accounting',
        summary: 'Bookkeeping, payroll, reconciliations, management accounts and annual financial statements.',
        intro: [
            'Good accounting is the foundation for everything else: the audit, the tax return, the bank loan and the decisions management makes every month. If the books are late or wrong, every one of those becomes harder and more expensive.',
            'We keep your records up to date, reconcile them every month and turn them into reports you can use — whether we do all the work or support your in-house team.',
        ],
        forWho: [
            'Growing companies without a full finance team',
            'Businesses whose books are months behind or need cleaning up before an audit',
            'NGOs and projects that report to donors on restricted funds',
            'Finance teams that need extra hands at month-end or year-end',
        ],
        included: [
            { title: 'Bookkeeping', detail: 'Recording sales, purchases, receipts and payments in your accounting system, with source documents filed so every entry can be traced.' },
            { title: 'Bank and ledger reconciliations', detail: 'Matching bank statements, supplier balances and customer balances to the ledger every month, and clearing old differences.' },
            { title: 'Payroll', detail: 'Monthly payroll with PAYE under the 2026 tax bands, pension, NHF and NHIS deductions, payslips and remittance schedules.' },
            { title: 'Management accounts', detail: 'A monthly or quarterly pack: profit and loss, balance sheet, cash flow, and a short commentary on what moved and why.' },
            { title: 'Annual financial statements', detail: 'Year-end accounts prepared under IFRS (or IFRS for SMEs where it applies), ready for your auditor and the Financial Reporting Council.' },
            { title: 'Catch-up and clean-up', detail: 'Rebuilding records for past periods so you can file overdue returns and get a clean audit.' },
        ],
        process: [
            { title: 'Review', detail: 'We look at your current records, systems and reporting needs, and agree what is in scope.' },
            { title: 'Set up', detail: 'We agree a chart of accounts, document flow and a monthly timetable with your team.' },
            { title: 'Monthly close', detail: 'We post, reconcile and review every month, and raise questions early instead of at year-end.' },
            { title: 'Report', detail: 'You receive management accounts on an agreed date, and we walk you through them.' },
        ],
        deliverables: [
            'Reconciled general ledger and bank accounts',
            'Monthly or quarterly management accounts',
            'Payroll reports, payslips and statutory remittance schedules',
            'Year-end financial statements and audit-ready schedules',
        ],
        faqs: [
            { question: 'Which accounting software do you work with?', answer: 'We work in the system you already use, including QuickBooks, Sage, Zoho Books and Excel-based records. If you have no system yet, we can recommend and set one up as part of the engagement.' },
            { question: 'Our books are a year behind. Can you help?', answer: 'Yes. Catch-up work is common. We rebuild the records from bank statements and source documents, agree balances with you, and then move you onto a normal monthly cycle.' },
            { question: 'Do you need to be in our office?', answer: 'Most work is done remotely from shared documents and system access. We visit for set-up, stock counts or when it is easier to resolve questions in person, especially for clients in Abuja and Ilorin.' },
            { question: 'Can you run payroll under the new tax rules?', answer: 'Yes. Payroll is calculated under the Nigeria Tax Act 2025 bands that apply from January 2026, including rent relief and the other allowable deductions.' },
        ],
        relatedArticle: { slug: 'paye-under-the-nigeria-tax-act-2025', title: 'PAYE under the Nigeria Tax Act 2025: a worked guide for employers' },
        photo: photos.review,
    },
    {
        slug: 'audit-and-assurance',
        name: 'Audit & assurance',
        summary: 'Statutory audits, internal audits, due diligence and special-purpose reviews.',
        intro: [
            'An audit gives shareholders, lenders, donors and regulators independent comfort that your financial statements are fairly stated. It is also one of the best chances you get each year to find weaknesses before they become losses.',
            'We plan our audits around the risks in your business, keep the requests organised, and finish with a management letter that explains what we found in plain language.',
        ],
        forWho: [
            'Companies that need a statutory audit under CAMA 2020',
            'NGOs and donor-funded projects that need grant or project audits',
            'Boards and audit committees that want an independent internal audit function',
            'Investors and lenders that need financial due diligence before a deal',
        ],
        included: [
            { title: 'Statutory audit', detail: 'An audit of your annual financial statements under International Standards on Auditing, with an opinion your stakeholders can rely on.' },
            { title: 'Internal audit', detail: 'Periodic reviews of processes such as procurement, payroll, revenue and inventory, reported to management or the audit committee.' },
            { title: 'Donor and project audits', detail: 'Audits of grant expenditure against the funding agreement and donor rules.' },
            { title: 'Financial due diligence', detail: 'A review of a target business’s earnings, debt, working capital and tax exposures before you invest or lend.' },
            { title: 'Agreed-upon procedures', detail: 'Specific checks you or a third party define, with factual findings reported back.' },
        ],
        process: [
            { title: 'Plan', detail: 'We meet management, understand the business and agree the timetable and the list of documents we need.' },
            { title: 'Fieldwork', detail: 'We test controls and balances, and raise queries in batches rather than one at a time.' },
            { title: 'Clear findings', detail: 'We discuss draft findings and adjustments with you before anything is final.' },
            { title: 'Report', detail: 'We issue the audit opinion and a management letter with practical recommendations.' },
        ],
        deliverables: [
            'Signed independent auditor’s report',
            'Management letter with findings ranked by priority',
            'Agreed list of audit adjustments',
            'For internal audits: a report and follow-up tracker for the audit committee',
        ],
        faqs: [
            { question: 'Does my company need an audit?', answer: 'Most companies registered under CAMA 2020 must have their accounts audited. CAMA exempts certain small companies, so check with us before assuming you are exempt — lenders, donors and tenders often require audited accounts anyway.' },
            { question: 'How long does an audit take?', answer: 'It depends mainly on how ready your records are. If the books are reconciled and the schedules are ready at the start, fieldwork for a small or medium company usually takes a few weeks.' },
            { question: 'Can the same firm do our accounts and our audit?', answer: 'Independence rules limit this. We can prepare accounts for some clients and audit others, but we will tell you at the start if a combination is not allowed for your company.' },
            { question: 'What should we prepare before the audit starts?', answer: 'Reconciled bank accounts, a trial balance, fixed asset and debtor/creditor listings, payroll records, contracts and board minutes. We send a tailored list during planning.' },
        ],
        photo: photos.meeting,
    },
    {
        slug: 'tax-advisory',
        name: 'Tax advisory',
        summary: 'Company income tax, VAT, WHT and PAYE — planning, returns, NRS audits and disputes.',
        intro: [
            'Nigeria’s tax system changed on 1 January 2026. The Nigeria Tax Act and the Nigeria Tax Administration Act replaced most of the old tax laws, and the Nigeria Revenue Service (NRS) replaced FIRS. Rates, reliefs, filing rules and penalties all moved.',
            'We handle your routine filings, help you plan around the new rules, and represent you when the NRS or a State Internal Revenue Service raises an assessment or opens an audit.',
        ],
        forWho: [
            'Companies working out how the 2026 reforms affect them',
            'Businesses that want monthly VAT, WHT and PAYE handled reliably',
            'Taxpayers facing an NRS or State IRS audit, assessment or demand notice',
            'Individuals with business, rental or investment income who must file their own returns',
        ],
        included: [
            { title: 'Company income tax', detail: 'Computing and filing the annual self-assessment return, capital allowances, and the 4% development levy where it applies.' },
            { title: 'VAT and withholding tax', detail: 'Monthly VAT and WHT returns and remittances, input VAT recovery and reconciliation to your ledger.' },
            { title: 'PAYE and personal tax', detail: 'Payroll tax under the 2026 bands, employer annual returns, and personal income tax returns for owners and staff.' },
            { title: 'Tax health check', detail: 'A review of past filings to find exposures before the tax authority does, with a plan to fix them.' },
            { title: 'Tax audits and disputes', detail: 'Managing NRS and State IRS audits, responding to queries, objecting to assessments and negotiating settlements.' },
            { title: 'Reform transition', detail: 'Working out whether you qualify as a small company, how the development levy affects you, and what to change in your systems.' },
        ],
        process: [
            { title: 'Diagnose', detail: 'We review your filings, registrations and records to see where you stand.' },
            { title: 'Fix', detail: 'We correct past issues and agree a filing calendar for the year.' },
            { title: 'File', detail: 'We prepare returns, you approve them, and we file and keep evidence of payment.' },
            { title: 'Defend', detail: 'If a query or audit comes, we handle the correspondence and meetings with the tax authority.' },
        ],
        deliverables: [
            'Filed returns with payment evidence and a compliance calendar',
            'Tax computations you can follow line by line',
            'Written advice on specific transactions or reform questions',
            'Objection letters and audit responses where needed',
        ],
        faqs: [
            { question: 'Is FIRS still the tax authority?', answer: 'No. From 1 January 2026 the Nigeria Revenue Service (NRS) replaced FIRS as the federal tax authority. State Internal Revenue Services still collect PAYE and other state taxes.' },
            { question: 'Is my company exempt from company income tax now?', answer: 'Only if it is a small company: annual turnover of ₦100 million or less, fixed assets below ₦250 million, and not a professional services business. Small companies still have to file returns. Use our small company checker for a first view.' },
            { question: 'What is the development levy?', answer: 'A 4% levy on assessable profits that replaced several older levies, including tertiary education tax. It applies to all companies except small companies and non-residents.' },
            { question: 'We received a demand notice. What should we do?', answer: 'Do not ignore it, and note the date it arrived — objection deadlines are short. Send it to us with your returns for the period and we will advise on whether to pay, object or negotiate.' },
        ],
        relatedArticle: { slug: 'nigeria-tax-reform-2026-what-changed-for-businesses', title: 'Nigeria’s 2026 tax reform: what changed for businesses' },
        photo: photos.colleagues,
    },
    {
        slug: 'corporate-secretarial',
        name: 'Corporate secretarial',
        summary: 'CAC registrations and annual returns, AGMs, board minutes and statutory registers.',
        intro: [
            'Company law compliance is easy to forget until a bank, investor or regulator asks for an up-to-date status report and it shows years of unfiled returns or the wrong directors.',
            'We keep your company in good standing with the Corporate Affairs Commission (CAC), maintain your statutory records, and handle the paperwork when something changes.',
        ],
        forWho: [
            'New businesses registering a company or business name',
            'Companies behind on CAC annual returns',
            'Companies changing directors, shareholders, share capital or registered address',
            'Boards that want properly kept minutes and registers',
        ],
        included: [
            { title: 'Company registration', detail: 'Name reservation, incorporation and post-incorporation filings, and registration for tax.' },
            { title: 'Annual returns', detail: 'Preparing and filing CAC annual returns, including catching up on missed years.' },
            { title: 'Changes and filings', detail: 'Changes to directors, shareholders, share capital, company name or registered office.' },
            { title: 'Persons with significant control', detail: 'Identifying and filing PSC information as required under CAMA 2020.' },
            { title: 'Meetings and minutes', detail: 'Notices, agendas and minutes for AGMs and board meetings, and written resolutions.' },
            { title: 'Statutory registers', detail: 'Keeping registers of members, directors and charges up to date.' },
        ],
        process: [
            { title: 'Search', detail: 'We check your company’s status and filing history on the CAC register.' },
            { title: 'Plan', detail: 'We list what is missing or due and agree priorities and fees.' },
            { title: 'File', detail: 'We prepare documents for signature and file them with the CAC.' },
            { title: 'Maintain', detail: 'We track annual deadlines and remind you before they fall due.' },
        ],
        deliverables: [
            'CAC filing confirmations and updated status report',
            'Up-to-date statutory registers',
            'Signed minutes and resolutions',
            'A compliance calendar for the year ahead',
        ],
        faqs: [
            { question: 'What happens if we have not filed annual returns for several years?', answer: 'The company accumulates late-filing penalties and can be marked inactive, which causes problems with banks, contracts and tenders. We can file the missing years and bring the company back into good standing.' },
            { question: 'Do we need a company secretary?', answer: 'Under CAMA 2020, private companies are not always required to appoint one, but someone still has to keep the records and file returns. Many companies use us for that role.' },
            { question: 'Can you register a business name instead of a company?', answer: 'Yes. We will explain the differences in liability, tax and credibility so you can decide which suits you.' },
        ],
        photo: photos.team,
    },
    {
        slug: 'internal-control',
        name: 'Internal control & forensic review',
        summary: 'Process reviews, control design, fraud-risk assessments and forensic investigations.',
        intro: [
            'Most losses we investigate come from simple gaps: one person who both approves and pays, stock that is never counted, or a supplier list nobody checks. Fixing those gaps is cheaper than recovering money afterwards.',
            'We review how money moves through your organisation, design practical controls that fit your size, and investigate when something has already gone wrong.',
        ],
        forWho: [
            'Owners who are stepping back from day-to-day approvals',
            'Organisations that have found, or suspect, a fraud or loss',
            'NGOs preparing for donor due diligence',
            'Audit committees that want independent assurance on key processes',
        ],
        included: [
            { title: 'Process and control review', detail: 'Mapping procurement, payments, payroll, revenue and inventory processes and testing whether controls work.' },
            { title: 'Control design', detail: 'Approval limits, segregation of duties, reconciliations and policies written for your size and systems.' },
            { title: 'Fraud-risk assessment', detail: 'Identifying where your organisation is most exposed and what would detect or prevent a loss.' },
            { title: 'Forensic investigation', detail: 'Examining records and transactions to establish what happened, how much was lost and who was involved.' },
            { title: 'Litigation support', detail: 'Reports and evidence prepared for disciplinary processes, insurers or the courts.' },
        ],
        process: [
            { title: 'Scope', detail: 'We agree which processes or allegations to look at, confidentially.' },
            { title: 'Examine', detail: 'We review documents and data, test transactions and interview staff where needed.' },
            { title: 'Report', detail: 'We set out findings, evidence and the value at risk or lost.' },
            { title: 'Strengthen', detail: 'We recommend specific controls and help you put them in place.' },
        ],
        deliverables: [
            'Process maps and a control gap analysis',
            'A ranked list of recommendations with owners and dates',
            'Forensic findings reports with supporting evidence',
            'Updated policies and approval matrices',
        ],
        faqs: [
            { question: 'We suspect a fraud. What should we do first?', answer: 'Secure the records, limit access for the people involved, and avoid confronting anyone before evidence is preserved. Then contact us confidentially so we can scope an investigation.' },
            { question: 'Is this different from an audit?', answer: 'Yes. A statutory audit gives an opinion on the financial statements as a whole. A control review or investigation looks in depth at specific processes or transactions.' },
            { question: 'Will controls slow the business down?', answer: 'They should not. We design controls around the real risks, so small transactions move quickly and checks focus on what matters.' },
        ],
        photo: photos.review,
    },
    {
        slug: 'finance-training',
        name: 'Finance training',
        summary: 'Practical courses for finance teams on tax, IFRS reporting, controls and accounting software.',
        intro: [
            'Your finance team has to apply new tax rules, reporting standards and systems while keeping the day-to-day work going. Training that sticks is practical, uses your own examples and is short enough to fit around month-end.',
            'We run in-house sessions and workshops built around the work your team actually does, delivered by the same practitioners who do that work for clients.',
        ],
        forWho: [
            'Finance and payroll teams adjusting to the 2026 tax reforms',
            'Accountants moving to IFRS or IFRS for SMEs reporting',
            'Non-finance managers who approve budgets and spending',
            'Teams adopting new accounting software',
        ],
        included: [
            { title: 'Tax reform workshops', detail: 'What changed under the Nigeria Tax Act and NTAA and how it affects payroll, VAT, WHT and company tax.' },
            { title: 'IFRS reporting', detail: 'Applying key standards to your own transactions, with worked examples.' },
            { title: 'Internal controls', detail: 'How to design, run and evidence controls in day-to-day work.' },
            { title: 'Finance for non-finance managers', detail: 'Reading financial statements, budgeting and cost control.' },
            { title: 'Accounting software', detail: 'Set-up and hands-on training for your team on the system you use.' },
        ],
        process: [
            { title: 'Assess', detail: 'We talk to your team leads about skill gaps and upcoming changes.' },
            { title: 'Design', detail: 'We build a session around your examples and systems.' },
            { title: 'Deliver', detail: 'In person in Abuja or Ilorin, at your offices, or online.' },
            { title: 'Follow up', detail: 'Participants get materials and a contact for questions afterwards.' },
        ],
        deliverables: [
            'Course materials and worked examples to keep',
            'Templates and checklists your team can reuse',
            'Attendance records for CPD purposes',
        ],
        faqs: [
            { question: 'Can training be done at our office?', answer: 'Yes. Most in-house sessions run at the client’s office so we can use your systems and examples. We also run sessions online.' },
            { question: 'How long are the sessions?', answer: 'Usually half a day to two days, depending on the topic and how much hands-on practice you want.' },
            { question: 'Do you train non-accountants?', answer: 'Yes. Our finance for non-finance managers session is built for budget holders and directors.' },
        ],
        photo: photos.colleagues,
    },
];

export function getService(slug: string) {
    return services.find((s) => s.slug === slug);
}
