// Decorative three-bar motif from the BYC logo mark: green, leaf, lime.
export default function BrandBars({ className = '', size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
    const dims = { sm: ['h-10', 'h-8', 'h-6', 'w-3', 'gap-1.5'], md: ['h-24', 'h-[4.6rem]', 'h-14', 'w-7', 'gap-2.5'], lg: ['h-44', 'h-36', 'h-28', 'w-12', 'gap-4'] }[size];
    return (
        <div aria-hidden className={`flex items-start ${dims[4]} ${className}`}>
            <span className={`${dims[0]} ${dims[3]} rounded-b-sm rounded-t-sm bg-primary-500`} />
            <span className={`${dims[1]} ${dims[3]} rounded-sm bg-leaf-500`} />
            <span className={`${dims[2]} ${dims[3]} rounded-sm bg-lime-500`} />
        </div>
    );
}

export const brandTones = [
    { bg: 'bg-primary-50', text: 'text-primary-700', solid: 'bg-primary-500', border: 'border-primary-500' },
    { bg: 'bg-leaf-50', text: 'text-leaf-700', solid: 'bg-leaf-500', border: 'border-leaf-500' },
    { bg: 'bg-lime-50', text: 'text-lime-700', solid: 'bg-lime-500', border: 'border-lime-500' },
];
