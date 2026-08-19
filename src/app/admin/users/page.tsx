'use client';

import { useAllUsers, useUpdateUserRole } from '@/hooks/useAdmin';

const ROLES = ['DONOR', 'CAMPAIGN_MANAGER', 'ORG_ADMIN', 'PLATFORM_ADMIN', 'VERIFICATION_STAFF'];

export default function AdminUsersPage() {
    const { data: users, isLoading } = useAllUsers();
    const updateRole = useUpdateUserRole();

    return (
        <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="font-display text-2xl sm:text-3xl text-neutral-900">Users</h1>
                <p className="text-neutral-500 mt-1 text-sm sm:text-base">Manage roles and permissions across the platform.</p>
            </div>

            {isLoading && <p className="text-sm text-neutral-400">Loading…</p>}

            <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden overflow-x-auto">
                <table className="w-full text-sm min-w-[560px]">
                    <thead className="bg-neutral-50 text-left text-xs uppercase text-neutral-500">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((u) => (
                            <tr key={u.id} className="border-t border-neutral-100">
                                <td className="p-4 font-medium text-neutral-900">{u.name}</td>
                                <td className="p-4 text-neutral-500">{u.email}</td>
                                <td className="p-4">
                                    <select
                                        value={u.role}
                                        onChange={(e) => updateRole.mutate({ id: u.id, role: e.target.value })}
                                        className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
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