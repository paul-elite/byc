import { NextRequest, NextResponse } from 'next/server';

const ADMIN_COOKIE_NAME = 'byc_admin_session';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const hasSession = request.cookies.has(ADMIN_COOKIE_NAME);

        if (!hasSession) {
            const url = request.nextUrl.clone();
            url.pathname = '/admin/login';
            url.searchParams.set('next', pathname);
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};

