import type { ReactElement } from 'react';

// Small markdown renderer for article bodies stored as text.
// Supports ## / ### headings, paragraphs, - lists, 1. lists, > quotes,
// | tables |, **bold**, *italic* and [links](url).

export function slugify(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function extractHeadings(content: string) {
    return content
        .split('\n')
        .filter((l) => l.startsWith('## '))
        .map((l) => {
            const text = l.replace(/^## /, '').trim();
            return { id: slugify(text), text };
        });
}

function inline(text: string) {
    const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return escaped
        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-neutral-900">$1</strong>')
        .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
        .replace(/\[(.+?)\]\((.+?)\)/g, (_m, label: string, href: string) => {
            const external = /^https?:\/\//.test(href);
            return `<a href="${href}" class="font-medium text-primary-700 underline decoration-primary-200 underline-offset-2 hover:decoration-primary-600"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`;
        });
}

export function renderMarkdown(content: string) {
    const lines = content.split('\n');
    const out: ReactElement[] = [];
    let ul: string[] = [];
    let ol: string[] = [];
    let table: string[][] = [];

    const flush = () => {
        if (ul.length) {
            out.push(
                <ul key={`ul-${out.length}`} className="mb-6 space-y-2 pl-5 marker:text-primary-600 [list-style:disc]">
                    {ul.map((item, i) => <li key={i} className="pl-1 text-neutral-700" dangerouslySetInnerHTML={{ __html: inline(item) }} />)}
                </ul>
            );
            ul = [];
        }
        if (ol.length) {
            out.push(
                <ol key={`ol-${out.length}`} className="mb-6 space-y-3">
                    {ol.map((item, i) => (
                        <li key={i} className="flex gap-4 text-neutral-700">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary-700">{i + 1}</span>
                            <span dangerouslySetInnerHTML={{ __html: inline(item) }} />
                        </li>
                    ))}
                </ol>
            );
            ol = [];
        }
        if (table.length) {
            const [head, ...rows] = table;
            out.push(
                <div key={`t-${out.length}`} className="mb-8 overflow-x-auto rounded-lg border border-neutral-200">
                    <table className="w-full text-left text-[15px]">
                        <thead className="bg-neutral-50">
                            <tr>{head.map((h, i) => <th key={i} className="border-b border-neutral-200 px-4 py-3 font-medium text-neutral-900" dangerouslySetInnerHTML={{ __html: inline(h) }} />)}</tr>
                        </thead>
                        <tbody>
                            {rows.map((r, i) => (
                                <tr key={i} className="border-b border-neutral-100 last:border-0">
                                    {r.map((c, j) => <td key={j} className="px-4 py-3 align-top text-neutral-700" dangerouslySetInnerHTML={{ __html: inline(c) }} />)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
            table = [];
        }
    };

    lines.forEach((raw, index) => {
        const line = raw.trimEnd();
        if (line.startsWith('|')) {
            if (!table.length) flush();
            if (/^\|\s*:?-{2,}/.test(line)) return;
            table.push(line.split('|').slice(1, -1).map((c) => c.trim()));
            return;
        }
        if (table.length) flush();

        if (line.startsWith('## ')) {
            flush();
            const text = line.slice(3).trim();
            out.push(<h2 key={index} id={slugify(text)} className="mb-4 mt-12 scroll-mt-28 text-2xl text-neutral-900">{text}</h2>);
        } else if (line.startsWith('### ')) {
            flush();
            out.push(<h3 key={index} className="mb-3 mt-8 text-xl text-neutral-900">{line.slice(4)}</h3>);
        } else if (/^\d+\.\s/.test(line)) {
            if (ul.length) flush();
            ol.push(line.replace(/^\d+\.\s/, ''));
        } else if (line.startsWith('- ')) {
            if (ol.length) flush();
            ul.push(line.slice(2));
        } else if (line.startsWith('> ')) {
            flush();
            out.push(
                <blockquote key={index} className="my-8 border-l-2 border-primary-600 pl-6">
                    <p className="text-xl leading-relaxed text-neutral-900" dangerouslySetInnerHTML={{ __html: inline(line.slice(2)) }} />
                </blockquote>
            );
        } else if (line.trim() === '') {
            flush();
        } else {
            flush();
            out.push(<p key={index} className="mb-5 leading-[1.75] text-neutral-700" dangerouslySetInnerHTML={{ __html: inline(line) }} />);
        }
    });
    flush();
    return out;
}
