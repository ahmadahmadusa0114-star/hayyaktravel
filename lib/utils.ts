import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency: string = 'JOD', locale: string = 'en'): string {
    if (locale === 'ar') {
        return `${price.toLocaleString('ar-JO')} ${currency}`;
    }
    return `${currency} ${price.toLocaleString('en-US')}`;
}

export function formatDate(date: string | Date, locale: string = 'en'): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    if (locale === 'ar') {
        return d.toLocaleDateString('ar-JO', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}

export function truncate(text: string, length: number): string {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
}

export function getDurationText(days: number, locale: string = 'ar'): string {
    const nights = days - 1;
    if (locale === 'ar') {
        return `${days} أيام / ${nights} ليالي`;
    }
    return `${days} Days / ${nights} Nights`;
}
