'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';

const offices = [
    { id: 'abuja', city: 'Abuja', address: 'Suite B5, Melita Plaza, Gimbiya Street, Area 11, Garki, Abuja', query: 'Melita Plaza, Gimbiya Street, Area 11, Garki, Abuja' },
    { id: 'ilorin', city: 'Ilorin', address: 'No 2, Babatunde Yunus Street, Irewolede, Ilorin, Kwara State', query: 'Irewolede, Ilorin, Kwara State' },
];

export default function OfficeMap() {
    const [active, setActive] = useState(offices[0].id);
    const office = offices.find((o) => o.id === active)!;

    return (
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
            <div className="flex border-b border-neutral-200" role="tablist" aria-label="Office">
                {offices.map((o) => (
                    <button
                        key={o.id}
                        role="tab"
                        aria-selected={active === o.id}
                        onClick={() => setActive(o.id)}
                        className={`flex-1 border-b-2 px-4 py-3 text-[15px] transition-colors ${active === o.id ? 'border-primary-600 font-medium text-primary-700' : 'border-transparent text-neutral-500 hover:text-neutral-900'}`}
                    >
                        {o.city} office
                    </button>
                ))}
            </div>
            <div className="relative aspect-[16/10] bg-neutral-100">
                <iframe
                    key={office.id}
                    title={`Map of the ${office.city} office`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(office.query)}&output=embed`}
                    className="absolute inset-0 h-full w-full grayscale-[0.4]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
            <div className="flex items-start justify-between gap-4 p-5">
                <p className="flex gap-3 text-[15px] text-neutral-700">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-700" />
                    {office.address}
                </p>
                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.query)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-sm font-medium text-primary-700 hover:text-primary-800"
                >
                    Directions →
                </a>
            </div>
        </div>
    );
}
