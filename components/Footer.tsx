import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const links = ['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact'];
    const services = ['Accountancy', 'Auditing', 'Tax Advisory', 'Corporate Secretarial', 'Internal Control'];

    return (
        <footer className="bg-[#031711] text-[#fffaf0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_0.8fr_1fr] gap-10 mb-12">
                    <div>
                        <Link href="/" className="inline-flex rounded-2xl bg-[#fffaf0] p-1.5 mb-5">
                            <Image src="/logo.svg" alt="BYC" width={178} height={48} />
                        </Link>
                        <p className="text-xs text-[#dcc781] font-bold mb-3 uppercase tracking-[0.2em]">
                            Chartered Accountants & Tax Practitioners
                        </p>
                        <p className="text-[#d8d0bd] text-sm leading-relaxed max-w-sm">
                            Audit, tax, accounting, governance, and finance advisory for Nigerian organisations that need decisions backed by evidence.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold mb-5">Navigate</h3>
                        <ul className="space-y-3">
                            {links.map((item) => (
                                <li key={item}>
                                    <Link href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-[#d8d0bd] hover:text-[#dcc781] transition-colors text-sm">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-5">Services</h3>
                        <ul className="space-y-3 text-[#d8d0bd] text-sm">
                            {services.map((service) => <li key={service}>{service}</li>)}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-5">Contact</h3>
                        <div className="space-y-4 text-sm">
                            <a href="/api/portfolio/pdf?download=1" className="inline-flex items-center text-[#dcc781] hover:text-white transition-colors font-bold">
                                Download Firm Portfolio
                            </a>
                            <p className="text-[#d8d0bd]">Suite B5, Melita Plaza, Gimbiya Street, Area 11, Garki, Abuja</p>
                            <p className="text-[#d8d0bd]">No 2, Babatunde Yunus Street, Irewolede, Kwara State</p>
                            <div>
                                <a href="tel:+2349018811877" className="block text-[#fffaf0] hover:text-[#dcc781] transition-colors">+234 901 881 1877</a>
                                <a href="mailto:info@byc.com.ng" className="block text-[#fffaf0] hover:text-[#dcc781] transition-colors">info@byc.com.ng</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#b8aa8c] text-xs">&copy; {currentYear} Babatunde Yunus & Co. All rights reserved.</p>
                    <div className="flex gap-6 text-xs text-[#b8aa8c]">
                        <span>CAC: BN 2861419</span>
                        <span>License: 050839</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
