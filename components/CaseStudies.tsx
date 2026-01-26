import Image from 'next/image';

export default function CaseStudies() {
    const cases = [
        {
            title: 'Banking Sector Digital Transformation',
            client: 'Leading Nigerian Bank',
            result: '40% increase in digital transactions, 60% reduction in processing time',
            industry: 'Financial Services',
            image: '/strategy-illustration.png',
        },
        {
            title: 'Supply Chain Optimization',
            client: 'Major FMCG Company',
            result: '25% cost reduction, 35% improvement in delivery times',
            industry: 'Consumer Goods',
            image: '/team-collaboration.png',
        },
        {
            title: 'Market Expansion Strategy',
            client: 'Tech Startup',
            result: 'Successful entry into 5 new states, 200% revenue growth',
            industry: 'Technology',
            image: '/hero-lagos.png',
        },
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-primary-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-fadeInUp">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Proven Impact
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Real results for Nigerian businesses across diverse sectors
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cases.map((caseStudy, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className="relative h-48">
                                <Image
                                    src={caseStudy.image}
                                    alt={caseStudy.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    {caseStudy.industry}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {caseStudy.title}
                                </h3>
                                <p className="text-gray-600 mb-4 text-sm">{caseStudy.client}</p>
                                <div className="border-t border-gray-200 pt-4">
                                    <p className="text-primary-700 font-semibold">
                                        {caseStudy.result}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a
                        href="/contact"
                        className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                        Start Your Success Story
                    </a>
                </div>
            </div>
        </section>
    );
}
