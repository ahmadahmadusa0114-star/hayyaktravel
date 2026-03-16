import React from 'react';
import { Locale, getTranslation } from '@/lib/i18n';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default async function ServicesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params as { locale: Locale };
    const t = getTranslation(locale);

    const services = [
        {
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
            ),
            title: t.services.flightBooking.title,
            description: t.services.flightBooking.description,
            color: 'from-blue-500 to-blue-600',
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            title: t.services.hotelReservation.title,
            description: t.services.hotelReservation.description,
            color: 'from-emerald-500 to-emerald-600',
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            title: t.services.visaAssistance.title,
            description: t.services.visaAssistance.description,
            color: 'from-purple-500 to-purple-600',
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: t.services.tourPackages.title,
            description: t.services.tourPackages.description,
            color: 'from-orange-500 to-orange-600',
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
            ),
            title: t.services.transportation.title,
            description: t.services.transportation.description,
            color: 'from-cyan-500 to-cyan-600',
        },
        {
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: t.services.insurance.title,
            description: t.services.insurance.description,
            color: 'from-pink-500 to-pink-600',
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.services.title}</h1>
                        <p className="text-xl text-blue-100">{t.services.subtitle}</p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            {locale === 'ar' ? 'هل أنت مستعد لبدء رحلتك؟' : 'Ready to Start Your Journey?'}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                            {locale === 'ar'
                                ? 'اتصل بنا اليوم لمناقشة احتياجاتك السياحية والحصول على عرض مخصص'
                                : 'Contact us today to discuss your travel needs and get a customized quote'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={`/${locale}/contact`}>
                                <Button size="lg" className="w-full sm:w-auto min-w-[200px]">
                                    {t.common.contactUs}
                                </Button>
                            </Link>
                            <Link href={`/${locale}/trips`}>
                                <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px]">
                                    {t.trips.title}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
