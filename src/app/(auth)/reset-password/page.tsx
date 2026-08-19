'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useResetPassword } from '@/hooks/useAuth';

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();
    const resetPassword = useResetPassword();
    const token = searchParams.get('token') ?? '';

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        resetPassword.mutate(
            { newPassword: password, token },
            { onSuccess: () => router.push('/login') },
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAFAF7]">
            <div className="w-full max-w-sm space-y-8">
                <div className="space-y-2">
                    <h1 className="font-display text-2xl font-medium tracking-tight text-neutral-900">Set a new password</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-neutral-700">New password</label>
                        <input
                            type="password"
                            required
                            minLength={8}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                        />
                    </div>

                    {resetPassword.isError && <p className="text-sm text-red-600">{(resetPassword.error as Error).message}</p>}

                    <button
                        type="submit"
                        disabled={resetPassword.isPending}
                        className="w-full rounded-lg bg-[#1B4332] text-white py-2.5 text-sm font-medium hover:bg-[#143526] disabled:opacity-50"
                    >
                        {resetPassword.isPending ? 'Resetting…' : 'Reset password'}
                    </button>
                </form>
            </div>
        </div>
    );
}