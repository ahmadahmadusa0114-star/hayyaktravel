'use client';

import React, { useState } from 'react';
import { Locale, getTranslation } from '@/lib/i18n';
import { Button } from '../ui/Button';

interface NewsletterSectionProps {
    locale: Locale;
}

export function NewsletterSection({ locale }: NewsletterSectionProps) {
    const t = getTranslation(locale);
    const isRTL = locale === 'ar';
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setMessage(t.newsletter.successMessage);
                setEmail('');
            } else {
                setMessage(t.common.error);
            }
        } catch (error) {
            setMessage(t.common.error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {t.newsletter.title}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg text-blue-100 mb-8">
                        {t.newsletter.subtitle}
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t.newsletter.placeholder}
                                required
                                className={`flex-1 px-6 py-4 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white text-gray-900 ${isRTL ? 'text-right' : 'text-left'
                                    }`}
                            />
                            <Button
                                type="submit"
                                size="lg"
                                isLoading={isLoading}
                                className="bg-white text-blue-600 hover:bg-gray-100 sm:w-auto"
                            >
                                {t.newsletter.subscribe}
                            </Button>
                        </div>
                        {message && (
                            <p className={`mt-4 text-sm ${message === t.newsletter.successMessage ? 'text-green-200' : 'text-red-200'}`}>
                                {message}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
