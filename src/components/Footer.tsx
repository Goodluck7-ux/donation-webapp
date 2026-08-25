import Link from 'next/link';
import { Logo } from './Logo';

const platformLinks = [
    { label: 'Browse causes', href: '/campaigns' },
    { label: 'About us', href: '/about' },
    { label: 'Our impact', href: '/impact' },
];

const supportLinks = [
    { label: 'Contact us', href: '/contact' },
    { label: 'Log in', href: '/login' },
    { label: 'Help center', href: '#' },
];

const socialLinks = [
    { label: 'Twitter', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
];

export function Footer() {
    return (
        <footer className="mt-24 bg-brand text-white">

            {/* Main */}
            <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:px-10">

                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">

                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block">
                            <Logo light />
                        </Link>

                        <p className="mt-5 max-w-xs text-sm leading-6 text-white/55">
                            Supporting verified causes with transparency,
                            confidence, and a clearer connection to impact.
                        </p>

                        <div className="mt-6 flex items-center gap-4">
                            {socialLinks.map((social) => (

                                <a key={social.label}
                                    href={social.href}
                                    className="text-xs text-focus-ring/45 transition-colors hover:text-focus-ring"
                                >
                                    {social.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Platform */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-focus-ring/40">
                            Platform
                        </p>

                        <nav className="mt-5 flex flex-col gap-3">
                            {platformLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="w-fit text-sm text-white/55 transition-colors hover:text-white"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Support */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-focus-ring/40">
                            Support
                        </p>

                        <nav className="mt-5 flex flex-col gap-3">
                            {supportLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="w-fit text-sm text-white/55 transition-colors hover:text-white"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-focus-ring/40">
                            Stay updated
                        </p>

                        <p className="mt-5 text-sm leading-6 text-white/55">
                            Get occasional updates from causes and stories
                            you care about.
                        </p>

                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="mt-4 flex gap-2"
                        >
                            <input
                                type="email"
                                required
                                placeholder="Your email"
                                aria-label="Email address"
                                className="min-w-0 flex-1 rounded-lg border border-white/[0.08] bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none placeholder:text-focus-ring/30 focus:border-focus-ring/25"
                            />

                            <button
                                type="submit"
                                className="rounded-lg bg-focus-ring px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-white"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">

                    <p className="text-xs text-focus-ring/30">
                        © 2026 Finovia Giving. All rights reserved.
                    </p>

                    <div className="flex gap-5">
                        <Link
                            href="#"
                            className="text-xs text-focus-ring/30 transition-colors hover:text-focus-ring/70"
                        >
                            Privacy
                        </Link>

                        <Link
                            href="#"
                            className="text-xs text-focus-ring/30 transition-colors hover:text-focus-ring/70"
                        >
                            Terms
                        </Link>
                    </div>

                </div>

            </div>
        </footer>
    );
}