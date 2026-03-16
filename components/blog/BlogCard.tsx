import React from 'react';
import Link from 'next/link';
import { Locale, getTranslation } from '@/lib/i18n';
import { Card } from '@/components/ui/Card';
import { formatDate, truncate } from '@/lib/utils';

interface BlogCardProps {
    post: {
        id: string;
        slug: string;
        title_ar: string;
        title_en: string;
        excerpt_ar: string | null;
        excerpt_en: string | null;
        coverImage: string | null;
        category: string;
        createdAt: Date;
    };
    locale: Locale;
}

export function BlogCard({ post, locale }: BlogCardProps) {
    const t = getTranslation(locale);
    const isRTL = locale === 'ar';

    const title = isRTL ? post.title_ar : post.title_en;
    const excerpt = isRTL ? (post.excerpt_ar || '') : (post.excerpt_en || '');

    return (
        <Link href={`/${locale}/blog/${post.slug}`}>
            <Card hover padding="none" className="overflow-hidden flex flex-col h-full bg-white dark:bg-gray-800 border-none shadow-sm hover:shadow-lg transition-all">
                {/* Cover Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-indigo-500">
                    {/* Post Category Badge */}
                    <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-bold text-blue-600 shadow-sm uppercase tracking-wider">
                            {post.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3 text-sm text-gray-500 dark:text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{formatDate(post.createdAt, locale)}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2">
                        {title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                        {truncate(excerpt, 120)}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                        <span>{t.blog.readMore}</span>
                        <svg className={`w-4 h-4 ${isRTL ? 'mr-1 rotate-180' : 'ml-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>
            </Card>
        </Link>
    );
}
