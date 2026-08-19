'use client';

import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCampaigns } from '@/hooks/useCampaigns';

const METHODOLOGY = [
    { step: '01', title: 'Contribution', body: 'A donor gives to a specific, vetted campaign.' },
    { step: '02', title: 'Allocation', body: 'Funds are earmarked against defined campaign milestones.' },
    { step: '03', title: 'Milestone reporting', body: 'Local partners document progress with evidence — photos, receipts, reports.' },
    { step: '04', title: 'Public impact record', body: 'Every step is logged to a permanent, auditable timeline anyone can view.' },
];

export default function ImpactPage() {
    const { data: campaigns } = useCampaigns();
    const totalRaised = campaigns?.reduce((sum, c) => sum + Number(c.currentAmount), 0) ?? 0;

    return (
        <div>
            <Navbar />

            <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-14 text-center space-y-4">
                <p className="text-sm font-medium text-emerald-700">Live impact</p>
                <h1 className="font-display text-4xl sm:text-5xl text-neutral-900">Every number is a person.</h1>
                <p className="text-neutral-500 leading-relaxed">
                    These figures update the moment a donation is confirmed — pulled directly from our ledger, not estimated.
                </p>
            </section>

            <section className="border-y border-neutral-200 bg-neutral-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {[
                        { label: 'Total raised', value: `₦${totalRaised.toLocaleString()}` },
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

            <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 space-y-10">
                <div className="text-center space-y-2">
                    <p className="text-sm font-medium text-emerald-700">How we track it</p>
                    <h2 className="font-display text-3xl text-neutral-900">From donation to documented outcome.</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {METHODOLOGY.map((m) => (
                        <div key={m.step} className="space-y-2">
                            <span className="font-display text-2xl text-emerald-200">{m.step}</span>
                            <h4 className="font-medium text-neutral-900">{m.title}</h4>
                            <p className="text-sm text-neutral-500 leading-relaxed">{m.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-24 text-center space-y-4">
                <p className="text-neutral-500">Want to see this in action on a specific cause?</p>
                <Link href="/campaigns" className="inline-block rounded-lg bg-[#1B4332] text-white px-6 py-3 font-medium hover:bg-[#143526]">
                    Browse active campaigns →
                </Link>
            </section>

            <Footer />
        </div>
    );
}