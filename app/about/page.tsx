import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function AboutPage() {
    const values = ['Service Excellence', 'Customer Care', 'Integrity', 'Professionalism', 'Hard Work', 'Trustworthiness'];
    const bodies = ['ICAN', 'CITN', 'ICEN', 'CICMA', 'NIM', 'IMC', 'FRCN', 'IFRS'];

    return (
        <main className="bg-[#fffaf0]">
            <Navigation />
            <section className="relative overflow-hidden bg-primary-950 pt-32 pb-20 text-[#fffaf0]">
                <Image src="/brand/byc-advisory-session.png" alt="" fill sizes="100vw" className="object-cover opacity-24" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-950 via-primary-950/93 to-primary-900/72" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#dcc781]">About BYC</p>
                    <h1 className="mt-5 max-w-4xl text-5xl md:text-7xl text-[#fffaf0]">A Nigerian advisory firm built on care, evidence, and professional discipline.</h1>
                    <p className="mt-7 max-w-3xl text-lg text-[#e7efe4]/82">Babatunde Yunus & Co. provides accountancy, auditing, taxation, training, and financial management consultancy to corporate and public-sector organisations.</p>
                </div>
            </section>

            <section className="py-20 border-b border-primary-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-5">
                    {[
                        ['3', 'Partners'],
                        ['12+', 'Professional accountants'],
                        ['9+', 'Professional bodies'],
                        ['IFRS', 'Certified'],
                    ].map(([value, label]) => (
                        <div key={label} className="rounded-3xl bg-[#f7f1e4] p-6 text-center">
                            <p className="text-4xl font-extrabold text-primary-900">{value}</p>
                            <p className="mt-2 text-sm font-semibold text-[#5c675f]">{label}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary-700">The firm</p>
                        <h2 className="mt-5 text-4xl md:text-6xl text-primary-950">World-class ambition, grounded in Nigerian business realities.</h2>
                        <p className="mt-7 text-lg text-[#4b5b50]">BYC is committed to innovative and excellent services delivered through experienced professionals and careful execution.</p>
                        <p className="mt-5 text-[#5c675f]">The firm’s belief is direct: your success is our business. Every engagement is handled with attention to compliance, context, and the decisions leaders need to make.</p>
                    </div>
                    <div className="relative aspect-[4/4.7] overflow-hidden rounded-[2rem]">
                        <Image src="/brand/byc-nigerian-accountants-hero.png" alt="Nigerian accounting professionals" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" quality={92} />
                    </div>
                </div>
            </section>

            <section className="bg-[#edf3e8] py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-6">
                        <div className="rounded-[2rem] bg-[#fffaf0] p-8">
                            <h2 className="text-3xl text-primary-950">Vision</h2>
                            <p className="mt-4 text-[#5c675f]">To provide excellent services in accountancy, auditing, taxation, human capacity training, and financial management consultancy in Nigeria.</p>
                        </div>
                        <div className="rounded-[2rem] bg-primary-950 p-8 text-[#fffaf0]">
                            <h2 className="text-3xl text-[#fffaf0]">Mission</h2>
                            <p className="mt-4 text-[#e7efe4]/78">To be a reputable world-class consulting company of choice in Nigeria, rendering innovative and excellent services to valued clients.</p>
                        </div>
                    </div>
                    <div className="mt-8 grid md:grid-cols-3 gap-4">
                        {values.map((value) => (
                            <div key={value} className="rounded-2xl bg-[#fffaf0] p-5 font-bold text-primary-950">{value}</div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary-700">Professional memberships</p>
                    <h2 className="mt-5 text-4xl md:text-6xl text-primary-950">Accredited where the work matters.</h2>
                    <div className="mt-10 flex flex-wrap gap-3">
                        {bodies.map((body) => (
                            <span key={body} className="rounded-full bg-primary-950 px-5 py-3 text-sm font-bold text-[#dcc781]">{body}</span>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
