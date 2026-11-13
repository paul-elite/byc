// Nigerian tax rules under the Nigeria Tax Act 2025 (NTA) and the Nigeria Tax
// Administration Act 2025 (NTAA), both in force from 1 January 2026.
// Used by the PAYE calculator, the small-company checker, the tax calendar
// and the service pages, so every figure on the site comes from one place.

export const PIT_BANDS = [
    { size: 800_000, rate: 0 },
    { size: 2_200_000, rate: 0.15 },
    { size: 9_000_000, rate: 0.18 },
    { size: 13_000_000, rate: 0.21 },
    { size: 25_000_000, rate: 0.23 },
    { size: Infinity, rate: 0.25 },
] as const;

export const RENT_RELIEF_RATE = 0.2;
export const RENT_RELIEF_CAP = 500_000;
export const PENSION_EMPLOYEE_RATE = 0.08;
export const NHF_RATE = 0.025;

export const SMALL_COMPANY_TURNOVER = 100_000_000;
export const SMALL_COMPANY_FIXED_ASSETS = 250_000_000;
export const CIT_RATE = 0.3;
export const DEVELOPMENT_LEVY_RATE = 0.04;
export const VAT_RATE = 0.075;
export const MIN_ETR_TURNOVER = 50_000_000_000;

export type BandResult = { from: number; to: number; rate: number; taxable: number; tax: number };

export function personalIncomeTax(chargeableIncome: number): { total: number; bands: BandResult[] } {
    let remaining = Math.max(0, chargeableIncome);
    let from = 0;
    const bands: BandResult[] = [];
    for (const band of PIT_BANDS) {
        const taxable = Math.min(remaining, band.size);
        bands.push({ from, to: from + band.size, rate: band.rate, taxable, tax: taxable * band.rate });
        remaining -= taxable;
        from += band.size;
    }
    return { total: bands.reduce((sum, b) => sum + b.tax, 0), bands };
}

// Previous regime (Personal Income Tax Act, repealed from 2026), for comparison
// charts only: consolidated relief allowance of the higher of ₦200,000 or 1% of
// gross, plus 20% of gross, then six bands from 7% to 24%.
export const OLD_PIT_BANDS = [
    { size: 300_000, rate: 0.07 },
    { size: 300_000, rate: 0.11 },
    { size: 500_000, rate: 0.15 },
    { size: 500_000, rate: 0.19 },
    { size: 1_600_000, rate: 0.21 },
    { size: Infinity, rate: 0.24 },
] as const;

function bandTax(income: number, bands: readonly { size: number; rate: number }[]) {
    let remaining = Math.max(0, income);
    let total = 0;
    for (const b of bands) {
        const slice = Math.min(remaining, b.size);
        total += slice * b.rate;
        remaining -= slice;
    }
    return total;
}

export function oldRegimeTax(gross: number) {
    const cra = Math.max(200_000, gross * 0.01) + gross * 0.2;
    return bandTax(gross - cra, OLD_PIT_BANDS);
}

export function newRegimeTax(gross: number) {
    return bandTax(gross, PIT_BANDS);
}

export function rentRelief(annualRent: number) {
    return Math.min(Math.max(0, annualRent) * RENT_RELIEF_RATE, RENT_RELIEF_CAP);
}

export type PayeInput = {
    grossAnnual: number;
    pensionablePay: number; // basic + housing + transport
    contributesPension: boolean;
    basicAnnual: number;
    contributesNhf: boolean;
    annualRent: number;
    otherDeductions: number; // NHIS, life insurance premiums, owner-occupied mortgage interest
};

export function calculatePaye(input: PayeInput) {
    const pension = input.contributesPension ? input.pensionablePay * PENSION_EMPLOYEE_RATE : 0;
    const nhf = input.contributesNhf ? input.basicAnnual * NHF_RATE : 0;
    const rent = rentRelief(input.annualRent);
    const other = Math.max(0, input.otherDeductions);
    const deductions = pension + nhf + rent + other;
    const chargeable = Math.max(0, input.grossAnnual - deductions);
    const { total, bands } = personalIncomeTax(chargeable);
    const takeHome = input.grossAnnual - total - pension - nhf;
    return {
        pension,
        nhf,
        rent,
        other,
        deductions,
        chargeable,
        tax: total,
        monthlyTax: total / 12,
        effectiveRate: input.grossAnnual > 0 ? total / input.grossAnnual : 0,
        takeHomeAnnual: takeHome,
        takeHomeMonthly: takeHome / 12,
        bands,
    };
}

export type CompanyInput = {
    turnover: number;
    fixedAssets: number;
    professionalServices: boolean;
    assessableProfit: number;
};

export function classifyCompany(input: CompanyInput) {
    const meetsTurnover = input.turnover <= SMALL_COMPANY_TURNOVER;
    const meetsAssets = input.fixedAssets <= SMALL_COMPANY_FIXED_ASSETS;
    const isSmall = meetsTurnover && meetsAssets && !input.professionalServices;
    const profit = Math.max(0, input.assessableProfit);
    const cit = isSmall ? 0 : profit * CIT_RATE;
    const levy = isSmall ? 0 : profit * DEVELOPMENT_LEVY_RATE;
    return {
        meetsTurnover,
        meetsAssets,
        isSmall,
        cit,
        levy,
        total: cit + levy,
        minimumEtrApplies: input.turnover >= MIN_ETR_TURNOVER,
    };
}

// ---------- Compliance calendar ----------

export type Deadline = {
    date: Date;
    title: string;
    detail: string;
    authority: string;
    kind: 'monthly' | 'annual';
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function monthName(monthIndex: number) {
    return MONTHS[((monthIndex % 12) + 12) % 12];
}

export function deadlinesForMonth(year: number, month: number): Deadline[] {
    const prev = monthName(month - 1);
    const list: Deadline[] = [
        {
            date: new Date(year, month, 10),
            title: 'PAYE remittance',
            detail: `Remit tax deducted from ${prev} salaries to the State Internal Revenue Service where your employees live.`,
            authority: 'State IRS',
            kind: 'monthly',
        },
        {
            date: new Date(year, month, 21),
            title: 'VAT return and payment',
            detail: `File the ${prev} VAT return and pay VAT collected, including a nil return if you made no sales. Small businesses are exempt.`,
            authority: 'NRS',
            kind: 'monthly',
        },
        {
            date: new Date(year, month, 21),
            title: 'Withholding tax remittance',
            detail: `Remit WHT deducted from supplier payments made in ${prev}.`,
            authority: 'NRS / State IRS',
            kind: 'monthly',
        },
    ];
    if (month === 0) {
        list.push({
            date: new Date(year, 0, 31),
            title: 'Employer annual PAYE return',
            detail: `File the annual return of all employees' pay and tax deducted for ${year - 1}.`,
            authority: 'State IRS',
            kind: 'annual',
        });
    }
    if (month === 5) {
        list.push({
            date: new Date(year, 5, 30),
            title: 'Company income tax return (31 December year-end)',
            detail: `Self-assessment CIT return for the year ended 31 December ${year - 1}, due six months after year-end. Small companies still file.`,
            authority: 'NRS',
            kind: 'annual',
        });
    }
    return list.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function upcomingDeadlines(from: Date, count: number): Deadline[] {
    const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    const result: Deadline[] = [];
    for (let i = 0; result.length < count && i < 24; i++) {
        const y = start.getFullYear() + Math.floor((start.getMonth() + i) / 12);
        const m = (start.getMonth() + i) % 12;
        for (const d of deadlinesForMonth(y, m)) {
            if (d.date >= start && result.length < count) result.push(d);
        }
    }
    return result;
}

// ---------- Formatting ----------

export function naira(value: number, opts: { compact?: boolean } = {}) {
    if (opts.compact) {
        if (value >= 1e9) return `₦${(value / 1e9).toLocaleString('en-NG', { maximumFractionDigits: 1 })}bn`;
        if (value >= 1e6) return `₦${(value / 1e6).toLocaleString('en-NG', { maximumFractionDigits: 1 })}m`;
    }
    return `₦${Math.round(value).toLocaleString('en-NG')}`;
}

export function percent(value: number, digits = 1) {
    return `${(value * 100).toFixed(digits)}%`;
}
