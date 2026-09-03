'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, LayoutDashboard, LogOut, Menu, User, X } from 'lucide-react';

import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { ConfirmSignOutModal } from './ConfirmSignOutModal';
import { useProfile } from '@/hooks/userProfile';
import { apiFetch } from '@/lib/api';
import { useQueryClient } from '@tanstack/react-query';

const LINKS = [
    { href: '/', label: 'Home' },
    { href: '/campaigns', label: 'Causes' },
    { href: '/about', label: 'About' },
    { href: '/impact', label: 'Impact' },
    { href: '/contact', label: 'Contact' },
];

function dashboardPathFor(role?: string) {
    if (role === 'PLATFORM_ADMIN' || role === 'ORG_ADMIN' || role === 'VERIFICATION_STAFF') return '/admin';
    if (role === 'CAMPAIGN_MANAGER') return '/manager';
    return '/dashboard';
}

export function Navbar() {
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: profile, isLoading } = useProfile();

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    async function handleSignOut() {
        await apiFetch('/api/auth/sign-out', { method: 'POST' });
        queryClient.clear();
        router.push('/');
        router.refresh();
    }

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-base/90 backdrop-blur-xl">

            <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-10">

                <Link href="/" aria-label="Finovia Giving home" className="shrink-0">
                    <Logo />
                </Link>

                <nav className="hidden items-center gap-7 md:flex">
                    {LINKS.map((link) => {
                        const active = isActive(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`group relative px-1 py-2 text-sm transition-colors ${active ? 'font-semibold text-accent' : 'font-medium text-text-secondary hover:text-text-primary'}`}
                            >
                                {link.label}
                                <span
                                    className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-accent-hover transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}
                                />
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden items-center gap-5 md:flex">
                    <ThemeToggle />

                    {isLoading ? (
                        <div className="h-9 w-24 animate-pulse rounded-full bg-subtle" />
                    ) : profile ? (
                        <div className="relative">
                            <button
                                onClick={() => setMenuOpen((v) => !v)}
                                className="flex items-center gap-2.5 rounded-full border border-border bg-surface py-1.5 pl-1.5 pr-3.5 transition-colors hover:border-border-hover"
                            >
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
                                    {profile.name?.[0]?.toUpperCase() ?? '?'}
                                </span>
                                <span className="text-sm font-medium text-text-primary">
                                    {profile.name?.split(' ')[0]}
                                </span>
                            </button>

                            <AnimatePresence>
                                {menuOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                                        <motion.div
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -6 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 top-full z-20 mt-2 w-52 overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
                                        >
                                            <Link
                                                href={dashboardPathFor(profile.role)}
                                                onClick={() => setMenuOpen(false)}
                                                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-base"
                                            >
                                                <LayoutDashboard size={16} />
                                                Go to dashboard
                                            </Link>
                                            <Link
                                                href="/dashboard/profile"
                                                onClick={() => setMenuOpen(false)}
                                                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-base"
                                            >
                                                <User size={16} />
                                                Profile
                                            </Link>
                                            <button
                                                onClick={() => { setMenuOpen(false); setConfirmOpen(true); }}
                                                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-base hover:text-text-primary"
                                            >
                                                <LogOut size={16} />
                                                Sign out
                                            </button>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
                                Log in
                            </Link>

                            <Link
                                href="/campaigns"
                                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(27,67,50,0.14)] transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_12px_26px_rgba(27,67,50,0.18)]"
                            >
                                Donate now
                                <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface/60 text-text-primary transition-colors hover:bg-surface"
                    >
                        {open ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-t border-border bg-base md:hidden"
                    >
                        <motion.nav
                            initial={{ y: -8 }}
                            animate={{ y: 0 }}
                            exit={{ y: -8 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="mx-auto max-w-6xl px-5 pb-6 pt-4 sm:px-8"
                        >
                            <div className="space-y-1">
                                {LINKS.map((link) => {
                                    const active = isActive(link.href);
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setOpen(false)}
                                            className={`flex items-center justify-between rounded-xl px-3.5 py-3 text-sm transition-colors ${active ? 'bg-accent/10 font-semibold text-accent' : 'font-medium text-text-secondary hover:bg-surface hover:text-text-primary'}`}
                                        >
                                            {link.label}
                                            {active && <span className="h-1.5 w-1.5 rounded-full bg-accent-hover" />}
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="mt-4 border-t border-border pt-4">
                                {profile ? (
                                    <>
                                        <div className="flex items-center gap-3 px-3.5 py-2">
                                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
                                                {profile.name?.[0]?.toUpperCase() ?? '?'}
                                            </span>
                                            <div>
                                                <p className="text-sm font-semibold text-text-primary">{profile.name}</p>
                                                <p className="text-xs text-text-muted">{profile.email}</p>
                                            </div>
                                        </div>

                                        <Link
                                            href={dashboardPathFor(profile.role)}
                                            onClick={() => setOpen(false)}
                                            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-hover"
                                        >
                                            <LayoutDashboard size={16} />
                                            Go to dashboard
                                        </Link>

                                        <button
                                            onClick={() => { setOpen(false); setConfirmOpen(true); }}
                                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
                                        >
                                            <LogOut size={16} />
                                            Sign out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            onClick={() => setOpen(false)}
                                            className="flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-surface"
                                        >
                                            Log in
                                        </Link>

                                        <Link
                                            href="/campaigns"
                                            onClick={() => setOpen(false)}
                                            className="group mt-2 flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(27,67,50,0.12)] transition-all hover:bg-accent-hover"
                                        >
                                            Donate now
                                            <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                        </Link>
                                    </>
                                )}
                            </div>

                            <p className="mt-5 text-center text-[10px] text-text-muted">
                                Give with clarity. Create meaningful impact.
                            </p>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>

            <ConfirmSignOutModal
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={handleSignOut}
            />
        </header>
    );
}