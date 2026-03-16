import React from 'react';
import Link from 'next/link';
import { Locale, getTranslation } from '@/lib/i18n';
import { formatPrice, getDurationText } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface TripCardProps {
    trip: {
        id: string;
        slug: string;
        title_ar: string;
        title_en: string;
        category: string;
        priceFrom: number;
        currency: string;
        durationDays: number;
        images: string;
        destination?: {
            name_ar: string;
            name_en: string;
        };
        includesFlight: boolean;
        includesHotel: boolean;
    };
    locale: Locale;
}

export function TripCard({ trip, locale }: TripCardProps) {
    const t = getTranslation(locale);
    const isRTL = locale === 'ar';

    const title = locale === 'ar' ? trip.title_ar : trip.title_en;
    const destinationName = trip.destination
        ? (locale === 'ar' ? trip.destination.name_ar : trip.destination.name_en)
        : '';

    // Parse images
    let imageUrl = '/placeholder-trip.jpg';
    try {
        const images = JSON.parse(trip.images);
        if (images && images.length > 0) {
            imageUrl = images[0];
        }
    } catch (e) {
        // Use default image
    }

    return (
        <Card hover padding="none" className="overflow-hidden">
            {/* Image */}
            <div className="relative h-56 bg-gradient-to-br from-blue-400 to-blue-600">
                {/* Placeholder for now - will be replaced with actual images */}
                <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                    {title.substring(0, 1)}
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900">
                        {t.trips.categories[trip.category.toLowerCase() as keyof typeof t.trips.categories] || trip.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Destination */}
                {destinationName && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{destinationName}</span>
                    </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {title}
                </h3>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {getDurationText(trip.durationDays, locale)}
                    </span>

                    {trip.includesFlight && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            {t.trips.filters.includesFlight}
                        </span>
                    )}

                    {trip.includesHotel && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            {t.trips.filters.includesHotel}
                        </span>
                    )}
                </div>

                {/* Price & CTA */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {t.common.from}
                        </div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {formatPrice(trip.priceFrom, trip.currency, locale)}
                        </div>
                    </div>
                    <Link href={`/${locale}/trips/${trip.slug}`}>
                        <Button size="md">
                            {t.common.viewAll}
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
}
