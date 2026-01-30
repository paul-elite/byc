'use client';

import { TrendingUp, Target, Lightbulb, BarChart3, Users, Globe } from 'lucide-react';

export default function Services() {
    const services = [
        {
            title: 'Strategy & Transformation',
            description: 'Data-driven strategies tailored for the Nigerian market. We define your vision, identify opportunities, and create actionable roadmaps.',
            icon: Target,
            gradient: 'from-emerald-500 to-teal-500',
        },
        {
            title: 'Operations Excellence',
            description: 'Optimize processes, reduce costs, and improve efficiency. Our experts identify bottlenecks and implement solutions that deliver results.',
            icon: TrendingUp,
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Digital Innovation',
            description: 'Leverage technology to drive growth and enhance customer experience. We guide your digital transformation from strategy to execution.',
            icon: Lightbulb,
            gradient: 'from-violet-500 to-purple-500',
        },
        {
            title: 'Financial Advisory',
            description: 'Expert guidance on financial planning, risk management, and sustainable growth. Make informed decisions that maximize value.',
            icon: BarChart3,
            gradient: 'from-orange-500 to-amber-500',
        },
        {
            title: 'Organizational Development',
            description: 'Build high-performing teams and cultures that drive innovation. Attract, develop, and retain top talent.',
            icon: Users,
            gradient: 'from-pink-500 to-rose-500',
        },
        {
            title: 'Market Entry & Expansion',
            description: 'Strategic support for entering or expanding within Nigeria. Local insights, regulatory guidance, and go-to-market strategies.',
            icon: Globe,
            gradient: 'from-indigo-500 to-blue-500',
        },
    ];

    return (
        <section id="services" className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        What We Do
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Comprehensive consulting solutions designed for Nigerian businesses seeking sustainable growth and competitive advantage
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                            >
                                <div className={`inline-flex w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
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
                        Explore All Services
                    </a>
                </div>
            </div>
        </section>
    );
}
