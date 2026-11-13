import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { photos } from '@/lib/images';

const memberships = ['ICAN', 'CITN', 'FRCN', 'NIM', 'IMC'];

export default function About() {
    return (
        <section id="about" className="border-t border-neutral-200 bg-mist py-20 lg:py-28">
            <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <div data-reveal="clip" className="relative aspect-[5/4] overflow-hidden rounded-lg bg-loader">
                    <Image
                        src={photos.team.src}
                        alt={photos.team.alt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                    />
                </div>

                <div>
                    <h2 className="text-3xl text-neutral-900 md:text-4xl">
                        Accountants who understand your business and the rules it works under.
                    </h2>
                    <p className="mt-5 text-lg text-neutral-600">
                        Babatunde Yunus &amp; Co. is a firm of chartered accountants and tax practitioners. We
                        provide accounting, audit, tax, training and financial management consultancy.
                    </p>
                    <p className="mt-4 text-neutral-600">
                        Our clients include private companies, government agencies and non-profits. We give
                        them clear records, filings that hold up when checked, and advice they can act on.
                    </p>

                    <div className="mt-8 border-t border-neutral-200 pt-6">
                        <p className="text-sm text-neutral-500">Professional memberships</p>
                        <p className="mt-2 font-medium text-neutral-900">{memberships.join(' · ')}</p>
                    </div>

                    <Link href="/about" className="mt-8 inline-flex items-center gap-2 font-medium text-primary-700 hover:text-primary-800">
                        More about BYC <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
