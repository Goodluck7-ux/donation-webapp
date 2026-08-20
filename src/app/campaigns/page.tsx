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
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export default function CampaignsPage() {
    const { data: campaigns, isLoading, isError } = useCampaigns();

    const [activeCategory, setActiveCategory] = useState<
        'all' | CampaignCategory
    >('all');

    const [search, setSearch] = useState('');

    const campaignData = (campaigns ?? []) as Campaign[];

    /*
     * Filter campaigns using real backend data.
     */
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

    /*
     * Featured campaign comes from the actual API.
     * We select the campaign with the highest funding percentage.
     */
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

    /*
     * Category counts are calculated from the actual campaigns.
     */
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
        <main className="min-h-screen overflow-hidden bg-[#F8F5EE] text-[#17352A]">
            <Navbar />

            {/* =====================================================
                HERO
            ===================================================== */}

            <section className="relative border-b border-[#E5DED2]">
                <div className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-[#E8E1D5] opacity-50 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-24 lg:px-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="mx-auto max-w-4xl text-center"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#D6E4DA] bg-[#EDF5EF] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#27714E] sm:text-xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#2D8B5E]" />
                            {campaignData.length} active causes
                        </span>

                        <h1 className="mt-6 font-display text-[3.2rem] leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-7xl">
                            Find a cause
                            <br />
                            <em className="font-normal text-[#27714E]">
                                worth believing in.
                            </em>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-7 text-[#718078] sm:text-lg">
                            Discover vetted campaigns making a measurable
                            difference in communities around the world.
                            Choose a cause and make your contribution count.
                        </p>
                    </motion.div>

                    {/* Real campaign statistics */}

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="mx-auto mt-12 grid max-w-4xl grid-cols-3 divide-x divide-[#DDD6CA] rounded-2xl border border-[#DED7CA] bg-[#FBF9F4]"
                    >
                        <div className="px-3 py-5 text-center sm:px-6">
                            <p className="font-display text-2xl sm:text-3xl">
                                {campaignData.length}
                            </p>

                            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[#929D96] sm:text-[10px]">
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

                            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[#929D96] sm:text-[10px]">
                                Raised
                            </p>
                        </div>

                        <div className="px-3 py-5 text-center sm:px-6">
                            <p className="font-display text-2xl sm:text-3xl">
                                100%
                            </p>

                            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[#929D96] sm:text-[10px]">
                                Transparent
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* =====================================================
                SEARCH + CATEGORY FILTERS
            ===================================================== */}

            <section className="sticky top-0 z-30 border-b border-[#E1DACE] bg-[#F8F5EE]/95 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        {/* Search */}

                        <div className="relative w-full lg:max-w-xs">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#89948D]"
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
                                className="w-full rounded-full border border-[#D8D1C5] bg-[#FBF9F4] py-3 pl-11 pr-4 text-sm text-[#294439] outline-none transition focus:border-[#3A7659] focus:ring-2 focus:ring-[#3A7659]/10"
                            />
                        </div>

                        {/* Categories */}

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
                                                ? 'bg-[#173F2C] text-white shadow-sm'
                                                : 'border border-[#D8D1C5] bg-[#FBF9F4] text-[#68756D] hover:border-[#AFA79A] hover:text-[#294439]'
                                            }`}
                                    >
                                        {category.label}

                                        <span
                                            className={`rounded-full px-1.5 py-0.5 text-[9px] ${active
                                                    ? 'bg-white/15 text-white'
                                                    : 'bg-[#ECE7DD] text-[#7B867F]'
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

            {/* =====================================================
                CONTENT
            ===================================================== */}

            <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
                <div className="mx-auto max-w-6xl">
                    {/* Error */}

                    {isError && (
                        <div className="rounded-3xl border border-[#E7C9C0] bg-[#FCF0EC] px-6 py-16 text-center">
                            <h2 className="font-display text-2xl text-[#693B31]">
                                We couldn't load the campaigns.
                            </h2>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#8C665D]">
                                Please refresh the page and try again.
                            </p>

                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="mt-6 rounded-full bg-[#173F2C] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#0F3021]"
                            >
                                Try again
                            </button>
                        </div>
                    )}

                    {/* Loading */}

                    {isLoading && (
                        <div className="flex min-h-[320px] items-center justify-center">
                            <div className="flex items-center gap-3 text-sm text-[#77847C]">
                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#C9D8CE] border-t-[#28714F]" />
                                Loading campaigns...
                            </div>
                        </div>
                    )}

                    {/* Loaded content */}

                    {!isLoading && !isError && (
                        <>
                            {/* Featured */}

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
                                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D96525]">
                                            ✦ Featured campaign
                                        </p>

                                        <p className="mt-1 text-sm text-[#87928B]">
                                            A cause currently making an impact
                                        </p>
                                    </div>

                                    <FeaturedCampaign
                                        campaign={featuredCampaign}
                                    />
                                </motion.div>
                            )}

                            {/* Campaign grid */}

                            <div className="mt-20">
                                <div className="mb-9 flex items-end justify-between">
                                    <div>
                                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D96525]">
                                            Explore
                                        </p>

                                        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
                                            More ways to make a difference.
                                        </h2>
                                    </div>

                                    <p className="hidden text-xs text-[#89938C] sm:block">
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
                                            className="rounded-3xl border border-[#DDD6CA] bg-[#FBF9F4] px-6 py-20 text-center"
                                        >
                                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E4EEE7] text-xl text-[#397A58]">
                                                ✦
                                            </div>

                                            <h3 className="mt-6 font-display text-2xl text-[#274438]">
                                                No campaigns found.
                                            </h3>

                                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#7C8880]">
                                                Try another search term or
                                                choose a different cause.
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSearch('');
                                                    setActiveCategory('all');
                                                }}
                                                className="mt-6 rounded-full bg-[#173F2C] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#0F3021]"
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

            {/* =====================================================
                TRUST SECTION
            ===================================================== */}

            <section className="bg-[#EEE9DF] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
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
                            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D96525]">
                                Why give with Finovia
                            </p>

                            <h2 className="font-display text-4xl leading-tight tracking-tight sm:text-5xl">
                                Giving should feel
                                <br />
                                <em className="font-normal text-[#28714F]">
                                    trustworthy.
                                </em>
                            </h2>

                            <p className="mt-5 max-w-md text-sm leading-7 text-[#748179]">
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

            {/* =====================================================
                CTA
            ===================================================== */}

            <section className="px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        margin: '-100px',
                    }}
                    variants={fadeUp}
                    className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#123F2C]"
                >
                    <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border-[50px] border-[#2D7657]/20" />

                    <div className="relative px-7 py-14 text-center sm:px-12 sm:py-16">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8BC8A7]">
                            Make your contribution count
                        </p>

                        <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
                            One decision can change a life.
                        </h2>

                        <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#C3D8CC]">
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
                            className="mt-8 inline-flex rounded-full bg-[#F07836] px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E66A2B]"
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

/* =========================================================
   FEATURED CAMPAIGN
========================================================= */

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
            className="group grid overflow-hidden rounded-[2rem] border border-[#DED7CA] bg-[#FBF9F4] shadow-[0_10px_40px_rgba(40,50,40,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(40,50,40,0.1)] lg:grid-cols-[1.15fr_0.85fr]"
        >
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[480px]">
                {campaign.imageUrl ? (
                    <img
                        src={campaign.imageUrl}
                        alt={campaign.title}
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full min-h-[320px] items-center justify-center bg-[#DDE9E0]">
                        <span className="font-display text-6xl text-[#629078]">
                            ✦
                        </span>
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#102D21]/35 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[#28714F] shadow-lg">
                    {percentage}% funded
                </div>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D96525]">
                    {formatCategory(campaign.category)}
                </p>

                <h2 className="mt-4 font-display text-3xl leading-tight tracking-tight text-[#1B382D] sm:text-4xl">
                    {campaign.title}
                </h2>

                <p className="mt-4 line-clamp-4 text-sm leading-7 text-[#748179]">
                    {campaign.description}
                </p>

                <div className="mt-8">
                    <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="font-bold text-[#28714F]">
                            {percentage}% funded
                        </span>

                        <span className="text-[#8E9892]">
                            ₦{current.toLocaleString()}
                        </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-[#DCE6DE]">
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
                            className="h-full rounded-full bg-[#2D8B5E]"
                        />
                    </div>

                    <p className="mt-2 text-[10px] text-[#9AA39D]">
                        Goal: ₦{goal.toLocaleString()}
                    </p>
                </div>

                <div className="mt-9 inline-flex w-fit rounded-full bg-[#E96B2C] px-6 py-3 text-xs font-bold text-white transition-all duration-300 group-hover:bg-[#D95E22]">
                    Support this campaign
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                        →
                    </span>
                </div>
            </div>
        </Link>
    );
}

/* =========================================================
   CAMPAIGN CARD
========================================================= */

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
                className="group block overflow-hidden rounded-3xl border border-[#DED7CA] bg-[#FBF9F4] transition-all duration-400 hover:-translate-y-1 hover:border-[#BDB5A7] hover:shadow-[0_18px_45px_rgba(40,50,40,0.08)]"
            >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#DDE7DF]">
                    {campaign.imageUrl ? (
                        <img
                            src={campaign.imageUrl}
                            alt={campaign.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-[#DDE9E0]">
                            <span className="font-display text-5xl text-[#6A947B]">
                                ✦
                            </span>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#102D21]/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold text-[#28714F] shadow-sm">
                        {formatCategory(campaign.category)}
                    </span>
                </div>

                <div className="p-5">
                    <h3 className="font-display text-xl leading-tight text-[#1B382D]">
                        {campaign.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#77837B]">
                        {campaign.description}
                    </p>

                    <div className="mt-5">
                        <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wide">
                            <span className="text-[#3B7257]">
                                {percentage}% funded
                            </span>

                            <span className="text-[#969F99]">
                                ₦{current.toLocaleString()}
                            </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-[#DDE6DF]">
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
                                className="h-full rounded-full bg-[#2D8B5E]"
                            />
                        </div>

                        <div className="mt-2 flex justify-between text-[10px] text-[#9AA39D]">
                            <span>
                                ₦{current.toLocaleString()} raised
                            </span>

                            <span>
                                Goal ₦{goal.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-[#E5DFD4] pt-4">
                        <span className="text-[10px] font-medium uppercase tracking-wide text-[#9BA39D]">
                            Make an impact
                        </span>

                        <span className="text-xs font-bold text-[#28714F] transition-transform duration-300 group-hover:translate-x-1">
                            View campaign →
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

/* =========================================================
   TRUST ITEM
========================================================= */

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
            className="group flex gap-5 rounded-2xl border border-[#E2DBD0] bg-[#FBF9F4] p-5 transition-all duration-300 hover:-translate-x-1 hover:shadow-[0_12px_30px_rgba(40,50,40,0.05)]"
        >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E2EEE5] text-[10px] font-bold text-[#28714F]">
                {number}
            </div>

            <div>
                <h3 className="font-display text-lg text-[#294439]">
                    {title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#7B877F]">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}

/* =========================================================
   HELPERS
========================================================= */

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