'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCampaigns } from '@/hooks/useCampaigns';

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

const impactStats = [
  {
    value: '₦12.4M',
    label: 'Raised since 2024',
    icon: '↗',
  },
  {
    value: '184K+',
    label: 'Donors worldwide',
    icon: '◎',
  },
  {
    value: '27',
    label: 'Countries reached',
    icon: '◉',
  },
  {
    value: '312',
    label: 'Projects funded',
    icon: '✦',
  },
];

const liveDonations = [
  {
    initial: 'J',
    name: 'James T.',
    location: 'United Kingdom',
    campaign: 'Reforest the Amazon',
    amount: '₦50,000',
    time: 'Just now',
  },
  {
    initial: 'A',
    name: 'Anonymous',
    location: 'United States',
    campaign: 'Supporting Women in War Zones',
    amount: '₦100,000',
    time: 'Just now',
  },
  {
    initial: 'P',
    name: 'Priya K.',
    location: 'India',
    campaign: 'Clean Water for Rural Villages',
    amount: '₦25,000',
    time: '1m ago',
  },
  {
    initial: 'E',
    name: 'Emma R.',
    location: 'Australia',
    campaign: 'Women Battling Cancer & ALS',
    amount: '₦200,000',
    time: '2m ago',
  },
];

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

export default function LandingPage() {
  const { data: campaigns, isLoading } = useCampaigns();

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F5EE] text-[#17352A]">
      <Navbar />

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative border-b border-[#E7E0D3] bg-[#F8F5EE]">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#E7DED0]/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:px-10 lg:pb-28">
          <div className="mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#E8D1C0] bg-[#FFF4EB] px-4 py-2 text-xs font-semibold text-[#D96525] sm:text-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8703A]" />

              16,000+ donors · Fully transparent giving
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

              <em className="font-normal text-[#1B6B4A]">
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
              className="mx-auto mt-7 max-w-2xl text-[15px] leading-7 text-[#64736A] sm:text-lg"
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
                className="group rounded-full bg-[#E96B2C] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(233,107,44,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D95E22] hover:shadow-[0_12px_30px_rgba(233,107,44,0.25)]"
              >
                Donate now
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/campaigns"
                className="rounded-full border border-[#D8D2C6] bg-white px-7 py-3.5 text-sm font-semibold text-[#244438] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#B9B0A1] hover:shadow-sm"
              >
                Explore causes
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          IMPACT NUMBERS
      ========================================================= */}

      <section className="bg-[#EEE9DF] px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="mx-auto mb-10 max-w-2xl text-center"
          >
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D96525]">
              Our impact
            </p>

            <h2 className="font-display text-3xl tracking-[-0.02em] sm:text-4xl">
              Every number represents a real life.
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-[#DED7CA] bg-[#FBF9F4] lg:grid-cols-4">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
                transition={{ delay: index * 0.08 }}
                className={`px-5 py-8 text-center sm:px-8 sm:py-10 ${index < 2
                    ? 'border-b border-[#E4DED3] lg:border-b-0'
                    : ''
                  } ${index % 2 === 0
                    ? 'border-r border-[#E4DED3] lg:border-r-0'
                    : ''
                  } ${index < 3
                    ? 'lg:border-r lg:border-[#E4DED3]'
                    : ''
                  }`}
              >
                <div className="mx-auto mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#E7F0EA] text-sm font-semibold text-[#1B6B4A]">
                  {stat.icon}
                </div>

                <div className="font-display text-3xl tracking-tight text-[#174532] sm:text-4xl">
                  {stat.value}
                </div>

                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#87938B]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="mt-5 text-center text-[11px] text-[#89948C]">
            Updated in real time · Third-party verified · 100% transparent
          </p>
        </div>
      </section>

      {/* =========================================================
          LIVE DONATIONS
      ========================================================= */}

      <section className="bg-[#F8F5EE] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="mb-9 flex items-end justify-between"
          >
            <div>
              <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D96525]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E96B2C]" />
                Live donations
              </div>

              <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
                People are giving right now.
              </h2>

              <p className="mt-2 text-sm text-[#748179]">
                Join 16,865 donors making an impact today.
              </p>
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-[#D8E3DC] bg-[#F0F7F2] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#24734E] sm:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2D9B68]" />
              Live
            </div>
          </motion.div>

          <div className="grid gap-3 md:grid-cols-2">
            {liveDonations.map((donation, index) => (
              <motion.div
                key={`${donation.name}-${index}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-70px' }}
                variants={fadeUp}
                transition={{ delay: index * 0.08 }}
                className="flex items-center justify-between rounded-2xl border border-[#E5DED2] bg-white p-4 shadow-[0_5px_25px_rgba(40,50,40,0.03)] transition-shadow hover:shadow-[0_10px_30px_rgba(40,50,40,0.06)]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DCEDE2] text-sm font-bold text-[#1B6B4A]">
                    {donation.initial}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-1.5">
                      <p className="text-sm font-semibold text-[#284238]">
                        {donation.name}
                      </p>

                      <span className="text-xs text-[#89958D]">
                        from {donation.location}
                      </span>
                    </div>

                    <p className="mt-0.5 truncate text-xs text-[#89958D]">
                      donated to{' '}
                      <span className="font-medium text-[#28714F]">
                        {donation.campaign}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="ml-3 shrink-0 text-right">
                  <p className="text-sm font-bold text-[#28714F]">
                    {donation.amount}
                  </p>

                  <p className="mt-0.5 text-[10px] text-[#A0AAA4]">
                    {donation.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-7 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#DDD6CA] bg-[#EEE9DF] px-5 py-4 sm:flex-row">
            <div>
              <p className="font-display text-lg text-[#274438]">
                Be the next name on this wall.
              </p>

              <p className="text-xs text-[#7F8B83]">
                Every donation, big or small, moves something forward.
              </p>
            </div>

            <Link
              href="/campaigns"
              className="w-full rounded-full bg-[#E96B2C] px-6 py-3 text-center text-xs font-bold text-white transition hover:bg-[#D95E22] sm:w-auto"
            >
              Make an impact →
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          CAMPAIGNS
      ========================================================= */}

      <section className="bg-[#EEE9DF] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="mb-10 flex items-end justify-between gap-5"
          >
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D96525]">
                ✦ Active causes
              </p>

              <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
                Where your gift goes today.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#758178]">
                Support campaigns that are actively changing lives in
                communities around the world.
              </p>
            </div>

            <Link
              href="/campaigns"
              className="hidden rounded-full border border-[#CFC7BA] bg-[#FBF9F4] px-5 py-2.5 text-xs font-bold text-[#315344] transition hover:border-[#AFA697] sm:block"
            >
              See all causes →
            </Link>
          </motion.div>

          {isLoading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-3xl border border-[#DED7CA] bg-[#FBF9F4]"
                >
                  <div className="aspect-[4/3] animate-pulse bg-[#E2DDD3]" />

                  <div className="space-y-4 p-5">
                    <div className="h-5 w-3/4 animate-pulse rounded-full bg-[#E2DDD3]" />
                    <div className="h-10 animate-pulse rounded-xl bg-[#E8E3DA]" />
                    <div className="h-2 animate-pulse rounded-full bg-[#E2DDD3]" />
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
                      className="group block overflow-hidden rounded-3xl border border-[#DED7CA] bg-[#FBF9F4] transition-all duration-300 hover:-translate-y-1 hover:border-[#BFB6A7] hover:shadow-[0_18px_45px_rgba(40,50,40,0.08)]"
                    >
                      {/* Campaign image */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#DDD8CE]">
                        {campaign.imageUrl ? (
                          <img
                            src={campaign.imageUrl}
                            alt={campaign.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-[#DDE9E0]">
                            <span className="font-display text-4xl text-[#629078]">
                              ✦
                            </span>
                          </div>
                        )}

                        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#315344] shadow-sm">
                          Campaign
                        </div>
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

                            <span className="text-[#9BA49E]">
                              ₦{current.toLocaleString()} / ₦
                              {goal.toLocaleString()}
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-[#E0E7E1]">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${percentage}%` }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 1,
                                delay: 0.2,
                              }}
                              className="h-full rounded-full bg-[#2D8B5E]"
                            />
                          </div>
                        </div>

                        <div className="mt-5 flex items-center justify-between border-t border-[#E5DFD4] pt-4">
                          <span className="text-xs text-[#929C95]">
                            Help close the gap
                          </span>

                          <span className="text-xs font-bold text-[#26704E] transition-transform group-hover:translate-x-1">
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
            <div className="rounded-3xl border border-[#DED7CA] bg-[#FBF9F4] px-6 py-16 text-center">
              <p className="font-display text-2xl text-[#274438]">
                New causes are coming soon.
              </p>

              <p className="mt-2 text-sm text-[#7C8880]">
                Check back shortly to find a campaign you can support.
              </p>
            </div>
          )}

          <Link
            href="/campaigns"
            className="mt-6 block rounded-full border border-[#CFC7BA] bg-[#FBF9F4] px-5 py-3 text-center text-xs font-bold text-[#315344] sm:hidden"
          >
            See all causes →
          </Link>
        </div>
      </section>

      {/* =========================================================
          TESTIMONIALS
      ========================================================= */}

      <section className="bg-[#F8F5EE] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="mx-auto mb-10 max-w-2xl text-center"
          >
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D96525]">
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
                className="rounded-3xl border border-[#E4DDD1] bg-white p-7 shadow-[0_8px_30px_rgba(40,50,40,0.03)]"
              >
                <div className="font-display text-4xl leading-none text-[#2C8058]">
                  “
                </div>

                <p className="mt-4 font-display text-lg leading-7 text-[#294439]">
                  {testimonial.quote}
                </p>

                <div className="mt-7 border-t border-[#ECE7DE] pt-5">
                  <p className="text-xs font-bold text-[#315344]">
                    {testimonial.name}
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-wide text-[#99A39D]">
                    {testimonial.role}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          MONTHLY GIVING
      ========================================================= */}

      <section className="px-5 py-10 sm:px-8 lg:px-10 lg:py-16">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#123F2C]">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border-[40px] border-[#2D7657]/20" />

          <div className="relative flex flex-col gap-9 px-7 py-12 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:py-14">
            <div className="max-w-xl">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8BC8A7]">
                ✦ Monthly giving
              </p>

              <h2 className="font-display text-4xl leading-[1.02] tracking-tight text-white sm:text-5xl">
                ₦25,000 a month
                <br />
                can change everything.
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-6 text-[#C4D9CE]">
                Become a monthly donor and create reliable, long-term change.
                Receive milestone updates and impact reports as your support
                reaches the people who need it.
              </p>
            </div>

            <Link
              href="/campaigns"
              className="group shrink-0 rounded-full bg-[#F07836] px-7 py-3.5 text-center text-sm font-bold text-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E66A2B]"
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