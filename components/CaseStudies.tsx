import Image from 'next/image';

export default function CaseStudies() {
    const industries = [
        'Manufacturing', 'Technology', 'Finance', 'Agriculture',
        'Public Sector', 'Health Care', 'Real Estate', 'Trade & Investment',
    ];

    const strategies = [
        {
            number: '01',
            title: 'Care',
            description: 'We put our clients first. They are the reason we are in business.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            ),
        },
        {
            number: '02',
            title: 'Attention',
            description: 'Full attention to client needs with experience and expertise.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
        },
        {
            number: '03',
            title: 'Response',
            description: 'Instantaneous response to maintain our good relationship.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
            ),
        },
        {
            number: '04',
            title: 'Excellence',
            description: 'Committed to delivering excellent services at all times.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                </svg>
            ),
        },
    ];

    return (
        <section className="py-24 bg-gray-900 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full">
                <Image
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
                    alt="Business analytics"
                    fill
                    className="object-cover opacity-10"
                    quality={80}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Strategy Section */}
                <div className="text-center mb-16">
                    <p className="text-primary-400 font-semibold mb-2 tracking-tight text-sm uppercase">Our Approach</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
                        The CARE Strategy
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto tracking-tight">
                        How we deliver excellence to every client, every time
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
                    {strategies.map((strategy, index) => (
                        <div
                            key={index}
                            className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-2xl p-6 hover:border-primary-500/50 transition-all group"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center text-primary-400 group-hover:bg-primary-500/30 transition-colors">
                                    {strategy.icon}
                                </div>
                                <span className="text-primary-400 text-xs font-semibold tracking-wider">{strategy.number}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                                {strategy.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed tracking-tight">
                                {strategy.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Industries Section */}
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                        Industries We Serve
                    </h3>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto text-sm tracking-tight">
                        Serving organizations from micro to multi-national scale across government, NGOs, and the private sector.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {industries.map((industry, index) => (
                            <span
                                key={index}
                                className="px-4 py-2 bg-gray-800/80 text-gray-300 rounded-full text-sm border border-gray-700/50 hover:border-primary-500/50 hover:text-primary-400 transition-colors tracking-tight"
                            >
                                {industry}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-12">
                    <a href="/contact" className="btn btn-primary btn-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                        </svg>
                        Work With Us
                    </a>
                </div>
            </div>
        </section>
    );
}
