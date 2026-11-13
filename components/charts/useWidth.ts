'use client';

import { useEffect, useRef, useState } from 'react';

// Measures an element's width so charts render at real pixel size (crisp text, no SVG scaling).
export function useWidth<T extends HTMLElement>(initial = 640) {
    const ref = useRef<T>(null);
    const [width, setWidth] = useState(initial);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
        ro.observe(el);
        return () => ro.disconnect();
    }, []);
    return [ref, width] as const;
}
