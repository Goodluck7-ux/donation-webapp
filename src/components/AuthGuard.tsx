'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/hooks/userProfile';


const ADMIN_ROLES = ['PLATFORM_ADMIN', 'ORG_ADMIN', 'VERIFICATION_STAFF'];

export function AuthGuard({
  children,
  requireRole,
}: {
  children: React.ReactNode;
  requireRole?: 'ADMIN' | 'MANAGER';
}) {
  const { data: profile, isLoading, isError } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (isError || !profile) {
      router.replace('/login');
      return;
    }

    if (requireRole === 'ADMIN' && !ADMIN_ROLES.includes(profile.role)) {
      router.replace('/dashboard');
    }
    if (requireRole === 'MANAGER' && profile.role !== 'CAMPAIGN_MANAGER') {
      router.replace('/dashboard');
    }
  }, [isLoading, isError, profile, requireRole, router]);

  if (isLoading || isError || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-400 text-sm">Loading…</p>
      </div>
    );
  }

  return <>{children}</>;
}