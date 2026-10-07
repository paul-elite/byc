export default function CaseStudies() {
    const approach = [
        ['Care', 'Understand the client, constraints, records, and regulatory exposure before recommending action.'],
        ['Attention', 'Review the details that affect tax, audit, governance, and management reporting outcomes.'],
        ['Response', 'Move quickly with clear deliverables, filings, reports, and implementation support.'],
        ['Excellence', 'Leave behind stronger evidence, better routines, and a more confident finance function.'],
    ];

    const sectors = ['Manufacturing', 'Technology', 'Finance', 'Agriculture', 'Public sector', 'Health care', 'Real estate', 'NGOs'];

    return (
        <section className="bg-[#edf3e8] py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-12">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary-700">CARE philosophy</p>
                        <h2 className="mt-5 text-4xl md:text-6xl text-primary-950">
                            A working method for high-stakes finance decisions.
                        </h2>
                        <p className="mt-6 text-[#4b5b50]">
                            BYC’s approach is intentionally structured so engagements do not end as loose advice. They end as decisions, filings, reports, controls, and routines.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {approach.map(([title, description], index) => (
                            <div key={title} className="rounded-[1.5rem] bg-[#fffaf0] p-6 shadow-sm border border-primary-100">
                                <p className="text-sm font-bold text-accent-600">0{index + 1}</p>
                                <h3 className="mt-5 text-2xl text-primary-950">{title}</h3>
                                <p className="mt-3 text-sm text-[#5c675f]">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-14 rounded-[2rem] bg-primary-950 p-7 md:p-10 text-[#fffaf0]">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#dcc781]">Sectors served</p>
                            <h3 className="mt-3 text-3xl text-[#fffaf0]">Built for Nigerian operating realities.</h3>
                        </div>
                        <div className="flex flex-wrap gap-3 lg:max-w-3xl">
                            {sectors.map((sector) => (
                                <span key={sector} className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-semibold text-[#e7efe4]">
                                    {sector}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
