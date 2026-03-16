import React from 'react';
import Link from 'next/link';
import { Locale, getTranslation } from '@/lib/i18n';
import { Button } from '../ui/Button';

interface HeroSectionProps {
    locale: Locale;
}

export function HeroSection({ locale }: HeroSectionProps) {
    const t = getTranslation(locale);
    const isRTL = locale === 'ar';

    return (
        <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
            {/* Background with Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02ek0yNCA0NGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
                        {t.hero.title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-blue-100 mb-12 animate-fade-in-delay">
                        {t.hero.subtitle}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <Link href={`/${locale}/trips`}>
                            <Button size="lg" className="w-full sm:w-auto min-w-[200px] shadow-xl hover:shadow-2xl">
                                {t.hero.bookNow}
                            </Button>
                        </Link>
                        <Link href={`/${locale}/about`}>
                            <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                                {t.hero.learnMore}
                            </Button>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-2">
                            <form className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="text"
                                    placeholder={t.hero.searchPlaceholder}
                                    className={`flex-1 px-6 py-4 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${isRTL ? 'text-right' : 'text-left'
                                        }`}
                                />
                                <Button type="submit" size="lg" className="sm:w-auto">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    {t.hero.searchButton}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249 250 251)" className="dark:fill-gray-900" />
                </svg>
            </div>
        </section>
    );
}
