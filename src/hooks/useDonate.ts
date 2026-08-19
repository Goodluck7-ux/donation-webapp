import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

export function useDonate() {
    return useMutation({
        mutationFn: (data: { campaignId: string; amount: number }) =>
            apiFetch<{ donationId: string; authorizationUrl: string }>('/donations', {
                method: 'POST',
                body: JSON.stringify(data),
            }),
        onSuccess: (data) => {
            window.location.href = data.authorizationUrl;
        },
    });
}