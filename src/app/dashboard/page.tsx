'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { useProfile } from '@/hooks/userProfile';
import { useCampaigns } from '@/hooks/useCampaigns';
import { ClaimBanner } from '@/components/ClaimBanner';

interface Donation {
  id: string; amount: string; status: string; createdAt: string;
  campaign: { title: string };
}

export default function DashboardPage() {
  const { data: profile } = useProfile();
  const { data: donations, isLoading } = useQuery({
    queryKey: ['my-donations'],
    queryFn: () => apiFetch<Donation[]>('/donations/me'),
  });
  const { data: campaigns } = useCampaigns();

  const confirmed = donations?.filter((d) => d.status === 'CONFIRMED') ?? [];
  const totalGiven = confirmed.reduce((sum, d) => sum + Number(d.amount), 0);
  const campaignsSupported = new Set(confirmed.map((d) => d.campaign.title)).size;
  const firstName = profile?.name?.split(' ')[0];

  if (isLoading) return <p className="p-10 text-text-muted">Loading…</p>;

  if (confirmed.length === 0) {
    return (
      <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-10">
        <ClaimBanner />
        <div className="space-y-3">
          <h1 className="font-display text-2xl sm:text-3xl text-text-primary">Welcome to Finovia{firstName ? `, ${firstName}` : ''} 👋</h1>
          <p className="text-text-secondary">Let's get you started — discover causes that matter to you.</p>
          <Link href="/campaigns" className="inline-block rounded-lg bg-accent text-white px-6 py-3 font-medium hover:bg-accent-hover">
            Explore causes →
          </Link>
        </div>

        <div className="space-y-4">
          <h2 className="font-display text-xl text-text-primary">Popular causes</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {campaigns?.slice(0, 3).map((c) => (
              <Link key={c.id} href={`/campaigns/${c.id}`} className="border border-border rounded-xl p-5 hover:border-accent space-y-2 bg-surface">
                <h3 className="font-display text-lg text-text-primary">{c.title}</h3>
                <p className="text-sm text-text-secondary line-clamp-2">{c.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (confirmed.length === 1) {
    const first = confirmed[0];
    return (
      <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-10">
        <ClaimBanner />
        <div className="bg-accent/10 border border-focus-ring rounded-xl p-8 text-center space-y-3">
          <p className="text-sm font-medium text-accent-hover">You've supported your first cause 🎉</p>
          <p className="font-display text-3xl text-text-primary">₦{Number(first.amount).toLocaleString()} contributed</p>
          <p className="text-sm text-text-secondary">to {first.campaign.title}</p>
        </div>
        <Link href="/campaigns" className="inline-block rounded-lg bg-accent text-white px-6 py-3 font-medium hover:bg-accent-hover">
          Discover more causes →
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-10">
      <ClaimBanner />
      <div>
        <h1 className="font-display text-2xl sm:text-3xl text-text-primary">Welcome back{firstName ? `, ${firstName}` : ''}</h1>
        <p className="text-text-secondary mt-1">Here's your impact at a glance.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-xl p-5 sm:p-6">
          <p className="text-xs uppercase tracking-wide text-text-muted">Total donated</p>
          <p className="font-display text-2xl sm:text-3xl text-text-primary mt-1">₦{totalGiven.toLocaleString()}</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5 sm:p-6">
          <p className="text-xs uppercase tracking-wide text-text-muted">Causes supported</p>
          <p className="font-display text-2xl sm:text-3xl text-text-primary mt-1">{campaignsSupported}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-display text-xl text-text-primary">Recent activity</h2>
        {confirmed.slice(0, 4).map((d) => (
          <div key={d.id} className="bg-surface border border-border rounded-xl p-4 flex justify-between">
            <div>
              <p className="font-medium text-text-primary">{d.campaign.title}</p>
              <p className="text-sm text-text-muted">{new Date(d.createdAt).toLocaleDateString()}</p>
            </div>
            <p className="font-medium text-text-primary">₦{Number(d.amount).toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="font-display text-xl text-text-primary">Discover more</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {campaigns?.slice(0, 3).map((c) => (
            <Link key={c.id} href={`/campaigns/${c.id}`} className="border border-border rounded-xl p-5 hover:border-accent space-y-2 bg-surface">
              <h3 className="font-display text-lg text-text-primary">{c.title}</h3>
              <p className="text-sm text-text-secondary line-clamp-2">{c.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}