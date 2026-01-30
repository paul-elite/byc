import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Target, TrendingUp, Lightbulb, BarChart3, Users, Globe } from 'lucide-react';

export default function ServicesPage() {
    const services = [
        {
            title: 'Strategy & Transformation',
            description: 'Navigate complex business challenges with data-driven strategies tailored to the Nigerian market. We help you define your vision, identify opportunities, and create actionable roadmaps for sustainable growth.',
            features: [
                'Corporate Strategy Development',
                'Business Model Innovation',
                'Market Entry & Expansion Planning',
                'Mergers & Acquisitions Advisory',
                'Organizational Restructuring',
            ],
            icon: Target,
            gradient: 'from-emerald-500 to-teal-500',
            image: '/strategy-illustration.png',
        },
        {
            title: 'Operations Excellence',
            description: 'Optimize processes, reduce costs, and improve efficiency across your organization. Our operations experts identify bottlenecks and implement solutions that deliver measurable results.',
            features: [
                'Process Optimization & Redesign',
                'Supply Chain Management',
                'Quality Management Systems',
                'Lean Six Sigma Implementation',
                'Performance Management',
            ],
            icon: TrendingUp,
            gradient: 'from-blue-500 to-cyan-500',
            image: '/team-collaboration.png',
        },
        {
            title: 'Digital Innovation',
            description: 'Leverage technology to drive growth, enhance customer experience, and stay competitive in the digital age. We guide your digital transformation journey from strategy to execution.',
            features: [
                'Digital Strategy & Roadmap',
                'Technology Assessment',
                'Customer Experience Design',
                'Data Analytics & Insights',
                'Digital Marketing Strategy',
            ],
            icon: Lightbulb,
            gradient: 'from-violet-500 to-purple-500',
            image: '/hero-lagos.png',
        },
        {
            title: 'Financial Advisory',
            description: 'Expert guidance on financial planning, risk management, and sustainable growth strategies. We help you make informed decisions that maximize value and minimize risk.',
            features: [
                'Financial Planning & Analysis',
                'Investment Strategy',
                'Risk Management',
                'Capital Structure Optimization',
                'Valuation Services',
            ],
            icon: BarChart3,
            gradient: 'from-orange-500 to-amber-500',
            image: '/strategy-illustration.png',
        },
        {
            title: 'Organizational Development',
            description: 'Build high-performing teams and create cultures that drive innovation and results. We help you attract, develop, and retain top talent while fostering organizational excellence.',
            features: [
                'Leadership Development',
                'Talent Management',
                'Change Management',
                'Culture Transformation',
                'Performance Coaching',
            ],
            icon: Users,
            gradient: 'from-pink-500 to-rose-500',
            image: '/team-collaboration.png',
        },
        {
            title: 'Market Entry & Expansion',
            description: 'Strategic support for businesses entering or expanding within the Nigerian market. We provide local insights, regulatory guidance, and go-to-market strategies.',
            features: [
                'Market Research & Analysis',
                'Regulatory Compliance',
                'Partnership Development',
                'Distribution Strategy',
                'Brand Positioning',
            ],
            icon: Globe,
            gradient: 'from-indigo-500 to-blue-500',
            image: '/hero-lagos.png',
        },
    ];

    const stats = [
        { label: 'Years of Excellence', value: '15+' },
        { label: 'Clients Served', value: '200+' },
        { label: 'Industries Covered', value: '50+' },
        { label: 'Client Retention', value: '98%' },
    ];

    return (
        <main>
            <Navigation />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900"></div>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-primary-400 font-medium mb-4 tracking-wide uppercase text-sm">
                            What We Do
                        </p>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            Comprehensive
                            <span className="block text-primary-400">
                                Consulting Solutions
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Strategic advisory services designed for Nigerian businesses seeking sustainable growth and competitive advantage
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Detail */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-24">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            const isReversed = index % 2 === 1;
                            return (
                                <div
                                    key={index}
                                    className={`grid md:grid-cols-2 gap-12 items-center ${isReversed ? 'md:flex-row-reverse' : ''}`}
                                >
                                    <div className={isReversed ? 'md:order-2' : ''}>
                                        <div className={`inline-flex w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} items-center justify-center mb-6`}>
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                            {service.title}
                                        </h2>
                                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                            {service.description}
                                        </p>
                                        <div className="space-y-3">
                                            {service.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-3">
                                                    <svg className="w-5 h-5 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="text-gray-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={`relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl ${isReversed ? 'md:order-1' : ''}`}>
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover"
                                        />
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
                            Why Partner With BYC?
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            What sets us apart from other consulting firms
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-8 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-primary-500/50 transition-all">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Proven Expertise</h3>
                            <p className="text-gray-400">15+ years of experience delivering results for Nigerian businesses across all major industries</p>
                        </div>

                        <div className="text-center p-8 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-primary-500/50 transition-all">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Local Knowledge</h3>
                            <p className="text-gray-400">Deep understanding of Nigerian market dynamics, regulations, and business culture</p>
                        </div>

                        <div className="text-center p-8 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-primary-500/50 transition-all">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Measurable Results</h3>
                            <p className="text-gray-400">We focus on delivering tangible outcomes that drive real business value and growth</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-primary-50 to-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Ready to Transform
                        <span className="block text-primary-600">Your Business?</span>
                    </h2>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        Let's discuss how our services can help you achieve your goals and unlock new opportunities.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="btn btn-primary btn-lg"
                        >
                            Schedule a Consultation
                        </a>
                        <a
                            href="tel:+2349018811877"
                            className="btn btn-ghost btn-lg"
                        >
                            Call +234 901 881 1877
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
