// src/hooks/useDonate.ts
import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

interface DonateInput {
    campaignId: string;
    amount: number;
    donorName?: string;
    email?: string;
    anonymous?: boolean;
}

export function useDonate() {
    return useMutation({
        mutationFn: (data: DonateInput) =>
            apiFetch<{ donationId: string; authorizationUrl: string }>('/donations', {
                method: 'POST',
                body: JSON.stringify(data),
            }),
        onSuccess: (data) => {
            window.location.href = data.authorizationUrl;
        },
    });
}