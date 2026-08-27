'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCampaigns } from '@/hooks/useCampaigns';

type CampaignCategory =
    | 'education'
    | 'clean-water'
    | 'environment'
    | 'health'
    | 'emergency-relief';

type Campaign = {
    id: string;
    title: string;
    description: string;
    currentAmount: number | string;
    goalAmount: number | string;
    imageUrl?: string | null;
    category: CampaignCategory;
};

const categories: {
    value: 'all' | CampaignCategory;
    label: string;
}[] = [
        { value: 'all', label: 'All causes' },
        { value: 'education', label: 'Education' },
        { value: 'clean-water', label: 'Clean water' },
        { value: 'environment', label: 'Environment' },
        { value: 'health', label: 'Health' },
        { value: 'emergency-relief', label: 'Emergency relief' },
    ];

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 24,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
};

export default function CampaignsPage() {
    const { data: campaigns, isLoading, isError } = useCampaigns();

    const [activeCategory, setActiveCategory] = useState<
    'all' | CampaignCategory
        > ('all');
        

    const [search, setSearch] = useState('');

    const campaignData = (campaigns ?? []) as Campaign[];

    const filteredCampaigns = useMemo(() => {
        return campaignData.filter((campaign) => {
            const matchesCategory =
                activeCategory === 'all' ||
                campaign.category === activeCategory;

            const searchTerm = search.trim().toLowerCase();

            const matchesSearch =
                !searchTerm ||
                campaign.title.toLowerCase().includes(searchTerm) ||
                campaign.description.toLowerCase().includes(searchTerm);

            return matchesCategory && matchesSearch;
        });
    }, [campaignData, activeCategory, search]);

    const featuredCampaign = useMemo(() => {
        if (filteredCampaigns.length === 0) return null;

        return [...filteredCampaigns].sort((a, b) => {
            const aPercentage =
                Number(a.currentAmount) / Number(a.goalAmount || 1);

            const bPercentage =
                Number(b.currentAmount) / Number(b.goalAmount || 1);

            return bPercentage - aPercentage;
        })[0];
    }, [filteredCampaigns]);

    const remainingCampaigns = useMemo(() => {
        if (!featuredCampaign) return [];

        return filteredCampaigns.filter(
            (campaign) => campaign.id !== featuredCampaign.id,
        );
    }, [filteredCampaigns, featuredCampaign]);

    const categoryCounts = useMemo(() => {
        return categories.reduce(
            (acc, category) => {
                if (category.value === 'all') {
                    acc[category.value] = campaignData.length;
                } else {
                    acc[category.value] = campaignData.filter(
                        (campaign) => campaign.category === category.value,
                    ).length;
                }

                return acc;
            },
            {} as Record<string, number>,
        );
    }, [campaignData]);

    return (
        <main className="min-h-screen overflow-hidden bg-base text-text-primary">
            <Navbar />

            <section className="relative border-b border-border-subtle">
                <div className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-subtle opacity-50 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-24 lg:px-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="mx-auto max-w-4xl text-center"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-hover sm:text-xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-hover" />
                            {campaignData.length} active causes
                        </span>

                        <h1 className="mt-6 font-display text-[3.2rem] leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-7xl">
                            Find a cause
                            <br />
                            <em className="font-normal text-accent-hover">
                                worth believing in.
                            </em>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-7 text-text-secondary sm:text-lg">
                            Discover vetted campaigns making a measurable
                            difference in communities around the world.
                            Choose a cause and make your contribution count.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="mx-auto mt-12 grid max-w-4xl grid-cols-3 divide-x divide-border-subtle rounded-2xl border border-border-subtle bg-surface"
                    >
                        <div className="px-3 py-5 text-center sm:px-6">
                            <p className="font-display text-2xl sm:text-3xl">
                                {campaignData.length}
                            </p>

                            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-text-muted sm:text-[10px]">
                                Active causes
                            </p>
                        </div>

                        <div className="px-3 py-5 text-center sm:px-6">
                            <p className="font-display text-2xl sm:text-3xl">
                                {campaignData.reduce(
                                    (total, campaign) =>
                                        total + Number(campaign.currentAmount),
                                    0,
                                ) > 0
                                    ? `₦${(
                                        campaignData.reduce(
                                            (total, campaign) =>
                                                total +
                                                Number(
                                                    campaign.currentAmount,
                                                ),
                                            0,
                                        ) / 1000000
                                    ).toFixed(1)}M`
                                    : '₦0'}
                            </p>

                            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-text-muted sm:text-[10px]">
                                Raised
                            </p>
                        </div>

                        <div className="px-3 py-5 text-center sm:px-6">
                            <p className="font-display text-2xl sm:text-3xl">
                                100%
                            </p>

                            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-text-muted sm:text-[10px]">
                                Transparent
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="sticky top-0 z-30 border-b border-border-subtle bg-base/95 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative w-full lg:max-w-xs">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
                            >
                                <circle cx="11" cy="11" r="7" />
                                <path d="m20 20-4-4" />
                            </svg>

                            <input
                                type="search"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search campaigns..."
                                className="w-full rounded-full border border-border bg-surface py-3 pl-11 pr-4 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/10"
                            />
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
                            {categories.map((category) => {
                                const active =
                                    activeCategory === category.value;

                                return (
                                    <button
                                        key={category.value}
                                        type="button"
                                        onClick={() =>
                                            setActiveCategory(category.value)
                                        }
                                        className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition-all duration-300 ${active
                                            ? 'bg-brand text-white shadow-sm'
                                            : 'border border-border bg-surface text-text-secondary hover:border-border-hover hover:text-text-primary'
                                            }`}
                                    >
                                        {category.label}

                                        <span
                                            className={`rounded-full px-1.5 py-0.5 text-[9px] ${active
                                                ? 'bg-white/15 text-white'
                                                : 'bg-subtle text-text-muted'
                                                }`}
                                        >
                                            {categoryCounts[category.value] ??
                                                0}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
                <div className="mx-auto max-w-6xl">
                    {isError && (
                        <div className="rounded-3xl border border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-500/10 px-6 py-16 text-center">
                            <h2 className="font-display text-2xl text-red-800 dark:text-red-300">
                                We couldn't load the campaigns.
                            </h2>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-red-600 dark:text-red-400/80">
                                Please refresh the page and try again.
                            </p>

                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="mt-6 rounded-full bg-brand px-6 py-3 text-xs font-bold text-white transition hover:brightness-110"
                            >
                                Try again
                            </button>
                        </div>
                    )}

                    {isLoading && (
                        <div className="flex min-h-[320px] items-center justify-center">
                            <div className="flex items-center gap-3 text-sm text-text-secondary">
                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-border-subtle border-t-accent-hover" />
                                Loading campaigns...
                            </div>
                        </div>
                    )}

                    {!isLoading && !isError && (
                        <>
                            {featuredCampaign && (
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{
                                        once: true,
                                        margin: '-100px',
                                    }}
                                    variants={fadeUp}
                                >
                                    <div className="mb-7">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-highlight">
                                            ✦ Featured campaign
                                        </p>

                                        <p className="mt-1 text-sm text-text-muted">
                                            A cause currently making an impact
                                        </p>
                                    </div>

                                    <FeaturedCampaign
                                        campaign={featuredCampaign}
                                    />
                                </motion.div>
                            )}

                            <div className="mt-20">
                                <div className="mb-9 flex items-end justify-between">
                                    <div>
                                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-highlight">
                                            Explore
                                        </p>

                                        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
                                            More ways to make a difference.
                                        </h2>
                                    </div>

                                    <p className="hidden text-xs text-text-muted sm:block">
                                        {filteredCampaigns.length}{' '}
                                        {filteredCampaigns.length === 1
                                            ? 'campaign'
                                            : 'campaigns'}
                                    </p>
                                </div>

                                <AnimatePresence mode="popLayout">
                                    {remainingCampaigns.length > 0 ? (
                                        <motion.div
                                            layout
                                            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                                        >
                                            {remainingCampaigns.map(
                                                (campaign, index) => (
                                                    <CampaignCard
                                                        key={campaign.id}
                                                        campaign={campaign}
                                                        index={index}
                                                    />
                                                ),
                                            )}
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: 15,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            className="rounded-3xl border border-border-subtle bg-surface px-6 py-20 text-center"
                                        >
                                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-xl text-accent-hover">
                                                ✦
                                            </div>

                                            <h3 className="mt-6 font-display text-2xl text-text-primary">
                                                No campaigns found.
                                            </h3>

                                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-text-secondary">
                                                Try another search term or
                                                choose a different cause.
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSearch('');
                                                    setActiveCategory('all');
                                                }}
                                                className="mt-6 rounded-full bg-brand px-6 py-3 text-xs font-bold text-white transition hover:brightness-110"
                                            >
                                                View all campaigns
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <section className="bg-subtle px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true,
                                margin: '-100px',
                            }}
                            variants={fadeUp}
                        >
                            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-highlight">
                                Why give with Finovia
                            </p>

                            <h2 className="font-display text-4xl leading-tight tracking-tight sm:text-5xl">
                                Giving should feel
                                <br />
                                <em className="font-normal text-accent-hover">
                                    trustworthy.
                                </em>
                            </h2>

                            <p className="mt-5 max-w-md text-sm leading-7 text-text-secondary">
                                Your generosity deserves transparency. Every
                                campaign is presented with clear funding
                                information so you can understand the impact
                                you're supporting.
                            </p>
                        </motion.div>

                        <div className="space-y-4">
                            <TrustItem
                                number="01"
                                title="Vetted campaigns"
                                description="Campaigns are reviewed before being made available to donors."
                            />

                            <TrustItem
                                number="02"
                                title="Transparent funding"
                                description="See how much each campaign has raised and what remains to reach its goal."
                            />

                            <TrustItem
                                number="03"
                                title="Measurable impact"
                                description="Follow campaign progress and discover the real-world difference your support creates."
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        margin: '-100px',
                    }}
                    variants={fadeUp}
                    className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-brand"
                >
                    <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border-[50px] border-accent-hover/20" />

                    <div className="relative px-7 py-14 text-center sm:px-12 sm:py-16">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-focus-ring">
                            Make your contribution count
                        </p>

                        <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
                            One decision can change a life.
                        </h2>

                        <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/70">
                            Find a campaign you believe in and help move it
                            closer to its goal.
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                });
                            }}
                            className="mt-8 inline-flex rounded-full bg-highlight px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95"
                        >
                            Explore causes
                            <span className="ml-2">↑</span>
                        </button>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}

function FeaturedCampaign({
    campaign,
}: {
    campaign: Campaign;
}) {
    const current = Number(campaign.currentAmount) || 0;
    const goal = Number(campaign.goalAmount) || 1;

    const percentage = Math.min(
        100,
        Math.round((current / goal) * 100),
    );

    return (
        <Link
            href={`/campaigns/${campaign.id}`}
            className="group grid overflow-hidden rounded-[2rem] border border-border-subtle bg-surface shadow-[0_10px_40px_rgba(40,50,40,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(40,50,40,0.1)] lg:grid-cols-[1.15fr_0.85fr]"
        >
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[480px]">
                {campaign.imageUrl ? (
                    <img
                        src={campaign.imageUrl}
                        alt={campaign.title}
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full min-h-[320px] items-center justify-center bg-accent/10">
                        <span className="font-display text-6xl text-accent-hover">
                            ✦
                        </span>
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-brand/35 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 rounded-full bg-surface/95 px-4 py-2 text-xs font-bold text-accent-hover shadow-lg">
                    {percentage}% funded
                </div>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-highlight">
                    {formatCategory(campaign.category)}
                </p>

                <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight text-text-primary sm:text-4xl">
                    {campaign.title}
                </h2>

                <p className="mt-4 line-clamp-4 text-sm leading-7 text-text-secondary">
                    {campaign.description}
                </p>

                <div className="mt-8">
                    <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="font-bold text-accent-hover">
                            {percentage}% funded
                        </span>

                        <span className="text-text-muted">
                            ₦{current.toLocaleString()}
                        </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-subtle">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{
                                width: `${percentage}%`,
                            }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 1.2,
                                ease: 'easeOut',
                            }}
                            className="h-full rounded-full bg-accent-hover"
                        />
                    </div>

                    <p className="mt-2 text-[10px] text-text-muted">
                        Goal: ₦{goal.toLocaleString()}
                    </p>
                </div>

                <div className="mt-9 inline-flex w-fit rounded-full bg-highlight px-6 py-3 text-xs font-bold text-white transition-all duration-300 group-hover:brightness-95">
                    Support this campaign
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                        →
                    </span>
                </div>
            </div>
        </Link>
    );
}

function CampaignCard({
    campaign,
    index,
}: {
    campaign: Campaign;
    index: number;
}) {
    const current = Number(campaign.currentAmount) || 0;
    const goal = Number(campaign.goalAmount) || 1;

    const percentage = Math.min(
        100,
        Math.round((current / goal) * 100),
    );

    return (
        <motion.div
            layout
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.45,
                delay: (index % 3) * 0.07,
            }}
        >
            <Link
                href={`/campaigns/${campaign.id}`}
                className="group block overflow-hidden rounded-3xl border border-border-subtle bg-surface transition-all duration-400 hover:-translate-y-1 hover:border-border-hover hover:shadow-[0_18px_45px_rgba(40,50,40,0.08)]"
            >
                <div className="relative aspect-[4/3] overflow-hidden bg-subtle">
                    {campaign.imageUrl ? (
                        <img
                            src={campaign.imageUrl}
                            alt={campaign.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-accent/10">
                            <span className="font-display text-5xl text-accent-hover">
                                ✦
                            </span>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-brand/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <span className="absolute left-4 top-4 rounded-full bg-surface/95 px-3 py-1.5 text-[10px] font-bold text-accent-hover shadow-sm">
                        {formatCategory(campaign.category)}
                    </span>
                </div>

                <div className="p-5">
                    <h3 className="font-display text-xl leading-tight text-text-primary">
                        {campaign.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-text-secondary">
                        {campaign.description}
                    </p>

                    <div className="mt-5">
                        <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wide">
                            <span className="text-accent-hover">
                                {percentage}% funded
                            </span>

                            <span className="text-text-muted">
                                ₦{current.toLocaleString()}
                            </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-subtle">
                            <motion.div
                                initial={{
                                    width: 0,
                                }}
                                whileInView={{
                                    width: `${percentage}%`,
                                }}
                                viewport={{
                                    once: true,
                                }}
                                transition={{
                                    duration: 0.9,
                                    ease: 'easeOut',
                                }}
                                className="h-full rounded-full bg-accent-hover"
                            />
                        </div>

                        <div className="mt-2 flex justify-between text-[10px] text-text-muted">
                            <span>
                                ₦{current.toLocaleString()} raised
                            </span>

                            <span>
                                Goal ₦{goal.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-border-subtle pt-4">
                        <span className="text-[10px] font-medium uppercase tracking-wide text-text-muted">
                            Make an impact
                        </span>

                        <span className="text-xs font-bold text-accent-hover transition-transform duration-300 group-hover:translate-x-1">
                            View campaign →
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

function TrustItem({
    number,
    title,
    description,
}: {
    number: string;
    title: string;
    description: string;
}) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
                once: true,
                margin: '-80px',
            }}
            variants={fadeUp}
            className="group flex gap-5 rounded-2xl border border-border-subtle bg-surface p-5 transition-all duration-300 hover:-translate-x-1 hover:shadow-[0_12px_30px_rgba(40,50,40,0.05)]"
        >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[10px] font-bold text-accent-hover">
                {number}
            </div>

            <div>
                <h3 className="font-display text-lg text-text-primary">
                    {title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-text-secondary">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}

function formatCategory(category: CampaignCategory) {
    const labels: Record<CampaignCategory, string> = {
        education: 'Education',
        'clean-water': 'Clean water',
        environment: 'Environment',
        health: 'Health',
        'emergency-relief': 'Emergency relief',
    };

    return labels[category];
}