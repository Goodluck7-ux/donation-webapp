'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, type Variants } from 'motion/react';
import {
    ShieldCheck,
    Users,
    TrendingUp,
    ArrowUpRight,
    Heart,
    CheckCircle2,
} from 'lucide-react';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCampaign } from '@/hooks/useCampaigns';
import { useDonate } from '@/hooks/useDonate';
import { useProfile } from '@/hooks/userProfile';

const fadeUp: Variants = {
    hidden: {
        opacity: 0,
        y: 24,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

export default function CampaignDetailPage() {
    const { id } = useParams<{ id: string }>();

    const { data: campaign, isLoading } = useCampaign(id);
    const [amount, setAmount] = useState(5000);

    const donate = useDonate();
    const { data: profile } = useProfile();
    const isGuest = !profile;
    const [guestName, setGuestName] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const [anonymous, setAnonymous] = useState(false);

    if (isLoading || !campaign) {
        return (
            <div className="min-h-screen bg-[#FBF9F3]">
                <Navbar />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
                    <div className="space-y-6 animate-pulse">
                        <div className="h-[420px] rounded-[2rem] bg-[#E8EDE8]" />
                        <div className="h-8 w-1/2 rounded bg-[#E8EDE8]" />
                        <div className="h-4 w-2/3 rounded bg-[#E8EDE8]" />
                    </div>
                </div>
            </div>
        );
    }

    const pct = Math.min(
        100,
        (Number(campaign.currentAmount) / Number(campaign.goalAmount)) * 100,
    );

    const imageUrl = (campaign as any).imageUrl;

    const presetAmounts = [2500, 5000, 10000, 25000];

    return (
        <div className="min-h-screen bg-[#FBF9F3] text-[#173B2B] overflow-x-hidden">
            <Navbar />

            {/* HERO */}
            <section className="px-4 sm:px-6 pt-4 sm:pt-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative max-w-7xl mx-auto h-[420px] sm:h-[500px] lg:h-[570px] rounded-[1.75rem] sm:rounded-[2.25rem] overflow-hidden"
                >
                    {imageUrl ? (
                        <motion.img
                            initial={{ scale: 1.06 }}
                            animate={{ scale: 1 }}
                            transition={{
                                duration: 1.4,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            src={imageUrl}
                            alt={campaign.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0B2418] via-[#1B4332] to-[#40916C]" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#071A11]/90 via-[#0B2418]/25 to-transparent" />

                    {/* Decorative glow */}
                    <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#B7E4C7]/15 blur-3xl" />

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14"
                    >
                        <motion.div variants={fadeUp}>
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-white">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#B7E4C7]" />
                                {campaign.status}
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={fadeUp}
                            className="mt-4 max-w-4xl font-display text-3xl sm:text-5xl lg:text-6xl leading-[1.04] tracking-tight text-white"
                        >
                            {campaign.title}
                        </motion.h1>

                        <motion.div
                            variants={fadeUp}
                            className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#E9F5EC]/80"
                        >
                            <span className="flex items-center gap-2">
                                <CheckCircle2 size={16} />
                                Verified campaign
                            </span>

                            <span className="w-1 h-1 rounded-full bg-white/40" />

                            <span>
                                {Math.round(pct)}% funded
                            </span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>

            {/* CONTENT */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
                <div className="grid lg:grid-cols-[1fr_390px] gap-10 lg:gap-16 items-start">

                    {/* LEFT */}
                    <div className="space-y-12">

                        {/* Stats */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={staggerContainer}
                            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                        >
                            {[
                                {
                                    icon: TrendingUp,
                                    value: `${Math.round(pct)}%`,
                                    label: 'Funded',
                                },
                                {
                                    icon: ShieldCheck,
                                    value: 'Verified',
                                    label: 'Campaign',
                                },
                                {
                                    icon: Users,
                                    value: '100%',
                                    label: 'To the field',
                                },
                            ].map((stat) => {
                                const Icon = stat.icon;

                                return (
                                    <motion.div
                                        key={stat.label}
                                        variants={fadeUp}
                                        whileHover={{ y: -4 }}
                                        className="group rounded-2xl border border-[#DCE7DF] bg-white/70 p-5 transition-all duration-300 hover:border-[#9BC5AA] hover:shadow-[0_14px_40px_rgba(27,67,50,0.08)]"
                                    >
                                        <Icon
                                            size={19}
                                            strokeWidth={1.7}
                                            className="text-[#2D6A4F] transition-transform duration-300 group-hover:scale-110"
                                        />

                                        <p className="mt-4 font-display text-2xl text-[#173B2B]">
                                            {stat.value}
                                        </p>

                                        <p className="mt-1 text-sm text-[#6C8175]">
                                            {stat.label}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* About */}
                        <motion.section
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeUp}
                            className="space-y-5"
                        >
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#E8703A]">
                                    The story
                                </p>

                                <h2 className="mt-2 font-display text-3xl sm:text-4xl text-[#173B2B]">
                                    About this campaign
                                </h2>
                            </div>

                            <div className="max-w-3xl text-[#5C7165] leading-8 text-[15px] sm:text-base whitespace-pre-line">
                                {campaign.description}
                            </div>
                        </motion.section>

                        {/* Trust section */}
                        <motion.section
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={fadeUp}
                            className="rounded-3xl bg-[#EAF3EC] border border-[#D6E7DA] p-6 sm:p-8"
                        >
                            <div className="flex gap-4">
                                <div className="shrink-0 w-11 h-11 rounded-full bg-[#1B4332] text-white flex items-center justify-center">
                                    <ShieldCheck size={21} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-[#173B2B]">
                                        Your donation is tracked
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-[#5C7165]">
                                        Every campaign on Finovia is reviewed before
                                        it goes live. Donations are tracked through
                                        the campaign lifecycle so supporters can
                                        see where their contribution creates impact.
                                    </p>
                                </div>
                            </div>
                        </motion.section>
                    </div>

                    {/* DONATION PANEL */}
                    <motion.aside
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.65,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="lg:sticky lg:top-24"
                    >
                        <div className="relative rounded-[1.75rem] border border-[#D7E4DA] bg-white p-5 sm:p-7 shadow-[0_20px_60px_rgba(27,67,50,0.08)]">

                            {/* small decorative glow */}
                            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#B7E4C7]/25 blur-2xl pointer-events-none" />

                            <div className="relative space-y-6">
                                {isGuest && (
                                    <div className="space-y-3">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-[#315044]">Full name</label>
                                            <input
                                                value={guestName}
                                                onChange={(e) => setGuestName(e.target.value)}
                                                placeholder="Your name"
                                                className="w-full rounded-xl border border-[#D5E1D8] bg-white px-4 py-3 text-sm outline-none focus:border-[#2D6A4F] focus:ring-4 focus:ring-[#B7E4C7]/30"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-[#315044]">Email</label>
                                            <input
                                                type="email"
                                                required
                                                value={guestEmail}
                                                onChange={(e) => setGuestEmail(e.target.value)}
                                                placeholder="you@example.com"
                                                className="w-full rounded-xl border border-[#D5E1D8] bg-white px-4 py-3 text-sm outline-none focus:border-[#2D6A4F] focus:ring-4 focus:ring-[#B7E4C7]/30"
                                            />
                                        </div>
                                        <label className="flex items-center gap-2 text-sm text-[#5C7165]">
                                            <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="rounded" />
                                            Make my donation anonymous
                                        </label>
                                    </div>
                                )}

                                {/* Progress */}
                                <div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.14em] text-[#789083]">
                                                Raised
                                            </p>

                                            <p className="mt-1 font-display text-2xl text-[#173B2B]">
                                                ₦{Number(campaign.currentAmount).toLocaleString()}
                                            </p>
                                        </div>

                                        <p className="text-sm text-[#789083]">
                                            of ₦{Number(campaign.goalAmount).toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="mt-4 h-2.5 bg-[#E7EFE9] rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${pct}%` }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 1,
                                                delay: 0.15,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                            className="h-full rounded-full bg-gradient-to-r from-[#1B4332] to-[#52B788]"
                                        />
                                    </div>

                                    <div className="mt-2 flex justify-between text-xs text-[#789083]">
                                        <span>{Math.round(pct)}% funded</span>
                                        <span>
                                            ₦{Math.max(
                                                0,
                                                Number(campaign.goalAmount) -
                                                Number(campaign.currentAmount),
                                            ).toLocaleString()} left
                                        </span>
                                    </div>
                                </div>

                                <div className="h-px bg-[#E7EEE9]" />

                                {/* Amount */}
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-[#173B2B]">
                                            Make a contribution
                                        </h3>

                                        <p className="mt-1 text-sm text-[#789083]">
                                            Every amount moves this campaign forward.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2.5">
                                        {presetAmounts.map((preset) => {
                                            const active = amount === preset;

                                            return (
                                                <motion.button
                                                    key={preset}
                                                    type="button"
                                                    whileTap={{ scale: 0.97 }}
                                                    onClick={() => setAmount(preset)}
                                                    className={`rounded-xl border px-3 py-3 text-sm font-medium transition-all duration-200 ${active
                                                        ? 'border-[#1B4332] bg-[#EAF3EC] text-[#1B4332] shadow-sm'
                                                        : 'border-[#D9E4DC] bg-[#FCFDFC] text-[#61756A] hover:border-[#9BC5AA] hover:bg-[#F3F8F4]'
                                                        }`}
                                                >
                                                    ₦{preset.toLocaleString()}
                                                </motion.button>
                                            );
                                        })}
                                    </div>

                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#789083]">
                                            ₦
                                        </span>

                                        <input
                                            type="number"
                                            min={100}
                                            value={amount}
                                            onChange={(e) =>
                                                setAmount(Number(e.target.value))
                                            }
                                            className="w-full rounded-xl border border-[#D9E4DC] bg-[#FCFDFC] py-3.5 pl-9 pr-4 text-sm text-[#173B2B] outline-none transition-all focus:border-[#2D6A4F] focus:ring-4 focus:ring-[#B7E4C7]/30"
                                        />
                                    </div>
                                </div>

                                {/* Donate */}
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.985 }}
                                    onClick={() =>
                                        donate.mutate({
                                            campaignId: campaign.id,
                                            amount,
                                            ...(isGuest && { donorName: guestName, email: guestEmail, anonymous }),
                                        })
                                    }
                                    disabled={donate.isPending || amount < 100 || (isGuest && !guestEmail)}
                                    className="group w-full rounded-xl bg-[#1B4332] text-white py-3.5 text-sm font-semibold shadow-[0_10px_25px_rgba(27,67,50,0.2)] transition-all hover:bg-[#143526] hover:shadow-[0_14px_30px_rgba(27,67,50,0.25)] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        {donate.isPending
                                            ? 'Redirecting…'
                                            : `Donate ₦${amount.toLocaleString()}`}

                                        {!donate.isPending && (
                                            <ArrowUpRight
                                                size={17}
                                                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                            />
                                        )}
                                    </span>
                                </motion.button>

                                {donate.isError && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="rounded-xl bg-[#FFF0EC] border border-[#F5D1C7] px-3 py-2 text-sm text-[#B84A2F]"
                                    >
                                        {(donate.error as Error).message}
                                    </motion.p>
                                )}

                                <p className="flex items-center justify-center gap-2 text-xs text-[#82958A]">
                                    <ShieldCheck size={14} />
                                    Secure checkout via Paystack
                                </p>

                                <div className="flex items-center justify-center gap-2 text-xs text-[#82958A]">
                                    <Heart size={13} />
                                    Your contribution creates measurable impact.
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                </div>
            </main>

            <Footer />
        </div>
    );
}