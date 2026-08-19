'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCampaign } from '@/hooks/useCampaigns';
import { useDonate } from '@/hooks/useDonate';
import { ShieldCheck, Users, TrendingUp } from 'lucide-react';
import { useProfile } from '@/hooks/userProfile';

export default function CampaignDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { data: campaign, isLoading } = useCampaign(id);
    const [amount, setAmount] = useState(5000);
    const donate = useDonate();
    const { data: profile } = useProfile();
    const router = useRouter();

    if (isLoading || !campaign) {
        return (
            <div>
                <Navbar />
                <p className="p-20 text-center text-neutral-400">Loading campaign…</p>
            </div>
        );
    }

    const pct = Math.min(100, (Number(campaign.currentAmount) / Number(campaign.goalAmount)) * 100);
    const imageUrl = (campaign as any).imageUrl;
    const presetAmounts = [2500, 5000, 10000, 25000];

    return (
        <div>
            <Navbar />

            <div className="aspect-[16/6] bg-neutral-100 relative overflow-hidden">
                {imageUrl ? (
                    <img src={imageUrl} alt={campaign.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0F2E1D] to-[#2D6A4F]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-4 sm:px-6 pb-6">
                    <span className="inline-block text-xs font-medium text-white bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-3">
                        {campaign.status}
                    </span>
                    <h1 className="font-display text-3xl sm:text-4xl text-white leading-tight max-w-2xl">{campaign.title}</h1>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="border border-neutral-200 rounded-xl p-4 text-center space-y-1">
                            <TrendingUp size={18} className="mx-auto text-emerald-700" strokeWidth={1.75} />
                            <p className="font-display text-lg text-neutral-900">{Math.round(pct)}%</p>
                            <p className="text-xs text-neutral-500">Funded</p>
                        </div>
                        <div className="border border-neutral-200 rounded-xl p-4 text-center space-y-1">
                            <ShieldCheck size={18} className="mx-auto text-emerald-700" strokeWidth={1.75} />
                            <p className="font-display text-lg text-neutral-900">Verified</p>
                            <p className="text-xs text-neutral-500">Campaign</p>
                        </div>
                        <div className="border border-neutral-200 rounded-xl p-4 text-center space-y-1">
                            <Users size={18} className="mx-auto text-emerald-700" strokeWidth={1.75} />
                            <p className="font-display text-lg text-neutral-900">100%</p>
                            <p className="text-xs text-neutral-500">To the field</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h2 className="font-display text-xl text-neutral-900">About this campaign</h2>
                        <p className="text-neutral-600 leading-relaxed whitespace-pre-line">{campaign.description}</p>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="border border-neutral-200 rounded-xl p-6 space-y-5 lg:sticky lg:top-24">
                        <div className="space-y-2">
                            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#1B4332] rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="font-medium text-neutral-900">₦{Number(campaign.currentAmount).toLocaleString()}</span>
                                <span className="text-neutral-500">of ₦{Number(campaign.goalAmount).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-sm font-medium text-neutral-700">Choose an amount</p>
                            <div className="grid grid-cols-2 gap-2">
                                {presetAmounts.map((preset) => (
                                    <button
                                        key={preset}
                                        onClick={() => setAmount(preset)}
                                        className={`rounded-lg border py-2 text-sm font-medium transition-colors ${amount === preset ? 'border-[#1B4332] bg-emerald-50 text-[#1B4332]' : 'border-neutral-300 text-neutral-600 hover:border-neutral-400'
                                            }`}
                                    >
                                        ₦{preset.toLocaleString()}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="number"
                                min={100}
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                            />
                        </div>

                        <button
                            onClick={() => donate.mutate({ campaignId: campaign.id, amount })}
                            disabled={donate.isPending}
                            className="w-full rounded-lg bg-[#1B4332] text-white py-3 text-sm font-medium hover:bg-[#143526] disabled:opacity-50"
                        >
                            {donate.isPending ? 'Redirecting…' : `Donate ₦${amount.toLocaleString()}`}
                        </button>
                        {donate.isError && <p className="text-sm text-red-600">{(donate.error as Error).message}</p>}
                        <p className="text-xs text-neutral-400 text-center flex items-center justify-center gap-1.5">
                            <ShieldCheck size={14} strokeWidth={1.75} /> Secure checkout via Paystack
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}