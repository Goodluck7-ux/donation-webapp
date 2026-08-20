import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { Campaign } from './useCampaigns';

interface Stats {
    totalRaised: string;
    totalDonors: number;
    activeCauses: number;
    donationsCount: number;
}

export function useAdminStats() {
    return useQuery({ queryKey: ['admin-stats'], queryFn: () => apiFetch<Stats>('/campaigns/admin/stats') });
}

export function useAllCampaigns() {
    return useQuery({ queryKey: ['admin-campaigns'], queryFn: () => apiFetch<Campaign[]>('/campaigns/admin/all') });
}

export function useUpdateCampaignStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) =>
            apiFetch(`/campaigns/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-campaigns'] }),
    });
}

export interface PlatformUser { id: string; name: string; email: string; role: string; createdAt: string }

export function useAllUsers() {
    return useQuery({ queryKey: ['admin-users'], queryFn: () => apiFetch<PlatformUser[]>('/users/admin/all') });
}

export function useUpdateUserRole() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, role }: { id: string; role: string }) =>
            apiFetch(`/users/admin/${id}/role`, { method: 'PATCH', body: JSON.stringify({ role }) }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
    });
}

export function useCreateCampaign() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { title: string; description: string; goalAmount: number; organizationId: string; imageUrl?: string; category: string }) =>
            apiFetch('/campaigns', { method: 'POST', body: JSON.stringify(data) }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-campaigns'] }),
    });
}

export function useUpdateCampaign() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...data }: { id: string; title: string; description: string; goalAmount: number; imageUrl?: string }) =>
            apiFetch(`/campaigns/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['admin-campaigns'] });
            queryClient.invalidateQueries({ queryKey: ['campaign', variables.id] });
        },
    });
}