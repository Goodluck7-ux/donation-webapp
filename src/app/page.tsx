'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCampaigns } from '@/hooks/useCampaigns';
import { usePublicStats } from '@/hooks/usePublicStats';
import { useRecentDonations } from '@/hooks/useRecentDonations';

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

function timeAgo(dateString: string) {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

const testimonials = [
  {
    quote:
      'Before the well, my daughters walked four hours every day for water. Now they walk to school instead.',
    name: 'Aisha M.',
    role: 'Mother of three, Tanzania',
  },
  {
    quote:
      'They did not just send money. They listened to our community and stayed long enough to see the work through.',
    name: 'Diego R.',
    role: 'Local partner, Guatemala',
  },
  {
    quote:
      'I donate every month because I can actually see where my money goes. That kind of transparency matters.',
    name: 'Priya K.',
    role: 'Monthly donor since 2019',
  },
];

export default function Home() {
  const { data: campaigns, isLoading } = useCampaigns();
  const { data: stats } = usePublicStats();
  const { data: recentDonations } = useRecentDonations();

  const impactStats = [
    {
      value: stats ? `₦${(Number(stats.totalRaised) / 1_000_000).toFixed(1)}M` : '—',
      label: 'Raised so far',
      icon: '↗',
    },
    {
      value: stats ? stats.totalDonors.toLocaleString() : '—',
      label: 'Donors so far',
      icon: '◎',
    },
    {
      value: stats ? stats.activeCauses.toString() : '—',
      label: 'Active causes',
      icon: '◉',
    },
    {
      value: campaigns ? campaigns.length.toString() : '—',
      label: 'Total causes',
      icon: '✦',
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-base text-text-primary">
      <Navbar />

      {/*Hero Section*/}

      <section className="relative border-b border-border-subtle bg-base">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-subtle/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:px-10 lg:pb-28">
          <div className="mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-highlight/30 bg-highlight/10 px-4 py-2 text-xs font-semibold text-highlight sm:text-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-highlight" />
              {stats ? `${stats.totalDonors.toLocaleString()}+ donors` : '16,000+ donors'} · Fully transparent giving
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-7 font-display text-[3.4rem] leading-[0.94] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[88px]"
            >
              Small acts.
              <br />
              <em className="font-normal text-accent-hover">
                Lasting change.
              </em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="mx-auto mt-7 max-w-2xl text-[15px] leading-7 text-text-secondary sm:text-lg"
            >
              Support vetted causes around the world — from clean water and
              education to climate action and emergency relief. Every donation
              is tracked from your card to real-world impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
              }}
              className="flex flex-col justify-center gap-3 pt-8 sm:flex-row"
            >
              <Link
                href="/campaigns"
                className="group rounded-full bg-highlight px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(233,107,44,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95 hover:shadow-[0_12px_30px_rgba(233,107,44,0.25)]"
              >
                Donate now
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/campaigns"
                className="rounded-full border border-border bg-surface px-7 py-3.5 text-sm font-semibold text-text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-border-hover hover:shadow-sm"
              >
                Explore causes
              </Link>
            </motion.div>

            {/* QUICK ACTIONS — always visible, no scrolling/hunting required */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 grid grid-cols-2 gap-2.5 sm:mt-12 sm:flex sm:flex-wrap sm:justify-center sm:gap-3"
            >
              {[
                { href: '/campaigns', label: 'Browse causes', icon: '✦' },
                { href: '/dashboard', label: 'My donations', icon: '♥' },
                { href: '/impact', label: 'See our impact', icon: '◉' },
                { href: '/login', label: 'Sign in', icon: '→' },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-border-subtle bg-surface px-4 py-3.5 text-sm font-medium text-text-primary transition-all hover:-translate-y-0.5 hover:border-border-hover hover:shadow-[0_8px_20px_rgba(40,50,40,0.06)] sm:rounded-full sm:px-5 sm:py-2.5"
                >
                  <span className="text-accent-hover">{action.icon}</span>
                  {action.label}
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/*Total impact givings! */}

      <section className="bg-subtle px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="mx-auto mb-10 max-w-2xl text-center"
          >
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-highlight">
              Our impact
            </p>

            <h2 className="font-display text-3xl tracking-[-0.02em] sm:text-4xl">
              Every number represents a real life.
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-border-subtle bg-surface lg:grid-cols-4">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                transition={{ delay: index * 0.08 }}
                className={`px-5 py-8 text-center sm:px-8 sm:py-10 ${index < 2
                  ? 'border-b border-border-subtle lg:border-b-0'
                  : ''
                  } ${index % 2 === 0
                    ? 'border-r border-border-subtle lg:border-r-0'
                    : ''
                  } ${index < 3
                    ? 'lg:border-r lg:border-border-subtle'
                    : ''
                  }`}
              >
                <div className="mx-auto mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent-hover">
                  {stat.icon}
                </div>

                <div className="font-display text-3xl tracking-tight text-text-primary sm:text-4xl">
                  {stat.value}
                </div>

                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="mt-5 text-center text-[11px] text-text-muted">
            Updated automatically · Pulled from live campaign data · 100% transparent
          </p>
        </div>
      </section>

      {/* Live donations...*/}

      <section className="bg-base px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="mb-9 flex items-end justify-between"
          >
            <div>
              <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-highlight">
                <span className="h-1.5 w-1.5 rounded-full bg-highlight" />
                Live donations
              </div>

              <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
                People are giving right now.
              </h2>

              <p className="mt-2 text-sm text-text-secondary">
                {stats
                  ? `${stats.totalDonors.toLocaleString()} donors making an impact.`
                  : 'Real donations, updated live.'}
              </p>
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-accent-hover sm:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-hover" />
              Live
            </div>
          </motion.div>

          <div className="grid gap-3 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {recentDonations?.length ? (
                recentDonations.map((donation) => (
                  <motion.div
                    key={donation.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-between rounded-2xl border border-border-subtle bg-surface p-4 shadow-[0_5px_25px_rgba(40,50,40,0.03)] transition-shadow hover:shadow-[0_10px_30px_rgba(40,50,40,0.06)]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent-hover">
                        {donation.name[0]?.toUpperCase() ?? '?'}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-1.5">
                          <p className="text-sm font-semibold text-text-primary">
                            {donation.name}
                          </p>
                        </div>

                        <p className="mt-0.5 truncate text-xs text-text-muted">
                          donated to{' '}
                          <span className="font-medium text-accent-hover">
                            {donation.campaignTitle}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="ml-3 shrink-0 text-right">
                      <p className="text-sm font-bold text-accent-hover">
                        ₦{Number(donation.amount).toLocaleString()}
                      </p>

                      <p className="mt-0.5 text-[10px] text-text-muted">
                        {timeAgo(donation.createdAt)}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 rounded-2xl border border-dashed border-border-subtle bg-surface px-6 py-10 text-center text-sm text-text-muted">
                  No donations yet — be the first to give.
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-7 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border-subtle bg-subtle px-5 py-4 sm:flex-row">
            <div>
              <p className="font-display text-lg text-text-primary">
                Be the next name on this wall.
              </p>

              <p className="text-xs text-text-secondary">
                Every donation, big or small, moves something forward.
              </p>
            </div>

            <Link
              href="/campaigns"
              className="w-full rounded-full bg-highlight px-6 py-3 text-center text-xs font-bold text-white transition hover:brightness-95 sm:w-auto"
            >
              Make an impact →
            </Link>
          </div>
        </div>
      </section>

      {/*Campaigns data... live! */}

      <section className="bg-subtle px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="mb-10 flex items-end justify-between gap-5"
          >
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-highlight">
                ✦ Active causes
              </p>

              <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
                Where your gift goes today.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-text-secondary">
                Support campaigns that are actively changing lives in
                communities around the world.
              </p>
            </div>

            <Link
              href="/campaigns"
              className="hidden rounded-full border border-border bg-surface px-5 py-2.5 text-xs font-bold text-text-primary transition hover:border-border-hover sm:block"
            >
              See all causes →
            </Link>
          </motion.div>

          {isLoading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-3xl border border-border-subtle bg-surface"
                >
                  <div className="aspect-[4/3] animate-pulse bg-subtle" />

                  <div className="space-y-4 p-5">
                    <div className="h-5 w-3/4 animate-pulse rounded-full bg-subtle" />
                    <div className="h-10 animate-pulse rounded-xl bg-subtle" />
                    <div className="h-2 animate-pulse rounded-full bg-subtle" />
                  </div>
                </div>
              ))}
            </div>
          ) : campaigns?.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {campaigns.slice(0, 6).map((campaign, index) => {
                const current = Number(campaign.currentAmount) || 0;
                const goal = Number(campaign.goalAmount) || 1;

                const percentage = Math.min(
                  100,
                  Math.round((current / goal) * 100),
                );

                return (
                  <motion.div
                    key={campaign.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={fadeUp}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Link
                      href={`/campaigns/${campaign.id}`}
                      className="group block overflow-hidden rounded-3xl border border-border-subtle bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-border-hover hover:shadow-[0_18px_45px_rgba(40,50,40,0.08)]"
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
                            <span className="font-display text-4xl text-accent-hover">
                              ✦
                            </span>
                          </div>
                        )}

                        <div className="absolute left-4 top-4 rounded-full bg-surface/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-text-primary shadow-sm">
                          Campaign
                        </div>
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
                              ₦{current.toLocaleString()} / ₦
                              {goal.toLocaleString()}
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-subtle">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${percentage}%` }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 1,
                                delay: 0.2,
                              }}
                              className="h-full rounded-full bg-accent-hover"
                            />
                          </div>
                        </div>

                        <div className="mt-5 flex items-center justify-between border-t border-border-subtle pt-4">
                          <span className="text-xs text-text-muted">
                            Help close the gap
                          </span>

                          <span className="text-xs font-bold text-accent-hover transition-transform group-hover:translate-x-1">
                            Support →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-border-subtle bg-surface px-6 py-16 text-center">
              <p className="font-display text-2xl text-text-primary">
                New causes are coming soon.
              </p>

              <p className="mt-2 text-sm text-text-secondary">
                Check back shortly to find a campaign you can support.
              </p>
            </div>
          )}

          <Link
            href="/campaigns"
            className="mt-6 block rounded-full border border-border bg-surface px-5 py-3 text-center text-xs font-bold text-text-primary sm:hidden"
          >
            See all causes →
          </Link>
        </div>
      </section>

      {/* Tstimonies*/}

      <section className="bg-base px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="mx-auto mb-10 max-w-2xl text-center"
          >
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-highlight">
              ✦ Real stories
            </p>

            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              Behind every donation is a life changed.
            </h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                transition={{ delay: index * 0.1 }}
                className="rounded-3xl border border-border-subtle bg-surface p-7 shadow-[0_8px_30px_rgba(40,50,40,0.03)]"
              >
                <div className="font-display text-4xl leading-none text-accent-hover">
                  "
                </div>

                <p className="mt-4 font-display text-lg leading-7 text-text-primary">
                  {testimonial.quote}
                </p>

                <div className="mt-7 border-t border-border-subtle pt-5">
                  <p className="text-xs font-bold text-text-primary">
                    {testimonial.name}
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-wide text-text-muted">
                    {testimonial.role}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>



      <section className="px-5 py-10 sm:px-8 lg:px-10 lg:py-16">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-brand">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border-[40px] border-accent-hover/20" />

          <div className="relative flex flex-col gap-9 px-7 py-12 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:py-14">
            <div className="max-w-xl">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-focus-ring">
                ✦ Monthly giving
              </p>

              <h2 className="font-display text-4xl leading-[1.02] tracking-tight text-white sm:text-5xl">
                ₦25,000 a month
                <br />
                can change everything.
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-6 text-white/70">
                Become a monthly donor and create reliable, long-term change.
                Receive milestone updates and impact reports as your support
                reaches the people who need it.
              </p>
            </div>

            <Link
              href="/campaigns"
              className="group shrink-0 rounded-full bg-highlight px-7 py-3.5 text-center text-sm font-bold text-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95"
            >
              Become a monthly donor
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}