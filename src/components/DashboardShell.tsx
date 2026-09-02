'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
    LayoutDashboard,
    Heart,
    User,
    Users,
    FolderKanban,
    LogOut,
    Menu,
    X,
    ArrowUpRight,
    Sparkles,
    Building2,
    Home,
    Receipt,
} from 'lucide-react';

import { apiFetch } from '@/lib/api';
import { useProfile } from '@/hooks/userProfile';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { useQueryClient } from '@tanstack/react-query';
import { logActivity } from '@/lib/logger';

type NavItem = {
    label: string;
    href: string;
    icon: React.ElementType;
};

const NAV_BY_ROLE: Record<string, NavItem[]> = {
    DONOR: [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { label: 'My donations', href: '/dashboard/donations', icon: Heart },
        { label: 'Profile', href: '/dashboard/profile', icon: User },
    ],
    CAMPAIGN_MANAGER: [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Overview', href: '/manager', icon: LayoutDashboard },
        { label: 'My campaigns', href: '/manager/campaigns', icon: FolderKanban },
        { label: 'Profile', href: '/dashboard/profile', icon: User },
    ],

    PLATFORM_ADMIN: [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Overview', href: '/admin', icon: LayoutDashboard },
        { label: 'Organizations', href: '/admin/organizations', icon: Building2 },
        { label: 'Campaigns', href: '/admin/campaigns', icon: FolderKanban },
        { label: 'Transactions', href: '/admin/transactions', icon: Receipt },
        { label: 'Users', href: '/admin/users', icon: Users },
        { label: 'Profile', href: '/dashboard/profile', icon: User },
    ],
};

function formatRole(role?: string) {
    if (!role) return 'Member';
    return role.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
    const { data: profile } = useProfile();
    const pathname = usePathname();
    const router = useRouter();
    const items = NAV_BY_ROLE[profile?.role ?? 'DONOR'] ?? NAV_BY_ROLE.DONOR;
    const queryClient = useQueryClient();

    async function handleSignOut() {
        logActivity('AUTH', 'Sign out initiated', { userId: profile?.id, role: profile?.role });
        await apiFetch('/api/auth/sign-out', { method: 'POST' });
        queryClient.clear();
        window.location.href = '/login';
    }

    return (
        <div className="flex h-full flex-col justify-between">
            <div>
                <div className="flex items-center justify-between">
                    <Link href="/" onClick={onNavigate} className="block">
                        <Logo light />
                    </Link>
                    <ThemeToggle />
                </div>

                <div className="mt-10 rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4">
                    <div className="flex items-center gap-2 text-[#B7E4C7]">
                        <Sparkles size={14} />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.15em]">Your impact</span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-[#D3E6D8]/55">
                        Every contribution helps move a meaningful cause forward.
                    </p>
                </div>

                <nav className="mt-9 space-y-1.5">
                    <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B7E4C7]/35">Workspace</p>
                    {items.map((item) => {
                        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onNavigate}
                                className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm transition-all ${active ? 'bg-white/[0.10] font-semibold text-white shadow-[0_8px_20px_rgba(0,0,0,0.08)]' : 'font-medium text-[#D3E6D8]/55 hover:bg-white/[0.055] hover:text-white'}`}
                            >
                                {active && (
                                    <motion.span
                                        layoutId="active-nav"
                                        className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-[#74C69D]"
                                    />
                                )}
                                <span className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${active ? 'bg-[#B7E4C7]/10 text-[#B7E4C7]' : 'text-[#B7E4C7]/45 group-hover:text-[#B7E4C7]'}`}>
                                    <Icon size={17} strokeWidth={1.8} />
                                </span>
                                <span>{item.label}</span>
                                {active && <ArrowUpRight size={14} className="ml-auto text-[#B7E4C7]/60" />}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="border-t border-white/[0.08] pt-5">
                <div className="flex items-center gap-3 px-1">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#B7E4C7]/10 bg-[#B7E4C7]/10 text-sm font-semibold text-[#DFF1E4]">
                        {profile?.name?.[0]?.toUpperCase() ?? '?'}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">{profile?.name ?? 'Member'}</p>
                        <p className="mt-0.5 truncate text-[11px] text-[#B7E4C7]/40">{formatRole(profile?.role)}</p>
                    </div>
                </div>

                <button
                    onClick={handleSignOut}
                    className="group mt-5 flex w-full items-center gap-3 rounded-xl px-1 py-2 text-sm font-medium text-[#D3E6D8]/45 transition-colors hover:text-white"
                >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors group-hover:bg-white/[0.06]">
                        <LogOut size={17} strokeWidth={1.8} />
                    </span>
                    Sign out
                </button>

                <p className="mt-4 px-1 text-[10px] text-[#B7E4C7]/25">© 2026 Finovia Giving</p>
            </div>
        </div>
    );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-base">
            <aside className="fixed inset-y-0 left-0 z-40 hidden w-[272px] flex-col bg-brand p-6 md:flex">
                <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#52B788]/[0.07] blur-3xl" />
                <div className="relative z-10 h-full">
                    <SidebarContent />
                </div>
            </aside>

            <header className="fixed left-0 right-0 top-0 z-40 flex h-[68px] items-center justify-between border-b border-white/[0.06] bg-brand px-5 md:hidden">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                    <Logo light />
                </Link>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button
                        onClick={() => setMobileOpen(true)}
                        aria-label="Open menu"
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-white transition-colors hover:bg-white/[0.1]"
                    >
                        <Menu size={20} />
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {mobileOpen && (
                    <div className="fixed inset-0 z-50 md:hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            className="absolute inset-0 bg-[#07170F]/60 backdrop-blur-sm"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="relative flex h-full w-[290px] flex-col bg-brand p-6 shadow-2xl"
                        >
                            <button
                                onClick={() => setMobileOpen(false)}
                                aria-label="Close menu"
                                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] text-[#D3E6D8]/70 transition-colors hover:bg-white/[0.1] hover:text-white"
                            >
                                <X size={18} />
                            </button>
                            <div className="mt-1 h-full">
                                <SidebarContent onNavigate={() => setMobileOpen(false)} />
                            </div>
                        </motion.aside>
                    </div>
                )}
            </AnimatePresence>

            <main className="min-h-screen md:ml-[272px]">
                <div className="pt-[68px] md:pt-0">{children}</div>
            </main>
        </div>
    );
}