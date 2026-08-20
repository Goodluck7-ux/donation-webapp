'use client';

import Link from 'next/link';
import { motion, type Variants } from 'motion/react';
import {
    ArrowUpRight,
    BarChart3,
    CirclePlus,
    FolderOpen,
    Heart,
    TrendingUp,
} from 'lucide-react';

import { useMyCampaigns } from '@/hooks/useManager';

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

function formatCurrency(value: number) {
    return `₦${value.toLocaleString()}`;
}

function getProgress(current: number, goal: number) {
    if (!goal || goal <= 0) return 0;
    return Math.min(Math.round((current / goal) * 100), 100);
}

function getStatusStyles(status: string) {
    switch (status.toUpperCase()) {
        case 'ACTIVE':
            return {
                dot: 'bg-[#52B788]',
                badge: 'bg-[#EAF6EF] text-[#2D6A4F]',
            };

        case 'COMPLETED':
            return {
                dot: 'bg-[#E8703A]',
                badge: 'bg-[#FFF1E9] text-[#B95C31]',
            };

        case 'PENDING':
            return {
                dot: 'bg-[#D7A936]',
                badge: 'bg-[#FFF8E5] text-[#8B6A18]',
            };

        default:
            return {
                dot: 'bg-[#8A978F]',
                badge: 'bg-[#F1F3F1] text-[#657169]',
            };
    }
}

export default function ManagerDashboard() {
    const { data: campaigns, isLoading } = useMyCampaigns();

    const totalRaised =
        campaigns?.reduce(
            (sum, campaign) => sum + Number(campaign.currentAmount),
            0,
        ) ?? 0;

    const totalGoal =
        campaigns?.reduce(
            (sum, campaign) => sum + Number(campaign.goalAmount),
            0,
        ) ?? 0;

    const overallProgress = getProgress(totalRaised, totalGoal);

    return (
        <main className="min-h-screen bg-[#FBF9F3]">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10"
            >
                {/* HEADER */}
                <motion.header
                    variants={itemVariants}
                    className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
                >
                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#E8703A]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#E8703A]" />
                            Campaign workspace
                        </div>

                        <h1 className="font-display text-3xl tracking-tight text-[#173B2B] sm:text-4xl">
                            Your campaigns.
                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-[#718177] sm:text-base">
                            Keep an eye on your campaigns, follow their progress,
                            and stay close to the impact you're creating.
                        </p>
                    </div>

                    <Link
                        href="/admin/campaigns/new"
                        className="group inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#1B4332] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(27,67,50,0.14)] transition-all hover:-translate-y-0.5 hover:bg-[#143526] hover:shadow-[0_14px_30px_rgba(27,67,50,0.19)]"
                    >
                        <CirclePlus size={17} />
                        New campaign
                        <ArrowUpRight
                            size={16}
                            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                    </Link>
                </motion.header>

                {/* OVERVIEW CARDS */}
                <motion.section
                    variants={itemVariants}
                    className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {/* TOTAL RAISED */}
                    <div className="group relative overflow-hidden rounded-2xl border border-[#DDE7DF] bg-white p-5 shadow-[0_8px_30px_rgba(27,67,50,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(27,67,50,0.07)]">
                        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#B7E4C7]/20 blur-2xl" />

                        <div className="relative">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#82938A]">
                                    Total raised
                                </p>

                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EDF7F0] text-[#2D6A4F]">
                                    <TrendingUp size={17} />
                                </div>
                            </div>

                            <p className="mt-5 font-display text-2xl tracking-tight text-[#173B2B] sm:text-3xl">
                                {formatCurrency(totalRaised)}
                            </p>

                            <p className="mt-1 text-xs text-[#8A978F]">
                                Across all your campaigns
                            </p>
                        </div>
                    </div>

                    {/* CAMPAIGNS */}
                    <div className="group rounded-2xl border border-[#DDE7DF] bg-white p-5 shadow-[0_8px_30px_rgba(27,67,50,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(27,67,50,0.07)]">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#82938A]">
                                Campaigns
                            </p>

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5F1E8] text-[#8B6A18]">
                                <FolderOpen size={17} />
                            </div>
                        </div>

                        <p className="mt-5 font-display text-2xl tracking-tight text-[#173B2B] sm:text-3xl">
                            {campaigns?.length ?? 0}
                        </p>

                        <p className="mt-1 text-xs text-[#8A978F]">
                            Campaigns you're managing
                        </p>
                    </div>

                    {/* OVERALL PROGRESS */}
                    <div className="rounded-2xl border border-[#DDE7DF] bg-[#173B2B] p-5 shadow-[0_8px_30px_rgba(27,67,50,0.08)] sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#B7E4C7]/60">
                                Overall progress
                            </p>

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-[#B7E4C7]">
                                <BarChart3 size={17} />
                            </div>
                        </div>

                        <div className="mt-5 flex items-end justify-between gap-4">
                            <p className="font-display text-2xl tracking-tight text-white sm:text-3xl">
                                {overallProgress}%
                            </p>

                            <p className="text-xs text-[#D3E6D8]/50">
                                toward combined goals
                            </p>
                        </div>

                        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${overallProgress}%` }}
                                transition={{
                                    duration: 1,
                                    delay: 0.3,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="h-full rounded-full bg-[#74C69D]"
                            />
                        </div>
                    </div>
                </motion.section>

                {/* CAMPAIGNS */}
                <motion.section
                    variants={itemVariants}
                    className="mt-8"
                >
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="font-display text-xl text-[#173B2B]">
                                Your campaigns
                            </h2>

                            <p className="mt-1 text-sm text-[#82938A]">
                                Manage and monitor your active causes.
                            </p>
                        </div>

                        {campaigns && campaigns.length > 0 && (
                            <span className="hidden rounded-full bg-[#EFF5F0] px-3 py-1 text-xs font-medium text-[#527064] sm:inline-flex">
                                {campaigns.length}{' '}
                                {campaigns.length === 1
                                    ? 'campaign'
                                    : 'campaigns'}
                            </span>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="rounded-2xl border border-[#DDE7DF] bg-white p-6 shadow-[0_8px_30px_rgba(27,67,50,0.04)]">
                            <div className="space-y-5">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="animate-pulse"
                                    >
                                        <div className="h-4 w-1/3 rounded bg-[#EDF1ED]" />
                                        <div className="mt-3 h-2 w-full rounded-full bg-[#F1F3F1]" />
                                        <div className="mt-3 h-3 w-1/4 rounded bg-[#F1F3F1]" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : campaigns && campaigns.length > 0 ? (
                        <div className="overflow-hidden rounded-2xl border border-[#DDE7DF] bg-white shadow-[0_8px_30px_rgba(27,67,50,0.04)]">
                            {/* Desktop header */}
                            <div className="hidden border-b border-[#E8EEE9] bg-[#FAFCFA] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#82938A] sm:grid sm:grid-cols-[1.6fr_0.7fr_1.2fr_auto] sm:items-center sm:gap-5">
                                <span>Campaign</span>
                                <span>Status</span>
                                <span>Progress</span>
                                <span />
                            </div>

                            <div className="divide-y divide-[#E8EEE9]">
                                {campaigns.map((campaign) => {
                                    const current = Number(
                                        campaign.currentAmount,
                                    );
                                    const goal = Number(
                                        campaign.goalAmount,
                                    );
                                    const progress = getProgress(
                                        current,
                                        goal,
                                    );

                                    const statusStyles =
                                        getStatusStyles(campaign.status);

                                    return (
                                        <motion.div
                                            key={campaign.id}
                                            initial={{
                                                opacity: 0,
                                                y: 8,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            transition={{
                                                duration: 0.35,
                                            }}
                                            className="group px-5 py-5 transition-colors hover:bg-[#FCFDFB] sm:grid sm:grid-cols-[1.6fr_0.7fr_1.2fr_auto] sm:items-center sm:gap-5"
                                        >
                                            {/* Campaign */}
                                            <div className="min-w-0">
                                                <div className="flex items-start gap-3">
                                                    <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EFF5F0] text-[#2D6A4F]">
                                                        <Heart
                                                            size={16}
                                                            fill="currentColor"
                                                        />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-semibold text-[#173B2B]">
                                                            {campaign.title}
                                                        </p>

                                                        <p className="mt-1 text-xs text-[#9AA69F] sm:hidden">
                                                            {formatCurrency(
                                                                current,
                                                            )}{' '}
                                                            raised
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Status */}
                                            <div className="mt-4 sm:mt-0">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyles.badge}`}
                                                >
                                                    <span
                                                        className={`h-1.5 w-1.5 rounded-full ${statusStyles.dot}`}
                                                    />
                                                    {campaign.status}
                                                </span>
                                            </div>

                                            {/* Progress */}
                                            <div className="mt-4 sm:mt-0">
                                                <div className="flex items-center justify-between gap-3">
                                                    <span className="text-xs font-medium text-[#527064]">
                                                        {formatCurrency(current)}
                                                    </span>

                                                    <span className="text-[11px] text-[#9AA69F]">
                                                        {progress}%
                                                    </span>
                                                </div>

                                                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#EDF1ED]">
                                                    <div
                                                        style={{
                                                            width: `${progress}%`,
                                                        }}
                                                        className="h-full rounded-full bg-[#52B788] transition-all"
                                                    />
                                                </div>

                                                <p className="mt-1.5 text-[11px] text-[#A1AEA6]">
                                                    of{' '}
                                                    {formatCurrency(goal)}
                                                </p>
                                            </div>

                                            {/* Action */}
                                            <div className="mt-4 sm:mt-0 sm:text-right">
                                                <Link
                                                    href={`/admin/campaigns/${campaign.id}/edit`}
                                                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#2D6A4F] transition-colors hover:bg-[#EFF5F0] hover:text-[#173B2B]"
                                                >
                                                    Edit
                                                    <ArrowUpRight
                                                        size={14}
                                                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                                    />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-[#CBD9CF] bg-white px-6 py-14 text-center shadow-[0_8px_30px_rgba(27,67,50,0.03)]">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EFF5F0] text-[#2D6A4F]">
                                <FolderOpen size={21} />
                            </div>

                            <h3 className="mt-4 font-display text-xl text-[#173B2B]">
                                No campaigns yet
                            </h3>

                            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#82938A]">
                                Create your first campaign and start turning
                                generosity into meaningful impact.
                            </p>

                            <Link
                                href="/admin/campaigns/new"
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1B4332] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#143526]"
                            >
                                <CirclePlus size={16} />
                                Create campaign
                            </Link>
                        </div>
                    )}
                </motion.section>
            </motion.div>
        </main>
    );
}