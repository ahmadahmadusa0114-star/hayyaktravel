import React from 'react';
import { Locale, getTranslation } from '@/lib/i18n';
import { HeroSection } from '@/components/home/HeroSection';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUs';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const t = getTranslation(locale);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <HeroSection locale={locale} />

            {/* Stats Section */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: '15+', label: t.about.experience },
                            { number: '10,000+', label: t.about.customers },
                            { number: '50+', label: t.about.destinations },
                            { number: '25+', label: t.about.awards },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Trips Section - Placeholder */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {t.trips.featured}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            {t.trips.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="h-56 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {locale === 'ar' ? 'رحلة مميزة' : 'Featured Trip'} {i}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {locale === 'ar'
                                            ? 'اكتشف تجربة سفر استثنائية مع باقة شاملة لجميع الخدمات'
                                            : 'Discover an exceptional travel experience with a comprehensive package'}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold text-blue-600">
                                            {locale === 'ar' ? '٥٠٠ دينار' : 'JOD 500'}
                                        </span>
                                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                            {t.common.bookNow}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <WhyChooseUsSection locale={locale} />

            {/* Popular Destinations - Placeholder */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {t.destinations.popular}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            {t.destinations.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="group relative h-80 rounded-xl overflow-hidden cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 group-hover:scale-110 transition-transform duration-500"></div>
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {locale === 'ar' ? 'وجهة' : 'Destination'} {i}
                                    </h3>
                                    <p className="text-white/90 text-sm">
                                        {locale === 'ar' ? '١٢ رحلة متاحة' : '12 trips available'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <NewsletterSection locale={locale} />
        </div>
    );
}
