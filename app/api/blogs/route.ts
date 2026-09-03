import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const TABLE_NAME = 'blogs';

// GET all blogs (for admin)
export async function GET() {
    try {
        const supabase = createAdminClient();
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .order('published_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}

// POST - Create new blog
export async function POST(request: NextRequest) {
    try {
        const supabase = createAdminClient();
        const body = await request.json();

        const { data, error } = await supabase
            .from(TABLE_NAME)
            .insert([{
                slug: body.slug,
                title: body.title,
                excerpt: body.excerpt,
                content: body.content,
                author: body.author,
                author_role: body.author_role,
                cover_image: body.cover_image,
                tags: body.tags,
                status: body.status,
                reading_time: body.reading_time,
                published_at: body.published_at || new Date().toISOString(),
            }])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error creating blog:', error);
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }
}
