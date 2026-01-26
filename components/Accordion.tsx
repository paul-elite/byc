'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionItem {
    title: string;
    content: string;
}

interface AccordionProps {
    items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="space-y-4">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden glass transition-all"
                >
                    <button
                        onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    >
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            {item.title}
                        </span>
                        <svg
                            className={`w-6 h-6 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''
                                }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <AnimatePresence>
                        {activeIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <div className="p-6 pt-0 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-900">
                                    {item.content}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
