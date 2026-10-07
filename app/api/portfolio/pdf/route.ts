import { readFile } from 'fs/promises';
import path from 'path';
import { get, put } from '@vercel/blob';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminSession } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const PORTFOLIO_PDF_BLOB_PATH = 'portfolio/current.pdf';
const FALLBACK_PDF_PATH = path.join(process.cwd(), 'public', 'documents', 'byc-portfolio.pdf');

function pdfHeaders(download: boolean) {
    return {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `${download ? 'attachment' : 'inline'}; filename="byc-portfolio.pdf"`,
        'Cache-Control': 'no-store, max-age=0',
    };
}

export async function GET(request: NextRequest) {
    const download = request.nextUrl.searchParams.get('download') === '1';

    try {
        const blob = await get(PORTFOLIO_PDF_BLOB_PATH, {
            access: 'private',
            useCache: false,
        });

        if (blob?.statusCode === 200 && blob.stream) {
            return new NextResponse(blob.stream, {
                headers: pdfHeaders(download),
            });
        }
    } catch (error) {
        console.warn('Portfolio PDF blob fallback loaded:', error);
    }

    const file = await readFile(FALLBACK_PDF_PATH);
    return new NextResponse(file, {
        headers: pdfHeaders(download),
    });
}

export async function POST(request: NextRequest) {
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    if (!verifyAdminSession(session)) {
        return NextResponse.json({ error: 'Staff sign-in required.' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
        return NextResponse.json({ error: 'Please choose a PDF file.' }, { status: 400 });
    }

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        return NextResponse.json({ error: 'Only PDF files can be uploaded.' }, { status: 400 });
    }

    await put(PORTFOLIO_PDF_BLOB_PATH, file, {
        access: 'private',
        allowOverwrite: true,
        addRandomSuffix: false,
        contentType: 'application/pdf',
        cacheControlMaxAge: 60,
    });

    return NextResponse.json({
        ok: true,
        updatedAt: new Date().toISOString(),
    });
}
