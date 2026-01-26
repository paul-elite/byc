import React from 'react';
import { Calculator, TrendingUp, Shield, FileText, Users, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ServicesPage() {
    const services = [
        {
            title: 'Audit & Assurance',
            description: 'Comprehensive audit services that provide stakeholders with confidence in your financial reporting. Our experienced auditors deliver thorough, independent examinations while ensuring compliance with Nigerian and international standards.',
            features: [
                'Statutory Audit Services',
                'Internal Audit & Controls',
                'Forensic Audit & Investigation',
                'Due Diligence Reviews',
                'Compliance Audits',
            ],
            icon: Shield,
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Tax Advisory & Compliance',
            description: 'Navigate Nigeria\'s complex tax landscape with expert guidance. We help you optimize tax positions, ensure compliance with FIRS requirements, and minimize tax liabilities within legal frameworks.',
            features: [
                'Corporate Tax Planning',
                'VAT & WHT Compliance',
                'Tax Health Checks',
                'Transfer Pricing Services',
                'Tax Dispute Resolution',
            ],
            icon: Calculator,
            gradient: 'from-emerald-500 to-teal-500',
        },
        {
            title: 'Financial Advisory',
            description: 'Strategic financial guidance to help your business thrive. From raising capital to optimizing financial structures, we provide insights that drive sustainable growth and profitability.',
            features: [
                'Business Valuation',
                'Financial Restructuring',
                'Investment Advisory',
                'Capital Raising Support',
                'Financial Due Diligence',
            ],
            icon: TrendingUp,
            gradient: 'from-violet-500 to-purple-500',
        },
        {
            title: 'Accounting & Bookkeeping',
            description: 'Accurate, timely financial records that form the foundation of sound business decisions. We handle your accounting needs so you can focus on growing your business.',
            features: [
                'Monthly Financial Reporting',
                'Payroll Management',
                'Financial Statement Preparation',
                'Account Reconciliation',
                'Cloud Accounting Solutions',
            ],
            icon: FileText,
            gradient: 'from-orange-500 to-red-500',
        },
        {
            title: 'Business Advisory',
            description: 'Strategic counsel for business growth and sustainability. We partner with you to navigate challenges, seize opportunities, and build resilient organizations in Nigeria\'s dynamic business environment.',
            features: [
                'Strategic Business Planning',
                'Performance Improvement',
                'Risk Management',
                'Corporate Governance',
                'Business Process Optimization',
            ],
            icon: Users,
            gradient: 'from-pink-500 to-rose-500',
        },
        {
            title: 'Company Secretarial Services',
            description: 'Comprehensive corporate secretarial support ensuring your company meets all regulatory requirements. We manage compliance with CAC and other regulatory bodies efficiently.',
            features: [
                'Company Registration',
                'AGM & Board Meeting Support',
                'Regulatory Compliance',
                'Share Capital Management',
                'Corporate Restructuring',
            ],
            icon: Building2,
            gradient: 'from-indigo-500 to-blue-500',
        },
    ];

    const stats = [
        { label: 'Years of Excellence', value: '15+' },
        { label: 'Clients Served', value: '200+' },
        { label: 'Professional Team', value: '50+' },
        { label: 'Successful Audits', value: '500+' },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-24 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900"></div>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-full px-4 py-2 mb-8">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                            <span className="text-emerald-200 text-sm font-medium">Professional Services in Abuja</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Comprehensive
                            <span className="block bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                                Accounting Solutions
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Expert accounting, auditing, and advisory services tailored for Nigerian businesses
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-slate-400 text-sm md:text-base">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Detail */}
            <section className="py-24 bg-gradient-to-b from-white to-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Our Services
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Delivering excellence across all aspects of accounting and business advisory
                        </p>
                    </div>

                    <div className="space-y-16">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <div
                                    key={index}
                                    className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                                        style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
                                    ></div>

                                    <div className="grid md:grid-cols-5 gap-8 p-8 md:p-12">
                                        {/* Icon & Title Section */}
                                        <div className="md:col-span-2 flex flex-col justify-center">
                                            <div className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                                <Icon className="w-8 h-8 text-white" />
                                            </div>

                                            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                                {service.title}
                                            </h3>

                                            <p className="text-lg text-slate-600 leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>

                                        {/* Features Section */}
                                        <div className="md:col-span-3">
                                            <div className="bg-slate-50 rounded-2xl p-8 h-full">
                                                <div className="flex items-center gap-2 mb-6">
                                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                                    <span className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                                                        Key Services
                                                    </span>
                                                </div>

                                                <div className="space-y-4">
                                                    {service.features.map((feature, idx) => (
                                                        <div key={idx} className="flex items-start gap-3 group/item">
                                                            <div className={`mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${service.gradient} group-hover/item:scale-150 transition-transform`}></div>
                                                            <span className="text-slate-700 font-medium group-hover/item:text-slate-900 transition-colors">
                                                                {feature}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-8 rounded-2xl bg-slate-800/50 backdrop-blur border border-slate-700 hover:border-emerald-500/50 transition-all">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Trusted Expertise</h3>
                            <p className="text-slate-400">ICAN certified professionals with deep local market knowledge</p>
                        </div>

                        <div className="text-center p-8 rounded-2xl bg-slate-800/50 backdrop-blur border border-slate-700 hover:border-emerald-500/50 transition-all">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Regulatory Compliance</h3>
                            <p className="text-slate-400">Stay compliant with FIRS, CAC, and industry regulations</p>
                        </div>

                        <div className="text-center p-8 rounded-2xl bg-slate-800/50 backdrop-blur border border-slate-700 hover:border-emerald-500/50 transition-all">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Business Growth</h3>
                            <p className="text-slate-400">Strategic insights that drive profitability and expansion</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-slate-50 to-emerald-50 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2310b981' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                    }}></div>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Ready to Elevate Your
                        <span className="block mt-2 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            Financial Management?
                        </span>
                    </h2>

                    <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                        Partner with Abuja's trusted accounting professionals. Let's discuss how we can support your business growth.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="/contact"
                            className="group inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-emerald-500/50 transition-all hover:scale-105">
                            Schedule a Consultation
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a
                            href="tel:+234"
                            className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-slate-200 hover:border-emerald-500 transition-all hover:scale-105">

                            Call Us Today
                        </a>
                    </div>

                    <p className="mt-8 text-sm text-slate-500">
                        ✓ Free initial consultation  ✓ Flexible engagement models  ✓ Transparent pricing
                    </p>
                </div>
            </section>
        </div>
    );
}