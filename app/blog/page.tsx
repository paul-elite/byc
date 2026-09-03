'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getPublishedBlogs, formatDate, Blog } from '@/lib/blogs';

export default function BlogPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    useEffect(() => {
        async function loadBlogs() {
            const data = await getPublishedBlogs();
            setBlogs(data);
            setLoading(false);
        }
        loadBlogs();
    }, []);

    // Get all unique tags
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        blogs.forEach(blog => blog.tags.forEach(tag => tags.add(tag)));
        return Array.from(tags);
    }, [blogs]);

    // Filter blogs
    const filteredBlogs = useMemo(() => {
        return blogs.filter(blog => {
            const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTag = !selectedTag || blog.tags.includes(selectedTag);
            return matchesSearch && matchesTag;
        });
    }, [blogs, searchQuery, selectedTag]);

    // Featured blog (most recent)
    const featuredBlog = blogs[0];
    const remainingBlogs = filteredBlogs.filter(b => b.id !== featuredBlog?.id);

    if (loading) {
        return (
            <main>
                <Navigation />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main>
            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-5xl md:text-6xl mb-6 text-gray-900">
                            Insights & Articles
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Expert perspectives on accounting, tax, audit, and business advisory from our team of chartered professionals.
                        </p>
                    </div>

                    {/* Search & Filter */}
                    <div className="mt-12 max-w-2xl mx-auto">
                        <div className="relative">
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all bg-white shadow-sm text-gray-900 placeholder-gray-400"
                            />
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-6 justify-center">
                            <button
                                onClick={() => setSelectedTag(null)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedTag
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                All Topics
                            </button>
                            {allTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedTag === tag
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {featuredBlog && !searchQuery && !selectedTag && (
                <section className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link href={`/blog/${featuredBlog.slug}`} className="group block">
                            <article className="grid lg:grid-cols-2 gap-8 items-center bg-gray-50 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                                <div className="relative h-72 lg:h-[400px]">
                                    <Image
                                        src={featuredBlog.cover_image}
                                        alt={featuredBlog.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-full">
                                        Featured
                                    </div>
                                </div>
                                <div className="p-8 lg:pr-12">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {featuredBlog.tags.slice(0, 2).map((tag) => (
                                            <span key={tag} className="px-3 py-1 text-xs font-medium text-primary-700 bg-primary-100 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h2 className="text-3xl lg:text-4xl mb-4 text-gray-900 group-hover:text-primary-600 transition-colors">
                                        {featuredBlog.title}
                                    </h2>
                                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                        {featuredBlog.excerpt}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                                            {featuredBlog.author.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{featuredBlog.author}</p>
                                            <p className="text-sm text-gray-500">{formatDate(featuredBlog.published_at)} · {featuredBlog.reading_time} min read</p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    </div>
                </section>
            )}

            {/* Blog Grid */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {remainingBlogs.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {remainingBlogs.map((blog) => (
                                <article
                                    key={blog.id}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                                >
                                    <Link href={`/blog/${blog.slug}`} className="block relative h-52 overflow-hidden">
                                        <Image
                                            src={blog.cover_image}
                                            alt={blog.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </Link>
                                    <div className="p-6">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {blog.tags.slice(0, 2).map((tag) => (
                                                <span key={tag} className="px-3 py-1 text-xs font-medium text-primary-700 bg-primary-50 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <Link href={`/blog/${blog.slug}`}>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                                                {blog.title}
                                            </h3>
                                        </Link>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                                            {blog.excerpt}
                                        </p>
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
                                            <span className="text-xs text-gray-500">{blog.reading_time} min</span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter to find what you&apos;re looking for.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-20 bg-gray-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl text-white mb-4">
                        Stay Informed
                    </h2>
                    <p className="text-gray-400 text-lg mb-8">
                        Subscribe to receive the latest insights on accounting, tax, and business advisory directly to your inbox.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                        />
                        <button type="submit" className="btn btn-primary btn-lg whitespace-nowrap">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>

            <Footer />
        </main>
    );
}
