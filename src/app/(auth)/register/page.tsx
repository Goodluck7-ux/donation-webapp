'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, type Variants } from 'motion/react';
import { toast } from 'sonner';
import {
    ArrowUpRight,
    CheckCircle2,
    Eye,
    EyeOff,
    ShieldCheck,
    Sparkles,
} from 'lucide-react';

import { useRegister } from '@/hooks/useAuth';
import { Logo } from '@/components/Logo';

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 14,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
    const register = useRegister();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        register.mutate(
            { name, email, password },
            {
                onSuccess: (data) => {
                    toast.success(
                        `Welcome, ${data.user.name.split(' ')[0]}!`,
                    );

                    const role = data.user.role;

                    if (
                        role === 'PLATFORM_ADMIN' ||
                        role === 'ORG_ADMIN' ||
                        role === 'VERIFICATION_STAFF'
                    ) {
                        router.push('/admin');
                    } else if (role === 'CAMPAIGN_MANAGER') {
                        router.push('/manager');
                    } else {
                        router.push('/dashboard');
                    }
                },
            },
        );
    }

    return (
        <main className="min-h-screen bg-[#FBF9F3] grid lg:grid-cols-[1.05fr_0.95fr] overflow-hidden">

            {/* LEFT BRAND EXPERIENCE */}
            <section className="hidden lg:flex relative overflow-hidden bg-[#0B2418] p-10 xl:p-14">

                {/* Ambient shapes */}
                <motion.div
                    animate={{
                        x: [0, 25, 0],
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full bg-[#52B788]/10 blur-3xl"
                />

                <motion.div
                    animate={{
                        x: [0, -20, 0],
                        y: [0, 20, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute -bottom-48 -left-32 w-[500px] h-[500px] rounded-full bg-[#B7E4C7]/10 blur-3xl"
                />

                <div className="relative z-10 w-full flex flex-col justify-between">

                    <Logo light />

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="max-w-xl"
                    >
                        <motion.div variants={itemVariants}>
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#B7E4C7]/20 bg-white/5 px-3.5 py-1.5 text-xs text-[#B7E4C7] backdrop-blur-sm">
                                <Sparkles size={13} />
                                Give with purpose
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="mt-6 font-display text-5xl xl:text-6xl leading-[1.03] tracking-tight text-white"
                        >
                            Your generosity can become someone's{' '}
                            <span className="italic text-[#B7E4C7]">
                                tomorrow.
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="mt-6 max-w-lg text-base leading-7 text-[#D3E6D8]/65"
                        >
                            Join a community of people supporting meaningful
                            causes, following real impact, and giving with
                            confidence.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="mt-8 grid grid-cols-2 gap-3 max-w-md"
                        >
                            {[
                                'Verified campaigns',
                                'Transparent giving',
                                'Impact updates',
                                'Secure payments',
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-2 text-sm text-[#D3E6D8]/70"
                                >
                                    <CheckCircle2
                                        size={16}
                                        className="text-[#74C69D]"
                                    />
                                    {item}
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <div className="flex items-center justify-between text-xs text-[#B7E4C7]/40">
                        <span>© 2026 Finovia Giving</span>

                        <span className="flex items-center gap-1.5">
                            <ShieldCheck size={13} />
                            Secure platform
                        </span>
                    </div>
                </div>
            </section>

            {/* RIGHT REGISTER FORM */}
            <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-14">

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="w-full max-w-md"
                >

                    {/* Mobile logo */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:hidden mb-12"
                    >
                        <Logo />
                    </motion.div>

                    {/* Heading */}
                    <motion.div variants={itemVariants}>
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E8703A]">
                            Join Finovia
                        </p>

                        <h1 className="mt-2 font-display text-4xl sm:text-5xl tracking-tight text-[#173B2B]">
                            Start making an impact.
                        </h1>

                        <p className="mt-4 text-sm sm:text-base leading-6 text-[#718177]">
                            Create your account to support causes, track your
                            giving, and stay connected to the impact you help
                            create.
                        </p>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        variants={containerVariants}
                        onSubmit={handleSubmit}
                        className="mt-9 space-y-5"
                    >

                        {/* FULL NAME */}
                        <motion.div
                            variants={itemVariants}
                            className="space-y-2"
                        >
                            <label
                                htmlFor="name"
                                className="text-sm font-semibold text-[#315044]"
                            >
                                Full name
                            </label>

                            <input
                                id="name"
                                type="text"
                                required
                                autoComplete="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your full name"
                                className="w-full rounded-xl border border-[#D5E1D8] bg-white px-4 py-3.5 text-sm text-[#173B2B] placeholder:text-[#A1AEA6] outline-none transition-all focus:border-[#2D6A4F] focus:ring-4 focus:ring-[#B7E4C7]/30 hover:border-[#B8CBBE]"
                            />
                        </motion.div>

                        {/* EMAIL */}
                        <motion.div
                            variants={itemVariants}
                            className="space-y-2"
                        >
                            <label
                                htmlFor="email"
                                className="text-sm font-semibold text-[#315044]"
                            >
                                Email address
                            </label>

                            <input
                                id="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full rounded-xl border border-[#D5E1D8] bg-white px-4 py-3.5 text-sm text-[#173B2B] placeholder:text-[#A1AEA6] outline-none transition-all focus:border-[#2D6A4F] focus:ring-4 focus:ring-[#B7E4C7]/30 hover:border-[#B8CBBE]"
                            />
                        </motion.div>

                        {/* PASSWORD */}
                        <motion.div
                            variants={itemVariants}
                            className="space-y-2"
                        >
                            <label
                                htmlFor="password"
                                className="text-sm font-semibold text-[#315044]"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    minLength={8}
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Create a password"
                                    className="w-full rounded-xl border border-[#D5E1D8] bg-white px-4 py-3.5 pr-12 text-sm text-[#173B2B] placeholder:text-[#A1AEA6] outline-none transition-all focus:border-[#2D6A4F] focus:ring-4 focus:ring-[#B7E4C7]/30 hover:border-[#B8CBBE]"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((value) => !value)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#82938A] hover:bg-[#EFF5F0] hover:text-[#315044] transition-colors"
                                    aria-label={
                                        showPassword
                                            ? 'Hide password'
                                            : 'Show password'
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={17} />
                                    ) : (
                                        <Eye size={17} />
                                    )}
                                </button>
                            </div>

                            <p className="text-xs text-[#8A978F]">
                                Use at least 8 characters for your password.
                            </p>
                        </motion.div>

                        {/* ERROR */}
                        {register.isError && (
                            <motion.div
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-xl border border-[#F1CEC5] bg-[#FFF1ED] px-4 py-3 text-sm text-[#B84A2F]"
                            >
                                {(register.error as Error).message}
                            </motion.div>
                        )}

                        {/* SUBMIT */}
                        <motion.button
                            variants={itemVariants}
                            type="submit"
                            disabled={register.isPending}
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.985 }}
                            className="group w-full rounded-xl bg-[#1B4332] py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(27,67,50,0.18)] transition-all hover:bg-[#143526] hover:shadow-[0_16px_34px_rgba(27,67,50,0.22)] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <span className="flex items-center justify-center gap-2">
                                {register.isPending
                                    ? 'Creating account…'
                                    : 'Create account'}

                                {!register.isPending && (
                                    <ArrowUpRight
                                        size={17}
                                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    />
                                )}
                            </span>
                        </motion.button>
                    </motion.form>

                    {/* LOGIN LINK */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-8 text-center"
                    >
                        <p className="text-sm text-[#7A887F]">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="font-semibold text-[#1B4332] hover:text-[#2D6A4F] transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </motion.div>

                    {/* SECURITY NOTE */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-8 flex items-center justify-center gap-2 text-xs text-[#9AA69F]"
                    >
                        <ShieldCheck size={14} />
                        Your account and payments are protected.
                    </motion.div>
                </motion.div>
            </section>
        </main>
    );
}