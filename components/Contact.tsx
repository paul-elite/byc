'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', company: '', message: '' });
            setTimeout(() => setSubmitStatus('idle'), 5000);
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="relative overflow-hidden bg-primary-950 py-24 text-[#fffaf0]">
            <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
                <Image src="/brand/byc-advisory-session.png" alt="" fill sizes="50vw" className="object-cover opacity-18" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-950 via-primary-950/96 to-primary-950/78" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-12 items-start">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#dcc781]">Talk to BYC</p>
                        <h2 className="mt-5 text-4xl md:text-6xl text-[#fffaf0]">
                            Bring the finance question. Leave with a path.
                        </h2>
                        <p className="mt-6 text-[#e7efe4]/78">
                            Send a note to the advisory team for audit, tax, accounting, corporate compliance, or portfolio support.
                        </p>

                        <div className="mt-10 space-y-5">
                            {[
                                ['Phone', '+234 901 881 1877', 'tel:+2349018811877'],
                                ['Email', 'info@byc.com.ng', 'mailto:info@byc.com.ng'],
                                ['Website', 'byc.com.ng', 'https://byc.com.ng'],
                            ].map(([label, value, href]) => (
                                <a key={label} href={href} className="block rounded-2xl border border-white/10 bg-white/8 p-5 transition hover:bg-white/12">
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#dcc781]">{label}</p>
                                    <p className="mt-2 text-lg font-semibold text-[#fffaf0]">{value}</p>
                                </a>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="rounded-[2rem] bg-[#fffaf0] p-6 md:p-8 text-primary-950 shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
                        <div className="grid md:grid-cols-2 gap-5">
                            <Field label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
                            <Field label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="mt-5">
                            <Field label="Company" name="company" value={formData.company} onChange={handleChange} />
                        </div>
                        <div className="mt-5">
                            <label htmlFor="message" className="block text-sm font-bold text-primary-950 mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                rows={5}
                                className="w-full px-4 py-3 border border-primary-100 bg-white rounded-2xl focus:ring-2 focus:ring-primary-700 focus:border-primary-700 outline-none transition-all resize-none text-primary-950"
                                placeholder="How can we help?"
                            />
                        </div>
                        <button type="submit" disabled={isSubmitting} className={`mt-6 w-full btn btn-primary btn-lg ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}>
                            {isSubmitting ? 'Sending...' : 'Send message'}
                        </button>
                        {submitStatus === 'success' && (
                            <div className="mt-5 rounded-2xl border border-primary-200 bg-primary-50 p-4 text-sm font-semibold text-primary-900">
                                Message sent. BYC will respond shortly.
                            </div>
                        )}
                    </form>
                </div>
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
}: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    required?: boolean;
}) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-bold text-primary-950 mb-2">{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                required={required}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-3 border border-primary-100 bg-white rounded-2xl focus:ring-2 focus:ring-primary-700 focus:border-primary-700 outline-none transition-all text-primary-950"
                placeholder={label}
            />
        </div>
    );
}
