'use client';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Topbar } from '@/components/dashboard/topbar';
import { FloatingUserMenu } from '@/components/dashboard/floating-user-menu';
import { BottomNav } from '@/components/dashboard/bottom-nav';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-(--color-bg-app)">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Topbar />
                <div className="flex-1 overflow-y-auto p-6 pb-24 md:pb-6">
                    <div className="page-anim">{children}</div>
                </div>
            </div>
            <BottomNav />
            <FloatingUserMenu />
        </div>
    );
}
