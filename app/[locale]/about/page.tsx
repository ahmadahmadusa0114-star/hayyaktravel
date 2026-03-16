import React from 'react';
import { Locale, getTranslation } from '@/lib/i18n';

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const t = getTranslation(locale);
    const isRTL = locale === 'ar';

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.about.title}</h1>
                        <p className="text-xl text-blue-100">{t.about.subtitle}</p>
                    </div>
                </div>
            </section>

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

            {/* Our Story */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                            {t.about.ourStory}
                        </h2>
                        <div className="prose prose-lg dark:prose-invert mx-auto">
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                {isRTL
                                    ? 'تأسست حياك للسياحة والسفر في عام 2010 برؤية واضحة: جعل السفر تجربة استثنائية ومتاحة للجميع. على مدار أكثر من 15 عاماً، نجحنا في خدمة آلاف العملاء وتنظيم رحلات لا تُنسى إلى أكثر من 50 وجهة حول العالم.'
                                    : 'HAYYAK Travel & Tourism was founded in 2010 with a clear vision: to make travel an exceptional and accessible experience for everyone. Over more than 15 years, we have successfully served thousands of customers and organized unforgettable trips to over 50 destinations worldwide.'}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {isRTL
                                    ? 'نحن نفخر بفريقنا المحترف من خبراء السفر والمرشدين السياحيين الذين يعملون بشغف لضمان حصولكم على أفضل تجربة سفر ممكنة. من التخطيط الدقيق إلى التنفيذ الاحترافي، نحن معكم في كل خطوة من رحلتكم.'
                                    : 'We pride ourselves on our professional team of travel experts and tour guides who work passionately to ensure you have the best possible travel experience. From meticulous planning to professional execution, we are with you every step of your journey.'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8">
                            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                {t.about.ourMission}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {isRTL
                                    ? 'مهمتنا هي تقديم خدمات سياحية متميزة تجمع بين الجودة العالية والأسعار التنافسية، مع التركيز على راحة وسلامة عملائنا في كل رحلة.'
                                    : 'Our mission is to provide exceptional travel services that combine high quality with competitive prices, focusing on the comfort and safety of our customers on every trip.'}
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-2xl p-8">
                            <div className="w-16 h-16 bg-emerald-600 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                {t.about.ourVision}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {isRTL
                                    ? 'رؤيتنا هي أن نكون الخيار الأول للمسافرين في المنطقة، معروفين بالتميز والابتكار في تقديم تجارب سفر فريدة ومخصصة.'
                                    : 'Our vision is to be the first choice for travelers in the region, known for excellence and innovation in providing unique and personalized travel experiences.'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
