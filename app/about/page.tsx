import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function AboutPage() {
    const team = [
        {
            name: 'Dr. Babatunde Yunus',
            role: 'Founder & Managing Partner',
            bio: 'Over 20 years of experience in strategic consulting across Africa.',
        },
        {
            name: 'Amina Okonkwo',
            role: 'Partner, Operations',
            bio: 'Expert in operational excellence and process optimization.',
        },
        {
            name: 'Chidi Adebayo',
            role: 'Partner, Digital Transformation',
            bio: 'Leading digital innovation initiatives for Nigerian enterprises.',
        },
    ];

    return (
        <main>
            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-primary-600 to-primary-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        About BYC
                    </h1>
                    <p className="text-xl text-primary-100 max-w-3xl mx-auto">
                        Transforming Nigerian businesses through strategic excellence and local expertise
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                                Founded in 2009, BYC (By & Co) emerged from a vision to bring world-class
                                consulting expertise to Nigerian businesses. Our founder, Dr. Babatunde Yunus,
                                recognized the gap between global consulting practices and the unique needs of
                                the Nigerian market.
                            </p>
                            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
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
                        <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
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
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To be Africa's leading strategic consulting firm, recognized for transforming
                                businesses and creating sustainable value across the continent.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                            <p className="text-gray-600 leading-relaxed">
                                To empower Nigerian businesses with strategic insights, innovative solutions,
                                and actionable roadmaps that drive sustainable growth and competitive advantage.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Team */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
                        <p className="text-xl text-gray-600">
                            Meet the experts driving transformation across Nigeria
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <div key={index} className="text-center">
                                <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-white text-4xl font-bold">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                                <p className="text-primary-600 font-semibold mb-3">{member.role}</p>
                                <p className="text-gray-600">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
