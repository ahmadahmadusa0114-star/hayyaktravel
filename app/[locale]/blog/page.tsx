import React from 'react';
import { Locale, getTranslation } from '@/lib/i18n';
import { prisma } from '@/lib/prisma';
import { BlogCard } from '@/components/blog/BlogCard';

export default async function BlogPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const t = getTranslation(locale);
    const isRTL = locale === 'ar';

    // Fetch blog posts from database
    let posts;
    try {
        posts = await prisma.blogPost.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' },
            take: 12,
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        posts = [];
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-blue-700 to-indigo-800 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.blog.title}</h1>
                        <p className="text-xl text-blue-100">{t.blog.subtitle}</p>
                    </div>
                </div>
            </section>

            {/* Blog Feed */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <BlogCard key={post.id} post={post} locale={locale} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {isRTL ? 'لا توجد مقالات منشورة حالياً' : 'No articles published yet.'}
                            </h3>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
