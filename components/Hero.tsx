import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    const proof = [
        { label: 'Professional bodies', value: 'ICAN / CITN / FRCN' },
        { label: 'Coverage', value: 'Abuja, Ilorin, Nigeria' },
        { label: 'Focus', value: 'Audit, tax, assurance' },
    ];

    const capabilities = ['Tax planning', 'Audit readiness', 'Management accounts', 'Internal controls'];

    return (
        <section className="relative overflow-hidden bg-[#031711] pt-28 text-[#fffaf0]">
            <div className="absolute inset-0 opacity-35">
                <Image src="/brand/byc-abstract-ledger.png" alt="" fill sizes="100vw" className="object-cover" priority />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(195,164,91,0.26),transparent_34%),linear-gradient(135deg,rgba(3,23,17,0.94),rgba(11,52,40,0.82)_48%,rgba(3,23,17,0.96))]" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28">
                <div className="grid lg:grid-cols-[1.02fr_0.98fr] gap-12 lg:gap-16 items-center min-h-[760px] lg:min-h-[700px]">
                    <div className="pt-8 lg:pt-0">
                        <div className="inline-flex items-center gap-3 rounded-full border border-[#dcc781]/30 bg-white/8 px-4 py-2 text-sm font-semibold text-[#f4e8c8] backdrop-blur">
                            <span className="h-2 w-2 rounded-full bg-[#dcc781]" />
                            Chartered Accountants & Tax Practitioners
                        </div>

                        <h1 className="mt-8 max-w-3xl text-5xl sm:text-6xl lg:text-[5.35rem] text-[#fffaf0]">
                            Serious financial clarity for Nigerian organisations.
                        </h1>
                        <p className="mt-7 max-w-2xl text-lg sm:text-xl text-[#e7efe4]/82">
                            BYC helps boards, founders, NGOs, public institutions, and finance teams make sharper decisions through audit, tax, accounting, and governance work that stands up to scrutiny.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <Link href="/contact" className="btn btn-white btn-lg">
                                Book a consultation
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                            <Link href="/portfolio" className="btn btn-ghost btn-lg border-white/25 text-[#fffaf0] hover:bg-white/10 hover:text-white hover:border-white/55">
                                View firm portfolio
                            </Link>
                        </div>

                        <div className="mt-12 grid sm:grid-cols-3 gap-3">
                            {proof.map((item) => (
                                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur">
                                    <p className="text-xs uppercase tracking-[0.18em] text-[#dcc781]">{item.label}</p>
                                    <p className="mt-2 text-sm font-semibold text-[#fffaf0]">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/8 p-3 shadow-[0_36px_100px_rgba(0,0,0,0.36)] backdrop-blur">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.45rem]">
                                <Image
                                    src="/brand/byc-nigerian-accountants-hero.png"
                                    alt="Nigerian accounting professionals reviewing financial reports"
                                    fill
                                    sizes="(min-width: 1024px) 48vw, 100vw"
                                    className="object-cover"
                                    priority
                                    quality={92}
                                />
                            </div>
                        </div>
                        <div className="absolute -bottom-8 left-4 right-4 rounded-3xl border border-[#dcc781]/30 bg-[#fffaf0] p-5 text-primary-950 shadow-2xl lg:left-[-34px] lg:right-auto lg:w-[360px]">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-700">Advisory desk</p>
                            <div className="mt-4 grid grid-cols-2 gap-3">
                                {capabilities.map((item) => (
                                    <div key={item} className="rounded-2xl bg-primary-50 px-4 py-3 text-sm font-semibold">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
