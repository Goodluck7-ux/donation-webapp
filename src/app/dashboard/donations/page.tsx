'use client';

import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

interface Donation {
    id: string; amount: string; status: string; createdAt: string;
    campaign: { title: string };
}

const STATUS_STYLES: Record<string, string> = {
    CONFIRMED: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    PENDING: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    FAILED: 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400',
    REFUNDED: 'bg-base text-text-muted',
};

export default function MyDonationsPage() {
    const { data: donations, isLoading } = useQuery({
        queryKey: ['my-donations'],
        queryFn: () => apiFetch<Donation[]>('/donations/me'),
    });

    return (
        <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="font-display text-2xl sm:text-3xl text-text-primary">My donations</h1>
                <p className="text-text-secondary mt-1 text-sm sm:text-base">Every contribution you've made, in one place.</p>
            </div>

            {isLoading && <p className="text-sm text-text-muted">Loading…</p>}

            {!isLoading && donations?.length === 0 && (
                <div className="border border-dashed border-border rounded-xl p-10 text-center space-y-2">
                    <p className="text-text-primary font-medium">You haven't supported a cause yet.</p>
                    <p className="text-sm text-text-secondary">There are many causes waiting for your support.</p>
                </div>
            )}

            <div className="space-y-2.5">
                {donations?.map((d) => (
                    <div key={d.id} className="bg-surface border border-border rounded-xl p-4 flex items-center justify-between">
                        <div>
                            <p className="font-medium text-text-primary text-sm sm:text-base">{d.campaign.title}</p>
                            <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                                {new Date(d.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>
                        <div className="text-right space-y-1">
                            <p className="font-medium text-text-primary text-sm sm:text-base">₦{Number(d.amount).toLocaleString()}</p>
                            <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[d.status] ?? 'bg-base text-text-muted'}`}>
                                {d.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}