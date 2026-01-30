import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function AboutPage() {
    const team = [
        {
            name: 'Dr. Babatunde Yunus',
            role: 'Founder & Managing Partner',
            bio: 'Over 20 years of experience in strategic consulting across Africa. Dr. Yunus founded BYC with a vision to bring world-class consulting to Nigerian businesses.',
        },
        {
            name: 'Amina Okonkwo',
            role: 'Partner, Operations',
            bio: 'Expert in operational excellence and process optimization. Amina has led transformation projects across manufacturing, logistics, and financial services.',
        },
        {
            name: 'Chidi Adebayo',
            role: 'Partner, Digital Strategy',
            bio: 'Leading digital innovation initiatives for Nigerian enterprises. Chidi brings experience from both consulting and technology leadership roles.',
        },
    ];

    const stats = [
        { value: '2009', label: 'Founded' },
        { value: '200+', label: 'Clients Served' },
        { value: '50+', label: 'Industries' },
        { value: '98%', label: 'Client Retention' },
    ];

    const values = [
        {
            title: 'Excellence',
            description: 'We deliver exceptional results through rigorous analysis, innovative solutions, and attention to detail in everything we do.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            ),
        },
        {
            title: 'Integrity',
            description: 'We operate with transparency, honesty, and unwavering ethical standards. Our reputation is built on trust.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
        },
        {
            title: 'Local Expertise',
            description: 'Deep understanding of Nigerian business culture, regulations, and market dynamics sets us apart.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            title: 'Partnership',
            description: 'We work alongside our clients as trusted partners, committed to their long-term success and growth.',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
        },
    ];

    return (
        <main>
            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-primary-200 font-medium mb-4 tracking-wide uppercase text-sm">
                        About Us
                    </p>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Nigeria's Trusted
                        <span className="block">Consulting Partner</span>
                    </h1>
                    <p className="text-xl text-primary-100 max-w-3xl mx-auto">
                        Transforming Nigerian businesses through strategic excellence and deep local expertise since 2009
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-primary-600 font-medium mb-2">Our Story</p>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Building Nigeria's Future, One Business at a Time
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Founded in 2009 by Dr. Babatunde Yunus, BYC emerged from a vision to bridge the gap
                                between global consulting practices and the unique needs of Nigerian businesses.
                            </p>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Over the past 15 years, we've grown from a small team of consultants to Nigeria's
                                most trusted strategic advisory firm. We've helped over 200 organizations across
                                50+ industries achieve transformative results.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Our success is built on a simple principle: combine global best practices with
                                deep understanding of local context. This approach has enabled us to deliver
                                sustainable, impactful solutions that drive real business value.
                            </p>
                        </div>
                        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/team-collaboration.png"
                                alt="BYC Team"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-10 rounded-2xl shadow-lg">
                            <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                To be Africa's leading strategic consulting firm, recognized for transforming
                                businesses and creating sustainable value across the continent.
                            </p>
                        </div>
                        <div className="bg-white p-10 rounded-2xl shadow-lg">
                            <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                To empower Nigerian businesses with strategic insights, innovative solutions,
                                and actionable roadmaps that drive sustainable growth and competitive advantage.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <p className="text-primary-600 font-medium mb-2">What Guides Us</p>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            The principles that drive everything we do
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors group"
                            >
                                <div className="w-14 h-14 bg-primary-100 group-hover:bg-primary-200 rounded-xl flex items-center justify-center mx-auto mb-6 text-primary-600 transition-colors">
                                    {value.icon}
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">
                                    {value.title}
                                </h4>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Team */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <p className="text-primary-600 font-medium mb-2">Our Team</p>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership</h2>
                        <p className="text-xl text-gray-600">
                            Meet the experts driving transformation across Nigeria
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center">
                                <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                                    <span className="text-white text-4xl font-bold">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                                <p className="text-primary-600 font-semibold mb-4">{member.role}</p>
                                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-gray-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Work With Us?
                    </h2>
                    <p className="text-xl text-gray-400 mb-10">
                        Let's discuss how we can help your business achieve its goals.
                    </p>
                    <a
                        href="/contact"
                        className="btn btn-primary btn-lg"
                    >
                        Get in Touch
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
