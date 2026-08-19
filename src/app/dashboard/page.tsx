'use client';

import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { useProfile } from '@/hooks/userProfile';
// import { useProfile } from '@/hooks/useProfile';

interface Donation {
  id: string; amount: string; status: string; createdAt: string;
  campaign: { title: string };
}

const STATUS_STYLES: Record<string, string> = {
  CONFIRMED: 'bg-emerald-50 text-emerald-700',
  PENDING: 'bg-amber-50 text-amber-700',
  FAILED: 'bg-red-50 text-red-700',
  REFUNDED: 'bg-neutral-100 text-neutral-500',
};

export default function DashboardPage() {
  const { data: profile } = useProfile();
  const { data: donations, isLoading } = useQuery({
    queryKey: ['my-donations'],
    queryFn: () => apiFetch<Donation[]>('/donations/me'),
  });

  const confirmed = donations?.filter((d) => d.status === 'CONFIRMED') ?? [];
  const totalGiven = confirmed.reduce((sum, d) => sum + Number(d.amount), 0);
  const campaignsSupported = new Set(confirmed.map((d) => d.campaign.title)).size;
  const firstName = profile?.name?.split(' ')[0];

  return (
    <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl text-neutral-900">
          Welcome back{firstName ? `, ${firstName}` : ''}
        </h1>
        <p className="text-neutral-500 mt-1 text-sm sm:text-base">Here's your giving activity so far.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-neutral-200 rounded-xl p-5 sm:p-6">
          <p className="text-xs uppercase tracking-wide text-neutral-500">Total given</p>
          <p className="font-display text-2xl sm:text-3xl text-neutral-900 mt-1">₦{totalGiven.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-neutral-200 rounded-xl p-5 sm:p-6">
          <p className="text-xs uppercase tracking-wide text-neutral-500">Campaigns supported</p>
          <p className="font-display text-2xl sm:text-3xl text-neutral-900 mt-1">{campaignsSupported}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-display text-xl text-neutral-900">Recent donations</h2>

        {isLoading && <p className="text-sm text-neutral-400">Loading…</p>}

        {!isLoading && donations?.length === 0 && (
          <div className="border border-dashed border-neutral-300 rounded-xl p-10 text-center space-y-2">
            <p className="text-neutral-900 font-medium">No donations yet</p>
            <p className="text-sm text-neutral-500">Your giving history will show up here once you make your first donation.</p>
          </div>
        )}

        <div className="space-y-2.5">
          {donations?.map((d) => (
            <div key={d.id} className="bg-white border border-neutral-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-900 text-sm sm:text-base">{d.campaign.title}</p>
                <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                  {new Date(d.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <div className="text-right space-y-1">
                <p className="font-medium text-neutral-900 text-sm sm:text-base">₦{Number(d.amount).toLocaleString()}</p>
                <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[d.status] ?? 'bg-neutral-100 text-neutral-500'}`}>
                  {d.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}