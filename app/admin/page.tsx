import { prisma } from '@/lib/prisma';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default async function AdminDashboard() {
    const stats = [
        { name: 'إجمالي الرحلات', value: await prisma.trip.count(), icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7', color: 'bg-blue-500' },
        { name: 'الوجهات النشطة', value: await prisma.destination.count({ where: { published: true } }), icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z', color: 'bg-emerald-500' },
        { name: 'طلبات الحجز الجديدة', value: await prisma.bookingRequest.count({ where: { status: 'New' } }), icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', color: 'bg-amber-500' },
        { name: 'رسائل التواصل', value: await prisma.contactMessage.count({ where: { status: 'New' } }), icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'bg-purple-500' },
    ];

    const recentBookings = await prisma.bookingRequest.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { trip: true },
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">نظرة عامة</h1>
                <div className="text-sm text-gray-500 dark:text-gray-400">آخر تحديث: {new Date().toLocaleTimeString('ar-JO')}</div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.name} className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="flex items-center gap-6 pt-6">
                            <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Bookings */}
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle>أحدث الحجوزات</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentBookings.length > 0 ? (
                                recentBookings.map((booking) => (
                                    <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold uppercase">
                                                {(booking.trip?.title_ar || '?')[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 dark:text-white">{booking.fullName}</p>
                                                <p className="text-sm text-gray-500">{booking.trip?.title_ar || 'رحلة مخصصة'}</p>
                                            </div>
                                        </div>
                                        <div className="text-left">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${booking.status === 'New' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
                                                }`}>
                                                {booking.status === 'New' ? 'جديد' : booking.status}
                                            </span>
                                            <p className="text-xs text-gray-400 mt-2">{new Date(booking.createdAt).toLocaleDateString('ar-JO')}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-gray-500 italic">لا توجد حجوزات حتى الآن</div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Links / Actions placeholder */}
                <Card className="border-none shadow-sm h-full">
                    <CardHeader>
                        <CardTitle>إجراءات سريعة</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        <button className="p-6 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex flex-col items-center gap-3 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors font-bold">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round" /></svg>
                            إضافة رحلة
                        </button>
                        <button className="p-6 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex flex-col items-center gap-3 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors font-bold">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round" /></svg>
                            إضافة وجهة
                        </button>
                        <button className="p-6 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-2xl flex flex-col items-center gap-3 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors font-bold">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeWidth="2" strokeLinecap="round" /></svg>
                            إرسال بريد
                        </button>
                        <button className="p-6 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-2xl flex flex-col items-center gap-3 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors font-bold">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" strokeWidth="2" strokeLinecap="round" /></svg>
                            التقارير
                        </button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
