import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Locale, getTranslation } from '@/lib/i18n';
import { prisma } from '@/lib/prisma';
import { formatPrice, getDurationText } from '@/lib/utils';
import { BookingForm } from '@/components/forms/BookingForm';
import { Button } from '@/components/ui/Button';
import { getWhatsAppUrl, generateTripWhatsAppMessage } from '@/lib/whatsapp';

export default async function TripDetailsPage({
    params,
}: {
    params: Promise<{ locale: Locale; slug: string }>;
}) {
    const { locale, slug } = await params;
    const t = getTranslation(locale);
    const isRTL = locale === 'ar';

    // Fetch trip from database
    let trip;
    try {
        trip = await prisma.trip.findUnique({
            where: { slug },
            include: {
                destination: true,
            },
        });
    } catch (error) {
        console.error('Error fetching trip:', error);
        trip = null;
    }

    if (!trip || !trip.published) {
        notFound();
    }

    const title = locale === 'ar' ? trip.title_ar : trip.title_en;
    const overview = locale === 'ar' ? trip.overview_ar : trip.overview_en;
    const destinationName = trip.destination
        ? locale === 'ar' ? trip.destination.name_ar : trip.destination.name_en
        : '';

    // Parse JSON fields
    const highlights = JSON.parse(locale === 'ar' ? trip.highlights_ar : trip.highlights_en);
    const itinerary = JSON.parse(locale === 'ar' ? trip.itinerary_ar : trip.itinerary_en);
    const inclusions = JSON.parse(locale === 'ar' ? trip.inclusions_ar : trip.inclusions_en);
    const exclusions = JSON.parse(locale === 'ar' ? trip.exclusions_ar : trip.exclusions_en);
    const priceOptions = JSON.parse(trip.priceOptions);
    const images = JSON.parse(trip.images);

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+962790000000';
    const whatsappMessage = generateTripWhatsAppMessage(title, locale);
    const whatsappUrl = getWhatsAppUrl(whatsappNumber, whatsappMessage);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section with Image Gallery */}
            <section className="relative h-96 bg-gradient-to-br from-blue-500 to-blue-700">
                <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
                        <div className="flex items-center justify-center gap-4 text-lg">
                            <span className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {destinationName}
                            </span>
                            <span>•</span>
                            <span>{getDurationText(trip.durationDays, locale)}</span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Overview */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                {t.trips.details.overview}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                                {overview}
                            </p>
                        </div>

                        {/* Highlights */}
                        {highlights && highlights.length > 0 && (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    {t.trips.details.highlights}
                                </h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {highlights.map((highlight: string, index: number) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Itinerary */}
                        {itinerary && itinerary.length > 0 && (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    {t.trips.details.itinerary}
                                </h2>
                                <div className="space-y-6">
                                    {itinerary.map((day: { day: number; title: string; description: string }, index: number) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600 dark:text-blue-400 font-bold">
                                                    {day.day}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                    {day.title}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    {day.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Inclusions & Exclusions */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Inclusions */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                    {t.trips.details.inclusions}
                                </h3>
                                <ul className="space-y-2">
                                    {inclusions.map((item: string, index: number) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Exclusions */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                    {t.trips.details.exclusions}
                                </h3>
                                <ul className="space-y-2">
                                    {exclusions.map((item: string, index: number) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Price Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sticky top-24">
                            <div className="mb-6">
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    {t.common.from}
                                </div>
                                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                    {formatPrice(trip.priceFrom, trip.currency, locale)}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {t.common.perPerson}
                                </div>
                            </div>

                            {/* Price Options */}
                            {priceOptions && (
                                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                                        {t.trips.details.pricing}
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        {priceOptions.single && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">{t.trips.details.single}</span>
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    {formatPrice(priceOptions.single, trip.currency, locale)}
                                                </span>
                                            </div>
                                        )}
                                        {priceOptions.double && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">{t.trips.details.double}</span>
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    {formatPrice(priceOptions.double, trip.currency, locale)}
                                                </span>
                                            </div>
                                        )}
                                        {priceOptions.triple && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">{t.trips.details.triple}</span>
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    {formatPrice(priceOptions.triple, trip.currency, locale)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* CTA Buttons */}
                            <div className="space-y-3">
                                <a href="#booking-form">
                                    <Button className="w-full" size="lg">
                                        {t.common.bookNow}
                                    </Button>
                                </a>
                                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                    <Button variant="secondary" className="w-full bg-green-500 hover:bg-green-600 text-white" size="lg">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                        WhatsApp
                                    </Button>
                                </a>
                            </div>

                            {/* Features */}
                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                                {trip.includesFlight && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                        {t.trips.filters.includesFlight}
                                    </div>
                                )}
                                {trip.includesHotel && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        {t.trips.filters.includesHotel}
                                    </div>
                                )}
                                {trip.visaAssistance && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        {t.trips.filters.visaAssistance}
                                    </div>
                                )}
                                {trip.arabicGuide && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        {t.trips.filters.arabicGuide}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Form */}
                <div id="booking-form" className="mt-12 max-w-3xl mx-auto">
                    <BookingForm tripTitle={title} tripId={trip.id} />
                </div>
            </div>
        </div>
    );
}
