import { useQuery, useMutation } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

export function useUnclaimedDonations() {
    return useQuery({
        queryKey: ['unclaimed-donations'],
        queryFn: () => apiFetch<{ count: number; total: number }>('/donations/unclaimed'),
    });
}

export function useRequestClaim() {
    return useMutation({
        mutationFn: () => apiFetch('/donations/claim', { method: 'POST' }),
    });
}

export function useConfirmClaim(token: string) {
    return useQuery({
        queryKey: ['confirm-claim', token],
        queryFn: () => apiFetch<{ claimedCount: number }>(`/donations/claim/verify?token=${token}`),
        enabled: !!token,
    });
}