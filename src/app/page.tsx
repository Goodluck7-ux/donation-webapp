'use client';

import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCampaigns } from '@/hooks/useCampaigns';

const PILLARS = [
  { title: '100% to the field', body: 'Every donor dollar funds programs directly. No overhead skim.' },
  { title: 'Verified partners', body: 'We fund proven local organizations, not parachute programs.' },
  { title: 'Measured impact', body: 'Every campaign is tracked with milestones and public reporting.' },
  { title: 'Full transparency', body: 'Every dollar in, every dollar out — visible to anyone, anytime.' },
];

export default function LandingPage() {
  const { data: campaigns } = useCampaigns();

  return (
    <div>
      <Navbar />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 text-center space-y-6">
        <p className="inline-flex items-center gap-2 text-xs sm:text-sm text-emerald-700 bg-emerald-50 rounded-full px-4 py-1.5">
          16,000+ donors · Fully transparent giving
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-neutral-900 leading-[1.1]">
          Small acts. <em className="italic">Lasting</em> change.
        </h1>
        <p className="text-neutral-500 text-base sm:text-lg max-w-xl mx-auto">
          Finovia funds vetted causes worldwide — clean water, education, climate, and relief. Every dollar is tracked from your card to real-world impact.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href="/campaigns" className="rounded-lg bg-[#1B4332] text-white px-6 py-3 font-medium hover:bg-[#143526]">
            Donate now →
          </Link>
          <Link href="/campaigns" className="rounded-lg border border-neutral-300 px-6 py-3 font-medium text-neutral-700 hover:border-neutral-400">
            Explore causes
          </Link>
        </div>
      </section>

      {/* Live-stats bar-demo */}
      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: 'Raised so far', value: `₦${campaigns?.reduce((s, c) => s + Number(c.currentAmount), 0).toLocaleString() ?? 0}` },
            { label: 'Active causes', value: campaigns?.length ?? 0 },
            { label: 'Countries reached', value: '4+' },
            { label: 'Transparency', value: '100%' },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-2xl sm:text-3xl text-neutral-900">{s.value}</p>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-sm font-medium text-emerald-700">Our mission</p>
          <h2 className="font-display text-3xl sm:text-4xl text-neutral-900">Funding the proof — not the promises.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p) => (
            <div key={p.title} className="space-y-2">
              <h3 className="font-medium text-neutral-900">{p.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Active campaigns */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl sm:text-3xl text-neutral-900">Where your gift goes today</h2>
          <Link href="/campaigns" className="text-sm text-[#1B4332] font-medium hover:underline hidden sm:block">
            See all causes →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns?.slice(0, 6).map((c) => {
            const pct = Math.min(100, (Number(c.currentAmount) / Number(c.goalAmount)) * 100);
            return (
              <Link key={c.id} href={`/campaigns/${c.id}`} className="border rounded-xl overflow-hidden hover:border-[#1B4332] transition-colors">
                <div className="aspect-[4/3] bg-neutral-100" />
                <div className="p-5 space-y-3">
                  <h3 className="font-display text-lg text-neutral-900">{c.title}</h3>
                  <p className="text-sm text-neutral-500 line-clamp-2">{c.description}</p>
                  <div className="space-y-1.5">
                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#1B4332] rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-xs text-neutral-500">{Math.round(pct)}% funded · ₦{c.currentAmount} of ₦{c.goalAmount}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Monthly giving CTA */}
      <section className="bg-[#0F2E1D] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center space-y-4">
          <h2 className="font-display text-3xl sm:text-4xl">₦25,000 a month is everything.</h2>
          <p className="text-emerald-100/70 max-w-lg mx-auto">
            Become a monthly donor. Get milestone updates and impact reports as they happen.
          </p>
          <Link href="/campaigns" className="inline-block rounded-lg bg-white text-[#1B4332] px-6 py-3 font-medium hover:bg-emerald-50">
            Become a monthly donor
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}