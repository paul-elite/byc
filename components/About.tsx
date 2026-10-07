import Image from 'next/image';
import Link from 'next/link';

export default function About() {
    const values = [
        ['Precision', 'Clear records, tested assumptions, and documented positions.'],
        ['Judgement', 'Advice shaped by Nigerian regulatory realities and business context.'],
        ['Continuity', 'Systems and routines your team can keep using after engagement.'],
    ];

    const memberships = ['ICAN', 'CITN', 'FRCN', 'IFRS', 'NIM', 'IMC'];

    return (
        <section id="about" className="bg-[#fffaf0] py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
                    <div className="relative">
                        <div className="relative aspect-[4/4.6] overflow-hidden rounded-[2rem] shadow-[0_28px_90px_rgba(3,23,17,0.18)]">
                            <Image
                                src="/brand/byc-advisory-session.png"
                                alt="Nigerian professionals reviewing audit and tax documents"
                                fill
                                sizes="(min-width: 1024px) 45vw, 100vw"
                                className="object-cover"
                                quality={92}
                            />
                        </div>
                        <div className="absolute -bottom-7 left-5 right-5 rounded-[1.5rem] bg-primary-950 p-5 text-[#fffaf0] shadow-2xl lg:left-auto lg:right-[-36px] lg:w-[330px]">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#dcc781]">Professional footing</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {memberships.map((item) => (
                                    <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold">{item}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary-700">About the firm</p>
                        <h2 className="mt-5 text-4xl md:text-6xl text-primary-950">
                            Built for finance work that has to be both careful and useful.
                        </h2>
                        <p className="mt-7 text-lg text-[#4b5b50]">
                            Babatunde Yunus & Co. is a firm of Chartered Accountants and Tax Practitioners serving Nigerian businesses, public-sector teams, NGOs, and institutional clients with audit, tax, accountancy, and governance support.
                        </p>
                        <p className="mt-5 text-[#5c675f]">
                            The work is practical: clean records, defensible filings, stronger internal routines, and advisory documents that leaders can act on.
                        </p>

                        <div className="mt-9 grid gap-4">
                            {values.map(([title, description]) => (
                                <div key={title} className="rounded-2xl border border-primary-100 bg-primary-50/70 p-5">
                                    <h3 className="text-xl text-primary-950">{title}</h3>
                                    <p className="mt-2 text-sm text-[#5c675f]">{description}</p>
                                </div>
                            ))}
                        </div>

                        <Link href="/about" className="btn btn-primary btn-lg mt-9">
                            Learn about BYC
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
