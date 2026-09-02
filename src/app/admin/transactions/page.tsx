'use client';

import { useAllDonations } from '@/hooks/useAdmin';

const STATUS_STYLES: Record<string, string> = {
    CONFIRMED: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    PENDING: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    FAILED: 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400',
    REFUNDED: 'bg-base text-text-muted',
};

export default function AdminTransactionsPage() {
    const { data: donations, isLoading } = useAllDonations();

    return (
        <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="font-display text-2xl sm:text-3xl text-text-primary">Transactions</h1>
                <p className="text-text-secondary mt-1 text-sm sm:text-base">
                    Every donation across all campaigns.
                </p>
            </div>

            {isLoading && <p className="text-sm text-text-muted">Loading…</p>}

            <div className="bg-surface border border-border rounded-xl overflow-hidden overflow-x-auto">
                <table className="w-full text-sm min-w-[700px]">
                    <thead className="bg-base text-left text-xs uppercase text-text-muted">
                        <tr>
                            <th className="p-4">Donor</th>
                            <th className="p-4">Campaign</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations?.map((d) => (
                            <tr key={d.id} className="border-t border-border">
                                <td className="p-4">
                                    <p className="font-medium text-text-primary">
                                        {d.anonymous ? 'Anonymous' : (d.donorName ?? d.donor?.name ?? 'Guest')}
                                    </p>
                                    <p className="text-xs text-text-muted">{d.email}</p>
                                </td>
                                <td className="p-4 text-text-secondary">{d.campaign.title}</td>
                                <td className="p-4 font-medium text-text-primary">
                                    ₦{Number(d.amount).toLocaleString()}
                                </td>
                                <td className="p-4">
                                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[d.status] ?? 'bg-base text-text-muted'}`}>
                                        {d.status}
                                    </span>
                                </td>
                                <td className="p-4 text-text-muted">
                                    {new Date(d.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}