import { Sidebar } from '@/components/admin/Sidebar';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect('/admin/login');
    }

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950" dir="rtl">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">أهلاً بك، {session.user?.name || 'مدير النظام'}</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                            {session.user?.name?.[0].toUpperCase() || 'A'}
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
