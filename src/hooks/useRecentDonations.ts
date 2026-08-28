import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

interface RecentDonation {
    id: string;
    name: string;
    amount: string | number;
    campaignTitle: string;
    createdAt: string;
}

export function useRecentDonations() {
    return useQuery({
        queryKey: ['recent-donations'],
        queryFn: () => apiFetch<RecentDonation[]>('/donations/public/recent'),
        refetchInterval: 20_000, // polls every 20s
    });
}