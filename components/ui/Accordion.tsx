'use client';

import { useId, useState, type ReactNode } from 'react';
import { Plus } from 'lucide-react';

export type AccordionItem = { question: string; answer: ReactNode };

export default function Accordion({ items, defaultOpen = 0 }: { items: AccordionItem[]; defaultOpen?: number | null }) {
    const [open, setOpen] = useState<number | null>(defaultOpen);
    const baseId = useId();

    return (
        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {items.map((item, i) => {
                const isOpen = open === i;
                const panelId = `${baseId}-panel-${i}`;
                const buttonId = `${baseId}-button-${i}`;
                return (
                    <div key={item.question}>
                        <h3>
                            <button
                                id={buttonId}
                                type="button"
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                onClick={() => setOpen(isOpen ? null : i)}
                                className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                            >
                                <span className={`text-base font-medium transition-colors md:text-[17px] ${isOpen ? 'text-primary-700' : 'text-neutral-900 group-hover:text-primary-700'}`}>
                                    {item.question}
                                </span>
                                <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-[rotate,background-color,border-color,color] duration-200 ease-out ${isOpen ? 'rotate-45 border-lime-500 bg-lime-500 text-primary-950' : 'border-neutral-300 text-neutral-500 group-hover:border-primary-600 group-hover:text-primary-700'}`}>
                                    <Plus className="h-3.5 w-3.5" />
                                </span>
                            </button>
                        </h3>
                        <div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            className={`grid transition-[grid-template-rows] duration-[250ms] ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                        >
                            <div className={`overflow-hidden transition-opacity ease-out ${isOpen ? 'opacity-100 duration-[250ms]' : 'opacity-0 duration-150'}`}>
                                <div className="max-w-3xl pb-6 pr-10 text-[15px] leading-relaxed text-neutral-600">{item.answer}</div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
