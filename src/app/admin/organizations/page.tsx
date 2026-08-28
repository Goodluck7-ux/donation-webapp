'use client';

import Link from 'next/link';
import { useOrganizations } from '@/hooks/useOrganizations';

export default function AdminOrganizationsPage() {
    const { data: organizations, isLoading } = useOrganizations();

    return (
        <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-display text-2xl sm:text-3xl text-text-primary">Organizations</h1>
                    <p className="text-text-secondary mt-1 text-sm sm:text-base">
                        Campaigns must belong to an organization.
                    </p>
                </div>

                <Link
                    href="/admin/organizations/new"
                    className="rounded-lg bg-accent text-white px-4 py-2.5 text-sm font-medium hover:bg-accent-hover"
                >
                    New organization
                </Link>
            </div>

            {isLoading && <p className="text-sm text-text-muted">Loading…</p>}

            {!isLoading && organizations?.length === 0 && (
                <div className="border border-dashed border-border rounded-xl p-10 text-center space-y-2">
                    <p className="text-text-primary font-medium">No organizations yet.</p>
                    <p className="text-sm text-text-secondary">
                        Create one before you can add campaigns.
                    </p>
                </div>
            )}

            <div className="space-y-2.5">
                {organizations?.map((org) => (
                    <div
                        key={org.id}
                        className="bg-surface border border-border rounded-xl p-4 flex items-center justify-between"
                    >
                        <p className="font-medium text-text-primary">{org.name}</p>
                        <p className="text-xs text-text-muted">
                            Created {new Date(org.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}