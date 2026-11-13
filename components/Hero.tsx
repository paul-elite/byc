import Image from 'next/image';
import Link from 'next/link';
import { photos } from '@/lib/images';

const facts = [
    ['Member of', 'ICAN, CITN and FRCN'],
    ['Offices', 'Abuja and Ilorin, Kwara'],
    ['Practice areas', 'Audit, tax and accounting'],
    ['Registration', 'CAC BN 2861419'],
];

export default function Hero() {
    return (
        <section className="bg-white pt-16 lg:pt-[72px]">
            <div className="container grid items-center gap-10 py-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-20">
                <div>
                    <Link href="/blog/nigeria-tax-reform-2026-what-changed-for-businesses" className="group mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white py-1 pl-1 pr-3 text-sm text-neutral-700 transition-colors hover:border-primary-300">
                        <span className="rounded-full bg-primary-700 px-2 py-0.5 text-xs font-medium text-white">2026</span>
                        What the new tax laws mean for you
                        <span className="text-neutral-400 transition-transform group-hover:translate-x-0.5">→</span>
                    </Link>
                    <p className="eyebrow">Chartered Accountants &amp; Tax Practitioners</p>
                    <h1 className="mt-4 text-4xl text-neutral-900 sm:text-5xl lg:text-[3.5rem]">
                        Audit, tax and accounting for Nigerian organisations.
                    </h1>
                    <p className="mt-6 max-w-xl text-lg text-neutral-600">
                        Babatunde Yunus &amp; Co. keeps your books accurate, your filings on time and your
                        accounts ready for audit. We work with companies, public bodies and NGOs from our
                        offices in Abuja and Ilorin.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link href="/contact" className="btn btn-primary btn-lg">
                            Book a consultation
                        </Link>
                        <Link href="/services" className="btn btn-outline btn-lg">
                            See our services
                        </Link>
                    </div>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100">
                    <Image
                        src={photos.meeting.src}
                        alt={photos.meeting.alt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            <div className="border-y border-neutral-200 bg-neutral-50">
                <dl className="container grid grid-cols-2 gap-x-6 gap-y-6 py-8 lg:grid-cols-4">
                    {facts.map(([label, value]) => (
                        <div key={label} className="border-l-2 border-primary-600 pl-4">
                            <dt className="text-sm text-neutral-500">{label}</dt>
                            <dd className="mt-1 font-medium text-neutral-900">{value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
