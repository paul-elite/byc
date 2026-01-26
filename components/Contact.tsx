'use client';

import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', company: '', message: '' });

            setTimeout(() => setSubmitStatus('idle'), 5000);
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section id="contact" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-fadeInUp">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Let's Talk
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Ready to transform your business? Get in touch with our team today.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="animate-slideInLeft">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                    placeholder="john@company.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Your Company"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Tell us about your project..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`btn btn-primary btn-lg w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                aria-disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>

                            {submitStatus === 'success' && (
                                <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg text-primary-700">
                                    Thank you! We'll get back to you soon.
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="animate-slideInRight space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Get in Touch
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">Office Locations</h4>
                                                <div className="text-gray-600">
                                                    <div className="mb-2">
                                                        <strong>Abuja Office</strong><br />
                                                        Suite B5, Melita Plaza,<br />
                                                        Gimbiya Street,<br />
                                                        Area 11, Garki, Abuja
                                                    </div>
                                                    <div>
                                                        <strong>Ilorin Office</strong><br />
                                                        No 2., Babatunde Yunus Street,<br />
                                                        Irewolede, Ilorin,<br />
                                                        Kwara State
                                                    </div>
                                                </div>
                                            </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                                        <p className="text-gray-600">
                                            <a href="mailto:info@byandco.com" className="text-primary-600 hover:underline">info@byandco.com</a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                                        <p className="text-gray-600">
                                            <a href="tel:+2349018811877" className="text-primary-600 hover:underline">+234 901 881 1877</a>
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.172 16.172A4 4 0 015 15h14a4 4 0 011.828.172M8 7a4 4 0 118 0 4 4 0 01-8 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Website</h4>
                                        <p className="text-gray-600"><a href="https://www.byandco.com" className="text-primary-600 hover:underline">www.byandco.com</a></p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-primary-600" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 5.5 4.46 9.96 9.96 9.96s9.96-4.46 9.96-9.96c0-5.5-4.46-9.96-9.96-9.96zm4.84 8.54c.03.67.03 1.35 0 2.02-.15 3.95-3.27 6.13-6.9 6.13-2.03 0-3.87-.77-5.14-2.05.43.05.87.08 1.32.08 1.58 0 3.04-.53 4.2-1.43-1.48-.03-2.73-1.01-3.16-2.36.5.09 1 .14 1.52.14.74 0 1.46-.1 2.14-.3-1.56-.31-2.73-1.68-2.73-3.31v-.04c.45.25.97.41 1.52.43-1-.67-1.66-1.8-1.66-3.09 0-.67.18-1.29.5-1.83 2.34 2.86 6.01 4.74 10.06 4.95z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Instagram</h4>
                                        <p className="text-gray-600"><a href="https://instagram.com/babatunde_yunus_and_co" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">@babatunde_yunus_and_co</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary-50 p-6 rounded-xl">
                            <h4 className="font-bold text-gray-900 mb-2">Business Hours</h4>
                            <p className="text-gray-600">
                                Monday - Friday: 9:00 AM - 6:00 PM<br />
                                Saturday: 10:00 AM - 2:00 PM<br />
                                Sunday: Closed
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
