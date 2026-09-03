'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getBlogBySlug, getRelatedBlogs, formatDate, Blog } from '@/lib/blogs';

// Simple markdown to HTML converter for blog content
function renderContent(content: string) {
    const lines = content.split('\n');
    const elements: React.ReactElement[] = [];
    let inList = false;
    let listItems: string[] = [];
    let inTable = false;
    let tableRows: string[][] = [];

    const processInlineMarkdown = (text: string) => {
        // Bold
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        // Links
        text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary-600 hover:underline">$1</a>');
        return text;
    };

    const flushList = () => {
        if (listItems.length > 0) {
            elements.push(
                <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                    {listItems.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: processInlineMarkdown(item) }} />
                    ))}
                </ul>
            );
            listItems = [];
            inList = false;
        }
    };

    const flushTable = () => {
        if (tableRows.length > 0) {
            const headers = tableRows[0];
            const body = tableRows.slice(2); // Skip header separator
            elements.push(
                <div key={`table-${elements.length}`} className="overflow-x-auto mb-6">
                    <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-50">
                            <tr>
                                {headers.map((h, i) => (
                                    <th key={i} className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                                        {h.trim()}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {body.map((row, i) => (
                                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    {row.map((cell, j) => (
                                        <td key={j} className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                                            {cell.trim()}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
            tableRows = [];
            inTable = false;
        }
    };

    lines.forEach((line, index) => {
        // Table detection
        if (line.startsWith('|')) {
            flushList();
            inTable = true;
            const cells = line.split('|').filter(c => c.trim() !== '');
            if (!line.includes('---')) {
                tableRows.push(cells);
            } else {
                tableRows.push(['---']); // Separator marker
            }
            return;
        } else if (inTable) {
            flushTable();
        }

        // Headers
        if (line.startsWith('## ')) {
            flushList();
            elements.push(
                <h2 key={index} className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                    {line.replace('## ', '')}
                </h2>
            );
        } else if (line.startsWith('### ')) {
            flushList();
            elements.push(
                <h3 key={index} className="text-xl font-bold text-gray-900 mt-8 mb-3">
                    {line.replace('### ', '')}
                </h3>
            );
        }
        // Numbered list
        else if (/^\d+\.\s/.test(line)) {
            flushList();
            const match = line.match(/^\d+\.\s\*\*(.+?)\*\*(.*)$/);
            if (match) {
                elements.push(
                    <div key={index} className="mb-4">
                        <span className="font-bold text-gray-900">{match[1]}</span>
                        <span className="text-gray-700">{match[2]}</span>
                    </div>
                );
            } else {
                elements.push(
                    <p key={index} className="text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line) }} />
                );
            }
        }
        // Unordered list
        else if (line.startsWith('- ')) {
            inList = true;
            listItems.push(line.replace(/^- /, ''));
        }
        // Blockquote
        else if (line.startsWith('> ')) {
            flushList();
            elements.push(
                <blockquote key={index} className="border-l-4 border-primary-500 pl-6 py-2 my-6 bg-primary-50 rounded-r-lg">
                    <p className="text-gray-800 italic font-medium" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line.replace('> ', '')) }} />
                </blockquote>
            );
        }
        // Empty line
        else if (line.trim() === '') {
            flushList();
        }
        // Regular paragraph
        else {
            flushList();
            elements.push(
                <p key={index} className="text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line) }} />
            );
        }
    });

    flushList();
    flushTable();

    return elements;
}

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
                        <h1 className="text-4xl text-gray-900 mb-4">Article Not Found</h1>
                        <p className="text-gray-600 mb-8">The article you&apos;re looking for doesn&apos;t exist.</p>
                        <Link href="/blog" className="btn btn-primary btn-md">
                            Back to Blog
                        </Link>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main>
            <Navigation />

            {/* Hero */}
            <section className="pt-24">
                <div className="relative h-[50vh] min-h-[400px]">
                    <Image
                        src={blog.cover_image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute inset-0 flex items-end">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {blog.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 text-xs font-medium text-white bg-white/20 backdrop-blur rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                                {blog.title}
                            </h1>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-lg">
                                    {blog.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-white">{blog.author}</p>
                                    <p className="text-sm text-gray-300">{blog.author_role}</p>
                                </div>
                                <div className="ml-auto text-right">
                                    <p className="text-white">{formatDate(blog.published_at)}</p>
                                    <p className="text-sm text-gray-300">{blog.reading_time} min read</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Excerpt */}
                    <p className="text-xl text-gray-600 leading-relaxed mb-10 pb-10 border-b border-gray-200">
                        {blog.excerpt}
                    </p>

                    {/* Article Content */}
                    <article className="prose prose-lg max-w-none">
                        {renderContent(blog.content)}
                    </article>

                    {/* Share */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-2">Share this article</p>
                                <div className="flex gap-3">
                                    <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary-100 text-gray-600 hover:text-primary-600 flex items-center justify-center transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                        </svg>
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary-100 text-gray-600 hover:text-primary-600 flex items-center justify-center transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary-100 text-gray-600 hover:text-primary-600 flex items-center justify-center transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <Link href="/blog" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                                Back to Blog
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Posts */}
            {relatedBlogs.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl text-gray-900 mb-10 text-center">Related Articles</h2>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {relatedBlogs.map((relBlog) => (
                                <Link key={relBlog.id} href={`/blog/${relBlog.slug}`} className="group">
                                    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={relBlog.cover_image}
                                                alt={relBlog.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {relBlog.tags.slice(0, 2).map((tag) => (
                                                    <span key={tag} className="px-3 py-1 text-xs font-medium text-primary-700 bg-primary-50 rounded-full">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                                                {relBlog.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-3">{formatDate(relBlog.published_at)}</p>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Author CTA */}
            <section className="py-16 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-8 md:p-12 text-center">
                        <h2 className="text-2xl md:text-3xl text-white mb-4">
                            Need Professional Advice?
                        </h2>
                        <p className="text-primary-100 mb-8">
                            Our team of chartered accountants and tax specialists is ready to help your business thrive.
                        </p>
                        <Link href="/contact" className="btn btn-white btn-lg">
                            Schedule a Consultation
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
