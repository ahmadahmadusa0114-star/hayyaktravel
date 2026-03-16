export function getWhatsAppUrl(number: string, message: string): string {
    const cleanNumber = number.replace(/[^0-9+]/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

export function generateTripWhatsAppMessage(
    tripName: string,
    locale: 'ar' | 'en',
    travelers?: number,
    dates?: string
): string {
    if (locale === 'ar') {
        let message = `مرحباً، أنا مهتم برحلة: ${tripName}`;
        if (travelers) message += `\nعدد المسافرين: ${travelers}`;
        if (dates) message += `\nالتواريخ المفضلة: ${dates}`;
        message += '\n\nأرجو تزويدي بمزيد من التفاصيل.';
        return message;
    } else {
        let message = `Hello, I'm interested in the trip: ${tripName}`;
        if (travelers) message += `\nNumber of travelers: ${travelers}`;
        if (dates) message += `\nPreferred dates: ${dates}`;
        message += '\n\nPlease provide me with more details.';
        return message;
    }
}

export function generateGeneralWhatsAppMessage(locale: 'ar' | 'en'): string {
    return locale === 'ar'
        ? 'مرحباً، أرغب في الاستفسار عن خدماتكم السياحية.'
        : 'Hello, I would like to inquire about your travel services.';
}
