export default function CaseStudies() {
    const industries = [
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
        'Trade & Investment',
        'Communication',
    ];

    const strategies = [
        {
            number: '01',
            title: 'Care',
            description: 'We recognize and respect our valued clients. We put our clients first. They are the reason we are in business.',
        },
        {
            number: '02',
            title: 'Attention',
            description: 'We give full attention to our clients\' needs, counting on our experience and expertise to deliver the best service.',
        },
        {
            number: '03',
            title: 'Response',
            description: 'Instantaneous response to our clients\' needs and requirements helps maintain our good relationship.',
        },
        {
            number: '04',
            title: 'Excellence',
            description: 'We are always committed to delivering excellent services at all times to our valued clients.',
        },
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Strategy Section */}
                <div className="text-center mb-16">
                    <p className="text-primary-400 font-medium mb-2">Our Approach</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        The CARE Strategy
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        How we deliver excellence to every client, every time
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {strategies.map((strategy, index) => (
                        <div
                            key={index}
                            className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6 hover:border-primary-500/50 transition-all"
                        >
                            <span className="text-primary-400 text-sm font-medium">{strategy.number}</span>
                            <h3 className="text-2xl font-bold text-white mt-2 mb-3">
                                {strategy.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {strategy.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Industries Section */}
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">
                        Industries We Serve
                    </h3>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        We serve organizations at the micro, small, medium-size, large and multi-national scale
                        across government, NGOs, and the private sector.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {industries.map((industry, index) => (
                            <span
                                key={index}
                                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700 hover:border-primary-500 hover:text-primary-400 transition-colors"
                            >
                                {industry}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-12">
                    <a
                        href="/contact"
                        className="btn btn-primary btn-lg"
                    >
                        Work With Us
                    </a>
                </div>
            </div>
        </section>
    );
}
