import { getSupabase } from './supabase';
import blogData from '@/data/blogs.json';

export interface Blog {
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
    created_at?: string;
    updated_at?: string;
}

const TABLE_NAME = 'blogs';

type BlogRecord = Blog | {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    authorRole?: string;
    author_role?: string;
    publishedAt?: string;
    published_at?: string;
    coverImage?: string;
    cover_image?: string;
    tags: string[];
    status: 'draft' | 'published';
    readingTime?: number;
    reading_time?: number;
    created_at?: string;
    updated_at?: string;
};

const localBlogs = (blogData.blogs as BlogRecord[]).map(normalizeBlog);

function normalizeBlog(blog: BlogRecord): Blog {
    const record = blog as BlogRecord & {
        authorRole?: string;
        publishedAt?: string;
        coverImage?: string;
        readingTime?: number;
    };

    return {
        id: record.id,
        slug: record.slug,
        title: record.title,
        excerpt: record.excerpt,
        content: record.content,
        author: record.author,
        author_role: record.author_role ?? record.authorRole ?? '',
        published_at: record.published_at ?? record.publishedAt ?? new Date().toISOString(),
        cover_image: record.cover_image ?? record.coverImage ?? '',
        tags: record.tags,
        status: record.status,
        reading_time: record.reading_time ?? record.readingTime ?? 1,
        created_at: record.created_at,
        updated_at: record.updated_at,
    };
}

function mergePublishedBlogs(remoteBlogs: Blog[]) {
    const bySlug = new Map<string, Blog>();

    [...localBlogs, ...remoteBlogs].forEach((blog) => {
        if (blog.status === 'published' && !bySlug.has(blog.slug)) {
            bySlug.set(blog.slug, blog);
        }
    });

    return Array.from(bySlug.values()).sort(
        (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );
}

// Fetch all blogs (admin view - uses server action)
export async function getAllBlogs(): Promise<Blog[]> {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .order('published_at', { ascending: false });

        if (error) {
            console.error('Error fetching blogs:', error);
            return localBlogs;
        }

        return mergePublishedBlogs((data || []).map(normalizeBlog));
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return localBlogs;
    }
}

// Fetch only published blogs (public view)
export async function getPublishedBlogs(): Promise<Blog[]> {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .eq('status', 'published')
            .order('published_at', { ascending: false });

        if (error) {
            console.error('Error fetching published blogs:', error);
            return localBlogs.filter((blog) => blog.status === 'published');
        }

        return (data || []).map(normalizeBlog);
    } catch (error) {
        console.error('Error fetching published blogs:', error);
        return localBlogs.filter((blog) => blog.status === 'published');
    }
}

// Get blog by slug
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) {
            console.error('Error fetching blog by slug:', error);
            return localBlogs.find((blog) => blog.slug === slug) ?? null;
        }

        return normalizeBlog(data);
    } catch (error) {
        console.error('Error fetching blog by slug:', error);
        return localBlogs.find((blog) => blog.slug === slug) ?? null;
    }
}

// Get blog by ID
export async function getBlogById(id: string): Promise<Blog | null> {
    const supabase = getSupabase();
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching blog by id:', error);
        return null;
    }

    return data;
}

// Format date for display
export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

// Generate slug from title
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

// Get related blogs by tags
export async function getRelatedBlogs(currentSlug: string, limit: number = 2): Promise<Blog[]> {
    const currentBlog = await getBlogBySlug(currentSlug);
    if (!currentBlog) return [];

    const supabase = getSupabase();
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .eq('status', 'published')
        .neq('slug', currentSlug)
        .limit(limit);

    if (error) {
        console.error('Error fetching related blogs:', error);
        return [];
    }

    // Sort by tag overlap
    const scored = (data || []).map(blog => ({
        blog,
        score: blog.tags.filter((tag: string) => currentBlog.tags.includes(tag)).length,
    }));

    return scored
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(s => s.blog);
}
