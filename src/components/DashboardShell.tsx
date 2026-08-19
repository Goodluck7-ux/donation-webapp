'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Heart, User, Users, FolderKanban, LogOut, Menu, X } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { useProfile } from '@/hooks/userProfile';
import { Logo } from './Logo';

const NAV_BY_ROLE: Record<string, { label: string; href: string; icon: any }[]> = {
    DONOR: [
        { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { label: 'My donations', href: '/dashboard/donations', icon: Heart },
        { label: 'Profile', href: '/dashboard/profile', icon: User },
    ],
    CAMPAIGN_MANAGER: [
        { label: 'Overview', href: '/manager', icon: LayoutDashboard },
        { label: 'My campaigns', href: '/manager/campaigns', icon: FolderKanban },
        { label: 'Profile', href: '/dashboard/profile', icon: User },
    ],
    PLATFORM_ADMIN: [
        { label: 'Overview', href: '/admin', icon: LayoutDashboard },
        { label: 'Campaigns', href: '/admin/campaigns', icon: FolderKanban },
        { label: 'Users', href: '/admin/users', icon: Users },
        { label: 'Profile', href: '/dashboard/profile', icon: User },
    ],
};

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
    const { data: profile } = useProfile();
    const pathname = usePathname();
    const router = useRouter();
    const items = NAV_BY_ROLE[profile?.role ?? 'DONOR'] ?? NAV_BY_ROLE.DONOR;

    async function handleSignOut() {
        await apiFetch('/api/auth/sign-out', { method: 'POST' });
        router.push('/login');
    }

    return (
        <div className="flex flex-col justify-between h-full">
            <div className="space-y-10">
                <Link href="/" className="font-display text-xl text-white tracking-tight"><Logo light /></Link>
                <nav className="space-y-1">
                    {items.map((item) => {
                        const active = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onNavigate}
                                className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${active ? 'bg-white/10 text-white' : 'text-emerald-100/60 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon size={18} strokeWidth={1.75} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 px-1">
                    <div className="w-9 h-9 rounded-full bg-emerald-400/20 text-white flex items-center justify-center text-sm font-medium border border-white/10">
                        {profile?.name?.[0]?.toUpperCase() ?? '?'}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">{profile?.name}</p>
                        <p className="text-xs text-emerald-100/50 truncate">{profile?.role}</p>
                    </div>
                </div>
                <button onClick={handleSignOut} className="flex items-center gap-3 text-sm text-emerald-100/50 hover:text-white px-1 w-full transition-colors">
                    <LogOut size={18} strokeWidth={1.75} /> Sign out
                </button>
            </div>
        </div>
    );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-[#FAFAF7]">
            {/* Desktop sidebar */}
            <aside className="hidden md:flex w-64 flex-col bg-[#0F2E1D] p-6">
                <SidebarContent />
            </aside>

            {/* Mobile topbar */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#0F2E1D] px-4 py-3.5 flex items-center justify-between">
                <span className="font-display text-lg text-white">Riverside</span>
                <button onClick={() => setMobileOpen(true)} aria-label="Open menu">
                    <Menu size={22} className="text-white" />
                </button>
            </div>

            {/* Mobile slide-over */}
            {mobileOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
                    <div className="relative w-72 bg-[#0F2E1D] p-6">
                        <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4" aria-label="Close menu">
                            <X size={22} className="text-white" />
                        </button>
                        <div className="mt-8 h-[calc(100%-2rem)]">
                            <SidebarContent onNavigate={() => setMobileOpen(false)} />
                        </div>
                    </div>
                </div>
            )}

            <main className="flex-1 overflow-y-auto pt-16 md:pt-0">{children}</main>
        </div>
    );
}