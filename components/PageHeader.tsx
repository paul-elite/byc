import type { ReactNode } from 'react';
import BrandBars from '@/components/ui/BrandBars';

// `eyebrow` is accepted for compatibility but no longer displayed.
export default function PageHeader({
    title,
    children,
}: {
    eyebrow?: string;
    title: string;
    children?: ReactNode;
}) {
    return (
        <section className="border-b border-neutral-200 bg-mist pt-16 lg:pt-[72px]">
            <div className="container relative py-14 lg:py-20">
                <BrandBars size="md" className="absolute right-8 top-0 hidden md:flex" />
                <h1 className="max-w-3xl text-4xl text-neutral-900 md:text-5xl">{title}</h1>
                {children && <div className="mt-5 max-w-2xl text-lg text-neutral-600">{children}</div>}
            </div>
        </section>
    );
}
