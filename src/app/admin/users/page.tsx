'use client';

import { useAllUsers, useUpdateUserRole } from '@/hooks/useAdmin';

const ROLES = ['DONOR', 'CAMPAIGN_MANAGER', 'ORG_ADMIN', 'PLATFORM_ADMIN', 'VERIFICATION_STAFF'];

export default function AdminUsersPage() {
    const { data: users, isLoading } = useAllUsers();
    const updateRole = useUpdateUserRole();

    return (
        <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="font-display text-2xl sm:text-3xl text-text-primary">Users</h1>
                <p className="text-text-secondary mt-1 text-sm sm:text-base">Manage roles and permissions across the platform.</p>
            </div>

            {isLoading && <p className="text-sm text-text-muted">Loading…</p>}

            <div className="bg-surface border border-border rounded-xl overflow-hidden overflow-x-auto">
                <table className="w-full text-sm min-w-[560px]">
                    <thead className="bg-base text-left text-xs uppercase text-text-muted">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((u) => (
                            <tr key={u.id} className="border-t border-border">
                                <td className="p-4 font-medium text-text-primary">{u.name}</td>
                                <td className="p-4 text-text-secondary">{u.email}</td>
                                <td className="p-4">
                                    <select
                                        value={u.role}
                                        onChange={(e) => updateRole.mutate({ id: u.id, role: e.target.value })}
                                        className="rounded-lg border border-border bg-surface text-text-primary px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                                    >
                                        {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}