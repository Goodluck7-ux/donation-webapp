import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { logActivity } from '@/lib/logger';

export type CampaignCategory =
  | 'education'
  | 'clean-water'
  | 'environment'
  | 'health'
  | 'emergency-relief';

export type Campaign = {
  id: string;
  title: string;
  description: string;
  currentAmount: string | number;
  goalAmount: string | number;
  imageUrl?: string | null;
  category: CampaignCategory;
  status?: string;
};

export function useCampaigns() {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      logActivity('CAMPAIGN', 'Fetching campaigns list');
      const data = await apiFetch<Campaign[]>('/campaigns');
      logActivity('CAMPAIGN', 'Campaigns loaded', { count: data.length });
      return data;
    },
  });
}

export function useCampaign(id: string) {
  return useQuery({
    queryKey: ['campaign', id],
    enabled: !!id,
    queryFn: async () => {
      logActivity('CAMPAIGN', 'Fetching campaign detail', { id });
      const data = await apiFetch<Campaign>(`/campaigns/${id}`);
      logActivity('CAMPAIGN', 'Campaign detail loaded', { id: data.id, title: data.title });
      return data;
    },
  });
}