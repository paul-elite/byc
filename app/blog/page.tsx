'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import { getPublishedBlogs, formatDate, Blog } from '@/lib/blogs';
import { tagTone } from '@/lib/tagTone';

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

    const tagButton = (active: boolean) =>
        `rounded-full border px-3.5 py-1.5 text-sm transition-colors ${active
            ? 'border-primary-800 bg-primary-800 text-white'
            : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400'}`;

    const showFeatured = featuredBlog && !searchQuery && !selectedTag;
    const gridBlogs = showFeatured ? remainingBlogs : filteredBlogs;

    return (
        <main>
            <Navigation />
            <PageHeader eyebrow="Insights" title="Articles on tax, audit and accounting">
                Practical guidance for Nigerian businesses from the team at Babatunde Yunus &amp; Co.
            </PageHeader>

            <section className="bg-canvas py-12 lg:py-16">
                <div className="container">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex flex-wrap gap-2">
                            <button onClick={() => setSelectedTag(null)} className={tagButton(!selectedTag)}>
                                All topics
                            </button>
                            {allTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                    className={tagButton(selectedTag === tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full lg:w-80">
                            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                            <input
                                type="search"
                                placeholder="Search articles"
                                aria-label="Search articles"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-10 w-full rounded-md border border-neutral-300 bg-white pl-9 pr-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="mt-12 grid gap-10 md:grid-cols-3">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="aspect-[3/2] rounded-lg bg-loader" />
                                    <div className="mt-5 h-4 w-24 rounded bg-loader" />
                                    <div className="mt-3 h-6 w-full rounded bg-loader" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {showFeatured && (
                                <Link href={`/blog/${featuredBlog.slug}`} className="group mt-12 grid items-center gap-8 border-b border-neutral-200 pb-12 lg:grid-cols-2 lg:gap-12">
                                    <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-loader">
                                        {featuredBlog.cover_image && (
                                            <Image src={featuredBlog.cover_image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm text-neutral-500">
                                            <span className="rounded-full bg-sun-400 px-2 py-0.5 text-xs font-semibold text-primary-950">Latest</span>
                                            {featuredBlog.tags[0] && ` · ${featuredBlog.tags[0]}`}
                                        </p>
                                        <h2 className="mt-3 text-3xl text-neutral-900 group-hover:text-primary-700 lg:text-4xl">{featuredBlog.title}</h2>
                                        <p className="mt-4 text-lg text-neutral-600">{featuredBlog.excerpt}</p>
                                        <p className="mt-6 text-sm text-neutral-500">
                                            {featuredBlog.author} · {formatDate(featuredBlog.published_at)} · {featuredBlog.reading_time} min read
                                        </p>
                                    </div>
                                </Link>
                            )}

                            {gridBlogs.length > 0 ? (
                                <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                                    {gridBlogs.map((blog) => (
                                        <article key={blog.id} className="group">
                                            <Link href={`/blog/${blog.slug}`} className="block">
                                                <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-loader">
                                                    {blog.cover_image && (
                                                        <Image src={blog.cover_image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                                                    )}
                                                </div>
                                                <p className="mt-5 text-sm text-neutral-500">
                                                    {blog.tags[0] && <span className={`mr-2 rounded-full px-2 py-0.5 text-xs font-medium ${tagTone(blog.tags[0])}`}>{blog.tags[0]}</span>}
                                                    {formatDate(blog.published_at)}
                                                </p>
                                                <h3 className="mt-2 text-lg text-neutral-900 group-hover:text-primary-700">{blog.title}</h3>
                                                <p className="mt-2 line-clamp-2 text-[15px] text-neutral-600">{blog.excerpt}</p>
                                            </Link>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                !showFeatured && (
                                    <div className="py-20 text-center">
                                        <h3 className="text-lg text-neutral-900">No articles found</h3>
                                        <p className="mt-2 text-neutral-500">Try a different search or topic.</p>
                                    </div>
                                )
                            )}
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
