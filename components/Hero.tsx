import Image from 'next/image';
import Link from 'next/link';
import { photos } from '@/lib/images';
import BrandBars from '@/components/ui/BrandBars';

const factBorders = ['border-primary-400', 'border-sun-400', 'border-lime-500', 'border-leaf-500'];

const facts = [
    ['Member of', 'ICAN, CITN and FRCN'],
    ['Offices', 'Abuja and Ilorin, Nigeria'],
    ['Practice areas', 'Audit, tax and accounting'],
    ['Registration', 'CAC BN 2861419'],
];

export default function Hero() {
    return (
        <section className="bg-canvas pt-16 lg:pt-[72px]">
            <div className="container grid items-center gap-10 py-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-20">
                <div>
                    <h1 className="text-4xl text-neutral-900 sm:text-5xl lg:text-[3.5rem]">
                        Audit, tax and accounting for organisations worldwide.
                    </h1>
                    <p className="mt-6 max-w-xl text-lg text-neutral-600">
                        Babatunde Yunus &amp; Co. keeps your books accurate, your filings on time and your
                        accounts ready for audit. We work with companies, public bodies and NGOs
                        wherever they operate.
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

                <div className="relative">
                
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-loader shadow-[0_20px_60px_-20px_rgba(7,46,24,0.35)]">
                    <Image
                        src={photos.meeting.src}
                        alt={photos.meeting.alt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                        priority
                    />
                </div>
                <BrandBars size="md" className="absolute -top-3 right-8 z-10 hidden drop-shadow-sm sm:flex" />
                <div className="absolute -bottom-5 left-6 hidden items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-lg sm:flex">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sun-400 text-sm font-semibold text-primary-950">₦</span>
                    <span className="text-sm leading-tight text-neutral-700"><span className="block font-medium text-neutral-900">Updated for 2026</span>New tax laws, new rates</span>
                </div>
                </div>
            </div>

            <div className="bg-primary-900">
                <dl className="container grid grid-cols-2 gap-x-6 gap-y-6 py-8 lg:grid-cols-4">
                    {facts.map(([label, value], i) => (
                        <div key={label} className={`border-l-[3px] pl-4 ${factBorders[i]}`}>
                            <dt className="text-sm text-primary-200">{label}</dt>
                            <dd className="mt-1 font-medium text-white">{value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
