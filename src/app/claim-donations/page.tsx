// src/app/claim-donations/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useConfirmClaim } from '@/hooks/useClaim';

export default function ClaimDonationsPage() {
    const token = useSearchParams().get('token') ?? '';
    const { data, isLoading, isError } = useConfirmClaim(token);

    return (
        <div>
            <Navbar />
            <section className="max-w-lg mx-auto px-4 sm:px-6 pt-20 pb-24 text-center space-y-6">
                {isLoading && <p className="text-neutral-500">Confirming…</p>}
                {isError && <p className="text-red-600">This link is invalid or has expired.</p>}
                {data && (
                    <>
                        <CheckCircle2 size={48} className="mx-auto text-emerald-600" strokeWidth={1.5} />
                        <h1 className="font-display text-3xl text-[#173B2B]">
                            {data.claimedCount} donation{data.claimedCount !== 1 ? 's' : ''} added to your account
                        </h1>
                        <Link href="/dashboard" className="inline-block rounded-lg bg-[#1B4332] text-white px-6 py-3 font-medium hover:bg-[#143526]">
                            View your dashboard
                        </Link>
                    </>
                )}
            </section>
            <Footer />
        </div>
    );
}