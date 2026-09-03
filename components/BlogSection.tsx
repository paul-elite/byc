'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPublishedBlogs, formatDate, Blog } from '@/lib/blogs';

export default function BlogSection() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadBlogs() {
            const data = await getPublishedBlogs();
            setBlogs(data.slice(0, 3));
            setLoading(false);
        }
        loadBlogs();
    }, []);

    if (loading) {
        return (
            <section className="py-24 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-pulse h-8 w-48 bg-gray-200 rounded mx-auto mb-4"></div>
                        <div className="animate-pulse h-4 w-96 bg-gray-200 rounded mx-auto"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary-500"></div>
                        <p className="text-primary-600 font-medium text-sm uppercase tracking-widest">
                            Insights & Articles
                        </p>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary-500"></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl mb-5 text-gray-900">
                        Strategic Articles
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Three practical reads on finance, tax, audit, and governance for ambitious Nigerian businesses.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {blogs.map((blog, index) => (
                        <article
                            key={blog.id}
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Cover Image */}
                            <Link href={`/blog/${blog.slug}`} className="block relative h-52 overflow-hidden">
                                <Image
                                    src={blog.cover_image}
                                    alt={blog.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>

                            {/* Content */}
                            <div className="p-6">
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {blog.tags.slice(0, 2).map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 text-xs font-medium text-primary-700 bg-primary-50 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Title */}
                                <Link href={`/blog/${blog.slug}`}>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                                        {blog.title}
                                    </h3>
                                </Link>

                                {/* Excerpt */}
                                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                                    {blog.excerpt}
                                </p>

                                {/* Meta */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold text-sm">
                                            {blog.author.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{blog.author}</p>
                                            <p className="text-xs text-gray-500">{formatDate(blog.published_at)}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {blog.reading_time} min read
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link href="/blog" className="btn btn-primary btn-lg group">
                        View All Articles
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
