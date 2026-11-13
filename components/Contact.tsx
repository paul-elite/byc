'use client';

import { useState } from 'react';
import { Check, Mail, MessageCircle, Phone } from 'lucide-react';

const CONTACT_EMAIL = 'info@byc.com.ng';

const topics = ['Audit', 'Tax', 'Accounting & payroll', 'Company secretarial', 'Internal control', 'Training', 'Something else'];

const helpWith = [
    'Statutory audits and audit preparation',
    'Tax returns, NRS queries and the 2026 changes',
    'Bookkeeping, payroll and management accounts',
    'CAC registrations and annual returns',
];

const channels = [
    { icon: Phone, label: 'Call', value: '+234 901 881 1877', href: 'tel:+2349018811877' },
    { icon: Mail, label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: 'https://wa.me/2349018811877' },
];

const inputClass =
    'w-full rounded-xl border border-neutral-200 bg-white px-4 text-neutral-900 outline-none transition placeholder:text-neutral-400 hover:border-neutral-300 focus:border-primary-600 focus:ring-4 focus:ring-primary-600/10';

export default function Contact({ asPage = false }: { asPage?: boolean }) {
    const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
    const [topic, setTopic] = useState<string | null>(null);
    const [opened, setOpened] = useState(false);

    // No mail backend yet: open the visitor's email app with the enquiry filled in.
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = `${topic ? `${topic} enquiry` : 'Enquiry'} from ${form.name}${form.company ? ` (${form.company})` : ''}`;
        const body = `${form.message}\n\n${form.name}\n${form.email}${form.company ? `\n${form.company}` : ''}`;
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setOpened(true);
    };

    const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });
    const Heading = asPage ? 'h1' : 'h2';

    return (
        <section id="contact" className={`bg-white ${asPage ? 'pb-20 pt-32 lg:pb-28 lg:pt-40' : 'py-20 lg:py-28'}`}>
            <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                <div>
                    <Heading className="text-4xl text-neutral-900 md:text-5xl">Talk to us</Heading>
                    <p className="mt-5 max-w-md text-lg text-neutral-600">
                        Tell us what you need. We’ll reply with next steps, and a proposal if it’s a fit.
                    </p>

                    <p className="mt-10 text-sm font-medium text-neutral-900">We can help with</p>
                    <ul className="mt-4 space-y-3">
                        {helpWith.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-[15px] text-neutral-700">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" strokeWidth={2.5} />
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
                        {channels.map(({ icon: Icon, label, value, href }) => (
                            <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="group flex items-center gap-4 py-4">
                                <Icon className="h-4 w-4 text-neutral-400 transition-colors group-hover:text-primary-600" />
                                <span className="w-20 text-sm text-neutral-500">{label}</span>
                                <span className="font-medium text-neutral-900 transition-colors group-hover:text-primary-700">{value}</span>
                            </a>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_24px_60px_-30px_rgba(60,40,0,0.25)]">
                    <div className="space-y-6 p-6 md:p-8">
                        <fieldset>
                            <legend className="mb-3 text-sm font-medium text-neutral-800">What’s it about?</legend>
                            <div className="flex flex-wrap gap-2">
                                {topics.map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setTopic(topic === t ? null : t)}
                                        aria-pressed={topic === t}
                                        className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${topic === t ? 'border-primary-700 bg-primary-700 text-white' : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        <div className="grid gap-5 md:grid-cols-2">
                            <Field label="Full name" name="name" value={form.name} onChange={set} autoComplete="name" placeholder="Your name" required />
                            <Field label="Email" name="email" type="email" value={form.email} onChange={set} autoComplete="email" placeholder="you@company.com" required />
                        </div>
                        <Field label="Company" optional name="company" value={form.company} onChange={set} autoComplete="organization" placeholder="Company or organisation" />
                        <div>
                            <label htmlFor="message" className="mb-2 block text-sm font-medium text-neutral-800">How can we help?</label>
                            <textarea id="message" name="message" required rows={5} value={form.message} onChange={set} placeholder="A few lines about your situation and any deadlines" className={`${inputClass} resize-none py-3`} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 border-t border-neutral-200 bg-neutral-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
                        <p className="text-sm text-neutral-500">
                            {opened ? `Your email app should have opened. If not, write to ${CONTACT_EMAIL}.` : 'Opens your email app with the message ready to send.'}
                        </p>
                        <button type="submit" className="btn btn-primary btn-md shrink-0">Send message</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

function Field({
    label,
    name,
    value,
    onChange,
    type = 'text',
    required = false,
    optional = false,
    autoComplete,
    placeholder,
}: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    required?: boolean;
    optional?: boolean;
    autoComplete?: string;
    placeholder?: string;
}) {
    return (
        <div>
            <label htmlFor={name} className="mb-2 flex justify-between text-sm font-medium text-neutral-800">
                {label}
                {optional && <span className="font-normal text-neutral-400">Optional</span>}
            </label>
            <input type={type} id={name} name={name} required={required} value={value} onChange={onChange} autoComplete={autoComplete} placeholder={placeholder} className={`${inputClass} h-12`} />
        </div>
    );
}
