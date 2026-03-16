import React from 'react';
import { Locale, getTranslation } from '@/lib/i18n';

export default async function TermsAndConditionsPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const t = getTranslation(locale);
    const isRTL = locale === 'ar';

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-8 md:p-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 border-b pb-4">
                        {isRTL ? 'الشروط والأحكام' : 'Terms and Conditions'}
                    </h1>

                    <div className="prose prose-blue dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">
                        <section>
                            <h2 className="text-xl font-bold dark:text-white">
                                {isRTL ? '١. الموافقة على الشروط' : '1. Agreement to Terms'}
                            </h2>
                            <p>
                                {isRTL
                                    ? 'باستخدامك لموقعنا أو طلب خدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام بالكامل.'
                                    : 'By using our site or requesting our services, you agree to be bound by these terms and conditions in full.'}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold dark:text-white">
                                {isRTL ? '٢. الحجوزات والمدفوعات' : '2. Bookings and Payments'}
                            </h2>
                            <p>
                                {isRTL
                                    ? 'جميع الحجوزات تخضع للتوافر. قد تكون الأسعار عرضة للتغيير قبل التأكيد النهائي. يجب سداد المبالغ المطلوبة وفقاً للاتفاق المبرم عند الحجز.'
                                    : 'All bookings are subject to availability. Prices may be subject to change before final confirmation. Payments must be made according to the agreement reached upon booking.'}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold dark:text-white">
                                {isRTL ? '٣. الإلغاء والاسترداد' : '3. Cancellations and Refunds'}
                            </h2>
                            <p>
                                {isRTL
                                    ? 'تختلف سياسة الإلغاء من رحلة لأخرى. سيتم تزويدك بتفاصيل محددة عند الحجز. في حال الإلغاء، قد تفرض رسوم معينة بناءً على المدة المتبقية على موعد الرحلة.'
                                    : 'Cancellation policies vary from trip to trip. You will be provided with specific details at the time of booking. In the event of cancellation, certain fees may be imposed based on the remaining time until the trip date.'}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold dark:text-white">
                                {isRTL ? '٤. المسؤولية' : '4. Liability'}
                            </h2>
                            <p>
                                {isRTL
                                    ? 'حياك للسياحة والسفر غير مسؤولة عن التأخيرات أو التغييرات الناتجة عن القضاء والقدر أو الظروف الخارجة عن إرادتنا، مثل الظروف الجوية أو قرارات السلطات الرسمية.'
                                    : 'HAYYAK Travel & Tourism is not responsible for delays or changes resulting from acts of God or circumstances beyond our control, such as weather conditions or official authorities\' decisions.'}
                            </p>
                        </section>

                        <section className="pt-8 border-t dark:border-gray-700">
                            <p className="text-sm font-medium">
                                {isRTL ? 'آخر تحديث: ٢٨ يناير ٢٠٢٦' : 'Last Updated: January 28, 2026'}
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
