'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import BlogEditor from '@/components/admin/BlogEditor';

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

export default function NewBlogPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const handleSave = async (blog: BlogData) => {
        setSaving(true);
        setError('');

        try {
            const res = await fetch('/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blog),
            });

            if (!res.ok) {
                throw new Error('Failed to create blog');
            }

            router.push('/admin/blogs');
        } catch (err) {
            setError('Failed to create blog. Please try again.');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        router.push('/admin/blogs');
    };

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
                <p className="text-gray-500">Write and publish a new blog article</p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <BlogEditor onSave={handleSave} onCancel={handleCancel} saving={saving} />
            </div>
        </AdminLayout>
    );
}
