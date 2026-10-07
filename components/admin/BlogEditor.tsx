'use client';

import { useState } from 'react';
import { generateSlug } from '@/lib/blogs';

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
    published_at?: string;
    cover_image: string;
    tags: string[];
    status: 'draft' | 'published';
    reading_time: number;
}

interface BlogEditorProps {
    blog?: Blog;
    onSave: (blog: BlogData) => void;
    onCancel: () => void;
    saving?: boolean;
}

export default function BlogEditor({ blog, onSave, onCancel, saving = false }: BlogEditorProps) {
    const [title, setTitle] = useState(blog?.title || '');
    const [slug, setSlug] = useState(blog?.slug || '');
    const [excerpt, setExcerpt] = useState(blog?.excerpt || '');
    const [content, setContent] = useState(blog?.content || '');
    const [coverImage, setCoverImage] = useState(blog?.cover_image || '');
    const [author, setAuthor] = useState(blog?.author || 'Babatunde Yunus');
    const [authorRole, setAuthorRole] = useState(blog?.author_role || 'Managing Partner');
    const [tags, setTags] = useState(blog?.tags?.join(', ') || '');
    const [status, setStatus] = useState<'draft' | 'published'>(blog?.status || 'draft');
    const [autoSlug, setAutoSlug] = useState(!blog);

    const handleTitleChange = (nextTitle: string) => {
        setTitle(nextTitle);
        if (autoSlug) {
            setSlug(generateSlug(nextTitle));
        }
    };

    // Calculate reading time
    const readingTime = Math.max(1, Math.ceil(content.split(/\s+/).length / 200));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const blogData: BlogData = {
            id: blog?.id,
            slug,
            title,
            excerpt,
            content,
            author,
            author_role: authorRole,
            published_at: blog?.published_at || new Date().toISOString(),
            cover_image: coverImage,
            tags: tags.split(',').map(t => t.trim()).filter(t => t),
            status,
            reading_time: readingTime,
        };

        onSave(blogData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl">
            <div className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        required
                        disabled={saving}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all text-gray-900 disabled:opacity-50"
                        placeholder="Enter article title..."
                    />
                </div>

                {/* Slug */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL Slug
                    </label>
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => {
                                setSlug(e.target.value);
                                setAutoSlug(false);
                            }}
                            disabled={saving}
                            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all text-gray-900 disabled:opacity-50"
                            placeholder="article-url-slug"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setSlug(generateSlug(title));
                                setAutoSlug(true);
                            }}
                            disabled={saving}
                            className="px-4 py-3 text-sm text-primary-600 hover:text-primary-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            Auto-generate
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Preview: /blog/{slug || 'article-slug'}
                    </p>
                </div>

                {/* Cover Image */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cover Image URL <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="url"
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        required
                        disabled={saving}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all text-gray-900 disabled:opacity-50"
                        placeholder="https://images.unsplash.com/..."
                    />
                    {coverImage && (
                        <div className="mt-3 relative h-48 rounded-lg overflow-hidden">
                            <img src={coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>

                {/* Excerpt */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Excerpt <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        required
                        disabled={saving}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all text-gray-900 resize-none disabled:opacity-50"
                        placeholder="Brief summary of the article..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        {excerpt.length}/200 characters recommended
                    </p>
                </div>

                {/* Content */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content (Markdown) <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        disabled={saving}
                        rows={20}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all text-gray-900 font-mono text-sm disabled:opacity-50"
                        placeholder="Write your article content in Markdown format..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Estimated reading time: {readingTime} min
                    </p>
                </div>

                {/* Author Info */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Author Name
                        </label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            disabled={saving}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all text-gray-900 disabled:opacity-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Author Role
                        </label>
                        <input
                            type="text"
                            value={authorRole}
                            onChange={(e) => setAuthorRole(e.target.value)}
                            disabled={saving}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all text-gray-900 disabled:opacity-50"
                        />
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags
                    </label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        disabled={saving}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all text-gray-900 disabled:opacity-50"
                        placeholder="Audit, Tax, Compliance (comma separated)"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                    </label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="status"
                                value="draft"
                                checked={status === 'draft'}
                                onChange={() => setStatus('draft')}
                                disabled={saving}
                                className="w-4 h-4 text-primary-600"
                            />
                            <span className="text-gray-700">Draft</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="status"
                                value="published"
                                checked={status === 'published'}
                                onChange={() => setStatus('published')}
                                disabled={saving}
                                className="w-4 h-4 text-primary-600"
                            />
                            <span className="text-gray-700">Published</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                    type="submit"
                    disabled={saving}
                    className="btn btn-primary btn-md disabled:opacity-50"
                >
                    {saving ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                        </>
                    ) : (
                        blog ? 'Update Article' : 'Create Article'
                    )}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={saving}
                    className="btn btn-ghost btn-md disabled:opacity-50"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
