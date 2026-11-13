// Stock photography (Unsplash License, free for commercial use).
// Served through next/image; images.unsplash.com is allowed in next.config.ts.
const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=2000`;

export const photos = {
    // Ninthgrid, Lagos — team meeting around a white table
    meeting: {
        src: unsplash('photo-1739287088753-73a9b8b771bc'),
        alt: 'Professionals in a meeting around a white table',
        credit: 'Ninthgrid / Unsplash',
    },
    // Ninthgrid, Lagos — professionals standing together in an office
    team: {
        src: unsplash('photo-1739298061766-e2751d92e9db'),
        alt: 'A group of professionals standing together in an office',
        credit: 'Ninthgrid / Unsplash',
    },
    // Ninthgrid, Lagos — two colleagues working on laptops
    colleagues: {
        src: unsplash('photo-1739303987830-ca19742b19bc'),
        alt: 'Two colleagues reviewing work on their laptops',
        credit: 'Ninthgrid / Unsplash',
    },
    // Desola Lanre-Ologun, Lagos — two people reviewing work on a monitor
    review: {
        src: unsplash('photo-1531482615713-2afd69097998'),
        alt: 'Two colleagues reviewing figures on a computer monitor',
        credit: 'Desola Lanre-Ologun / Unsplash',
    },
} as const;
