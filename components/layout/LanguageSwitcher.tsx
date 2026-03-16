'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Locale } from '@/lib/i18n';

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
    const pathname = usePathname();
    const router = useRouter();

    const switchLocale = (newLocale: Locale) => {
        // Replace the locale in the pathname
        const segments = pathname.split('/');
        segments[1] = newLocale;
        const newPath = segments.join('/');
        router.push(newPath);
    };

    return (
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
                onClick={() => switchLocale('ar')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${currentLocale === 'ar'
                        ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
            >
                العربية
            </button>
            <button
                onClick={() => switchLocale('en')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${currentLocale === 'en'
                        ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
            >
                English
            </button>
        </div>
    );
}
