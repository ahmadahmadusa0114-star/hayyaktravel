import React from 'react';
import Link from 'next/link';
import { Locale, getTranslation } from '@/lib/i18n';
import { Card } from '@/components/ui/Card';

interface DestinationCardProps {
    destination: {
        id: string;
        slug: string;
        name_ar: string;
        name_en: string;
        country: string;
        city: string | null;
        images: string;
        _count?: {
            trips: number;
        };
    };
    locale: Locale;
}

export function DestinationCard({ destination, locale }: DestinationCardProps) {
    const t = getTranslation(locale);
    const isRTL = locale === 'ar';

    const name = isRTL ? destination.name_ar : destination.name_en;

    // Parse images
    let imageUrl = '/placeholder-destination.jpg';
    try {
        const images = JSON.parse(destination.images);
        if (images && images.length > 0) {
            imageUrl = images[0];
        }
    } catch (e) {
        // Use default image
    }

    return (
        <Link href={`/${locale}/destinations/${destination.slug}`}>
            <Card hover padding="none" className="overflow-hidden group h-80 relative">
                {/* Background Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-700 transition-transform duration-500 group-hover:scale-110">
                    {/* In a real app, use <Image /> here */}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-2 mb-1 opacity-90">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm font-medium">{destination.country}</span>
                    </div>

                    <h3 className="text-2xl font-bold mb-2">{name}</h3>

                    {destination._count && (
                        <p className="text-sm text-white/80">
                            {isRTL
                                ? `${destination._count.trips} رحلة متاحة`
                                : `${destination._count.trips} trips available`}
                        </p>
                    )}
                </div>

                {/* Hover Arrow */}
                <div className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                        <svg className={`w-6 h-6 text-white ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>
            </Card>
        </Link>
    );
}
