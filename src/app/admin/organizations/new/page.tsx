'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateOrganization } from '@/hooks/useOrganizations';

export default function NewOrganizationPage() {
    const router = useRouter();
    const createOrganization = useCreateOrganization();
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        try {
            await createOrganization.mutateAsync({ name });
            router.push('/admin/organizations');
        } catch (err) {
            setError((err as Error).message);
        }
    }

    return (
        <div className="p-6 sm:p-10 max-w-xl mx-auto space-y-8">
            <div>
                <h1 className="font-display text-2xl sm:text-3xl text-text-primary">New organization</h1>
                <p className="text-text-secondary mt-1 text-sm sm:text-base">
                    Campaigns are created under an organization.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-primary">Organization name</label>
                    <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Finovia Giving"
                        className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text-primary outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                    />
                </div>

                {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

                <button
                    type="submit"
                    disabled={createOrganization.isPending}
                    className="w-full rounded-lg bg-accent text-white py-2.5 text-sm font-medium hover:bg-accent-hover disabled:opacity-50"
                >
                    {createOrganization.isPending ? 'Creating…' : 'Create organization'}
                </button>
            </form>
        </div>
    );
}