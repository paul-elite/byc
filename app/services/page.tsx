import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Calculator, FileSearch, Shield, FileText, Users, Building2, Search, Laptop, BarChart3, BookOpen } from 'lucide-react';

export default function ServicesPage() {
    const services = [
        {
            title: 'Accountancy',
            description: 'Comprehensive accounting services including financial reporting, bookkeeping, payroll management, and management accounts to support informed business decisions.',
            features: [
                'Financial Statement Preparation',
                'Monthly/Quarterly Reporting',
                'Payroll Management',
                'Account Reconciliation',
                'Management Accounts',
            ],
            icon: Calculator,
            gradient: 'from-emerald-500 to-teal-500',
        },
        {
            title: 'Auditing',
            description: 'Statutory audits, internal audits, and assurance services that provide stakeholders with confidence in your financial statements and compliance.',
            features: [
                'Statutory Audit Services',
                'Internal Audit',
                'Compliance Audits',
                'Due Diligence Reviews',
                'Special Purpose Audits',
            ],
            icon: FileSearch,
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Tax Advisory',
            description: 'Navigate Nigeria\'s tax landscape with expert guidance. We help optimize tax positions, ensure FIRS compliance, and minimize liabilities within legal frameworks.',
            features: [
                'Corporate Tax Planning',
                'VAT & WHT Compliance',
                'Tax Health Checks',
                'Transfer Pricing',
                'Tax Dispute Resolution',
            ],
            icon: FileText,
            gradient: 'from-violet-500 to-purple-500',
        },
        {
            title: 'Tax Audit & Monitoring',
            description: 'Proactive tax audit support and continuous monitoring to ensure ongoing compliance and minimize your organization\'s tax exposure.',
            features: [
                'Tax Audit Representation',
                'FIRS Liaison',
                'Compliance Monitoring',
                'Tax Risk Assessment',
                'Remediation Support',
            ],
            icon: Search,
            gradient: 'from-orange-500 to-amber-500',
        },
        {
            title: 'Corporate Secretarial Services',
            description: 'Comprehensive corporate secretarial support ensuring your company meets all CAC and regulatory requirements efficiently.',
            features: [
                'Company Registration',
                'AGM & Board Meeting Support',
                'Regulatory Compliance',
                'Share Capital Management',
                'Corporate Restructuring',
            ],
            icon: Building2,
            gradient: 'from-pink-500 to-rose-500',
        },
        {
            title: 'Internal Control & Investigation',
            description: 'Design and review of internal controls, forensic audits, and fraud investigation services to protect your organization from financial irregularities.',
            features: [
                'Internal Control Design',
                'Control Effectiveness Review',
                'Forensic Audit',
                'Fraud Investigation',
                'Whistleblower Programs',
            ],
            icon: Shield,
            gradient: 'from-red-500 to-orange-500',
        },
        {
            title: 'Finance & Management Consultancy',
            description: 'Strategic financial guidance to help your business thrive, from capital planning to performance optimization and risk management.',
            features: [
                'Financial Planning & Analysis',
                'Business Valuation',
                'Investment Advisory',
                'Risk Management',
                'Performance Improvement',
            ],
            icon: BarChart3,
            gradient: 'from-indigo-500 to-blue-500',
        },
        {
            title: 'Human Capital Training',
            description: 'Capacity development and professional training programs to build your team\'s financial, accounting, and management capabilities.',
            features: [
                'Professional Development',
                'Accounting Training',
                'Tax Compliance Workshops',
                'Leadership Programs',
                'Technical Skills Development',
            ],
            icon: Users,
            gradient: 'from-teal-500 to-cyan-500',
        },
        {
            title: 'Accounting Software Solutions',
            description: 'Implementation and support for modern accounting software to streamline your financial operations, reporting, and decision-making.',
            features: [
                'Software Selection',
                'Implementation & Setup',
                'Data Migration',
                'Staff Training',
                'Ongoing Support',
            ],
            icon: Laptop,
            gradient: 'from-gray-600 to-gray-800',
        },
        {
            title: 'Forensic Audit',
            description: 'Specialized forensic accounting services to detect, investigate, and prevent financial fraud and irregularities in your organization.',
            features: [
                'Fraud Detection',
                'Asset Tracing',
                'Litigation Support',
                'Expert Witness Services',
                'Prevention Programs',
            ],
            icon: BookOpen,
            gradient: 'from-rose-500 to-red-600',
        },
    ];

    return (
        <main>
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-primary-400 font-medium mb-4 tracking-wide uppercase text-sm">
                            What We Do
                        </p>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Our Services
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Innovative solutions and excellent services for corporate and public sector
                            organizations in accountancy, auditing, taxation, and financial management.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all"
                                >
                                    <div className={`inline-flex w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} items-center justify-center mb-6`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                        {service.title}
                                    </h2>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {service.description}
                                    </p>
                                    <div className="space-y-2">
                                        {service.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-gray-700 text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Why Choose BYC?
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Fast. Accurate. Affordable.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-8 rounded-2xl bg-gray-800/50 border border-gray-700">
                            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Fast</h3>
                            <p className="text-gray-400">We always make efforts to complete assignments on time, delivering results when you need them.</p>
                        </div>

                        <div className="text-center p-8 rounded-2xl bg-gray-800/50 border border-gray-700">
                            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Accurate</h3>
                            <p className="text-gray-400">Precision in every engagement. Our team of professionals ensures accuracy in all deliverables.</p>
                        </div>

                        <div className="text-center p-8 rounded-2xl bg-gray-800/50 border border-gray-700">
                            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Affordable</h3>
                            <p className="text-gray-400">Quality services at competitive rates. We deliver value without compromising on excellence.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-primary-50 to-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        Let's discuss how our services can support your organization's financial success.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/contact" className="btn btn-primary btn-lg">
                            Contact Us Today
                        </a>
                        <a href="tel:+2349018811877" className="btn btn-ghost btn-lg">
                            Call +234 901 881 1877
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
