import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminSession } from '@/lib/adminAuth';
import { getPortfolioContent, savePortfolioContent } from '@/lib/portfolio';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const content = await getPortfolioContent();
        return NextResponse.json(content);
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        return NextResponse.json({ error: 'Failed to fetch portfolio content' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    if (!verifyAdminSession(session)) {
        return NextResponse.json({ error: 'Staff sign-in required.' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const content = await savePortfolioContent(body);
        return NextResponse.json(content);
    } catch (error) {
        console.error('Error saving portfolio:', error);
        return NextResponse.json({ error: 'Failed to save portfolio content' }, { status: 500 });
    }
}

