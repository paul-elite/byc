import { issueSignedToken } from '@vercel/blob';
import { handleUploadPresigned, type HandleUploadPresignedBody } from '@vercel/blob/client';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminSession } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const PORTFOLIO_PDF_BLOB_PATH = 'portfolio/current.pdf';
const MAX_PDF_SIZE_BYTES = 75 * 1024 * 1024;

export async function POST(request: NextRequest) {
    let body: HandleUploadPresignedBody;

    try {
        body = (await request.json()) as HandleUploadPresignedBody;
    } catch {
        return NextResponse.json({ error: 'Invalid upload request.' }, { status: 400 });
    }

    if (body.type === 'blob.generate-presigned-url') {
        const cookieStore = await cookies();
        const session = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

        if (!verifyAdminSession(session)) {
            return NextResponse.json({ error: 'Staff sign-in required.' }, { status: 401 });
        }

        if (body.payload.pathname !== PORTFOLIO_PDF_BLOB_PATH) {
            return NextResponse.json({ error: 'Invalid portfolio file target.' }, { status: 400 });
        }
    }

    try {
        const response = await handleUploadPresigned({
            body,
            request,
            getSignedToken: async (pathname) => {
                if (pathname !== PORTFOLIO_PDF_BLOB_PATH) {
                    throw new Error('Invalid portfolio file target.');
                }

                const validUntil = Date.now() + 10 * 60 * 1000;

                return {
                    token: await issueSignedToken({
                        pathname,
                        operations: ['put'],
                        validUntil,
                        allowedContentTypes: ['application/pdf'],
                        maximumSizeInBytes: MAX_PDF_SIZE_BYTES,
                    }),
                    urlOptions: {
                        validUntil,
                        allowedContentTypes: ['application/pdf'],
                        maximumSizeInBytes: MAX_PDF_SIZE_BYTES,
                        allowOverwrite: true,
                        addRandomSuffix: false,
                        cacheControlMaxAge: 60,
                    },
                };
            },
        });

        return NextResponse.json(response);
    } catch (error) {
        console.error('Portfolio PDF upload error:', error);
        return NextResponse.json({ error: 'Could not prepare the PDF upload.' }, { status: 500 });
    }
}
