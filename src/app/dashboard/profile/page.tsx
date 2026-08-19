'use client';

import { useProfile, useUpdateProfile } from '@/hooks/userProfile';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
    const { data: profile, isLoading } = useProfile();
    const updateProfile = useUpdateProfile();
    const [name, setName] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (profile?.name) setName(profile.name);
    }, [profile]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaved(false);
        updateProfile.mutate({ name }, { onSuccess: () => setSaved(true) });
    }

    if (isLoading || !profile) return <p className="p-10 text-center text-neutral-400">Loading…</p>;

    return (
        <div className="p-6 sm:p-10 max-w-2xl mx-auto space-y-8">
            <div>
                <h1 className="font-display text-2xl sm:text-3xl text-neutral-900">Profile</h1>
                <p className="text-neutral-500 mt-1 text-sm sm:text-base">Manage your account details.</p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-xl p-6 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#1B4332] text-white flex items-center justify-center font-display text-2xl">
                    {profile.name?.[0]?.toUpperCase() ?? '?'}
                </div>
                <div>
                    <p className="font-medium text-neutral-900">{profile.name}</p>
                    <p className="text-sm text-neutral-500">{profile.email}</p>
                    <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">
                        {profile.role}
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white border border-neutral-200 rounded-xl p-6 space-y-5">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-700">Full name</label>
                    <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-700">Email</label>
                    <input
                        disabled
                        value={profile.email}
                        className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-neutral-400">Email changes aren't supported yet.</p>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-700">Member since</label>
                    <p className="text-sm text-neutral-600">
                        {new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>

                {saved && <p className="text-sm text-emerald-700">Changes saved.</p>}

                <button
                    type="submit"
                    disabled={updateProfile.isPending}
                    className="rounded-lg bg-[#1B4332] text-white px-5 py-2.5 text-sm font-medium hover:bg-[#143526] disabled:opacity-50"
                >
                    {updateProfile.isPending ? 'Saving…' : 'Save changes'}
                </button>
            </form>
        </div>
    );
}