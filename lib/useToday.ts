'use client';

import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

// Today's date on the client, null during server rendering, so date-dependent
// UI renders without hydration mismatches. Stable for the whole day.
export function useToday(): Date | null {
    const key = useSyncExternalStore(noopSubscribe, () => new Date().toDateString(), () => null);
    return key ? new Date(key) : null;
}
