'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { uploadPresigned } from '@vercel/blob/client';
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, ExternalLink, Plus, RotateCcw, Trash2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import PortfolioDocument from '@/components/portfolio/PortfolioDocument';
import { PortfolioContent, PortfolioItem, PortfolioStat, defaultPortfolioContent } from '@/lib/portfolioData';

type Key = keyof PortfolioContent;

/** The brochure's pages, in order, and the content fields each one shows. */
const PAGES: { name: string; fields: Key[]; note?: string }[] = [
    { name: 'Cover', fields: ['subtitle', 'tagline', 'coverTitle', 'website'] },
    { name: 'Who we are', fields: [], note: 'This is a divider page. It has no editable text.' },
    { name: 'Portfolio', fields: ['firmDescriptor', 'stats'] },
    { name: 'We Believe', fields: ['beliefs'] },
    { name: 'The Firm', fields: ['firmProfile', 'services'] },
    { name: 'Accreditations', fields: ['accreditations', 'accreditationNotes'] },
    { name: 'Our Message', fields: ['vision', 'mission', 'values'] },
    { name: 'What we do', fields: [], note: 'This is a divider page. It has no editable text.' },
    { name: 'Our Services', fields: ['serviceCards'] },
    { name: 'Our Strategy', fields: ['strategy'] },
    { name: 'Clientele Base', fields: ['clientBase', 'sectors'] },
    { name: 'The Managing Partner', fields: ['partnerName', 'partnerCredentials', 'partnerBio'] },
    { name: 'Our Symbol', fields: ['symbolIntro', 'symbolWords'], note: 'The firm name and tagline at the bottom come from the Cover page.' },
    { name: 'Contact Us', fields: ['offices', 'contactEmail', 'contactPhone'], note: 'The website address comes from the Cover page.' },
];

const inputClass = 'w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200';
const iconButton = 'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-transparent';

function TextField({ label, hint, value, onChange, multiline = false }: { label: string; hint?: string; value: string; onChange: (value: string) => void; multiline?: boolean }) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
            {multiline ? (
                <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={Math.min(10, Math.max(2, Math.ceil(value.length / 70) + value.split('\n').length - 1))} className={inputClass} />
            ) : (
                <input value={value} onChange={(event) => onChange(event.target.value)} className={inputClass} />
            )}
            {hint && <span className="mt-1.5 block text-xs text-gray-500">{hint}</span>}
        </label>
    );
}

function move<T>(items: T[], from: number, to: number): T[] {
    const next = [...items];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    return next;
}

/** Shared frame for list rows: reorder and remove controls beside the row's fields. */
function Rows<T>({ label, hint, items, blank, addLabel, onChange, children }: { label: string; hint?: string; items: T[]; blank: T; addLabel: string; onChange: (items: T[]) => void; children: (item: T, set: (value: T) => void, index: number) => ReactNode }) {
    return (
        <div>
            <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <span className="text-xs text-gray-400">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
            </div>
            {hint && <p className="mb-3 text-xs text-gray-500">{hint}</p>}
            <div className="space-y-2">
                {items.map((item, index) => (
                    <div key={index} className="flex items-start gap-1 rounded-lg bg-gray-50 p-2">
                        <div className="min-w-0 flex-1">
                            {children(item, (value) => onChange(items.map((current, i) => (i === index ? value : current))), index)}
                        </div>
                        <div className="flex flex-col">
                            <button type="button" aria-label="Move up" disabled={index === 0} onClick={() => onChange(move(items, index, index - 1))} className={iconButton}><ArrowUp className="h-4 w-4" /></button>
                            <button type="button" aria-label="Move down" disabled={index === items.length - 1} onClick={() => onChange(move(items, index, index + 1))} className={iconButton}><ArrowDown className="h-4 w-4" /></button>
                        </div>
                        <button type="button" aria-label="Remove" onClick={() => onChange(items.filter((_, i) => i !== index))} className={`${iconButton} hover:bg-red-50 hover:text-red-600`}><Trash2 className="h-4 w-4" /></button>
                    </div>
                ))}
            </div>
            <button type="button" onClick={() => onChange([...items, blank])} className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary-700 hover:text-primary-800">
                <Plus className="h-4 w-4" /> {addLabel}
            </button>
        </div>
    );
}

function ListField({ label, hint, items, onChange, multiline = false }: { label: string; hint?: string; items: string[]; onChange: (items: string[]) => void; multiline?: boolean }) {
    return (
        <Rows label={label} hint={hint} items={items} blank="" addLabel="Add item" onChange={onChange}>
            {(item, set) => multiline
                ? <textarea value={item} rows={Math.max(2, item.split('\n').length)} onChange={(event) => set(event.target.value)} className={inputClass} />
                : <input value={item} onChange={(event) => set(event.target.value)} className={inputClass} />}
        </Rows>
    );
}

function PairField<T extends PortfolioItem | PortfolioStat>({ label, hint, items, first, second, firstLabel, secondLabel, onChange }: { label: string; hint?: string; items: T[]; first: keyof T; second: keyof T; firstLabel: string; secondLabel: string; onChange: (items: T[]) => void }) {
    return (
        <Rows label={label} hint={hint} items={items} blank={{ [first]: '', [second]: '' } as unknown as T} addLabel="Add row" onChange={onChange}>
            {(item, set) => (
                <div className="space-y-2">
                    <input aria-label={firstLabel} placeholder={firstLabel} value={String(item[first] ?? '')} onChange={(event) => set({ ...item, [first]: event.target.value })} className={`${inputClass} font-medium`} />
                    <textarea aria-label={secondLabel} placeholder={secondLabel} value={String(item[second] ?? '')} rows={Math.min(8, Math.max(2, Math.ceil(String(item[second] ?? '').length / 60)))} onChange={(event) => set({ ...item, [second]: event.target.value })} className={inputClass} />
                </div>
            )}
        </Rows>
    );
}

export default function AdminPortfolioPage() {
    const [portfolio, setPortfolio] = useState<PortfolioContent>(defaultPortfolioContent);
    const [saved, setSaved] = useState<PortfolioContent>(defaultPortfolioContent);
    const [page, setPage] = useState(0);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingPdf, setUploadingPdf] = useState(false);
    const [pdfUploadProgress, setPdfUploadProgress] = useState(0);
    const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
    const [pdfMessage, setPdfMessage] = useState('');

    useEffect(() => {
        async function loadPortfolio() {
            try {
                const response = await fetch('/api/portfolio');
                const data = await response.json();
                if (!response.ok) throw new Error(data.error || 'Load failed');
                const content = { ...defaultPortfolioContent, ...data };
                setPortfolio(content);
                setSaved(content);
            } catch (error) {
                console.error('Error loading portfolio:', error);
                setMessage({ ok: false, text: 'Could not load saved content. Showing the original brochure text.' });
            } finally {
                setLoading(false);
            }
        }

        loadPortfolio();
    }, []);

    const dirty = useMemo(() => JSON.stringify(portfolio) !== JSON.stringify(saved), [portfolio, saved]);

    // Warn before leaving with unsaved edits.
    useEffect(() => {
        if (!dirty) return;
        const warn = (event: BeforeUnloadEvent) => event.preventDefault();
        window.addEventListener('beforeunload', warn);
        return () => window.removeEventListener('beforeunload', warn);
    }, [dirty]);

    const set = <K extends Key>(key: K, value: PortfolioContent[K]) => {
        setPortfolio((current) => ({ ...current, [key]: value }));
        setMessage(null);
    };

    const current = PAGES[page];
    const pageIsOriginal = current.fields.every((key) => JSON.stringify(portfolio[key]) === JSON.stringify(defaultPortfolioContent[key]));

    const resetPage = () => {
        setPortfolio((content) => {
            const next = { ...content };
            for (const key of current.fields) Object.assign(next, { [key]: defaultPortfolioContent[key] });
            return next;
        });
        setMessage(null);
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);

        try {
            const response = await fetch('/api/portfolio', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(portfolio),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Save failed');

            const content = { ...defaultPortfolioContent, ...data };
            setPortfolio(content);
            setSaved(content);
            setMessage({ ok: true, text: 'Saved. The public brochure now shows these changes.' });
        } catch (error) {
            console.error('Error saving portfolio:', error);
            setMessage({ ok: false, text: 'Could not save. Please sign in again and try once more.' });
        } finally {
            setSaving(false);
        }
    };

    const handlePdfUpload = async () => {
        if (!pdfFile) {
            setPdfMessage('Choose a PDF file first.');
            return;
        }

        setUploadingPdf(true);
        setPdfUploadProgress(0);
        setPdfMessage('');

        try {
            await uploadPresigned('portfolio/current.pdf', pdfFile, {
                access: 'private',
                handleUploadUrl: '/api/portfolio/pdf/upload',
                contentType: 'application/pdf',
                multipart: true,
                onUploadProgress: ({ percentage }) => {
                    setPdfUploadProgress(Math.round(percentage));
                },
            });

            setPdfFile(null);
            setPdfUploadProgress(100);
            setPdfMessage('PDF updated. The Download button now serves the new file.');
        } catch (error) {
            console.error('Error uploading portfolio PDF:', error);
            setPdfMessage('Could not upload the PDF. Please sign in again and try once more.');
        } finally {
            setUploadingPdf(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center py-20">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary-600"></div>
                </div>
            </AdminLayout>
        );
    }

    const p = portfolio;

    const fields: Record<number, ReactNode> = {
        0: (
            <>
                <TextField label="Firm name" value={p.subtitle} onChange={(v) => set('subtitle', v)} hint="Also used on the Portfolio and Our Symbol pages." />
                <TextField label="Tagline under the firm name" value={p.tagline} onChange={(v) => set('tagline', v)} />
                <TextField label="Cover title" value={p.coverTitle} onChange={(v) => set('coverTitle', v)} multiline hint="Press Enter where the line should break." />
                <TextField label="Website" value={p.website} onChange={(v) => set('website', v)} hint="Also shown on the Contact Us page." />
            </>
        ),
        2: (
            <>
                <TextField label="Description after the firm name" value={p.firmDescriptor} onChange={(v) => set('firmDescriptor', v)} />
                <PairField label="Table rows" items={p.stats} first="label" second="value" firstLabel="Label" secondLabel="Value" onChange={(v) => set('stats', v)} hint="The page is laid out for six rows. The homepage also lists them." />
            </>
        ),
        3: <PairField label="Beliefs" items={p.beliefs} first="title" second="body" firstLabel="Heading" secondLabel="Text" onChange={(v) => set('beliefs', v)} hint="The page is laid out for four beliefs." />,
        4: (
            <>
                <TextField label="Firm profile" value={p.firmProfile} onChange={(v) => set('firmProfile', v)} multiline />
                <ListField label="Services list" items={p.services} onChange={(v) => set('services', v)} />
            </>
        ),
        5: (
            <>
                <ListField label="Professional bodies" items={p.accreditations} onChange={(v) => set('accreditations', v)} multiline hint="Nine boxes. Press Enter where a line should break, and end with the abbreviation in brackets." />
                <ListField label="Green boxes" items={p.accreditationNotes} onChange={(v) => set('accreditationNotes', v)} multiline hint="Two boxes under the grid." />
            </>
        ),
        6: (
            <>
                <TextField label="Our Vision" value={p.vision} onChange={(v) => set('vision', v)} multiline />
                <TextField label="Our Mission" value={p.mission} onChange={(v) => set('mission', v)} multiline />
                <ListField label="Our Values" items={p.values} onChange={(v) => set('values', v)} hint="Shown in two columns, filled left to right." />
            </>
        ),
        8: <ListField label="Service cards" items={p.serviceCards} onChange={(v) => set('serviceCards', v)} multiline hint="Eight cards, each with its own icon. Press Enter where a line should break." />,
        9: <PairField label="Strategy points" items={p.strategy} first="title" second="body" firstLabel="Heading" secondLabel="Text" onChange={(v) => set('strategy', v)} hint="The page shows the first four." />,
        10: (
            <>
                <TextField label="Introduction" value={p.clientBase} onChange={(v) => set('clientBase', v)} multiline />
                <ListField label="Sectors" items={p.sectors} onChange={(v) => set('sectors', v)} />
            </>
        ),
        11: (
            <>
                <TextField label="Name" value={p.partnerName} onChange={(v) => set('partnerName', v)} hint="The last word is shown in light green." />
                <TextField label="Credentials" value={p.partnerCredentials} onChange={(v) => set('partnerCredentials', v)} />
                <TextField label="Profile" value={p.partnerBio} onChange={(v) => set('partnerBio', v)} multiline />
            </>
        ),
        12: (
            <>
                <TextField label="Introduction" value={p.symbolIntro} onChange={(v) => set('symbolIntro', v)} multiline />
                <ListField label="Words under the bars" items={p.symbolWords} onChange={(v) => set('symbolWords', v)} hint="Three words, one per bar." />
            </>
        ),
        13: (
            <>
                <PairField label="Offices" items={p.offices} first="title" second="body" firstLabel="Office" secondLabel="Address" onChange={(v) => set('offices', v)} hint="Press Enter where the address should break." />
                <TextField label="Email" value={p.contactEmail} onChange={(v) => set('contactEmail', v)} />
                <TextField label="Phone" value={p.contactPhone} onChange={(v) => set('contactPhone', v)} />
            </>
        ),
    };

    return (
        <AdminLayout>
            {/* Header: stays in view so Save is always reachable */}
            <div className="sticky top-0 z-20 -mx-8 -mt-8 mb-6 flex flex-col gap-3 border-b border-gray-200 bg-gray-100/95 px-8 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Brochure</h1>
                    <p className="text-sm text-gray-500">
                        {dirty ? <span className="font-medium text-amber-700">You have unsaved changes.</span> : 'Edit a page on the left and see it update on the right.'}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <a href="/portfolio" target="_blank" rel="noreferrer" className="btn btn-outline btn-md">
                        View live <ExternalLink className="h-4 w-4" />
                    </a>
                    {dirty && (
                        <button type="button" onClick={() => { setPortfolio(saved); setMessage(null); }} className="btn btn-outline btn-md">Discard</button>
                    )}
                    <button type="button" onClick={handleSave} disabled={saving || !dirty} className="btn btn-primary btn-md disabled:opacity-50">
                        {saving ? 'Saving...' : 'Save changes'}
                    </button>
                </div>
            </div>

            {message && (
                <div role="status" className={`mb-6 rounded-xl border px-5 py-4 ${message.ok ? 'border-primary-100 bg-primary-50 text-primary-800' : 'border-red-100 bg-red-50 text-red-800'}`}>{message.text}</div>
            )}

            {/* Page picker */}
            <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
                {PAGES.map((item, index) => (
                    <button
                        key={item.name}
                        type="button"
                        onClick={() => setPage(index)}
                        aria-current={index === page}
                        className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${index === page ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'}`}
                    >
                        <span className={index === page ? 'text-gray-400' : 'text-gray-400'}>{index === 0 ? '' : `${String(index).padStart(2, '0')} `}</span>
                        {item.name}
                    </button>
                ))}
            </div>

            <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,440px)]">
                {/* Fields for the selected page */}
                <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center justify-between gap-3">
                        <h2 className="text-lg font-semibold text-gray-900">{current.name}</h2>
                        {current.fields.length > 0 && (
                            <button type="button" onClick={resetPage} disabled={pageIsOriginal} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 disabled:opacity-40 disabled:hover:text-gray-500">
                                <RotateCcw className="h-4 w-4" /> Restore original text
                            </button>
                        )}
                    </div>
                    <div className="space-y-6">{fields[page]}</div>
                    {current.note && <p className={`text-sm text-gray-500 ${current.fields.length ? 'mt-6' : ''}`}>{current.note}</p>}

                    <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-4">
                        <button type="button" onClick={() => setPage(page - 1)} disabled={page === 0} className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-30">
                            <ChevronLeft className="h-4 w-4" /> Previous page
                        </button>
                        <button type="button" onClick={() => setPage(page + 1)} disabled={page === PAGES.length - 1} className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-30">
                            Next page <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </section>

                {/* Live preview */}
                <aside className="xl:sticky xl:top-28">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Preview</p>
                    <PortfolioDocument content={portfolio} only={page} />
                    <p className="mt-3 text-xs text-gray-500">Text that runs past its box here will do the same on the public page, so keep an eye on length.</p>
                </aside>
            </div>

            {/* Settings that are not part of a brochure page */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="mb-1 text-lg font-semibold text-gray-900">Around the brochure</h2>
                    <p className="mb-5 text-sm text-gray-500">Text used on the website next to the brochure.</p>
                    <div className="space-y-5">
                        <TextField label="Download button text" value={p.downloadLabel} onChange={(v) => set('downloadLabel', v)} />
                        <TextField label="Homepage teaser text" value={p.intro} onChange={(v) => set('intro', v)} multiline />
                    </div>
                </section>

                <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="mb-1 text-lg font-semibold text-gray-900">Download file</h2>
                    <p className="mb-5 text-sm text-gray-500">
                        The Download button serves a separate PDF file. It does not update when you edit the pages above, so after changing the brochure, open the live page, choose Print / save as PDF, and upload that file here.
                    </p>
                    <input
                        type="file"
                        accept="application/pdf,.pdf"
                        onChange={(event) => setPdfFile(event.target.files?.[0] ?? null)}
                        className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-primary-50 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100"
                    />
                    <button type="button" onClick={handlePdfUpload} disabled={uploadingPdf || !pdfFile} className="btn btn-primary btn-md mt-4 disabled:opacity-50">
                        {uploadingPdf ? `Uploading ${pdfUploadProgress}%` : 'Replace PDF'}
                    </button>
                    {uploadingPdf && (
                        <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-100">
                            <div className="h-full rounded-full bg-primary-600 transition-all" style={{ width: `${pdfUploadProgress}%` }} />
                        </div>
                    )}
                    {pdfMessage && <div role="status" className="mt-5 rounded-xl border border-primary-100 bg-primary-50 px-5 py-4 text-primary-800">{pdfMessage}</div>}
                </section>
            </div>
        </AdminLayout>
    );
}
