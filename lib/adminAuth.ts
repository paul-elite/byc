import { createHmac, timingSafeEqual } from 'crypto';

export const ADMIN_COOKIE_NAME = 'byc_admin_session';
const SESSION_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function getSessionSecret() {
    return process.env.ADMIN_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
}

function sign(value: string) {
    return createHmac('sha256', getSessionSecret()).update(value).digest('hex');
}

export function hasAdminPassword() {
    return Boolean(process.env.ADMIN_PASSWORD);
}

export function isValidAdminPassword(password: string) {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) return false;

    const suppliedBuffer = Buffer.from(password);
    const expectedBuffer = Buffer.from(expected);

    if (suppliedBuffer.length !== expectedBuffer.length) return false;
    return timingSafeEqual(suppliedBuffer, expectedBuffer);
}

export function createAdminSession() {
    const issuedAt = Date.now().toString();
    return `${issuedAt}.${sign(issuedAt)}`;
}

export function verifyAdminSession(session: string | undefined) {
    if (!session || !getSessionSecret()) return false;

    const [issuedAt, signature] = session.split('.');
    if (!issuedAt || !signature) return false;

    const timestamp = Number(issuedAt);
    if (!Number.isFinite(timestamp) || Date.now() - timestamp > SESSION_AGE_MS) return false;

    const expected = sign(issuedAt);
    const suppliedBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);

    if (suppliedBuffer.length !== expectedBuffer.length) return false;
    return timingSafeEqual(suppliedBuffer, expectedBuffer);
}

