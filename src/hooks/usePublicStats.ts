import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

interface PublicStats {
    totalRaised: number;
    activeCauses: number;
    totalDonors: number;
}

export function usePublicStats() {
    return useQuery({
        queryKey: ['public-stats'],
        queryFn: () => apiFetch<PublicStats>('/campaigns/public/stats'),
        refetchInterval: 30_000, // refresh every 30s — feels live without hammering the API
    });
}