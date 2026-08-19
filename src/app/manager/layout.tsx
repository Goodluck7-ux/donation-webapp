import { AuthGuard } from '@/components/AuthGuard';
import { DashboardShell } from '@/components/DashboardShell';

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard requireRole="MANAGER">
            <DashboardShell>{children}</DashboardShell>
        </AuthGuard>
    );
}