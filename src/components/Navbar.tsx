'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

const LINKS = [
    { href: '/', label: 'Home' },
    { href: '/campaigns', label: 'Causes' },
    { href: '/about', label: 'About' },
    { href: '/impact', label: 'Impact' },
    { href: '/contact', label: 'Contact' },
];

export function Navbar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname === href || pathname.startsWith(`${href}/`);
    };

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
                            </div>

                            <p className="mt-5 text-center text-[10px] text-text-muted">
                                Give with clarity. Create meaningful impact.
                            </p>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}