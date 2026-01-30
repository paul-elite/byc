'use client';

import { Calculator, FileSearch, Shield, FileText, Users, Building2, Search, Laptop } from 'lucide-react';

export default function Services() {
    const services = [
        {
            title: 'Accountancy',
            description: 'Comprehensive accounting services including financial reporting, bookkeeping, and management accounts for informed decision-making.',
            icon: Calculator,
            gradient: 'from-emerald-500 to-teal-500',
        },
        {
            title: 'Auditing',
            description: 'Statutory audits, internal audits, and assurance services that provide stakeholders with confidence in your financial statements.',
            icon: FileSearch,
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Tax Advisory & Planning',
            description: 'Expert tax planning, compliance, and advisory services to optimize your tax position within legal frameworks.',
            icon: FileText,
            gradient: 'from-violet-500 to-purple-500',
        },
        {
            title: 'Tax Audit & Monitoring',
            description: 'Proactive tax audit support and monitoring to ensure compliance with FIRS requirements and minimize exposure.',
            icon: Search,
            gradient: 'from-orange-500 to-amber-500',
        },
        {
            title: 'Corporate Secretarial',
            description: 'Company registration, AGM support, regulatory compliance with CAC, and comprehensive corporate governance services.',
            icon: Building2,
            gradient: 'from-pink-500 to-rose-500',
        },
        {
            title: 'Internal Control & Investigation',
            description: 'Design and review of internal controls, forensic audits, and fraud investigation services to protect your organization.',
            icon: Shield,
            gradient: 'from-red-500 to-orange-500',
        },
        {
            title: 'Human Capital Training',
            description: 'Capacity development and professional training programs to build your team\'s financial and management capabilities.',
            icon: Users,
            gradient: 'from-indigo-500 to-blue-500',
        },
        {
            title: 'Accounting Software Solutions',
            description: 'Implementation and support for modern accounting software to streamline your financial operations and reporting.',
            icon: Laptop,
            gradient: 'from-teal-500 to-green-500',
        },
    ];

    return (
        <section id="services" className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <p className="text-primary-600 font-medium mb-2">What We Do</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our Services
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Innovative solutions and excellent services for corporate and public sector organizations
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                            >
                                <div className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <a
                        href="/services"
                        className="btn btn-primary btn-lg"
                    >
                        View All Services
                    </a>
                </div>
            </div>
        </section>
    );
}
