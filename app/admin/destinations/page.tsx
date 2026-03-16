import React from 'react';
import { prisma } from '@/lib/prisma';
import { DataTable } from '@/components/admin/DataTable';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default async function AdminDestinationsPage() {
    const destinations = await prisma.destination.findMany({
        include: {
            _count: {
                select: { trips: true }
            }
        },
        orderBy: {
            name_en: 'asc',
        },
    });

    const columns = [
        { header: 'الاسم (عربي)', accessor: 'name_ar' as const },
        { header: 'الدولة', accessor: 'country' as const },
        {
            header: 'عدد الرحلات',
            accessor: (item: any) => item._count?.trips || 0
        },
        {
            header: 'الحالة',
            accessor: (item: any) => (
                <span className={cn(
                    'px-3 py-1 rounded-full text-xs font-bold',
                    item.published ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                )}>
                    {item.published ? 'نشطة' : 'غير نشطة'}
                </span>
            )
        },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة الوجهات</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">إعادة تنظيم الوجهات السياحية وتفعيلها</p>
                </div>
                <Link href="/admin/destinations/new">
                    <Button className="gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        إضافة وجهة جديدة
                    </Button>
                </Link>
            </div>

            <DataTable
                columns={columns}
                data={destinations}
            />
        </div>
    );
}

import { cn } from '@/lib/utils';
