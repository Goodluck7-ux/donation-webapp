import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { Campaign } from './useCampaigns';

export function useMyCampaigns() {
    return useQuery({ queryKey: ['my-campaigns'], queryFn: () => apiFetch<Campaign[]>('/campaigns/mine') });
}