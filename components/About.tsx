import Image from 'next/image';

export default function About() {
    const stats = [
        { number: '15+', label: 'Years Experience' },
        { number: '200+', label: 'Clients Served' },
        { number: '50+', label: 'Industries' },
        { number: '98%', label: 'Client Satisfaction' },
    ];

    const values = [
        {
            title: 'Excellence',
            description: 'We deliver exceptional results through rigorous analysis and innovative solutions.',
        },
        {
            title: 'Integrity',
            description: 'We operate with transparency, honesty, and unwavering ethical standards.',
        },
        {
            title: 'Local Expertise',
            description: 'Deep understanding of Nigerian business culture, regulations, and market dynamics.',
        },
        {
            title: 'Partnership',
            description: 'We work alongside our clients as trusted partners in their success journey.',
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                                {stat.number}
                            </div>
                            <div className="text-gray-600 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* About Content */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="animate-slideInLeft">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Empowering Nigerian Businesses Since 2009
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            BYC (By & Co) is Nigeria's premier strategic consulting firm, dedicated to
                            transforming businesses across diverse sectors. Our team of seasoned consultants
                            combines global best practices with deep local market knowledge.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            We believe in the potential of Nigerian businesses to compete globally while
                            creating sustainable value for their stakeholders and communities. Our mission
                            is to be the catalyst for this transformation.
                        </p>
                    </div>
                    <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl animate-slideInRight">
                        <Image
                            src="/team-collaboration.png"
                            alt="BYC Team Collaboration"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Values Section */}
                <div className="animate-fadeInUp">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
                        Our Core Values
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors"
                            >
                                <h4 className="text-xl font-bold text-gray-900 mb-3">
                                    {value.title}
                                </h4>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
