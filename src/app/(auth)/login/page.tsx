'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLogin } from '@/hooks/useAuth';
import { motion, type Variants } from 'motion/react';
import { toast } from 'sonner';
import { Logo } from '@/components/Logo';

const panelVariants: Variants = {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const formVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.08, delayChildren: 0.15 },
    },
};

const fieldVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const login = useLogin();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirect');

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        login.mutate(
            { email, password },
            {
                onSuccess: (data) => {
                    toast.success(`Welcome back, ${data.user.name.split(' ')[0]}!`);
                    const role = data.user.role;
                    if (role === 'PLATFORM_ADMIN' || role === 'ORG_ADMIN' || role === 'VERIFICATION_STAFF') {
                        router.push('/admin');
                    } else if (role === 'CAMPAIGN_MANAGER') {
                        router.push('/manager');
                    } else {
                        router.push(redirectTo || '/dashboard');
                    }
                },
            },
        );
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-[#FAFAF7]">
            {/* Left: brand panel */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={panelVariants}
                className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #0F2E1D 0%, #1B4332 55%, #2D6A4F 100%)' }}
            >
                {/* subtle decorative glow */}
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-emerald-300/10 blur-3xl" />

                <Logo light />
                <div className="space-y-4 relative">
                    <p className="text-3xl font-medium leading-snug max-w-md text-white">
                        Every contribution, tracked from donation to real-world impact.
                    </p>
                    <p className="text-emerald-100/70 max-w-sm">
                        See exactly where your donation goes — milestones, evidence, and verified progress reports.
                    </p>
                </div>

                <p className="text-sm text-emerald-200/50 relative">© 2026 Finovia Giving</p>
            </motion.div>

            {/* Right: form */}
            <div className="flex items-center justify-center p-6 sm:p-12">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={formVariants}
                    className="w-full max-w-sm space-y-8"
                >
                    <motion.div variants={fieldVariants} className="space-y-2">
                        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Welcome back</h1>
                        <p className="text-neutral-500 text-sm">Log in to continue giving with confidence.</p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <motion.div variants={fieldVariants} className="space-y-1.5">
                            <label className="text-sm font-medium text-neutral-700">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-shadow"
                            />
                        </motion.div>

                        <motion.div variants={fieldVariants} className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-neutral-700">Password</label>
                                <Link href="/forgot-password" className="text-sm text-emerald-700 hover:text-emerald-900">
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-shadow"
                            />
                        </motion.div>

                        {login.isError && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-600">
                                {(login.error as Error).message}
                            </motion.p>
                        )}

                        <motion.button
                            variants={fieldVariants}
                            type="submit"
                            disabled={login.isPending}
                            whileTap={{ scale: 0.98 }}
                            className="w-full rounded-lg bg-[#1B4332] text-white py-2.5 text-sm font-medium hover:bg-[#143526] disabled:opacity-50 transition-colors"
                        >
                            {login.isPending ? 'Signing in…' : 'Sign in'}
                        </motion.button>
                    </form>

                    <motion.p variants={fieldVariants} className="text-sm text-neutral-500 text-center">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-[#1B4332] font-medium hover:underline">
                            Sign up
                        </Link>
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}