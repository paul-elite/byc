import Image from 'next/image';
import Link from 'next/link';

interface ArticleCardProps {
    title: string;
    excerpt: string;
    category: string;
    date: string;
    image: string;
    slug: string;
}

export default function ArticleCard({ title, excerpt, category, date, image, slug }: ArticleCardProps) {
    return (
        <Link href={`/insights/${slug}`} className="group">
            <article className="glass rounded-3xl overflow-hidden shadow-premium h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="relative h-48 overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {category}
                        </span>
                    </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <span className="text-xs text-gray-500 mb-2 uppercase tracking-widest">{date}</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-snug group-hover:text-primary-600 transition-colors">
                        {title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
                        {excerpt}
                    </p>
                    <div className="flex items-center text-primary-600 font-bold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                        Read More
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </article>
        </Link>
    );
}
