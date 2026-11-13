'use client';

import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const CONTACT_EMAIL = 'info@byc.com.ng';

const offices = [
    ['Abuja', 'Suite B5, Melita Plaza, Gimbiya Street, Area 11, Garki, Abuja'],
    ['Ilorin', 'No 2, Babatunde Yunus Street, Irewolede, Ilorin, Kwara State'],
];

export default function Contact({ asPage = false }: { asPage?: boolean }) {
    const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
    const [opened, setOpened] = useState(false);

    // There is no mail backend yet, so the form opens the visitor's email app
    // with the enquiry pre-filled and addressed to BYC.
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = `Enquiry from ${formData.name}${formData.company ? ` (${formData.company})` : ''}`;
        const body = `${formData.message}\n\n${formData.name}\n${formData.email}${formData.company ? `\n${formData.company}` : ''}`;
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setOpened(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const Heading = asPage ? 'h1' : 'h2';

    return (
        <section id="contact" className={`bg-white ${asPage ? 'pt-32 pb-20 lg:pt-40 lg:pb-28' : 'border-t border-neutral-200 py-20 lg:py-28'}`}>
            <div className="container grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                <div>
                    <p className="eyebrow">Contact</p>
                    <Heading className="mt-3 text-3xl text-neutral-900 md:text-4xl">Talk to us</Heading>
                    <p className="mt-5 text-lg text-neutral-600">
                        Tell us what you need help with — an audit, a tax matter, your accounts or company
                        filings.
                    </p>

                    <ul className="mt-10 space-y-6">
                        <li className="flex gap-4">
                            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary-700" />
                            <div>
                                <p className="text-sm text-neutral-500">Phone</p>
                                <a href="tel:+2349018811877" className="font-medium text-neutral-900 hover:text-primary-700">+234 901 881 1877</a>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary-700" />
                            <div>
                                <p className="text-sm text-neutral-500">Email</p>
                                <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-neutral-900 hover:text-primary-700">{CONTACT_EMAIL}</a>
                            </div>
                        </li>
                        {offices.map(([city, address]) => (
                            <li key={city} className="flex gap-4">
                                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-700" />
                                <div>
                                    <p className="text-sm text-neutral-500">{city} office</p>
                                    <p className="font-medium text-neutral-900">{address}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <form onSubmit={handleSubmit} className="rounded-lg border border-neutral-200 bg-neutral-50 p-6 md:p-8">
                    <div className="grid gap-5 md:grid-cols-2">
                        <Field label="Full name" name="name" value={formData.name} onChange={handleChange} autoComplete="name" required />
                        <Field label="Email" name="email" type="email" value={formData.email} onChange={handleChange} autoComplete="email" required />
                    </div>
                    <div className="mt-5">
                        <Field label="Company (optional)" name="company" value={formData.company} onChange={handleChange} autoComplete="organization" />
                    </div>
                    <div className="mt-5">
                        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-neutral-800">How can we help?</label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            rows={6}
                            className="w-full resize-none rounded-md border border-neutral-300 bg-white px-3.5 py-2.5 text-neutral-900 outline-none transition focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg mt-6 w-full">
                        Send message
                    </button>
                    <p className="mt-4 text-sm text-neutral-500">
                        {opened
                            ? `Your email app should have opened with your message. If it didn't, email us at ${CONTACT_EMAIL}.`
                            : 'This opens your email app with your message ready to send. We only use your details to reply to you.'}
                    </p>
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
    autoComplete,
}: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    required?: boolean;
    autoComplete?: string;
}) {
    return (
        <div>
            <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-neutral-800">{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                required={required}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                className="h-11 w-full rounded-md border border-neutral-300 bg-white px-3.5 text-neutral-900 outline-none transition focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20"
            />
        </div>
    );
}
