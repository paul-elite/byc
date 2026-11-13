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
                <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 mb-6 text-neutral-700">
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
                    <table className="min-w-full border border-neutral-200 rounded-lg overflow-hidden">
                        <thead className="bg-neutral-50">
                            <tr>
                                {headers.map((h, i) => (
                                    <th key={i} className="px-4 py-3 text-left text-sm font-semibold text-neutral-900 border-b border-neutral-200">
                                        {h.trim()}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {body.map((row, i) => (
                                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                                    {row.map((cell, j) => (
                                        <td key={j} className="px-4 py-3 text-sm text-neutral-700 border-b border-neutral-100">
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
                <h2 key={index} className="text-2xl font-semibold text-neutral-900 mt-10 mb-4">
                    {line.replace('## ', '')}
                </h2>
            );
        } else if (line.startsWith('### ')) {
            flushList();
            elements.push(
                <h3 key={index} className="text-xl font-semibold text-neutral-900 mt-8 mb-3">
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
                        <span className="font-bold text-neutral-900">{match[1]}</span>
                        <span className="text-neutral-700">{match[2]}</span>
                    </div>
                );
            } else {
                elements.push(
                    <p key={index} className="text-neutral-700 mb-2" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line) }} />
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
                <blockquote key={index} className="border-l-2 border-primary-600 pl-5 py-1 my-6">
                    <p className="text-neutral-800 italic font-medium" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line.replace('> ', '')) }} />
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
                <p key={index} className="text-neutral-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line) }} />
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

            <section className="bg-white pt-16 lg:pt-[72px]">
                <div className="mx-auto max-w-3xl px-5 pt-14 lg:pt-20">
                    <Link href="/blog" className="text-sm text-neutral-500 hover:text-primary-700">&larr; All articles</Link>
                    {blog.tags.length > 0 && (
                        <p className="mt-6 text-sm text-primary-700">{blog.tags.join(' · ')}</p>
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
                        <div className="relative aspect-[2/1] overflow-hidden rounded-lg bg-neutral-100">
                            <Image src={blog.cover_image} alt="" fill sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" priority />
                        </div>
                    </div>
                )}
            </section>

            <section className="bg-white py-14">
                <div className="mx-auto max-w-3xl px-5">
                    <article className="text-[17px]">
                        {renderContent(blog.content)}
                    </article>

                    <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-neutral-200 pt-6 text-sm">
                        <span className="text-neutral-500">Share:</span>
                        {shareLinks.map(([label, href]) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-neutral-800 hover:text-primary-700">
                                {label}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {relatedBlogs.length > 0 && (
                <section className="border-t border-neutral-200 bg-neutral-50 py-16">
                    <div className="mx-auto max-w-5xl px-5">
                        <h2 className="text-2xl text-neutral-900">Related articles</h2>
                        <div className="mt-8 grid gap-10 md:grid-cols-2">
                            {relatedBlogs.map((relBlog) => (
                                <Link key={relBlog.id} href={`/blog/${relBlog.slug}`} className="group block">
                                    <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-neutral-100">
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
