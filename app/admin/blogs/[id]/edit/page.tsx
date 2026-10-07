'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import BlogEditor from '@/components/admin/BlogEditor';

interface Blog {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    author_role: string;
    published_at: string;
    cover_image: string;
    tags: string[];
    status: 'draft' | 'published';
    reading_time: number;
}

interface BlogData {
    id?: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    author_role: string;
    cover_image: string;
    tags: string[];
    status: 'draft' | 'published';
    reading_time: number;
    published_at?: string;
}

export default function EditBlogPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            loadBlog();
        }
    }, [id]);

    const loadBlog = async () => {
        try {
            const res = await fetch(`/api/blogs/${id}`);
            if (!res.ok) throw new Error('Blog not found');
            const data = await res.json();
            setBlog(data);
        } catch (err) {
            console.error('Error loading blog:', err);
            setError('Blog not found');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (blogData: BlogData) => {
        setSaving(true);
        setError('');

        try {
            const res = await fetch(`/api/blogs/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blogData),
            });

            if (!res.ok) {
                throw new Error('Failed to update blog');
            }

            router.push('/admin/blogs');
        } catch (err) {
            setError('Failed to update blog. Please try again.');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        router.push('/admin/blogs');
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
            </AdminLayout>
        );
    }

    if (!blog || error) {
        return (
            <AdminLayout>
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h2>
                    <p className="text-gray-500 mb-4">The blog post you&apos;re looking for doesn&apos;t exist.</p>
                    <button onClick={() => router.push('/admin/blogs')} className="btn btn-primary btn-md">
                        Back to Posts
                    </button>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
                <p className="text-gray-500">Update your blog article</p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <BlogEditor blog={blog} onSave={handleSave} onCancel={handleCancel} saving={saving} />
            </div>
        </AdminLayout>
    );
}
