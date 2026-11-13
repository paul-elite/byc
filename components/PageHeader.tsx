import type { ReactNode } from 'react';

export default function PageHeader({
    eyebrow,
    title,
    children,
}: {
    eyebrow: string;
    title: string;
    children?: ReactNode;
}) {
    return (
        <section className="border-b border-neutral-200 bg-neutral-50 pt-16 lg:pt-[72px]">
            <div className="container py-14 lg:py-20">
                <p className="eyebrow">{eyebrow}</p>
                <h1 className="mt-3 max-w-3xl text-4xl text-neutral-900 md:text-5xl">{title}</h1>
                {children && <div className="mt-5 max-w-2xl text-lg text-neutral-600">{children}</div>}
            </div>
        </section>
    );
}
