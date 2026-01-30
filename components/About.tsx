import Image from 'next/image';

export default function About() {
    const values = [
        {
            title: 'Service Excellence',
            description: 'We are committed to delivering excellent services at all times to our valued clients.',
        },
        {
            title: 'Integrity',
            description: 'We operate with transparency, honesty, and unwavering ethical standards.',
        },
        {
            title: 'Professionalism',
            description: 'Maintaining the best professional practice and standards through our team of seasoned professionals.',
        },
        {
            title: 'Customer Care',
            description: 'Our clients are the sole reason for our existence. We put them first in everything we do.',
        },
    ];

    const accreditations = [
        'ICAN', 'CITN', 'ICEN', 'CICMA', 'NIM', 'IMC', 'FRCN', 'IFRS'
    ];

    return (
        <section id="about" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* About Content */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <p className="text-primary-600 font-medium mb-2">About BYC</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            World-Class Audit & Tax Consulting
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            <strong>Babatunde Yunus & Co.</strong> is a reputable Chartered Accountants and Tax
                            Practitioners firm committed to delivering innovative and excellent services
                            to corporate and public sector organizations in Nigeria.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            We maintain the best professional standards at all times through our team
                            of seasoned professionals. Our belief is simple: <em>Your Success is Our Business.</em>
                        </p>

                        {/* Accreditations */}
                        <div className="mb-8">
                            <p className="text-sm font-medium text-gray-500 mb-3">Professional Memberships</p>
                            <div className="flex flex-wrap gap-2">
                                {accreditations.map((acc, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                                    >
                                        {acc}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <a href="/about" className="btn btn-primary">
                            Learn More About Us
                        </a>
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

                {/* Values Section */}
                <div>
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Core Values
                        </h3>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors group"
                            >
                                <div className="w-12 h-12 bg-primary-100 group-hover:bg-primary-200 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
                                    <span className="text-primary-600 font-bold text-lg">{index + 1}</span>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">
                                    {value.title}
                                </h4>
                                <p className="text-gray-600 text-sm">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
