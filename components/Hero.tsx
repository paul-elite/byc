import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-lagos.png"
                    alt="Lagos Business District"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-primary-900/70"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
                <div className="animate-fadeInUp">
                    <p className="text-primary-400 font-medium mb-4 tracking-wide uppercase text-sm">
                        Nigeria's Trusted Consulting Partner
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
                        Strategic Solutions for
                        <br />
                        <span className="text-primary-400">Nigerian Businesses</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                        We partner with ambitious organizations to solve complex challenges,
                        drive sustainable growth, and unlock their full potential in Nigeria's
                        dynamic market.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="btn btn-primary btn-lg"
                        >
                            Start a Conversation
                        </a>
                        <a
                            href="#services"
                            className="btn btn-white btn-lg"
                        >
                            Explore Services
                        </a>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-16 pt-8 border-t border-white/10">
                        <p className="text-gray-400 text-sm mb-6">Trusted by leading organizations across Nigeria</p>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                            <div className="text-center">
                                <p className="text-3xl md:text-4xl font-bold text-white">15+</p>
                                <p className="text-gray-400 text-sm">Years Experience</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl md:text-4xl font-bold text-white">200+</p>
                                <p className="text-gray-400 text-sm">Clients Served</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl md:text-4xl font-bold text-white">50+</p>
                                <p className="text-gray-400 text-sm">Industries</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl md:text-4xl font-bold text-white">98%</p>
                                <p className="text-gray-400 text-sm">Client Retention</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <a href="#services" className="text-white/60 hover:text-white transition-colors">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
