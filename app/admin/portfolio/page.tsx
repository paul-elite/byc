'use client';

import { useEffect, useState } from 'react';
import { uploadPresigned } from '@vercel/blob/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { PortfolioContent, PortfolioItem, PortfolioStat, defaultPortfolioContent } from '@/lib/portfolioData';

function TextField({
    label,
    value,
    onChange,
    multiline = false,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    multiline?: boolean;
}) {
    return (
        <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-2">{label}</span>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                />
            ) : (
                <input
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                />
            )}
        </label>
    );
}

function ListEditor({
    title,
    items,
    onChange,
    multiline = false,
    hint,
}: {
    title: string;
    items: string[];
    onChange: (items: string[]) => void;
    /** Line breaks typed here are kept on the page. */
    multiline?: boolean;
    hint?: string;
}) {
    const fieldClass = 'flex-1 rounded-lg border border-gray-200 px-4 py-3 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200';
    const setItem = (index: number, value: string) => {
        const next = [...items];
        next[index] = value;
        onChange(next);
    };

    return (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                <button type="button" onClick={() => onChange([...items, ''])} className="text-sm text-primary-600 hover:text-primary-700">
                    Add item
                </button>
            </div>
            {hint && <p className="text-sm text-gray-500 -mt-2 mb-4">{hint}</p>}
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="flex gap-3">
                        {multiline ? (
                            <textarea value={item} rows={Math.max(2, item.split('\n').length)} onChange={(event) => setItem(index, event.target.value)} className={fieldClass} />
                        ) : (
                            <input value={item} onChange={(event) => setItem(index, event.target.value)} className={fieldClass} />
                        )}
                        <button type="button" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))} className="px-3 text-sm text-red-600 hover:text-red-700">
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

function PairEditor<T extends PortfolioItem | PortfolioStat>({
    title,
    items,
    firstLabel,
    secondLabel,
    firstKey,
    secondKey,
    onChange,
}: {
    title: string;
    items: T[];
    firstLabel: string;
    secondLabel: string;
    firstKey: keyof T;
    secondKey: keyof T;
    onChange: (items: T[]) => void;
}) {
    return (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                <button type="button" onClick={() => onChange([...items, { [firstKey]: '', [secondKey]: '' } as unknown as T])} className="text-sm text-primary-600 hover:text-primary-700">
                    Add row
                </button>
            </div>
            <div className="space-y-5">
                {items.map((item, index) => (
                    <div key={index} className="grid md:grid-cols-[0.8fr_1.2fr_auto] gap-3">
                        <label>
                            <span className="block text-xs font-medium text-gray-500 mb-1">{firstLabel}</span>
                            <input
                                value={String(item[firstKey] ?? '')}
                                onChange={(event) => {
                                    const next = [...items];
                                    next[index] = { ...next[index], [firstKey]: event.target.value };
                                    onChange(next);
                                }}
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                            />
                        </label>
                        <label>
                            <span className="block text-xs font-medium text-gray-500 mb-1">{secondLabel}</span>
                            <textarea
                                value={String(item[secondKey] ?? '')}
                                onChange={(event) => {
                                    const next = [...items];
                                    next[index] = { ...next[index], [secondKey]: event.target.value };
                                    onChange(next);
                                }}
                                rows={2}
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                            />
                        </label>
                        <button type="button" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))} className="self-end px-3 py-3 text-sm text-red-600 hover:text-red-700">
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default function AdminPortfolioPage() {
    const [portfolio, setPortfolio] = useState<PortfolioContent>(defaultPortfolioContent);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingPdf, setUploadingPdf] = useState(false);
    const [pdfUploadProgress, setPdfUploadProgress] = useState(0);
    const [message, setMessage] = useState('');
    const [pdfMessage, setPdfMessage] = useState('');

    useEffect(() => {
        async function loadPortfolio() {
            try {
                const response = await fetch('/api/portfolio');
                const data = await response.json();
                setPortfolio({ ...defaultPortfolioContent, ...data });
            } catch (error) {
                console.error('Error loading portfolio:', error);
                setMessage('Could not load saved content. Showing the default portfolio.');
            } finally {
                setLoading(false);
            }
        }

        loadPortfolio();
    }, []);

    const updateField = <K extends keyof PortfolioContent>(key: K, value: PortfolioContent[K]) => {
        setPortfolio((current) => ({ ...current, [key]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');

        try {
            const response = await fetch('/api/portfolio', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(portfolio),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Save failed');

            setPortfolio({ ...defaultPortfolioContent, ...data });
            setMessage('Portfolio updated. The public site now shows the latest content.');
        } catch (error) {
            console.error('Error saving portfolio:', error);
            setMessage('Could not save the portfolio. Please sign in again and try once more.');
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
            setPdfMessage('PDF updated. The public viewer and download now show the latest document.');
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
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
                    <p className="text-gray-500">Edit the public web portfolio and download prompt.</p>
                </div>
                <button onClick={handleSave} disabled={saving} className="btn btn-primary btn-md disabled:opacity-60">
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {message && <div className="mb-6 rounded-xl bg-primary-50 border border-primary-100 px-5 py-4 text-primary-800">{message}</div>}

            <div className="space-y-6">
                <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">Portfolio PDF</h2>
                            <p className="text-gray-500 max-w-2xl">
                                Replace the document shown on the public portfolio page. Visitors will see the new PDF immediately in the viewer and download button.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="file"
                                accept="application/pdf,.pdf"
                                onChange={(event) => setPdfFile(event.target.files?.[0] ?? null)}
                                className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-primary-50 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100"
                            />
                            <button onClick={handlePdfUpload} disabled={uploadingPdf || !pdfFile} className="btn btn-primary btn-md disabled:opacity-60">
                                {uploadingPdf ? `Uploading ${pdfUploadProgress}%` : 'Replace PDF'}
                            </button>
                        </div>
                    </div>
                    {uploadingPdf && (
                        <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-100">
                            <div className="h-full rounded-full bg-primary-600 transition-all" style={{ width: `${pdfUploadProgress}%` }} />
                        </div>
                    )}
                    {pdfMessage && <div className="mt-5 rounded-xl bg-primary-50 border border-primary-100 px-5 py-4 text-primary-800">{pdfMessage}</div>}
                </section>

                <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-5">Main Content</h2>
                    <div className="grid md:grid-cols-2 gap-5">
                        <TextField label="Portfolio title" value={portfolio.title} onChange={(value) => updateField('title', value)} />
                        <TextField label="Firm name" value={portfolio.subtitle} onChange={(value) => updateField('subtitle', value)} />
                        <TextField label="Download button text" value={portfolio.downloadLabel} onChange={(value) => updateField('downloadLabel', value)} />
                        <TextField label="Phone" value={portfolio.contactPhone} onChange={(value) => updateField('contactPhone', value)} />
                        <TextField label="Email" value={portfolio.contactEmail} onChange={(value) => updateField('contactEmail', value)} />
                        <TextField label="Website" value={portfolio.website} onChange={(value) => updateField('website', value)} />
                        <TextField label="Firm descriptor (after the firm name)" value={portfolio.firmDescriptor} onChange={(value) => updateField('firmDescriptor', value)} />
                        <TextField label="Managing partner name" value={portfolio.partnerName} onChange={(value) => updateField('partnerName', value)} />
                        <TextField label="Managing partner credentials" value={portfolio.partnerCredentials} onChange={(value) => updateField('partnerCredentials', value)} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-5 mt-5">
                        <TextField label="Intro" value={portfolio.intro} onChange={(value) => updateField('intro', value)} multiline />
                        <TextField label="Firm profile" value={portfolio.firmProfile} onChange={(value) => updateField('firmProfile', value)} multiline />
                        <TextField label="Vision" value={portfolio.vision} onChange={(value) => updateField('vision', value)} multiline />
                        <TextField label="Mission" value={portfolio.mission} onChange={(value) => updateField('mission', value)} multiline />
                        <TextField label="Client base" value={portfolio.clientBase} onChange={(value) => updateField('clientBase', value)} multiline />
                        <TextField label="Cover title" value={portfolio.coverTitle} onChange={(value) => updateField('coverTitle', value)} multiline />
                        <TextField label="Tagline under the logo" value={portfolio.tagline} onChange={(value) => updateField('tagline', value)} multiline />
                        <TextField label="Managing partner profile" value={portfolio.partnerBio} onChange={(value) => updateField('partnerBio', value)} multiline />
                        <TextField label="Our symbol: introduction" value={portfolio.symbolIntro} onChange={(value) => updateField('symbolIntro', value)} multiline />
                    </div>
                </section>

                <PairEditor title="Registration & Profile Rows" items={portfolio.stats} firstLabel="Label" secondLabel="Value" firstKey="label" secondKey="value" onChange={(items) => updateField('stats', items)} />
                <PairEditor title="Beliefs" items={portfolio.beliefs} firstLabel="Heading" secondLabel="Text" firstKey="title" secondKey="body" onChange={(items) => updateField('beliefs', items)} />
                <ListEditor title="Services" items={portfolio.services} onChange={(items) => updateField('services', items)} />
                <ListEditor title="Service Cards (Our Services page)" items={portfolio.serviceCards} onChange={(items) => updateField('serviceCards', items)} multiline hint="Eight cards. Press Enter where a line should break." />
                <ListEditor title="Accreditations" items={portfolio.accreditations} onChange={(items) => updateField('accreditations', items)} multiline hint="Nine boxes. Press Enter where a line should break; end with the abbreviation in brackets." />
                <ListEditor title="Accreditation Notes (green boxes)" items={portfolio.accreditationNotes} onChange={(items) => updateField('accreditationNotes', items)} multiline hint="Two boxes under the grid." />
                <ListEditor title="Our Symbol Words" items={portfolio.symbolWords} onChange={(items) => updateField('symbolWords', items)} hint="Three words, one per bar." />
                <ListEditor title="Values" items={portfolio.values} onChange={(items) => updateField('values', items)} />
                <PairEditor title="Strategy" items={portfolio.strategy} firstLabel="Heading" secondLabel="Text" firstKey="title" secondKey="body" onChange={(items) => updateField('strategy', items)} />
                <ListEditor title="Client Sectors" items={portfolio.sectors} onChange={(items) => updateField('sectors', items)} />
                <PairEditor title="Offices" items={portfolio.offices} firstLabel="Office" secondLabel="Address" firstKey="title" secondKey="body" onChange={(items) => updateField('offices', items)} />
            </div>
        </AdminLayout>
    );
}
