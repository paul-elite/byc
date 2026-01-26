import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-lagos.png"
                    alt="BYC Consulting Team in Lagos"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-primary-900/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
                <div className="animate-fadeInUp">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        Transforming Nigerian
                        <br />
                        <span className="text-primary-400">Businesses</span> for Tomorrow
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
                        Strategic consulting excellence rooted in deep understanding of the Nigerian market.
                        We help organizations achieve sustainable growth and lasting impact.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="#services"
                            className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-all hover:scale-105 shadow-lg"
                        >
                            Explore Our Services
                        </a>
                        <a
                            href="/contact"
                            className="bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
                        >
                            Get in Touch
                        </a>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            </div>
        </section>
    );
}
