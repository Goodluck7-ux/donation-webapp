'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useRegister } from '@/hooks/useAuth';
import { toast } from 'sonner';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const register = useRegister();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        register.mutate(
            { name, email, password },
            {
                onSuccess: (data) => {
                    toast.success(`Welcome back, ${data.user.name.split(' ')[0]}!`);
                    const role = data.user.role;
                    if (role === 'PLATFORM_ADMIN' || role === 'ORG_ADMIN' || role === 'VERIFICATION_STAFF') {
                        router.push('/admin');
                    } else if (role === 'CAMPAIGN_MANAGER') {
                        router.push('/manager');
                    } else {
                        router.push('/dashboard');
                    }
                },
            },
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAFAF7]">
            <div className="w-full max-w-sm space-y-8">
                <div className="space-y-2">
                    <h1 className="font-display text-2xl font-medium tracking-tight text-neutral-900">Create your account</h1>
                    <p className="text-neutral-500 text-sm">Start supporting causes with full transparency.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-neutral-700">Full name</label>
                        <input
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                        />
                    </div>
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
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-neutral-700">Password</label>
                        <input
                            type="password"
                            required
                            minLength={8}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                        />
                    </div>

                    {register.isError && <p className="text-sm text-red-600">{(register.error as Error).message}</p>}

                    <button
                        type="submit"
                        disabled={register.isPending}
                        className="w-full rounded-lg bg-[#1B4332] text-white py-2.5 text-sm font-medium hover:bg-[#143526] disabled:opacity-50"
                    >
                        {register.isPending ? 'Creating account…' : 'Create account'}
                    </button>
                </form>

                <p className="text-sm text-neutral-500 text-center">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[#1B4332] font-medium hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
}