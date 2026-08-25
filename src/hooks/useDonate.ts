import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { logActivity } from '@/lib/logger';

interface DonateInput {
    campaignId: string;
    amount: number;
    donorName?: string;
    email?: string;
    anonymous?: boolean;
}

export function useDonate() {
    return useMutation({
        mutationFn: (data: DonateInput) => {
            logActivity('PAYMENT', 'Donation submitted', { campaignId: data.campaignId, amount: data.amount, guest: !!data.email });
            return apiFetch<{ donationId: string; authorizationUrl: string }>('/donations', {
                method: 'POST',
                body: JSON.stringify(data),
            });
        },
        onSuccess: (data) => {
            logActivity('PAYMENT', 'Donation created, redirecting to Paystack', { donationId: data.donationId });
            window.location.href = data.authorizationUrl;
        },
        onError: (error) => {
            logActivity('PAYMENT', 'Donation failed', { message: (error as Error).message });
        },
    });
}