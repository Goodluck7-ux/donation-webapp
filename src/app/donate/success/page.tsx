'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CheckCircle2, MessageCircle, X } from 'lucide-react';
// import { CheckCircle2, Twitter, Facebook, MessageCircle } from 'lucide-react';

export default function DonationSuccessPage() {
    const searchParams = useSearchParams();
    const reference = searchParams.get('reference');

    useEffect(() => {
        toast.success('Your donation was successful!');
    }, []);

    const shareText = encodeURIComponent('I just donated on Finovia.Givings — join me in funding causes that matter.');
    const shareUrl = encodeURIComponent('https://riverside.example.com');

    return (
        <div>
            <Navbar />
            <section className="max-w-lg mx-auto px-4 sm:px-6 pt-20 pb-24 text-center space-y-6">
                <CheckCircle2 size={56} className="mx-auto text-emerald-600" strokeWidth={1.5} />
                <div className="space-y-2">
                    <h1 className="font-display text-3xl text-neutral-900">Thank you for your gift</h1>
                    <p className="text-neutral-500">Your donation has been confirmed. A receipt is on its way to your inbox.</p>
                </div>

                <div className="space-y-3">
                    <p className="text-sm font-medium text-neutral-700">Share your impact</p>
                    <div className="flex justify-center gap-3">
                        <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} target="_blank" className="w-11 h-11 rounded-full border border-neutral-300 flex items-center justify-center hover:border-[#1B4332]">
                            <X size={18} strokeWidth={1.75} />
                        </a>
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" className="w-11 h-11 rounded-full border border-neutral-300 flex items-center justify-center hover:border-[#1B4332]">
                            <X size={18} strokeWidth={1.75} />
                        </a>
                        <a href={`https://wa.me/?text=${shareText}%20${shareUrl}`} target="_blank" className="w-11 h-11 rounded-full border border-neutral-300 flex items-center justify-center hover:border-[#1B4332]">
                            <MessageCircle size={18} strokeWidth={1.75} />
                        </a>
                    </div>
                </div>

                <Link href="/dashboard" className="inline-block rounded-lg bg-[#1B4332] text-white px-6 py-3 font-medium hover:bg-[#143526]">
                    View your dashboard
                </Link>
            </section>
            <Footer />
        </div>
    );
}