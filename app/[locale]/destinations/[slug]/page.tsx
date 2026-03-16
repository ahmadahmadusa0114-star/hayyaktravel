import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Locale, getTranslation } from '@/lib/i18n';
import { prisma } from '@/lib/prisma';
import { TripCard } from '@/components/trips/TripCard';

export default async function DestinationDetailsPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params as { locale: Locale; slug: string };
    const t = getTranslation(locale);
    const isRTL = locale === 'ar';

    // Fetch destination from database
    let destination;
    try {
        destination = await prisma.destination.findUnique({
            where: { slug },
            include: {
                trips: {
                    where: { published: true },
                    take: 6,
                    orderBy: { popularity: 'desc' },
                },
            },
        });
    } catch (error) {
        console.error('Error fetching destination:', error);
        destination = null;
    }

    if (!destination || !destination.published) {
        notFound();
    }

    const name = isRTL ? destination.name_ar : destination.name_en;
    const description = isRTL ? destination.description_ar : destination.description_en;
    const bestTime = isRTL ? destination.bestTime_ar : destination.bestTime_en;
    const visaNotes = isRTL ? destination.visaNotes_ar : destination.visaNotes_en;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section */}
            <section className="relative h-[500px] flex items-center justify-center text-white overflow-hidden">
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-blue-900">
                    {/* In a real app, use <Image /> here */}
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{name}</h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-2">{destination.country}</p>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Description */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                {isRTL ? `عن ${name}` : `About ${name}`}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line text-lg">
                                {description}
                            </p>
                        </section>

                        {/* Travel Information */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {bestTime && (
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                        {t.destinations.bestTime}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">{bestTime}</p>
                                </div>
                            )}

                            {visaNotes && (
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8">
                                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                        {t.destinations.visaNotes}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">{visaNotes}</p>
                                </div>
                            )}
                        </div>

                        {/* Related Trips */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                                {t.destinations.exploreTrips}
                            </h2>
                            {destination.trips.length > 0 ? (
                                <div className="grid md:grid-cols-2 gap-8">
                                    {destination.trips.map((trip: any) => (
                                        <TripCard key={trip.id} trip={{ ...trip, destination }} locale={locale} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600 dark:text-gray-400 italic">
                                    {isRTL ? 'لا توجد رحلات متاحة حالياً لهذه الوجهة' : 'No trips available for this destination at the moment.'}
                                </p>
                            )}
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Quick Contact Card */}
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-white sticky top-24">
                            <h3 className="text-2xl font-bold mb-4">{t.common.contactUs}</h3>
                            <p className="mb-8 text-blue-100">
                                {isRTL
                                    ? 'هل لديك أسئلة عن هذه الوجهة؟ فريقنا متاح دائماً للمساعدة.'
                                    : 'Have questions about this destination? Our team is always here to help.'}
                            </p>
                            <Link href={`/${locale}/contact`}>
                                <button className="w-full bg-white text-blue-600 font-bold py-4 rounded-xl hover:bg-gray-100 transition-colors">
                                    {t.contact.title}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
