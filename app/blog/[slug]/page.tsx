'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getBlogBySlug, getRelatedBlogs, formatDate, Blog } from '@/lib/blogs';
import { renderMarkdown, extractHeadings } from '@/lib/markdown';
import { tagTone } from '@/lib/tagTone';
import ArticleChrome from '@/components/ArticleChrome';

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [blog, setBlog] = useState<Blog | null>(null);
    const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadBlog() {
            if (slug) {
                const foundBlog = await getBlogBySlug(slug);
                setBlog(foundBlog);
                if (foundBlog) {
                    const related = await getRelatedBlogs(slug, 2);
                    setRelatedBlogs(related);
                }
                setLoading(false);
            }
        }
        loadBlog();
    }, [slug]);

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

    if (!blog) {
        return (
            <main>
                <Navigation />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl text-neutral-900 mb-4">Article not found</h1>
                        <p className="text-neutral-600 mb-8">The article you&apos;re looking for doesn&apos;t exist.</p>
                        <Link href="/blog" className="btn btn-primary btn-md">
                            Back to Blog
                        </Link>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://byc.com.ng/blog/${blog.slug}`;
    const shareLinks = [
        ['LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`],
        ['X', `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`],
        ['WhatsApp', `https://wa.me/?text=${encodeURIComponent(`${blog.title} ${shareUrl}`)}`],
    ];

    return (
        <main>
            <Navigation />

            <section className="bg-canvas pt-16 lg:pt-[72px]">
                <div className="mx-auto max-w-5xl px-5 pt-14 lg:pt-20 [&>*]:max-w-3xl">
                    <Link href="/blog" className="text-sm text-neutral-500 hover:text-primary-700">&larr; All articles</Link>
                    {blog.tags.length > 0 && (
                        <p className="mt-6 flex flex-wrap gap-2">{blog.tags.map((t) => <span key={t} className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tagTone(t)}`}>{t}</span>)}</p>
                    )}
                    <h1 className="mt-3 text-4xl text-neutral-900 md:text-5xl">{blog.title}</h1>
                    <p className="mt-5 text-xl text-neutral-600">{blog.excerpt}</p>
                    <p className="mt-6 text-sm text-neutral-500">
                        <span className="font-medium text-neutral-800">{blog.author}</span>
                        {blog.author_role && `, ${blog.author_role}`} · {formatDate(blog.published_at)} · {blog.reading_time} min read
                    </p>
                </div>
                {blog.cover_image && (
                    <div className="mx-auto mt-10 max-w-5xl px-5">
                        <div className="relative aspect-[2/1] overflow-hidden rounded-lg bg-loader">
                            <Image src={blog.cover_image} alt="" fill sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" priority />
                        </div>
                    </div>
                )}
            </section>

            <section className="bg-canvas py-14">
                <ArticleChrome headings={extractHeadings(blog.content)}>
                    <article className="text-[17px]">
                        {renderMarkdown(blog.content)}
                    </article>

                    <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-neutral-200 pt-6 text-sm">
                        <span className="text-neutral-500">Share:</span>
                        {shareLinks.map(([label, href]) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-neutral-800 hover:text-primary-700">
                                {label}
                            </a>
                        ))}
                    </div>

                    <div className="mt-10 rounded-xl border-l-4 border-sun-400 bg-mist p-6">
                        <p className="font-medium text-neutral-900">Questions about how this affects you?</p>
                        <p className="mt-1 text-[15px] text-neutral-600">This article is general guidance, not advice for your situation. Talk to us before acting on it.</p>
                        <Link href="/contact" className="btn btn-primary btn-sm mt-4">Contact us</Link>
                    </div>
                </ArticleChrome>
            </section>

            {relatedBlogs.length > 0 && (
                <section className="border-t border-neutral-200 bg-mist py-16">
                    <div className="mx-auto max-w-5xl px-5">
                        <h2 className="text-2xl text-neutral-900">Related articles</h2>
                        <div className="mt-8 grid gap-10 md:grid-cols-2">
                            {relatedBlogs.map((relBlog) => (
                                <Link key={relBlog.id} href={`/blog/${relBlog.slug}`} className="group block">
                                    <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-loader">
                                        {relBlog.cover_image && (
                                            <Image src={relBlog.cover_image} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                                        )}
                                    </div>
                                    <p className="mt-4 text-sm text-neutral-500">{formatDate(relBlog.published_at)}</p>
                                    <h3 className="mt-1 text-lg text-neutral-900 group-hover:text-primary-700">{relBlog.title}</h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </main>
    );
}
