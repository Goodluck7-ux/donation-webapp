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
                <h1 className="font-display text-2xl sm:text-3xl text-text-primary">Dashboard</h1>
                <p className="text-text-secondary mt-1 text-sm sm:text-base">Welcome back. Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((c) => (
                    <div key={c.label} className="bg-surface border border-border rounded-xl p-5">
                        <p className="text-xs uppercase tracking-wide text-text-muted">{c.label}</p>
                        <p className="font-display text-xl sm:text-2xl text-text-primary mt-1">{c.value}</p>
                    </div>
                ))}
            </div>

            <div className="space-y-4">
                <h2 className="font-display text-xl text-text-primary">Recent campaigns</h2>
                <div className="bg-surface border border-border rounded-xl overflow-hidden overflow-x-auto">
                    <table className="w-full text-sm min-w-[520px]">
                        <thead className="bg-base text-left text-xs uppercase text-text-muted">
                            <tr>
                                <th className="p-4">Campaign</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Raised</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns?.slice(0, 6).map((c) => (
                                <tr key={c.id} className="border-t border-border">
                                    <td className="p-4 font-medium text-text-primary">{c.title}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 text-xs font-medium">{c.status}</span>
                                    </td>
                                    <td className="p-4 text-text-secondary">₦{Number(c.currentAmount).toLocaleString()} / ₦{Number(c.goalAmount).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}