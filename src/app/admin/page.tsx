'use client';

import { useAdminStats, useAllCampaigns } from '@/hooks/useAdmin';

export default function AdminDashboard() {
    const { data: stats } = useAdminStats();
    const { data: campaigns } = useAllCampaigns();

    const cards = [
        { label: 'Total raised', value: `₦${Number(stats?.totalRaised ?? 0).toLocaleString()}` },
        { label: 'Total donors', value: stats?.totalDonors ?? 0 },
        { label: 'Active causes', value: stats?.activeCauses ?? 0 },
        { label: 'Donations', value: stats?.donationsCount ?? 0 },
    ];

    return (
        <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-10">
            <div>
                <h1 className="font-display text-2xl sm:text-3xl text-neutral-900">Dashboard</h1>
                <p className="text-neutral-500 mt-1 text-sm sm:text-base">Welcome back. Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((c) => (
                    <div key={c.label} className="bg-white border border-neutral-200 rounded-xl p-5">
                        <p className="text-xs uppercase tracking-wide text-neutral-500">{c.label}</p>
                        <p className="font-display text-xl sm:text-2xl text-neutral-900 mt-1">{c.value}</p>
                    </div>
                ))}
            </div>

            <div className="space-y-4">
                <h2 className="font-display text-xl text-neutral-900">Recent campaigns</h2>
                <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden overflow-x-auto">
                    <table className="w-full text-sm min-w-[520px]">
                        <thead className="bg-neutral-50 text-left text-xs uppercase text-neutral-500">
                            <tr>
                                <th className="p-4">Campaign</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Raised</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns?.slice(0, 6).map((c) => (
                                <tr key={c.id} className="border-t border-neutral-100">
                                    <td className="p-4 font-medium text-neutral-900">{c.title}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">{c.status}</span>
                                    </td>
                                    <td className="p-4 text-neutral-600">₦{Number(c.currentAmount).toLocaleString()} / ₦{Number(c.goalAmount).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}