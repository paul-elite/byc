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
    firmProfile: string;
    stats: PortfolioStat[];
    beliefs: PortfolioItem[];
    services: string[];
    accreditations: string[];
    vision: string;
    mission: string;
    values: string[];
    strategy: PortfolioItem[];
    clientBase: string;
    sectors: string[];
    contactEmail: string;
    contactPhone: string;
    offices: PortfolioItem[];
    updatedAt?: string;
}

export const defaultPortfolioContent: PortfolioContent = {
    title: 'Firm Portfolio',
    subtitle: 'Babatunde Yunus & Co.',
    intro: 'Chartered Accountants and Tax Practitioners delivering accountancy, auditing, tax advisory, and management consulting services across Nigeria.',
    downloadLabel: 'Download Portfolio',
    firmProfile: 'We are poised to be a reputable tax advisory and consulting company of choice in Nigeria by committing ourselves to delivering innovative and excellent services to our valued customers and maintaining the best professional practice standards at all times through our team of seasoned professionals.',
    stats: [
        { label: 'CAC Registration Number', value: 'BN 2861419' },
        { label: 'Practicing License Number', value: '050839' },
        { label: 'Financial Reporting Council of Nigeria Membership Number', value: 'FRC/2019/CITN/00000019170' },
        { label: 'Managing Partner', value: 'Dr. Ismail Babatunde Yunus (ACA, FCTI, ACE, FCMC, FCMA)' },
        { label: 'No. of Partners', value: '3' },
        { label: 'No. of Professional Accountants', value: '12' },
    ],
    beliefs: [
        { title: 'Success', body: 'Your success is our business.' },
        { title: 'Efficiency and Effectiveness', body: 'We make every effort to complete each assignment on time.' },
        { title: 'Knowledge', body: 'Knowledge is never complete. We keep learning, applying, and sharing expertise in taxation, accounting, and fiscal laws.' },
        { title: 'Change', body: 'Change is constant, so we remain aware of changes in the business environment and laws affecting accounting and taxation.' },
    ],
    services: [
        'Accountancy',
        'Auditing',
        'Corporate Affairs & Secretarial Services',
        'Tax Advisory',
        'Tax Audit and Monitoring',
        'Tax Planning and Administration',
        'Finance & Management Consultancy',
        'Internal Control & Investigation',
        'Human Capital Training & Capacity Development',
    ],
    accreditations: [
        'Institute of Chartered Accountants of Nigeria (ICAN)',
        'Chartered Institute of Taxation of Nigeria (CITN)',
        'Institute of Chartered Economics of Nigeria (ICEN)',
        'Chartered Institute of Cost and Management Accountants (CICMA)',
        'Nigeria Institute of Management (Chartered) (NIM)',
        'Institute of Management Consultants (IMC)',
        'Chartered Institute of Management Accountants of Nigeria (CIMAN)',
        'Chartered Institute of Bankers (CIBN)',
        'Chartered Forensic Accountants of Nigeria (CFAN)',
        'Financial Reporting Council of Nigeria (FRCN)',
        'International Financial Reporting Standard (IFRS)',
    ],
    vision: 'To provide excellent services in accountancy and auditing, taxation, human capacity training, and financial management consultancy in Nigeria.',
    mission: 'To be a reputable world-class consulting company of choice in Nigeria, believing that our clients are the sole reason for our existence by rendering innovative and excellent services and maintaining the best professional standards at all times.',
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
        { title: 'Care', body: 'We recognize and respect our valued clients, put them first, and earn trust through quality services.' },
        { title: 'Attention', body: 'We give full attention to our clients’ needs, using our experience and expertise to deliver the best service possible.' },
        { title: 'Response', body: 'Fast response to client requirements helps us maintain strong, lasting relationships.' },
        { title: 'Excellence', body: 'We are committed to delivering excellent services at all times to our valued clients.' },
    ],
    clientBase: 'We have rendered a variety of services to organizations ranging from governmental organizations and NGOs to private sector organizations at micro, small, medium, large, and multinational scale.',
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
    ],
    contactEmail: 'info@byc.com.ng',
    contactPhone: '+234 901 881 1877',
    offices: [
        { title: 'Abuja Office', body: 'Suite B5, Melita Plaza, Gimbiya Street, Area 11, Garki, Abuja.' },
        { title: 'Ilorin Office', body: 'No 2, Babatunde Yunus Street, Irewolede, Ilorin, Kwara State.' },
    ],
};
