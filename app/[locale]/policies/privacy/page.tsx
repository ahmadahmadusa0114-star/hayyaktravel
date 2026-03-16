import React from 'react';
import { Locale, getTranslation } from '@/lib/i18n';

export default async function PrivacyPolicyPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params as { locale: Locale };
    const t = getTranslation(locale);
    const isRTL = locale === 'ar';

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-8 md:p-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 border-b pb-4">
                        {isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}
                    </h1>

                    <div className="prose prose-blue dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">
                        <section>
                            <h2 className="text-xl font-bold dark:text-white">
                                {isRTL ? '١. جمع المعلومات' : '1. Information Collection'}
                            </h2>
                            <p>
                                {isRTL
                                    ? 'نقوم بجمع المعلومات التي تقدمها لنا مباشرة، مثل عند ملء نموذج حجز أو التواصل معنا. قد تشمل هذه المعلومات اسمك، بريدك الإلكتروني، رقم هاتفك، وتفاصيل السفر.'
                                    : 'We collect information that you provide directly to us, such as when you fill out a booking form or contact us. This may include your name, email address, phone number, and travel details.'}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold dark:text-white">
                                {isRTL ? '٢. استخدام المعلومات' : '2. Use of Information'}
                            </h2>
                            <p>
                                {isRTL
                                    ? 'نستخدم المعلومات لتقديم خدماتنا، وتجهيز حجوزاتك، والتواصل معك بشأن طلباتك، وإرسال النشرات البريدية إذا كنت قد اشتركت فيها.'
                                    : 'We use the information to provide our services, process your bookings, communicate with you regarding your requests, and send newsletters if you have subscribed to them.'}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold dark:text-white">
                                {isRTL ? '٣. حماية البيانات' : '3. Data Protection'}
                            </h2>
                            <p>
                                {isRTL
                                    ? 'نحن نطبق مجموعة من الإجراءات الأمنية للحفاظ على سلامة معلوماتك الشخصية. لا نقوم ببيع أو تأجير معلوماتك الشخصية لأطراف ثالثة.'
                                    : 'We implement a range of security measures to maintain the safety of your personal information. We do not sell or rent your personal information to third parties.'}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold dark:text-white">
                                {isRTL ? '٤. ملفات تعريف الارتباط (Cookies)' : '4. Cookies'}
                            </h2>
                            <p>
                                {isRTL
                                    ? 'قد نستخدم ملفات تعريف الارتباط لتحسين تجربة المستخدم على موقعنا وتذكر تفضيلاتك.'
                                    : 'We may use cookies to enhance the user experience on our site and remember your preferences.'}
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
