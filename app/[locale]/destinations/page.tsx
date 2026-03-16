import React from 'react';
import { Locale, getTranslation } from '@/lib/i18n';
import { prisma } from '@/lib/prisma';
import { DestinationCard } from '@/components/destinations/DestinationCard';

export default async function DestinationsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params as { locale: Locale };
    const t = getTranslation(locale);
    const isRTL = locale === 'ar';

    // Fetch destinations from database
    let destinations;
    try {
        destinations = await prisma.destination.findMany({
            where: { published: true },
            include: {
                _count: {
                    select: { trips: true },
                },
            },
            orderBy: {
                name_en: 'asc',
            },
        });
    } catch (error) {
        console.error('Error fetching destinations:', error);
        destinations = [];
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-indigo-600 to-blue-700 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.destinations.title}</h1>
                        <p className="text-xl text-blue-100">{t.destinations.subtitle}</p>
                    </div>
                </div>
            </section>

            {/* Destinations Grid */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {destinations.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {destinations.map((destination) => (
                                <DestinationCard
                                    key={destination.id}
                                    destination={destination}
                                    locale={locale}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {t.common.noResults}
                            </h3>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
