'use client';

import { motion } from 'framer-motion';

interface DataPoint {
    label: string;
    value: number;
    suffix?: string;
}

interface ImpactChartProps {
    data: DataPoint[];
    title: string;
}

export default function ImpactChart({ data, title }: ImpactChartProps) {
    const maxValue = Math.max(...data.map(d => d.value));

    return (
        <div className="p-8 glass rounded-3xl shadow-premium">
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">{title}</h3>
            <div className="space-y-6">
                {data.map((item, index) => (
                    <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                            <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                            <span className="text-primary-600 dark:text-primary-400 font-bold">
                                {item.value}{item.suffix}
                            </span>
                        </div>
                        <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${(item.value / maxValue) * 100}%` }}
                                transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full shadow-lg"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600">500+</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Clients Served</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600">12k</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Operations Optimized</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600">98%</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Client Satisfaction</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600">$2B+</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Client Value Created</div>
                </div>
            </div>
        </div>
    );
}
