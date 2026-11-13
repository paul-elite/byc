'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

// Reading progress bar + sticky "On this page" contents for articles.
export default function ArticleChrome({ headings, children }: { headings: { id: string; text: string }[]; children: ReactNode }) {
    const bodyRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        const onScroll = () => {
            const el = bodyRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const total = rect.height - window.innerHeight * 0.6;
            setProgress(Math.min(1, Math.max(0, -rect.top / Math.max(total, 1))));

            let current: string | null = null;
            for (const h of headings) {
                const node = document.getElementById(h.id);
                if (node && node.getBoundingClientRect().top < 140) current = h.id;
            }
            setActive(current);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [headings]);

    return (
        <>
            <div className="fixed inset-x-0 top-16 z-40 h-0.5 bg-transparent lg:top-[72px]" aria-hidden>
                <div className="h-full origin-left bg-primary-600 transition-transform duration-150" style={{ transform: `scaleX(${progress})` }} />
            </div>
            <div className="mx-auto grid max-w-5xl gap-12 px-5 lg:grid-cols-[1fr_14rem]">
                <div ref={bodyRef} className="min-w-0 max-w-3xl">{children}</div>
                {headings.length > 2 && (
                    <nav aria-label="On this page" className="hidden lg:block">
                        <div className="sticky top-28">
                            <p className="text-sm font-medium text-neutral-900">On this page</p>
                            <ul className="mt-3 space-y-1 border-l border-neutral-200">
                                {headings.map((h) => (
                                    <li key={h.id}>
                                        <a
                                            href={`#${h.id}`}
                                            className={`-ml-px block border-l py-1 pl-4 text-sm transition-colors ${active === h.id ? 'border-primary-600 font-medium text-primary-700' : 'border-transparent text-neutral-500 hover:text-neutral-900'}`}
                                        >
                                            {h.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                )}
            </div>
        </>
    );
}
