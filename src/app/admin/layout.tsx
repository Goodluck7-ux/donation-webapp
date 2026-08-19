import { AuthGuard } from '@/components/AuthGuard';
import { DashboardShell } from '@/components/DashboardShell';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requireRole="ADMIN">
      <DashboardShell>{children}</DashboardShell>
    </AuthGuard>
  );
}