// src/components/Footer.tsx
import { X } from 'lucide-react';
import Link from 'next/link';
import { Logo } from './Logo';
// import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-[#0F2E1D] text-white mt-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
                <div className="space-y-4 lg:col-span-1">
                    <Logo light />
                    <p className="text-sm text-emerald-100/60 leading-relaxed">
                        Funding vetted causes worldwide, with every Naira tracked from donation to real-world impact.
                    </p>
                    <div className="flex gap-3 pt-2">
                        {[X, X, X, X].map((Icon, i) => (
                            <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                <Icon size={14} strokeWidth={1.75} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="text-sm font-medium text-white">Platform</p>
                    <div className="flex flex-col gap-2 text-sm text-emerald-100/60">
                        <Link href="/campaigns" className="hover:text-white">Browse causes</Link>
                        <Link href="/about" className="hover:text-white">About us</Link>
                        <Link href="/impact" className="hover:text-white">Impact report</Link>
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="text-sm font-medium text-white">Support</p>
                    <div className="flex flex-col gap-2 text-sm text-emerald-100/60">
                        <Link href="/contact" className="hover:text-white">Contact us</Link>
                        <Link href="/login" className="hover:text-white">Log in</Link>
                        <a href="#" className="hover:text-white">Help center</a>
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="text-sm font-medium text-white">Stay updated</p>
                    <p className="text-sm text-emerald-100/60">Get monthly impact updates from causes you care about.</p>

                    <input
                        type="email"
                        placeholder="Your email"
                        className="min-w-0 flex-1 rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-emerald-100/40 outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                    <button className="rounded-lg bg-white text-[#1B4332] px-3 py-2 text-sm font-medium shrink-0">Join</button>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-emerald-100/50">
                    <p>© 2026 Finovia. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white">Privacy</a>
                        <a href="#" className="hover:text-white">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}