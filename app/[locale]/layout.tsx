import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { Locale, locales, isRTL } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const cairo = Cairo({
    subsets: ['arabic', 'latin'],
    weight: ['300', '400', '600', '700', '900'],
    variable: '--font-cairo',
    display: 'swap',
});

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: locale === 'ar' ? 'حياك للسياحة والسفر' : 'HAYYAK Travel & Tourism',
        description:
            locale === 'ar'
                ? 'اكتشف العالم معنا - رحلات استثنائية وتجارب لا تُنسى إلى جميع أنحاء العالم'
                : 'Discover the World with Us - Exceptional Journeys & Unforgettable Experiences Worldwide',
        keywords: locale === 'ar'
            ? 'سياحة, سفر, رحلات, عمرة, حج, سياحة عائلية, شهر عسل, الأردن'
            : 'travel, tourism, trips, umrah, hajj, family travel, honeymoon, Jordan',
    };
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const rtl = isRTL(locale);

    return (
        <html lang={locale} dir={rtl ? 'rtl' : 'ltr'} className={cairo.variable}>
            <body className="font-cairo antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <div className="flex flex-col min-h-screen">
                    <Header locale={locale} />
                    <main className="flex-grow">{children}</main>
                    <Footer locale={locale} />
                </div>
            </body>
        </html>
    );
}
