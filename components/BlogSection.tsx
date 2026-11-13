'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { getPublishedBlogs, formatDate, Blog } from '@/lib/blogs';

export default function BlogSection() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPublishedBlogs().then((data) => {
            setBlogs(data.slice(0, 3));
            setLoading(false);
        });
    }, []);

    if (!loading && blogs.length === 0) return null;

    return (
        <section className="bg-canvas py-20 lg:py-28">
            <div className="container">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <p className="eyebrow">Insights</p>
                        <h2 className="mt-3 text-3xl text-neutral-900 md:text-4xl">Latest articles</h2>
                    </div>
                    <Link href="/blog" className="inline-flex items-center gap-2 font-medium text-primary-700 hover:text-primary-800">
                        All articles <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
                    {loading
                        ? [0, 1, 2].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="aspect-[3/2] rounded-lg bg-neutral-100" />
                                <div className="mt-5 h-4 w-24 rounded bg-neutral-100" />
                                <div className="mt-3 h-6 w-full rounded bg-neutral-100" />
                            </div>
                        ))
                        : blogs.map((blog) => (
                            <article key={blog.id} className="group">
                                <Link href={`/blog/${blog.slug}`} className="block">
                                    <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-neutral-100">
                                        {blog.cover_image && (
                                            <Image
                                                src={blog.cover_image}
                                                alt=""
                                                fill
                                                sizes="(min-width: 768px) 33vw, 100vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                            />
                                        )}
                                    </div>
                                    <p className="mt-5 text-sm text-neutral-500">
                                        {blog.tags[0] && <span className="rounded-full bg-lime-100 px-2 py-0.5 text-xs font-medium text-primary-900">{blog.tags[0]}</span>}
                                        {blog.tags[0] && ' · '}
                                        {formatDate(blog.published_at)}
                                    </p>
                                    <h3 className="mt-2 text-lg text-neutral-900 group-hover:text-primary-700">{blog.title}</h3>
                                    <p className="mt-2 line-clamp-2 text-[15px] text-neutral-600">{blog.excerpt}</p>
                                </Link>
                            </article>
                        ))}
                </div>
            </div>
        </section>
    );
}
