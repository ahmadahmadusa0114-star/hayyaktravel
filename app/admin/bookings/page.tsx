import React from 'react';
import { prisma } from '@/lib/prisma';
import { DataTable } from '@/components/admin/DataTable';
import { formatDate } from '@/lib/utils';

export default async function AdminBookingsPage() {
    const bookings = await prisma.bookingRequest.findMany({
        include: {
            trip: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    const columns = [
        { header: 'الاسم الكامل', accessor: 'fullName' as const },
        { header: 'رقم الهاتف', accessor: 'phone' as const },
        {
            header: 'الرحلة المطلوبة',
            accessor: (item: any) => item.trip?.title_ar || 'رحلة مخصصة'
        },
        {
            header: 'التاريخ',
            accessor: (item: any) => formatDate(item.createdAt, 'ar')
        },
        {
            header: 'الحالة',
            accessor: (item: any) => (
                <select
                    defaultValue={item.status}
                    className={cn(
                        'px-3 py-1 rounded-lg text-xs font-bold border-none bg-gray-50 focus:ring-2 focus:ring-blue-500 cursor-pointer',
                        item.status === 'New' ? 'text-amber-600' : 'text-green-600'
                    )}
                >
                    <option value="New">جديد</option>
                    <option value="Contacted">تم التواصل</option>
                    <option value="Confirmed">مؤكد</option>
                    <option value="Cancelled">ملغي</option>
                </select>
            )
        },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">طلبات الحجز</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">متابعة طلبات العملاء وحالة الحجوزات</p>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={bookings}
            />
        </div>
    );
}

import { cn } from '@/lib/utils';
