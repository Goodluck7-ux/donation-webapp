'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useUnclaimedDonations, useRequestClaim } from '@/hooks/useClaim';

export function ClaimBanner() {
  const { data } = useUnclaimedDonations();
  const requestClaim = useRequestClaim();
  const [dismissed, setDismissed] = useState(false);

  if (!data || data.count === 0 || dismissed) return null;

  return (
    <div className="border border-[#B7E4C7] bg-[#EAF3EC] rounded-xl p-5 flex items-center justify-between flex-wrap gap-4">
      <div>
        <p className="font-medium text-[#173B2B]">We found previous donations under your email</p>
        <p className="text-sm text-[#5C7165] mt-1">
          {data.count} donation{data.count > 1 ? 's' : ''}, ₦{data.total.toLocaleString()} total
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => {
            requestClaim.mutate(undefined, { onSuccess: () => toast.success('Check your email to confirm') });
          }}
          disabled={requestClaim.isPending}
          className="rounded-lg bg-[#1B4332] text-white px-4 py-2 text-sm font-medium hover:bg-[#143526]"
        >
          Verify and add to my account
        </button>
        <button onClick={() => setDismissed(true)} className="text-sm text-neutral-500">Dismiss</button>
      </div>
    </div>
  );
}