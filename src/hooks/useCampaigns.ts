// src/hooks/useCampaigns.ts
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

export interface Campaign {
  id: string;
  title: string;
  description: string;
  status: string;
  goalAmount: string;
  currentAmount: string;
}

export function useCampaigns() {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: () => apiFetch<Campaign[]>('/campaigns'),
  });
}

export function useCampaign(id: string) {
  return useQuery({
    queryKey: ['campaign', id],
    queryFn: () => apiFetch<Campaign>(`/campaigns/${id}`),
    enabled: !!id,
  });
}