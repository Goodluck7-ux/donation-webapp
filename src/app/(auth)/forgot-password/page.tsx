'use client';

import { useState } from 'react';
import { useForgotPassword } from '@/hooks/useAuth';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const forgotPassword = useForgotPassword();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        forgotPassword.mutate({ email });
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAFAF7]">
            <div className="w-full max-w-sm space-y-8">
                <div className="space-y-2">
                    <h1 className="font-display text-2xl font-medium tracking-tight text-neutral-900">Reset your password</h1>
                    <p className="text-neutral-500 text-sm">We'll email you a link to set a new password.</p>
                </div>

                {forgotPassword.isSuccess ? (
                    <p className="text-sm text-emerald-700 bg-emerald-50 rounded-lg p-4">
                        If an account exists for {email}, a reset link is on its way.
                    </p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-neutral-700">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={forgotPassword.isPending}
                            className="w-full rounded-lg bg-[#1B4332] text-white py-2.5 text-sm font-medium hover:bg-[#143526] disabled:opacity-50"
                        >
                            {forgotPassword.isPending ? 'Sending…' : 'Send reset link'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}