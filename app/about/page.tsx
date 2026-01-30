import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function AboutPage() {
    const values = [
        { title: 'Service Excellence', description: 'Committed to delivering excellent services at all times.' },
        { title: 'Customer Care', description: 'Our clients are the sole reason for our existence.' },
        { title: 'Integrity', description: 'Operating with transparency and ethical standards.' },
        { title: 'Professionalism', description: 'Maintaining best professional practices always.' },
        { title: 'Hard Work', description: 'Perseverance and dedication in every engagement.' },
        { title: 'Trustworthiness', description: 'Building lasting relationships through trust.' },
    ];

    const accreditations = [
        { name: 'ICAN', full: 'Institute of Chartered Accountants of Nigeria' },
        { name: 'CITN', full: 'Chartered Institute of Taxation of Nigeria' },
        { name: 'ICEN', full: 'Institute of Chartered Economics of Nigeria' },
        { name: 'CICMA', full: 'Chartered Institute of Cost and Management Accountants' },
        { name: 'NIM', full: 'Nigeria Institute of Management (Chartered)' },
        { name: 'IMC', full: 'Institute of Management Consultants' },
        { name: 'CIMAN', full: 'Chartered Institute of Management Accountants of Nigeria' },
        { name: 'CFAN', full: 'Chartered Forensic Accountants of Nigeria' },
        { name: 'FRCN', full: 'Financial Reporting Council of Nigeria' },
    ];

    const beliefs = [
        {
            title: 'Success',
            description: 'Your Success is our Business. We measure our achievements through your growth and prosperity.',
        },
        {
            title: 'Efficiency',
            description: 'We always make efforts to complete assignments on time, delivering results when you need them.',
        },
        {
            title: 'Knowledge',
            description: 'Knowledge is never complete. We are always striving to assimilate and share the wealth of knowledge in taxation, accounting, and fiscal laws.',
        },
        {
            title: 'Change',
            description: 'Change is the only constant. We remain abreast of changes in business environment and law affecting accounting and taxation.',
        },
    ];

    return (
        <main>
            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-primary-600 to-primary-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-primary-200 font-medium mb-4 tracking-wider uppercase text-sm">
                        About Us
                    </p>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
                        Babatunde Yunus & Co.
                    </h1>
                    <p className="text-xl text-primary-100 max-w-3xl mx-auto tracking-tight">
                        Chartered Accountants and Tax Practitioners committed to excellence
                    </p>
                </div>
            </section>

            {/* Company Stats */}
            <section className="py-12 bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <p className="text-4xl font-bold text-primary-600">3</p>
                            <p className="text-gray-600">Partners</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-primary-600">12+</p>
                            <p className="text-gray-600">Professional Accountants</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-primary-600">9+</p>
                            <p className="text-gray-600">Professional Bodies</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-primary-600">IFRS</p>
                            <p className="text-gray-600">Certified</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Firm */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-primary-600 font-medium mb-2 tracking-tight text-sm uppercase">The Firm</p>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tighter">
                                World-Class Audit and Tax Consulting
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed tracking-tight">
                                We are poised to be a reputable world-class Audit and Tax consulting Firm of
                                choice in Nigeria, Africa, and worldwide by committing ourselves to delivering
                                innovative and excellent services to our valued customers.
                            </p>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed tracking-tight">
                                We maintain the best professional practice and standards at all times through
                                our team of seasoned professionals. The Firm's business is to provide innovative
                                solutions and excellent services to corporate and public sector organizations.
                            </p>
                            <div className="bg-primary-50 p-6 rounded-xl border-l-4 border-primary-600">
                                <p className="text-primary-800 font-medium italic">
                                    "Your Success is Our Business"
                                </p>
                            </div>
                        </div>
                        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop"
                                alt="African professional woman working"
                                fill
                                className="object-cover"
                                quality={90}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-10 rounded-2xl shadow-lg">
                            <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Our Vision</h3>
                            <p className="text-gray-600 leading-relaxed text-lg tracking-tight">
                                To provide excellent services in Accountancy & Auditing, Taxation,
                                Human Capacity Training & Financial Management Consultancy in Nigeria.
                            </p>
                        </div>
                        <div className="bg-white p-10 rounded-2xl shadow-lg">
                            <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Our Mission</h3>
                            <p className="text-gray-600 leading-relaxed text-lg tracking-tight">
                                To be a reputable world-class Consulting Company of choice in Nigeria, with
                                the belief that our clients are the sole reason for our existence by committing
                                ourselves to render innovative and excellent services.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Believe */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <p className="text-primary-600 font-medium mb-2 tracking-tight text-sm uppercase">Our Philosophy</p>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tighter">What We Believe</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {beliefs.map((belief, index) => (
                            <div key={index} className="bg-gray-50 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{belief.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed tracking-tight">{belief.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <p className="text-primary-400 font-medium mb-2 tracking-tight text-sm uppercase">What Guides Us</p>
                        <h2 className="text-4xl font-bold text-white mb-4 tracking-tighter">Our Core Values</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-gray-800/50 backdrop-blur border border-gray-700 p-6 rounded-2xl hover:border-primary-500/50 transition-all"
                            >
                                <h4 className="text-lg font-bold text-white mb-2 tracking-tight">{value.title}</h4>
                                <p className="text-gray-400 text-sm tracking-tight">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Accreditations */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <p className="text-primary-600 font-medium mb-2 tracking-tight text-sm uppercase">Professional Memberships</p>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tighter">Our Accreditations</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto tracking-tight">
                            We are proud members of leading professional bodies in Nigeria
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                        {accreditations.map((acc, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-xl flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-primary-600 font-bold text-xs">{acc.name}</span>
                                </div>
                                <p className="text-gray-700 text-sm">{acc.full}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Certificate of Proficiency in International Financial Reporting Standard (IFRS)
                        </div>
                    </div>
                </div>
            </section>

            {/* Managing Partner */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                            <span className="text-white text-8xl font-bold">BIY</span>
                        </div>
                        <div>
                            <p className="text-primary-600 font-medium mb-2 tracking-tight text-sm uppercase">Leadership</p>
                            <h2 className="text-4xl font-bold text-gray-900 mb-2 tracking-tighter">
                                Babatunde Ismail Yunus
                            </h2>
                            <p className="text-primary-600 font-medium mb-6 tracking-tight">
                                ACA, FCTI, ACE, CTP - Managing Partner
                            </p>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed tracking-tight">
                                Among the few professionals in Africa whose accounting skill and professional
                                prowess have created solutions for countless persisting problems and have been
                                a trail for later practitioners to blaze.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed tracking-tight">
                                His excellent and forward-thinking mindset has set BYC Chartered Accountants
                                and Tax Practitioners on an ever excelling pace, establishing the firm as a
                                trusted name in Nigeria's professional services landscape.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-primary-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6 tracking-tighter">
                        Ready to Work With Us?
                    </h2>
                    <p className="text-xl text-primary-100 mb-10 tracking-tight">
                        Let's discuss how we can support your organization's financial success.
                    </p>
                    <a href="/contact" className="btn btn-white btn-lg">
                        Get in Touch
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
