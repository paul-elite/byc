const approach = [
    ['Care', 'We start by understanding your business, your records and your regulatory exposure.'],
    ['Attention', 'We check the details that change tax, audit and reporting outcomes.'],
    ['Response', 'We work to agreed deadlines and keep you updated on progress.'],
    ['Excellence', 'You come away with clean records, filed returns and controls that hold up.'],
];

const badge = ['bg-primary-500 text-white', 'bg-leaf-500 text-white', 'bg-lime-500 text-primary-950', 'bg-primary-900 text-white'];

const sectors = ['Manufacturing', 'Technology', 'Financial services', 'Agriculture', 'Public sector', 'Health care', 'Real estate', 'Non-profits'];

export default function CaseStudies() {
    return (
        <section className="bg-canvas py-20 lg:py-28">
            <div className="container">
                <div className="max-w-2xl">
                    <p className="eyebrow">How we work</p>
                    <h2 className="mt-3 text-3xl text-neutral-900 md:text-4xl">Our CARE approach</h2>
                </div>

                <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
                    {approach.map(([title, description], index) => (
                        <li key={title} className="bg-white p-6 lg:p-7">
                            <span className={`flex h-10 w-10 items-center justify-center rounded-lg text-base font-semibold ${badge[index]}`}>
                                {title.charAt(0)}
                            </span>
                            <h3 className="mt-5 text-lg text-neutral-900">
                                <span className="sr-only">Step {index + 1}: </span>
                                {title}
                            </h3>
                            <p className="mt-2 text-[15px] text-neutral-600">{description}</p>
                        </li>
                    ))}
                </ol>

                <div className="mt-14 flex flex-col gap-4 lg:flex-row lg:items-baseline lg:gap-10">
                    <h3 className="shrink-0 text-base font-medium text-neutral-900">Sectors we serve</h3>
                    <ul className="flex flex-wrap gap-2">
                        {sectors.map((sector) => (
                            <li key={sector} className="rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-sm text-neutral-700 transition-colors hover:border-lime-500 hover:bg-lime-50">
                                {sector}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
