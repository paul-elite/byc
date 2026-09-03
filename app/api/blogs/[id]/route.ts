import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const TABLE_NAME = 'blogs';

// GET single blog by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const supabase = createAdminClient();
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching blog:', error);
        return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
    }
}

// PUT - Update blog
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const supabase = createAdminClient();
        const body = await request.json();

        const { data, error } = await supabase
            .from(TABLE_NAME)
            .update({
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
            })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error updating blog:', error);
        return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
    }
}

// DELETE blog
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const supabase = createAdminClient();
        const { error } = await supabase
            .from(TABLE_NAME)
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }
}

// PATCH - Toggle status
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const supabase = createAdminClient();

        // Get current status
        const { data: blog, error: fetchError } = await supabase
            .from(TABLE_NAME)
            .select('status')
            .eq('id', id)
            .single();

        if (fetchError) throw fetchError;

        const newStatus = blog.status === 'published' ? 'draft' : 'published';

        const { data, error } = await supabase
            .from(TABLE_NAME)
            .update({ status: newStatus })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error toggling blog status:', error);
        return NextResponse.json({ error: 'Failed to toggle status' }, { status: 500 });
    }
}
