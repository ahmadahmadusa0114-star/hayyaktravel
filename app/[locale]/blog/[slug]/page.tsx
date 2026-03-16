import React from 'react';
import { notFound } from 'next/navigation';
import { Locale, getTranslation } from '@/lib/i18n';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default async function BlogPostDetailsPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params as { locale: Locale; slug: string };
    const t = getTranslation(locale);
    const isRTL = locale === 'ar';

    // Fetch blog post from database
    let post;
    try {
        post = await prisma.blogPost.findUnique({
            where: { slug },
        });
    } catch (error) {
        console.error('Error fetching blog post:', error);
        post = null;
    }

    if (!post || !post.published) {
        notFound();
    }

    const title = isRTL ? post.title_ar : post.title_en;
    const content = isRTL ? post.content_ar : post.content_en;

    return (
        <article className="min-h-screen bg-white dark:bg-gray-900">
            {/* Article Header */}
            <header className="relative pt-20 pb-16 bg-gray-50 dark:bg-gray-800/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <Link href={`/${locale}/blog`} className="flex items-center text-blue-600 dark:text-blue-400 font-bold mb-8 hover:underline">
                            <svg className={`w-5 h-5 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            {t.nav.blog}
                        </Link>

                        <div className="flex items-center gap-4 mb-6 text-gray-500 dark:text-gray-400">
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-bold uppercase">
                                {post.category}
                            </span>
                            <span>•</span>
                            <span>{formatDate(post.createdAt, locale)}</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
                            {title}
                        </h1>
                    </div>
                </div>
            </header>

            {/* Cover Image Placeholder */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="max-w-5xl mx-auto h-[400px] md:h-[500px] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-3xl shadow-xl">
                    {/* Real image would go here */}
                </div>
            </div>

            {/* Article Content */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="prose prose-lg md:prose-xl dark:prose-invert prose-blue max-w-none whitespace-pre-line leading-relaxed text-gray-700 dark:text-gray-300">
                            {content}
                        </div>

                        {/* Footer / Sharing */}
                        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex gap-4">
                                {/* Tags Placeholders */}
                                {post.tags && JSON.parse(post.tags).map((tag: string) => (
                                    <span key={tag} className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Posts Section Placeholder */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
                            {t.blog.relatedPosts}
                        </h2>
                        <div className="text-center text-gray-500 italic">
                            {isRTL ? 'مقالات مشابهة سيتم عرضها قريباً' : 'Similar articles will be displayed soon.'}
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
}
