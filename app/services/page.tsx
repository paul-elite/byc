import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function ServicesPage() {
    const services = [
        {
            title: 'Strategy & Transformation',
            description: 'Navigate complex business challenges with data-driven strategies tailored to the Nigerian market. We help you define your vision, identify opportunities, and create actionable roadmaps for sustainable growth.',
            features: [
                'Corporate Strategy Development',
                'Business Model Innovation',
                'Market Entry & Expansion',
                'Mergers & Acquisitions Advisory',
                'Organizational Restructuring',
            ],
            image: '/strategy-illustration.png',
        },
        {
            title: 'Operations Excellence',
            description: 'Optimize processes, reduce costs, and improve efficiency across your organization. Our operations experts identify bottlenecks and implement solutions that deliver measurable results.',
            features: [
                'Process Optimization',
                'Supply Chain Management',
                'Quality Management Systems',
                'Lean Six Sigma Implementation',
                'Performance Management',
            ],
            image: '/team-collaboration.png',
        },
        {
            title: 'Digital Innovation',
            description: 'Leverage technology to drive growth, enhance customer experience, and stay competitive in the digital age. We guide your digital transformation journey from strategy to execution.',
            features: [
                'Digital Strategy & Roadmap',
                'Technology Assessment',
                'Customer Experience Design',
                'Data Analytics & AI',
                'Digital Marketing Strategy',
            ],
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
            image: '/hero-lagos.png',
        },
    ];

    return (
        <main>
            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-primary-600 to-primary-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Our Services
                    </h1>
                    <p className="text-xl text-primary-100 max-w-3xl mx-auto">
                        Comprehensive consulting solutions designed for Nigerian businesses
                    </p>
                </div>
            </section>

            {/* Services Detail */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-24">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''
                                    }`}
                            >
                                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                        {service.title}
                                    </h2>
                                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                        {service.description}
                                    </p>
                                    <div className="space-y-3">
                                        {service.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center space-x-3">
                                                <svg className="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={`relative h-80 rounded-2xl overflow-hidden shadow-2xl ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                        Ready to Transform Your Business?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Let's discuss how our services can help you achieve your goals.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-all hover:scale-105 shadow-lg"
                    >
                        Schedule a Consultation
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
