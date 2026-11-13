import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import OfficeMap from '@/components/OfficeMap';
import Accordion from '@/components/ui/Accordion';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Contact Babatunde Yunus & Co. in Abuja or Ilorin about audit, tax, accounting and company secretarial work.',
};

const steps = [
    ['You get in touch', 'Tell us briefly what you need — by form, email, phone or WhatsApp.'],
    ['We talk it through', 'We arrange a call or meeting to understand your situation and what you want to achieve.'],
    ['You receive a proposal', 'We set out the scope, timing and fee so you know exactly what you are agreeing to.'],
    ['Work begins', 'Once you sign the engagement letter, we request documents and agree first deadlines.'],
];

const prep = [
    { question: 'What should I have ready for the first conversation?', answer: 'A short description of the problem or service you need, your company’s registration details, and — if it is a tax or audit matter — your most recent accounts and any letters from the tax authority.' },
    { question: 'Can I send documents before we speak?', answer: 'Yes. Email them to info@byc.com.ng. If they are sensitive, tell us and we will arrange a secure way to share them.' },
    { question: 'I have a deadline coming up. Can you help quickly?', answer: 'Tell us the deadline when you get in touch. We will tell you honestly whether we can meet it.' },
];

export default function ContactPage() {
    return (
        <main>
            <Navigation />
            <Contact asPage />

            <section className="border-t border-neutral-200 bg-neutral-50 py-20 lg:py-24">
                <div className="container">
                    <h2 className="text-3xl text-neutral-900">What happens next</h2>
                    <ol className="mt-10 grid gap-8 md:grid-cols-4 md:gap-6">
                        {steps.map(([title, detail], i) => (
                            <li key={title} className="relative">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-700 text-sm font-semibold text-white">{i + 1}</span>
                                    {i < steps.length - 1 && <span className="hidden h-px flex-1 bg-neutral-300 md:block" aria-hidden />}
                                </div>
                                <h3 className="mt-4 font-medium text-neutral-900">{title}</h3>
                                <p className="mt-1 text-[15px] text-neutral-600">{detail}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="bg-white py-20 lg:py-24">
                <div className="container grid gap-12 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <h2 className="text-3xl text-neutral-900">Visit us</h2>
                        <p className="mt-4 text-lg text-neutral-600">Please call ahead so the right person is available to meet you.</p>
                        <div className="mt-8">
                            <OfficeMap />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl text-neutral-900">Before you get in touch</h2>
                        <div className="mt-8">
                            <Accordion items={prep} />
                        </div>
                    </div>
                </div>
            </section>
            <Footer showCta={false} />
        </main>
    );
}
