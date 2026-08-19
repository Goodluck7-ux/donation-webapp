'use client';

import Link from 'next/link';
import { useMyCampaigns } from '@/hooks/useManager';

export default function ManagerDashboard() {
    const { data: campaigns, isLoading } = useMyCampaigns();
    const totalRaised = campaigns?.reduce((sum, c) => sum + Number(c.currentAmount), 0) ?? 0;

    return (
        <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="font-display text-2xl sm:text-3xl text-neutral-900">My campaigns</h1>
                    <p className="text-neutral-500 mt-1 text-sm sm:text-base">Manage the campaigns you own.</p>
                </div>
                <Link href="/admin/campaigns/new" className="rounded-lg bg-[#1B4332] text-white px-4 py-2.5 text-sm font-medium hover:bg-[#143526]">
                    + New campaign
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-neutral-200 rounded-xl p-5">
                    <p className="text-xs uppercase tracking-wide text-neutral-500">Total raised</p>
                    <p className="font-display text-2xl text-neutral-900 mt-1">₦{totalRaised.toLocaleString()}</p>
                </div>
                <div className="bg-white border border-neutral-200 rounded-xl p-5">
                    <p className="text-xs uppercase tracking-wide text-neutral-500">Campaigns</p>
                    <p className="font-display text-2xl text-neutral-900 mt-1">{campaigns?.length ?? 0}</p>
                </div>
            </div>

            {isLoading && <p className="text-sm text-neutral-400">Loading…</p>}

            <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden overflow-x-auto">
                <table className="w-full text-sm min-w-[520px]">
                    <thead className="bg-neutral-50 text-left text-xs uppercase text-neutral-500">
                        <tr><th className="p-4">Campaign</th><th className="p-4">Status</th><th className="p-4">Raised</th><th className="p-4">Action</th></tr>
                    </thead>
                    <tbody>
                        {campaigns?.map((c) => (
                            <tr key={c.id} className="border-t border-neutral-100">
                                <td className="p-4 font-medium text-neutral-900">{c.title}</td>
                                <td className="p-4"><span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">{c.status}</span></td>
                                <td className="p-4 text-neutral-600">₦{Number(c.currentAmount).toLocaleString()} / ₦{Number(c.goalAmount).toLocaleString()}</td>
                                <td className="p-4"><Link href={`/admin/campaigns/${c.id}/edit`} className="text-xs text-[#1B4332] font-medium hover:underline">Edit</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}