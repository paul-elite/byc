'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Reveals `[data-reveal]` elements the first time they scroll into view.
 * The hidden start state lives in globals.css; once an element has finished
 * entering it is marked "done" so its own hover and press transitions take over.
 */
export default function RevealObserver() {
    const pathname = usePathname();

    useEffect(() => {
        const pending = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal="done"])'));
        if (!pending.length) return;

        const finish = (el: HTMLElement) => {
            const delay = parseFloat(getComputedStyle(el).getPropertyValue('--delay')) || 0;
            window.setTimeout(() => el.setAttribute('data-reveal', 'done'), delay + 700);
        };

        if (!('IntersectionObserver' in window)) {
            pending.forEach((el) => el.setAttribute('data-reveal', 'done'));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    const el = entry.target as HTMLElement;
                    el.setAttribute('data-visible', '');
                    finish(el);
                    observer.unobserve(el);
                }
            },
            { rootMargin: '0px 0px -80px 0px' },
        );

        pending.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [pathname]);

    return null;
}
