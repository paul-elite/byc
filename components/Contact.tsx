'use client';

import React, { useState } from 'react';

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
		<section id="contact" className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-16 animate-fadeInUp">
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
						Let's Talk
					</h2>
					<p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
						Ready to transform your business? Get in touch with our team today.
					</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
					{/* Contact Form */}
					<div className="animate-slideInLeft">
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
									Full Name <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									id="name"
									name="name"
									required
									value={formData.name}
									onChange={handleChange}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400"
									placeholder="John Doe"
								/>
							</div>

							<div>
								<label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
									Email Address <span className="text-red-500">*</span>
								</label>
								<input
									type="email"
									id="email"
									name="email"
									required
									value={formData.email}
									onChange={handleChange}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400"
									placeholder="john@company.com"
								/>
							</div>

							<div>
								<label htmlFor="company" className="block text-sm font-medium text-gray-900 mb-2">
									Company
								</label>
								<input
									type="text"
									id="company"
									name="company"
									value={formData.company}
									onChange={handleChange}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400"
									placeholder="Your Company"
								/>
							</div>

							<div>
								<label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
									Message <span className="text-red-500">*</span>
								</label>
								<textarea
									id="message"
									name="message"
									required
									value={formData.message}
									onChange={handleChange}
									rows={6}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200 resize-none text-gray-900 placeholder:text-gray-400"
									placeholder="Tell us about your project..."
								/>
							</div>

							<button
								type="submit"
								disabled={isSubmitting}
								className={`w-full px-6 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 ${
									isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-0.5'
								}`}
							>
								{isSubmitting ? (
									<span className="flex items-center justify-center">
										<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
											<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
											<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										Sending...
									</span>
								) : (
									'Send Message'
								)}
							</button>

							{submitStatus === 'success' && (
								<div className="flex items-start p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 animate-fadeIn">
									<svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
									</svg>
									<div>
										<p className="font-medium">Thank you for reaching out!</p>
										<p className="text-sm text-green-700 mt-1">We'll get back to you within 24 hours.</p>
									</div>
								</div>
							)}
						</form>
					</div>

					{/* Contact Info */}
					<div className="animate-slideInRight space-y-8">
						<div>
							<h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
								Get in Touch
							</h3>
							<div className="space-y-6">
								{/* Office Locations */}
								<div className="flex items-start gap-4">
									<div className="w-11 h-11 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
										<svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
										</svg>
									</div>
									<div className="flex-1">
										<h4 className="font-semibold text-gray-900 mb-3 text-base">Office Locations</h4>
										<div className="space-y-4 text-sm text-gray-600 leading-relaxed">
											<div>
												<p className="font-medium text-gray-900 mb-1">Abuja Office</p>
												<p>Suite B5, Melita Plaza,<br />
												Gimbiya Street,<br />
												Area 11, Garki, Abuja</p>
											</div>
											<div>
												<p className="font-medium text-gray-900 mb-1">Ilorin Office</p>
												<p>No 2., Babatunde Yunus Street,<br />
												Irewolede, Ilorin,<br />
												Kwara State</p>
											</div>
										</div>
									</div>
								</div>

								{/* Email */}
								<div className="flex items-start gap-4">
									<div className="w-11 h-11 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
										<svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
										</svg>
									</div>
									<div className="flex-1">
										<h4 className="font-semibold text-gray-900 mb-2 text-base">Email</h4>
										<a href="mailto:info@byandco.com" className="text-primary-600 hover:text-primary-700 hover:underline text-sm transition-colors">
											info@byandco.com
										</a>
									</div>
								</div>

								{/* Phone */}
								<div className="flex items-start gap-4">
									<div className="w-11 h-11 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
										<svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
										</svg>
									</div>
									<div className="flex-1">
										<h4 className="font-semibold text-gray-900 mb-2 text-base">Phone</h4>
										<a href="tel:+2349018811877" className="text-primary-600 hover:text-primary-700 hover:underline text-sm transition-colors">
											+234 901 881 1877
										</a>
									</div>
								</div>

								{/* Website */}
								<div className="flex items-start gap-4">
									<div className="w-11 h-11 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
										<svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
										</svg>
									</div>
									<div className="flex-1">
										<h4 className="font-semibold text-gray-900 mb-2 text-base">Website</h4>
										<a href="https://www.byandco.com" className="text-primary-600 hover:text-primary-700 hover:underline text-sm transition-colors">
											www.byandco.com
										</a>
									</div>
								</div>

								{/* Instagram */}
								<div className="flex items-start gap-4">
									<div className="w-11 h-11 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
										<svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
										</svg>
									</div>
									<div className="flex-1">
										<h4 className="font-semibold text-gray-900 mb-2 text-base">Instagram</h4>
										<a href="https://instagram.com/babatunde_yunus_and_co" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 hover:underline text-sm transition-colors">
											@babatunde_yunus_and_co
										</a>
									</div>
								</div>
							</div>
						</div>

						{/* Business Hours Card */}
						<div className="bg-gradient-to-br from-primary-50 to-primary-100/50 p-6 rounded-xl border border-primary-200/50">
							<div className="flex items-center gap-3 mb-4">
								<div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
									<svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<h4 className="font-bold text-gray-900 text-base">Business Hours</h4>
							</div>
							<div className="space-y-2 text-sm text-gray-700">
								<div className="flex justify-between">
									<span className="font-medium">Monday - Friday</span>
									<span>9:00 AM - 6:00 PM</span>
								</div>
								<div className="flex justify-between">
									<span className="font-medium">Saturday</span>
									<span>10:00 AM - 2:00 PM</span>
								</div>
								<div className="flex justify-between">
									<span className="font-medium">Sunday</span>
									<span>Closed</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
