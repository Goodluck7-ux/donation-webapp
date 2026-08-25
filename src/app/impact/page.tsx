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
        <div className="bg-base text-text-primary">
            <Navbar />

            <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-14 text-center space-y-4">
                <p className="text-sm font-medium text-accent-hover">Live impact</p>
                <h1 className="font-display text-4xl sm:text-5xl text-text-primary">Every number is a person.</h1>
                <p className="text-text-secondary leading-relaxed">
                    These figures update the moment a donation is confirmed — pulled directly from our ledger, not estimated.
                </p>
            </section>

            <section className="border-y border-border-subtle bg-subtle">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {[
                        { label: 'Total raised', value: `₦${totalRaised.toLocaleString()}` },
                        { label: 'Active causes', value: campaigns?.length ?? 0 },
                        { label: 'Countries reached', value: '4+' },
                        { label: 'Transparency', value: '100%' },
                    ].map((s) => (
                        <div key={s.label}>
                            <p className="font-display text-2xl sm:text-3xl text-text-primary">{s.value}</p>
                            <p className="text-xs sm:text-sm text-text-secondary mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 space-y-10">
                <div className="text-center space-y-2">
                    <p className="text-sm font-medium text-accent-hover">How we track it</p>
                    <h2 className="font-display text-3xl text-text-primary">From donation to documented outcome.</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {METHODOLOGY.map((m) => (
                        <div key={m.step} className="space-y-2">
                            <span className="font-display text-2xl text-focus-ring">{m.step}</span>
                            <h4 className="font-medium text-text-primary">{m.title}</h4>
                            <p className="text-sm text-text-secondary leading-relaxed">{m.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-24 text-center space-y-4">
                <p className="text-text-secondary">Want to see this in action on a specific cause?</p>
                <Link href="/campaigns" className="inline-block rounded-lg bg-accent text-white px-6 py-3 font-medium hover:bg-accent-hover">
                    Browse active campaigns →
                </Link>
            </section>

            <Footer />
        </div>
    );
}