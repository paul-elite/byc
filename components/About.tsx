import Image from 'next/image';

export default function About() {
    const values = [
        {
            title: 'Service Excellence',
            description: 'Delivering excellent services at all times to our valued clients.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
            ),
        },
        {
            title: 'Integrity',
            description: 'Operating with transparency and unwavering ethical standards.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
            ),
        },
        {
            title: 'Professionalism',
            description: 'Maintaining best professional practices through seasoned experts.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
            ),
        },
        {
            title: 'Customer Care',
            description: 'Our clients are the sole reason for our existence.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            ),
        },
    ];

    const accreditations = ['ICAN', 'CITN', 'ICEN', 'CICMA', 'NIM', 'IMC', 'FRCN', 'IFRS'];

    return (
        <section id="about" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* About Content */}
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
                    <div>
                        <p className="text-primary-600 font-semibold mb-2 tracking-tight text-sm uppercase">About BYC</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tighter">
                            World-Class Audit & Tax Consulting
                        </h2>
                        <p className="text-lg text-gray-600 mb-5 leading-relaxed tracking-tight">
                            <strong className="text-gray-900">Babatunde Yunus & Co.</strong> is a reputable Chartered Accountants and Tax
                            Practitioners firm committed to delivering innovative and excellent services
                            to corporate and public sector organizations in Nigeria.
                        </p>
                        <p className="text-gray-600 mb-8 leading-relaxed tracking-tight">
                            We maintain the best professional standards at all times through our team
                            of seasoned professionals. Our belief is simple: <em className="text-primary-600 font-medium">Your Success is Our Business.</em>
                        </p>

                        {/* Accreditations */}
                        <div className="mb-8">
                            <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Professional Memberships</p>
                            <div className="flex flex-wrap gap-2">
                                {accreditations.map((acc, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-lg text-xs font-semibold tracking-tight"
                                    >
                                        {acc}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <a href="/about" className="btn btn-primary btn-md">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                            Learn More
                        </a>
                    </div>
                    <div className="relative">
                        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=2070&auto=format&fit=crop"
                                alt="African business team collaboration"
                                fill
                                className="object-cover"
                                quality={90}
                            />
                        </div>
                        {/* Floating card */}
                        <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-5 border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900 tracking-tighter">9+</p>
                                    <p className="text-xs text-gray-500 tracking-tight">Certifications</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div>
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tighter">
                            Our Core Values
                        </h3>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto tracking-tight">
                            The principles that guide everything we do
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors group"
                            >
                                <div className="w-12 h-12 bg-primary-100 group-hover:bg-primary-200 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary-600 transition-colors">
                                    {value.icon}
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-2 tracking-tight">
                                    {value.title}
                                </h4>
                                <p className="text-gray-600 text-sm tracking-tight">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
