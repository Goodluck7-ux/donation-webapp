'use client';

import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCampaigns } from '@/hooks/useCampaigns';

export default function CampaignsPage() {
    const { data: campaigns, isLoading } = useCampaigns();

    return (
        <div>
            <Navbar />

            <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-10 text-center space-y-4">
                <p className="text-sm font-medium text-emerald-700">Active campaigns</p>
                <h1 className="font-display text-4xl sm:text-5xl text-neutral-900">Where your gift goes today</h1>
                <p className="text-neutral-500 max-w-xl mx-auto">
                    Every campaign here is vetted and tracked. See exactly what your donation funds, from first dollar to final report.
                </p>
            </section>

            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
                {isLoading && <p className="text-center text-neutral-400">Loading campaigns…</p>}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaigns?.map((c) => {
                        const pct = Math.min(100, (Number(c.currentAmount) / Number(c.goalAmount)) * 100);
                        const imageUrl = (c as any).imageUrl;
                        return (
                            <Link
                                key={c.id}
                                href={`/campaigns/${c.id}`}
                                className="group bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:border-[#1B4332] hover:shadow-lg transition-all"
                            >
                                <div className="aspect-[4/3] bg-neutral-100 relative overflow-hidden">
                                    {imageUrl ? (
                                        <img src={imageUrl} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-emerald-100" />
                                    )}
                                    <span className="absolute top-3 left-3 text-xs font-medium bg-white/90 backdrop-blur-sm text-emerald-700 px-2.5 py-1 rounded-full">
                                        {Math.round(pct)}% funded
                                    </span>
                                </div>
                                <div className="p-5 space-y-3">
                                    <h3 className="font-display text-lg text-neutral-900 leading-snug">{c.title}</h3>
                                    <p className="text-sm text-neutral-500 line-clamp-2">{c.description}</p>
                                    <div className="space-y-1.5 pt-1">
                                        <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#1B4332] rounded-full transition-all" style={{ width: `${pct}%` }} />
                                        </div>
                                        <p className="text-xs text-neutral-500">
                                            ₦{Number(c.currentAmount).toLocaleString()} raised of ₦{Number(c.goalAmount).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {!isLoading && campaigns?.length === 0 && (
                    <div className="text-center py-20 space-y-2">
                        <p className="font-medium text-neutral-900">No active campaigns right now</p>
                        <p className="text-sm text-neutral-500">Check back soon — new causes are added regularly.</p>
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
}