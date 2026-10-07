import { get, put } from '@vercel/blob';
import { createAdminClient } from './supabase';
import { defaultPortfolioContent, PortfolioContent, PORTFOLIO_DOWNLOAD_PATH, PORTFOLIO_VIEW_PATH } from './portfolioData';

export { defaultPortfolioContent, PORTFOLIO_DOWNLOAD_PATH, PORTFOLIO_VIEW_PATH };
export type { PortfolioContent };

const PORTFOLIO_BLOB_PATH = 'portfolio/content.json';

function withDefaults(content: Partial<PortfolioContent> | null | undefined): PortfolioContent {
    const source = content ?? {};

    return {
        ...defaultPortfolioContent,
        ...source,
        stats: Array.isArray(source.stats) ? source.stats : defaultPortfolioContent.stats,
        beliefs: Array.isArray(source.beliefs) ? source.beliefs : defaultPortfolioContent.beliefs,
        services: Array.isArray(source.services) ? source.services : defaultPortfolioContent.services,
        accreditations: Array.isArray(source.accreditations) ? source.accreditations : defaultPortfolioContent.accreditations,
        values: Array.isArray(source.values) ? source.values : defaultPortfolioContent.values,
        strategy: Array.isArray(source.strategy) ? source.strategy : defaultPortfolioContent.strategy,
        sectors: Array.isArray(source.sectors) ? source.sectors : defaultPortfolioContent.sectors,
        offices: Array.isArray(source.offices) ? source.offices : defaultPortfolioContent.offices,
    };
}

function parseContent(raw: unknown): Partial<PortfolioContent> | null {
    if (!raw) return null;
    if (typeof raw === 'object') return raw as Partial<PortfolioContent>;
    if (typeof raw !== 'string') return null;

    try {
        return JSON.parse(raw) as Partial<PortfolioContent>;
    } catch {
        return null;
    }
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
    try {
        const blob = await get(PORTFOLIO_BLOB_PATH, {
            access: 'private',
            useCache: false,
        });

        if (blob?.statusCode === 200 && blob.stream) {
            const text = await new Response(blob.stream).text();
            return withDefaults({
                ...parseContent(text),
                updatedAt: blob.blob.uploadedAt.toISOString(),
            });
        }
    } catch (error) {
        console.warn('Portfolio blob fallback loaded:', error);
    }

    try {
        const supabase = createAdminClient();

        const { data: portfolioRow, error: portfolioError } = await supabase
            .from('portfolio_content')
            .select('content, updated_at')
            .eq('slug', 'main')
            .maybeSingle();

        if (!portfolioError && portfolioRow?.content) {
            return withDefaults({
                ...parseContent(portfolioRow.content),
                updatedAt: portfolioRow.updated_at,
            });
        }

        const { data: fallbackRow, error: fallbackError } = await supabase
            .from('blogs')
            .select('content, updated_at')
            .eq('slug', 'portfolio-content')
            .maybeSingle();

        if (!fallbackError && fallbackRow?.content) {
            return withDefaults({
                ...parseContent(fallbackRow.content),
                updatedAt: fallbackRow.updated_at,
            });
        }
    } catch (error) {
        console.warn('Portfolio content fallback loaded:', error);
    }

    return defaultPortfolioContent;
}

export async function savePortfolioContent(content: PortfolioContent): Promise<PortfolioContent> {
    const normalized = withDefaults(content);
    const now = new Date().toISOString();

    try {
        await put(PORTFOLIO_BLOB_PATH, JSON.stringify({
            ...normalized,
            updatedAt: now,
        }), {
            access: 'private',
            allowOverwrite: true,
            addRandomSuffix: false,
            contentType: 'application/json',
            cacheControlMaxAge: 60,
        });

        return {
            ...normalized,
            updatedAt: now,
        };
    } catch (error) {
        console.error('Error saving portfolio to blob:', error);
    }

    const supabase = createAdminClient();
    const payload = JSON.stringify(normalized);

    const { data, error } = await supabase
        .from('portfolio_content')
        .upsert({
            slug: 'main',
            content: normalized,
            updated_at: new Date().toISOString(),
        }, { onConflict: 'slug' })
        .select('content, updated_at')
        .single();

    if (!error && data?.content) {
        return withDefaults({
            ...parseContent(data.content),
            updatedAt: data.updated_at,
        });
    }

    const { data: fallbackData, error: fallbackError } = await supabase
        .from('blogs')
        .upsert({
            slug: 'portfolio-content',
            title: 'Portfolio Content',
            excerpt: 'Editable website portfolio content.',
            content: payload,
            author: 'BYC Admin',
            author_role: 'Content Manager',
            cover_image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
            tags: ['Portfolio'],
            status: 'draft',
            reading_time: 1,
            published_at: new Date().toISOString(),
        }, { onConflict: 'slug' })
        .select('content, updated_at')
        .single();

    if (fallbackError) {
        throw fallbackError;
    }

    return withDefaults({
        ...parseContent(fallbackData?.content),
        updatedAt: fallbackData?.updated_at,
    });
}
