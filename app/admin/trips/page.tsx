import React from 'react';
import { prisma } from '@/lib/prisma';
import { DataTable } from '@/components/admin/DataTable';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default async function AdminTripsPage() {
    const trips = await prisma.trip.findMany({
        include: {
            destination: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    const columns = [
        { header: 'عنوان الرحلة (عربي)', accessor: 'title_ar' as const },
        {
            header: 'الوجهة',
            accessor: (item: any) => item.destination?.name_ar || 'غير محددة'
        },
        { header: 'الفئة', accessor: 'category' as const },
        {
            header: 'السعر يبدأ من',
            accessor: (item: any) => `${item.priceFrom} ${item.currency}`
        },
        {
            header: 'الحالة',
            accessor: (item: any) => (
                <span className={cn(
                    'px-3 py-1 rounded-full text-xs font-bold',
                    item.published ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                )}>
                    {item.published ? 'منشورة' : 'مسودة'}
                </span>
            )
        },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة الرحلات</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">إضافة، تعديل أو حذف الرحلات السياحية</p>
                </div>
                <Link href="/admin/trips/new">
                    <Button className="gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        إضافة رحلة جديدة
                    </Button>
                </Link>
            </div>

            <DataTable
                columns={columns}
                data={trips}
                onEdit={(item) => {
                    // Client-side navigation would go here in a full SPA, 
                    // but we'll use standard links in the cell or handle via client component wrapper if needed.
                }}
            />
        </div>
    );
}

// Fixed import for cn which was used in accessor
import { cn } from '@/lib/utils';
