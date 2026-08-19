'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

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

    return (
        <header className="border-b border-neutral-200 sticky top-0 bg-white/80 backdrop-blur-md z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
               <Link href="/"><Logo /></Link>

                <nav className="hidden md:flex items-center gap-8 text-sm">
                    {LINKS.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className={`relative py-1 transition-colors ${pathname === l.href ? 'text-[#1B4332] font-medium' : 'text-neutral-600 hover:text-neutral-900'
                                }`}
                        >
                            {l.label}
                            {pathname === l.href && <span className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-[#1B4332]" />}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <Link href="/login" className="text-sm text-neutral-600 hover:text-neutral-900">Log in</Link>
                    <Link
                        href="/campaigns"
                        className="rounded-lg bg-[#1B4332] text-white px-5 py-2.5 text-sm font-medium hover:bg-[#143526] shadow-sm shadow-emerald-900/10 transition-colors"
                    >
                        Donate now
                    </Link>
                </div>

                <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {open && (
                <div className="md:hidden border-t border-neutral-200 px-4 py-4 space-y-1">
                    {LINKS.map((l) => (
                        <Link key={l.href} href={l.href} className="block px-2 py-2.5 text-sm text-neutral-600 rounded-lg hover:bg-neutral-50" onClick={() => setOpen(false)}>
                            {l.label}
                        </Link>
                    ))}
                    <Link href="/login" className="block px-2 py-2.5 text-sm text-neutral-600" onClick={() => setOpen(false)}>Log in</Link>
                    <Link href="/campaigns" className="block rounded-lg bg-[#1B4332] text-white px-4 py-2.5 text-sm font-medium text-center mt-2" onClick={() => setOpen(false)}>
                        Donate now
                    </Link>
                </div>
            )}
        </header>
    );
}