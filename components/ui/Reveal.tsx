'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

// Fades content up the first time it scrolls into view. Respects reduced motion.
export default function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setVisible(true);
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '0px 0px -10% 0px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-700 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} ${className}`}
        >
            {children}
        </div>
    );
}
