import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, createAdminSession, hasAdminPassword, isValidAdminPassword } from '@/lib/adminAuth';

export async function POST(request: NextRequest) {
    const { password } = await request.json();

    if (!hasAdminPassword()) {
        return NextResponse.json({ error: 'Staff password is not configured.' }, { status: 503 });
    }

    if (!isValidAdminPassword(String(password ?? ''))) {
        return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE_NAME, createAdminSession(), {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    });

    return response;
}

