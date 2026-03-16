export const locales = ['ar', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ar';

export const translations = {
    ar: {
        // Navigation
        nav: {
            home: 'الرئيسية',
            trips: 'الرحلات',
            destinations: 'الوجهات',
            services: 'الخدمات',
            about: 'من نحن',
            blog: 'المدونة',
            contact: 'اتصل بنا',
        },

        // Hero Section
        hero: {
            title: 'اكتشف العالم معنا',
            subtitle: 'رحلات استثنائية وتجارب لا تُنسى',
            searchPlaceholder: 'ابحث عن وجهتك المفضلة...',
            searchButton: 'بحث',
            bookNow: 'احجز الآن',
            learnMore: 'اعرف المزيد',
        },

        // Common
        common: {
            readMore: 'اقرأ المزيد',
            viewAll: 'عرض الكل',
            bookNow: 'احجز الآن',
            contactUs: 'اتصل بنا',
            loading: 'جاري التحميل...',
            noResults: 'لا توجد نتائج',
            error: 'حدث خطأ',
            success: 'تم بنجاح',
            submit: 'إرسال',
            cancel: 'إلغاء',
            save: 'حفظ',
            edit: 'تعديل',
            delete: 'حذف',
            search: 'بحث',
            filter: 'تصفية',
            sort: 'ترتيب',
            price: 'السعر',
            duration: 'المدة',
            from: 'من',
            to: 'إلى',
            days: 'أيام',
            nights: 'ليالي',
            person: 'شخص',
            perPerson: 'للشخص',
            currency: 'دينار',
        },

        // Trips
        trips: {
            title: 'رحلاتنا',
            subtitle: 'اختر من بين مجموعة واسعة من الرحلات المميزة',
            featured: 'رحلات مميزة',
            popular: 'الأكثر شعبية',
            categories: {
                all: 'الكل',
                umrah: 'عمرة',
                family: 'عائلية',
                honeymoon: 'شهر عسل',
                adventure: 'مغامرة',
                business: 'أعمال',
                weekend: 'نهاية أسبوع',
                cruise: 'رحلات بحرية',
                luxury: 'فاخرة',
            },
            filters: {
                title: 'تصفية النتائج',
                destination: 'الوجهة',
                category: 'الفئة',
                priceRange: 'نطاق السعر',
                duration: 'المدة',
                amenities: 'المرافق',
                includesFlight: 'يشمل الطيران',
                includesHotel: 'يشمل الفندق',
                visaAssistance: 'مساعدة في التأشيرة',
                arabicGuide: 'مرشد عربي',
            },
            details: {
                overview: 'نظرة عامة',
                itinerary: 'البرنامج اليومي',
                inclusions: 'ما يشمله',
                exclusions: 'ما لا يشمله',
                pricing: 'الأسعار',
                dates: 'التواريخ المتاحة',
                booking: 'احجز الآن',
                highlights: 'أبرز المعالم',
                day: 'اليوم',
                single: 'فردي',
                double: 'مزدوج',
                triple: 'ثلاثي',
            },
        },

        // Destinations
        destinations: {
            title: 'وجهاتنا',
            subtitle: 'استكشف أجمل الوجهات حول العالم',
            popular: 'وجهات شعبية',
            bestTime: 'أفضل وقت للزيارة',
            visaNotes: 'ملاحظات التأشيرة',
            exploreTrips: 'استكشف الرحلات',
        },

        // Services
        services: {
            title: 'خدماتنا',
            subtitle: 'نقدم مجموعة شاملة من الخدمات السياحية',
            flightBooking: {
                title: 'حجز الطيران',
                description: 'نوفر لك أفضل أسعار تذاكر الطيران لجميع الوجهات',
            },
            hotelReservation: {
                title: 'حجز الفنادق',
                description: 'اختر من بين آلاف الفنادق حول العالم',
            },
            visaAssistance: {
                title: 'مساعدة في التأشيرات',
                description: 'نساعدك في إجراءات الحصول على التأشيرة',
            },
            tourPackages: {
                title: 'باقات سياحية',
                description: 'باقات سياحية متكاملة لجميع الوجهات',
            },
            transportation: {
                title: 'النقل والمواصلات',
                description: 'خدمات نقل مريحة وآمنة',
            },
            insurance: {
                title: 'التأمين السياحي',
                description: 'تأمين شامل لرحلتك',
            },
        },

        // About
        about: {
            title: 'من نحن',
            subtitle: 'نحن شركة رائدة في مجال السياحة والسفر',
            ourStory: 'قصتنا',
            ourMission: 'رسالتنا',
            ourVision: 'رؤيتنا',
            whyChooseUs: 'لماذا تختارنا',
            experience: 'سنوات من الخبرة',
            customers: 'عميل سعيد',
            destinations: 'وجهة',
            awards: 'جائزة',
        },

        // Blog
        blog: {
            title: 'المدونة',
            subtitle: 'آخر الأخبار والنصائح السياحية',
            readMore: 'اقرأ المزيد',
            relatedPosts: 'مقالات ذات صلة',
            categories: 'التصنيفات',
            tags: 'الوسوم',
            latestPosts: 'أحدث المقالات',
        },

        // Contact
        contact: {
            title: 'اتصل بنا',
            subtitle: 'نحن هنا للإجابة على استفساراتك',
            name: 'الاسم',
            email: 'البريد الإلكتروني',
            phone: 'رقم الهاتف',
            subject: 'الموضوع',
            message: 'الرسالة',
            send: 'إرسال',
            address: 'العنوان',
            workingHours: 'ساعات العمل',
            followUs: 'تابعنا',
            successMessage: 'تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.',
        },

        // Booking Form
        booking: {
            title: 'طلب حجز',
            fullName: 'الاسم الكامل',
            phone: 'رقم الهاتف',
            email: 'البريد الإلكتروني',
            nationality: 'الجنسية',
            travelersCount: 'عدد المسافرين',
            dateFrom: 'تاريخ المغادرة',
            dateTo: 'تاريخ العودة',
            roomType: 'نوع الغرفة',
            budget: 'الميزانية',
            notes: 'ملاحظات إضافية',
            submit: 'إرسال الطلب',
            successMessage: 'تم إرسال طلب الحجز بنجاح. سنتواصل معك قريباً.',
        },

        // Newsletter
        newsletter: {
            title: 'اشترك في نشرتنا البريدية',
            subtitle: 'احصل على أحدث العروض والأخبار',
            placeholder: 'أدخل بريدك الإلكتروني',
            subscribe: 'اشترك',
            successMessage: 'تم الاشتراك بنجاح',
        },

        // Footer
        footer: {
            about: 'حول حياك',
            quickLinks: 'روابط سريعة',
            contactInfo: 'معلومات التواصل',
            followUs: 'تابعنا',
            rights: 'جميع الحقوق محفوظة',
            privacy: 'سياسة الخصوصية',
            terms: 'الشروط والأحكام',
        },

        // Why Choose Us
        whyChooseUs: {
            title: 'لماذا تختار حياك؟',
            subtitle: 'نحن نقدم أفضل الخدمات السياحية',
            bestPrices: {
                title: 'أفضل الأسعار',
                description: 'نضمن لك أفضل الأسعار في السوق',
            },
            expertGuides: {
                title: 'مرشدون خبراء',
                description: 'فريق من المرشدين المحترفين',
            },
            support: {
                title: 'دعم 24/7',
                description: 'نحن متواجدون لخدمتك على مدار الساعة',
            },
            safety: {
                title: 'سلامة وأمان',
                description: 'سلامتك وراحتك أولويتنا',
            },
        },

        // Testimonials
        testimonials: {
            title: 'آراء عملائنا',
            subtitle: 'ماذا يقول عملاؤنا عنا',
        },

        // Admin
        admin: {
            dashboard: 'لوحة التحكم',
            trips: 'الرحلات',
            destinations: 'الوجهات',
            bookings: 'الحجوزات',
            blog: 'المدونة',
            settings: 'الإعدادات',
            logout: 'تسجيل الخروج',
            login: 'تسجيل الدخول',
            email: 'البريد الإلكتروني',
            password: 'كلمة المرور',
            addNew: 'إضافة جديد',
            edit: 'تعديل',
            delete: 'حذف',
            publish: 'نشر',
            unpublish: 'إلغاء النشر',
            status: 'الحالة',
            actions: 'الإجراءات',
        },
    },

    en: {
        // Navigation
        nav: {
            home: 'Home',
            trips: 'Trips',
            destinations: 'Destinations',
            services: 'Services',
            about: 'About',
            blog: 'Blog',
            contact: 'Contact',
        },

        // Hero Section
        hero: {
            title: 'Discover the World with Us',
            subtitle: 'Exceptional Journeys & Unforgettable Experiences',
            searchPlaceholder: 'Search for your favorite destination...',
            searchButton: 'Search',
            bookNow: 'Book Now',
            learnMore: 'Learn More',
        },

        // Common
        common: {
            readMore: 'Read More',
            viewAll: 'View All',
            bookNow: 'Book Now',
            contactUs: 'Contact Us',
            loading: 'Loading...',
            noResults: 'No results found',
            error: 'An error occurred',
            success: 'Success',
            submit: 'Submit',
            cancel: 'Cancel',
            save: 'Save',
            edit: 'Edit',
            delete: 'Delete',
            search: 'Search',
            filter: 'Filter',
            sort: 'Sort',
            price: 'Price',
            duration: 'Duration',
            from: 'From',
            to: 'To',
            days: 'Days',
            nights: 'Nights',
            person: 'Person',
            perPerson: 'Per Person',
            currency: 'JOD',
        },

        // Trips
        trips: {
            title: 'Our Trips',
            subtitle: 'Choose from a wide range of exceptional trips',
            featured: 'Featured Trips',
            popular: 'Most Popular',
            categories: {
                all: 'All',
                umrah: 'Umrah',
                family: 'Family',
                honeymoon: 'Honeymoon',
                adventure: 'Adventure',
                business: 'Business',
                weekend: 'Weekend',
                cruise: 'Cruise',
                luxury: 'Luxury',
            },
            filters: {
                title: 'Filter Results',
                destination: 'Destination',
                category: 'Category',
                priceRange: 'Price Range',
                duration: 'Duration',
                amenities: 'Amenities',
                includesFlight: 'Includes Flight',
                includesHotel: 'Includes Hotel',
                visaAssistance: 'Visa Assistance',
                arabicGuide: 'Arabic Guide',
            },
            details: {
                overview: 'Overview',
                itinerary: 'Itinerary',
                inclusions: 'What\'s Included',
                exclusions: 'What\'s Excluded',
                pricing: 'Pricing',
                dates: 'Available Dates',
                booking: 'Book Now',
                highlights: 'Highlights',
                day: 'Day',
                single: 'Single',
                double: 'Double',
                triple: 'Triple',
            },
        },

        // Destinations
        destinations: {
            title: 'Our Destinations',
            subtitle: 'Explore the most beautiful destinations around the world',
            popular: 'Popular Destinations',
            bestTime: 'Best Time to Visit',
            visaNotes: 'Visa Notes',
            exploreTrips: 'Explore Trips',
        },

        // Services
        services: {
            title: 'Our Services',
            subtitle: 'We offer a comprehensive range of travel services',
            flightBooking: {
                title: 'Flight Booking',
                description: 'We provide the best flight ticket prices to all destinations',
            },
            hotelReservation: {
                title: 'Hotel Reservation',
                description: 'Choose from thousands of hotels worldwide',
            },
            visaAssistance: {
                title: 'Visa Assistance',
                description: 'We help you with visa procedures',
            },
            tourPackages: {
                title: 'Tour Packages',
                description: 'Complete tour packages for all destinations',
            },
            transportation: {
                title: 'Transportation',
                description: 'Comfortable and safe transportation services',
            },
            insurance: {
                title: 'Travel Insurance',
                description: 'Comprehensive insurance for your trip',
            },
        },

        // About
        about: {
            title: 'About Us',
            subtitle: 'We are a leading company in travel and tourism',
            ourStory: 'Our Story',
            ourMission: 'Our Mission',
            ourVision: 'Our Vision',
            whyChooseUs: 'Why Choose Us',
            experience: 'Years of Experience',
            customers: 'Happy Customers',
            destinations: 'Destinations',
            awards: 'Awards',
        },

        // Blog
        blog: {
            title: 'Blog',
            subtitle: 'Latest news and travel tips',
            readMore: 'Read More',
            relatedPosts: 'Related Posts',
            categories: 'Categories',
            tags: 'Tags',
            latestPosts: 'Latest Posts',
        },

        // Contact
        contact: {
            title: 'Contact Us',
            subtitle: 'We are here to answer your questions',
            name: 'Name',
            email: 'Email',
            phone: 'Phone',
            subject: 'Subject',
            message: 'Message',
            send: 'Send',
            address: 'Address',
            workingHours: 'Working Hours',
            followUs: 'Follow Us',
            successMessage: 'Your message has been sent successfully. We will contact you soon.',
        },

        // Booking Form
        booking: {
            title: 'Booking Request',
            fullName: 'Full Name',
            phone: 'Phone',
            email: 'Email',
            nationality: 'Nationality',
            travelersCount: 'Number of Travelers',
            dateFrom: 'Departure Date',
            dateTo: 'Return Date',
            roomType: 'Room Type',
            budget: 'Budget',
            notes: 'Additional Notes',
            submit: 'Submit Request',
            successMessage: 'Your booking request has been sent successfully. We will contact you soon.',
        },

        // Newsletter
        newsletter: {
            title: 'Subscribe to Our Newsletter',
            subtitle: 'Get the latest offers and news',
            placeholder: 'Enter your email',
            subscribe: 'Subscribe',
            successMessage: 'Successfully subscribed',
        },

        // Footer
        footer: {
            about: 'About HAYYAK',
            quickLinks: 'Quick Links',
            contactInfo: 'Contact Info',
            followUs: 'Follow Us',
            rights: 'All Rights Reserved',
            privacy: 'Privacy Policy',
            terms: 'Terms & Conditions',
        },

        // Why Choose Us
        whyChooseUs: {
            title: 'Why Choose HAYYAK?',
            subtitle: 'We provide the best travel services',
            bestPrices: {
                title: 'Best Prices',
                description: 'We guarantee you the best prices in the market',
            },
            expertGuides: {
                title: 'Expert Guides',
                description: 'A team of professional guides',
            },
            support: {
                title: '24/7 Support',
                description: 'We are available to serve you around the clock',
            },
            safety: {
                title: 'Safety & Security',
                description: 'Your safety and comfort are our priority',
            },
        },

        // Testimonials
        testimonials: {
            title: 'Customer Reviews',
            subtitle: 'What our customers say about us',
        },

        // Admin
        admin: {
            dashboard: 'Dashboard',
            trips: 'Trips',
            destinations: 'Destinations',
            bookings: 'Bookings',
            blog: 'Blog',
            settings: 'Settings',
            logout: 'Logout',
            login: 'Login',
            email: 'Email',
            password: 'Password',
            addNew: 'Add New',
            edit: 'Edit',
            delete: 'Delete',
            publish: 'Publish',
            unpublish: 'Unpublish',
            status: 'Status',
            actions: 'Actions',
        },
    },
};

export function getTranslation(locale: Locale) {
    return translations[locale] || translations[defaultLocale];
}

export function isRTL(locale: Locale) {
    return locale === 'ar';
}
