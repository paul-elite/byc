// Colour for an article tag, so topics are recognisable at a glance.
export function tagTone(tag: string) {
    const t = tag.toLowerCase();
    if (t.includes('audit') || t.includes('control') || t.includes('governance')) return 'bg-blue-100 text-blue-700';
    if (t.includes('payroll') || t.includes('paye')) return 'bg-lime-100 text-lime-700';
    if (t.includes('deadline') || t.includes('compliance')) return 'bg-red-50 text-red-700';
    if (t.includes('tax')) return 'bg-sun-100 text-sun-800';
    return 'bg-primary-100 text-primary-800';
}
