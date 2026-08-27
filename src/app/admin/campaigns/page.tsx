'use client';

import Link from 'next/link';
import { useAllCampaigns, useUpdateCampaignStatus } from '@/hooks/useAdmin';

const NEXT_STATUS: Record<string, string> = {
    DRAFT: 'SUBMITTED',
    SUBMITTED: 'UNDER_REVIEW',
    UNDER_REVIEW: 'APPROVED',
    APPROVED: 'ACTIVE',
};

export default function AdminCampaignsPage() {
    const { data: campaigns, isLoading } = useAllCampaigns();
    const updateStatus = useUpdateCampaignStatus();

    return (
        <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="font-display text-2xl sm:text-3xl text-neutral-900">
                        Campaigns
                    </h1>

                    <p className="text-neutral-500 mt-1 text-sm sm:text-base">
                        Manage all campaigns on the platform.
                    </p>
                </div>

                <Link
                    href="/admin/campaigns/new"
                    className="rounded-lg bg-[#1B4332] text-white px-4 py-2.5 text-sm font-medium hover:bg-[#143526]"
                >
                    + Add new campaign
                </Link>
            </div>

            {isLoading && (
                <p className="text-sm text-neutral-400">
                    Loading…
                </p>
            )}

            <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden overflow-x-auto">
                <table className="w-full text-sm min-w-[640px]">
                    <thead className="bg-neutral-50 text-left text-xs uppercase text-neutral-500">
                        <tr>
                            <th className="p-4">Campaign</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Raised</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {campaigns?.map((c) => {
                            const nextStatus = c.status
                                ? NEXT_STATUS[c.status]
                                : undefined;

                            return (
                                <tr
                                    key={c.id}
                                    className="border-t border-neutral-100"
                                >
                                    <td className="p-4 font-medium text-neutral-900">
                                        {c.title}
                                    </td>

                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                                            {c.status ?? 'UNKNOWN'}
                                        </span>
                                    </td>

                                    <td className="p-4 text-neutral-600">
                                        ₦{Number(c.currentAmount).toLocaleString()} / ₦
                                        {Number(c.goalAmount).toLocaleString()}
                                    </td>

                                    <td className="p-4 flex flex-wrap gap-3 items-center">
                                        <Link
                                            href={`/campaigns/${c.id}`}
                                            className="text-xs text-neutral-500 hover:underline"
                                        >
                                            View
                                        </Link>

                                        <Link
                                            href={`/admin/campaigns/${c.id}/edit`}
                                            className="text-xs text-[#1B4332] font-medium hover:underline"
                                        >
                                            Edit
                                        </Link>

                                        {nextStatus && (
                                            <button
                                                onClick={() =>
                                                    updateStatus.mutate({
                                                        id: c.id,
                                                        status: nextStatus,
                                                    })
                                                }
                                                disabled={updateStatus.isPending}
                                                className="text-xs px-3 py-1.5 rounded-lg bg-[#1B4332] text-white hover:bg-[#143526] disabled:opacity-50"
                                            >
                                                Advance → {nextStatus}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}