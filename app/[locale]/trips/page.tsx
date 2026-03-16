import React from 'react';
import { Locale, getTranslation } from '@/lib/i18n';
import { prisma } from '@/lib/prisma';
import { TripCard } from '@/components/trips/TripCard';
import { TripCardSkeleton } from '@/components/ui/LoadingSkeleton';

export default async function TripsPage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { locale } = await params as { locale: Locale };
    const t = getTranslation(locale);
    const search = await searchParams;

    // Get filter parameters
    const category = search.category as string | undefined;
    const destination = search.destination as string | undefined;

    // Fetch trips from database
    let trips;
    try {
        trips = await prisma.trip.findMany({
            where: {
                published: true,
                ...(category && category !== 'all' ? { category } : {}),
                ...(destination ? { destinationId: destination } : {}),
            },
            include: {
                destination: true,
            },
            orderBy: {
                popularity: 'desc',
            },
            take: 12,
        });
    } catch (error) {
        console.error('Error fetching trips:', error);
        trips = [];
    }

    // Get all destinations for filter
    let destinations;
    try {
        destinations = await prisma.destination.findMany({
            where: { published: true },
            select: {
                id: true,
                name_ar: true,
                name_en: true,
            },
        });
    } catch (error) {
        console.error('Error fetching destinations:', error);
        destinations = [];
    }

    const categories = [
        { value: 'all', label: t.trips.categories.all },
        { value: 'Umrah', label: t.trips.categories.umrah },
        { value: 'Family', label: t.trips.categories.family },
        { value: 'Honeymoon', label: t.trips.categories.honeymoon },
        { value: 'Adventure', label: t.trips.categories.adventure },
        { value: 'Business', label: t.trips.categories.business },
        { value: 'Weekend', label: t.trips.categories.weekend },
        { value: 'Cruise', label: t.trips.categories.cruise },
        { value: 'Luxury', label: t.trips.categories.luxury },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.trips.title}</h1>
                        <p className="text-xl text-blue-100">{t.trips.subtitle}</p>
                    </div>
                </div>
            </section>

            {/* Filters & Trips */}
            <section className="py-12 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Filters */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            {t.trips.filters.title}
                        </h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Category Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {t.trips.filters.category}
                                </label>
                                <select
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    defaultValue={category || 'all'}
                                    onChange={(e) => {
                                        const url = new URL(window.location.href);
                                        if (e.target.value === 'all') {
                                            url.searchParams.delete('category');
                                        } else {
                                            url.searchParams.set('category', e.target.value);
                                        }
                                        window.location.href = url.toString();
                                    }}
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Destination Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {t.trips.filters.destination}
                                </label>
                                <select
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    defaultValue={destination || ''}
                                    onChange={(e) => {
                                        const url = new URL(window.location.href);
                                        if (!e.target.value) {
                                            url.searchParams.delete('destination');
                                        } else {
                                            url.searchParams.set('destination', e.target.value);
                                        }
                                        window.location.href = url.toString();
                                    }}
                                >
                                    <option value="">{t.trips.categories.all}</option>
                                    {destinations.map((dest: any) => (
                                        <option key={dest.id} value={dest.id}>
                                            {locale === 'ar' ? dest.name_ar : dest.name_en}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="mb-6">
                        <p className="text-gray-600 dark:text-gray-400">
                            {locale === 'ar'
                                ? `عرض ${trips.length} رحلة`
                                : `Showing ${trips.length} trips`}
                        </p>
                    </div>

                    {/* Trips Grid */}
                    {trips.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {trips.map((trip: any) => (
                                <TripCard key={trip.id} trip={trip} locale={locale} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {t.common.noResults}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {locale === 'ar'
                                    ? 'جرب تغيير الفلاتر للعثور على رحلات'
                                    : 'Try changing the filters to find trips'}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
