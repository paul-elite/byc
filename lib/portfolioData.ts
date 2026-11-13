export const PORTFOLIO_DOWNLOAD_PATH = '/api/portfolio/pdf?download=1';
export const PORTFOLIO_VIEW_PATH = '/api/portfolio/pdf';

export interface PortfolioItem {
    title: string;
    body: string;
}

export interface PortfolioStat {
    label: string;
    value: string;
}

export interface PortfolioContent {
    title: string;
    subtitle: string;
    intro: string;
    downloadLabel: string;
    /** Cover page */
    coverTitle: string;
    tagline: string;
    website: string;
    /** "Portfolio" table heading, after the firm name */
    firmDescriptor: string;
    firmProfile: string;
    stats: PortfolioStat[];
    beliefs: PortfolioItem[];
    services: string[];
    /** Cards on the "Our Services" page */
    serviceCards: string[];
    accreditations: string[];
    /** Green boxes under the accreditation grid */
    accreditationNotes: string[];
    vision: string;
    mission: string;
    values: string[];
    strategy: PortfolioItem[];
    clientBase: string;
    sectors: string[];
    partnerName: string;
    partnerCredentials: string;
    partnerBio: string;
    symbolIntro: string;
    symbolWords: string[];
    contactEmail: string;
    contactPhone: string;
    offices: PortfolioItem[];
    updatedAt?: string;
}

// Default content follows the firm's printed portfolio (December 2022).
export const defaultPortfolioContent: PortfolioContent = {
    title: 'Firm Portfolio',
    subtitle: 'Babatunde Yunus & Co.',
    intro: 'Chartered Accountants and Tax Practitioners delivering accountancy, auditing, tax advisory, and management consulting services to organisations worldwide.',
    downloadLabel: 'Download Portfolio',
    coverTitle: 'FIRM’S\nPROFILE',
    tagline: 'CHARTERED ACCOUNTANTS & TAX PRACTITIONERS',
    website: 'www.byc.com.ng',
    firmDescriptor: 'Chartered Accountants and Tax Practitioners',
    firmProfile: 'We are poised to be a reputable Tax Advisory & Consulting Company of choice globally by committing our self to delivering innovative and excellent services to our valued customers and maintain the best professional practice / standards at all times through our team of seasoned professionals.\nThe company’s business is to provide, among other things, innovative solutions and excellent services to corporate and public sector organizations in the areas of:',
    stats: [
        { label: 'CAC Registration Number', value: 'BN 2861419' },
        { label: 'Practicing License Number', value: '050839' },
        { label: 'Financial Reporting Council of Nigeria Membership Number', value: 'FRC/2019/CITN/ 00000019170' },
        { label: 'Managing Partner', value: 'Dr. Ismail Babatunde Yunus, (ACA, FCTI, ACE, FCMC, FCMA)' },
        { label: 'No. of Partners', value: '3 (Three)' },
        { label: 'No. of Professional Accountants', value: '12 (Twelve)' },
    ],
    beliefs: [
        { title: 'Success', body: 'Your Success is our Business.' },
        { title: 'Efficiency and Effectiveness:', body: 'We always make efforts to complete the assignment on time.' },
        { title: 'Knowledge', body: 'is never complete. It is our belief that a human being remains a student throughout life. We are always striving to assimilate the wealth of knowledge. is most essential and important in our profession. Knowledge of legal aspects and its application is vital, it is therefore our mission to be a powerhouse in knowledge in the field of taxation, accounting and fiscal laws. is not complete unless it is shared with others. We therefore endeavor to share whatever knowledge we have with all.' },
        { title: 'Change', body: 'is the only constant thing in life. It is therefore important for us to always remain abreast of changes in business environment and law affecting accounting and taxation.' },
    ],
    services: [
        'Accountancy',
        'Auditing',
        'Corporate Affairs & Secretarial Services',
        'Tax Advisory',
        'Tax Audit and Monitoring',
        'Tax Planning and Administration',
        'Finance & management Consultancy',
        'Internal control & Investigation',
        'Human Capital Training & Capacity Development',
    ],
    serviceCards: [
        'Accountancy',
        'Auditing',
        'Internal control\n& Investigation,',
        'Tax Audit and\nMonitoring',
        'Tax Planning &\nAdministration',
        'Corporate Affair &\nSecretarial Services',
        'Finance &\nManagement\nConsultancy',
        'Human Capital\nTraining & Capacity\nDevelopment Services',
    ],
    accreditations: [
        'Institute\nof Chartered\nAccountants\nof Nigeria (ICAN)',
        'Chartered\nInstitute of\nTaxation of\nNigeria (CITN)',
        'Institute of\nChartered\nEconomics\nof Nigeria (ICEN)',
        'Chartered\nInstitute of\nCost and\nManagement\nAccountants (CICMA)',
        'Nigeria\nInstitute of\nManagement\n(Chartered) (NIM)',
        'Institute of\nManagement\nConsultants (IMC)',
        'Chartered\nInstitute of\nManagement\nAccountants\nof Nigeria (CIMAN)',
        'Chartered\nInstitute\nof Bankers (CIBN)',
        'Chartered\nForensic\nAccountants of\nNigeria (CFAN)',
    ],
    accreditationNotes: [
        'We are a member of\nthe Financial Reporting\nCouncil of Nigeria (FRCN)',
        'have a Certificate of\nProficiency in International\nFinancial Reporting Standard (IFRS)',
    ],
    vision: 'To provide excellent services in Accountancy & Auditing, Taxation, Human Capacity Training & Financial Management Consultancy worldwide’',
    mission: 'To be a reputable world class Consulting Company of choice globally, with believe that our clients are the sole reason for our existence by committing our self to render innovative and excellent services to our valued customers and maintain the best professional standards at all times',
    values: [
        'Service Excellence',
        'Customer Care',
        'Hard Work & Perseverance',
        'Integrity',
        'Total Quality Management',
        'Social Responsibility',
        'Modesty',
        'Trustworthiness',
        'Professionalism',
        'Fairness and Objectivity',
    ],
    strategy: [
        { title: 'Care', body: 'We recognize and respect our valued clients to trust our quality services. We put our clients first. They are the reason we are in business.' },
        { title: 'Attention', body: 'We give all attentions to our clients’ needs, counting on our experience and expertise to give the best service imaginable.' },
        { title: 'Response', body: 'Instantaneous response to our clients’ needs and requirements helps in maintaining and retaining our good relationship.' },
        { title: 'Excellence', body: 'We are always committed to delivering excellent services at all time to our various valued clients.' },
    ],
    clientBase: 'We have successfully rendered variety of services to diverse categories of organizations ranging from Governmental organizations, Non-Governmental organizations and organizations in the Private sector.\n\nWe serve organizations at the micro, small, medium-size, large and multi-national scale. These organizations belong but are not limited to the sectors below;',
    sectors: [
        'Manufacturing',
        'Technology',
        'Finance',
        'Agriculture',
        'Public Sector',
        'Health Care',
        'Real Estate',
        'Entertainment',
        'Media',
        'Law',
        'Economic',
        'Trade and Investment',
        'Communication and Media',
        'and much more...',
    ],
    partnerName: 'Babatunde Ismail Yunus',
    partnerCredentials: 'ACA, FCTI, ACTI, ACE, CTP',
    partnerBio: 'Among the few professionals in Africa whose accounting skill and professional prowess have created solutions for countless persisting problems and have been a trail for later practitioners to blaze, Babatunde Ismail Yunus is the Managing Partner of BYC Chartered Accountants and Tax Practitioners.\n\nHis excellent and forward-thinking mindset has set BYC Chartered Accountants and Tax Practitioners on an ever excelling pace.',
    symbolIntro: 'Our SYMBOL is derived from three words that define our Ethics and Operations here at BYC.',
    symbolWords: ['FAST', 'ACCURATE', 'AFFORDABLE'],
    contactEmail: 'info@byc.com.ng',
    contactPhone: '+234 901 881 1877',
    offices: [
        { title: 'Abuja Office', body: 'Suite B5, Melita Plaza,\nGimbiya Street,\nArea 11, Garki Abuja.' },
        { title: 'Ilorin Office', body: 'No 2, Babatunde\nYunus Street,\nIrewolede, Ilorin,\nKwara State' },
    ],
};
