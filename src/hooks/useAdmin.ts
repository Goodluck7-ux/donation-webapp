import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { Campaign } from './useCampaigns';
import { logActivity } from '@/lib/logger';

interface Stats {
    totalRaised: string;
    totalDonors: number;
    activeCauses: number;
    donationsCount: number;
}

export function useAdminStats() {
    return useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            logActivity('API', 'Fetching admin stats');
            const data = await apiFetch<Stats>('/campaigns/admin/stats');
            logActivity('API', 'Admin stats loaded', data);
            return data;
        },
    });
}

export function useAllCampaigns() {
    return useQuery({
        queryKey: ['admin-campaigns'],
        queryFn: async () => {
            logActivity('CAMPAIGN', 'Fetching all campaigns (admin)');
            const data = await apiFetch<Campaign[]>('/campaigns/admin/all');
            logActivity('CAMPAIGN', 'Admin campaigns loaded', { count: data.length });
            return data;
        },
    });
}

export function useUpdateCampaignStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => {
            logActivity('CAMPAIGN', 'Updating campaign status', { id, status });
            return apiFetch(`/campaigns/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
        },
        onSuccess: (_, variables) => {
            logActivity('CAMPAIGN', 'Campaign status updated', variables);
            queryClient.invalidateQueries({ queryKey: ['admin-campaigns'] });
        },
        onError: (error) => {
            logActivity('CAMPAIGN', 'Campaign status update failed', { message: (error as Error).message });
        },
    });
}

export interface PlatformUser { id: string; name: string; email: string; role: string; createdAt: string }

export function useAllUsers() {
    return useQuery({
        queryKey: ['admin-users'],
        queryFn: async () => {
            logActivity('API', 'Fetching all users (admin)');
            const data = await apiFetch<PlatformUser[]>('/users/admin/all');
            logActivity('API', 'Admin users loaded', { count: data.length });
            return data;
        },
    });
}

export function useUpdateUserRole() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, role }: { id: string; role: string }) => {
            logActivity('AUTH', 'Updating user role', { id, role });
            return apiFetch(`/users/admin/${id}/role`, { method: 'PATCH', body: JSON.stringify({ role }) });
        },
        onSuccess: (_, variables) => {
            logActivity('AUTH', 'User role updated', variables);
            queryClient.invalidateQueries({ queryKey: ['admin-users'] });
        },
        onError: (error) => {
            logActivity('AUTH', 'User role update failed', { message: (error as Error).message });
        },
    });
}

export function useCreateCampaign() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { title: string; description: string; goalAmount: number; organizationId: string; imageUrl?: string; category: string }) => {
            logActivity('CAMPAIGN', 'Creating campaign', { title: data.title, category: data.category, goalAmount: data.goalAmount });
            return apiFetch('/campaigns', { method: 'POST', body: JSON.stringify(data) });
        },
        onSuccess: () => {
            logActivity('CAMPAIGN', 'Campaign created successfully');
            queryClient.invalidateQueries({ queryKey: ['admin-campaigns'] });
        },
        onError: (error) => {
            logActivity('CAMPAIGN', 'Campaign creation failed', { message: (error as Error).message });
        },
    });
}

export function useUpdateCampaign() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...data }: { id: string; title: string; description: string; goalAmount: number; imageUrl?: string }) => {
            logActivity('CAMPAIGN', 'Updating campaign', { id, title: data.title });
            return apiFetch(`/campaigns/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
        },
        onSuccess: (_, variables) => {
            logActivity('CAMPAIGN', 'Campaign updated successfully', { id: variables.id });
            queryClient.invalidateQueries({ queryKey: ['admin-campaigns'] });
            queryClient.invalidateQueries({ queryKey: ['campaign', variables.id] });
        },
        onError: (error) => {
            logActivity('CAMPAIGN', 'Campaign update failed', { message: (error as Error).message });
        },
    });
}

export interface AdminDonation {
    id: string;
    amount: string;
    status: string;
    email: string;
    donorName: string | null;
    anonymous: boolean;
    createdAt: string;
    campaign: { id: string; title: string };
    donor: { name: string; email: string } | null;
}

export function useAllDonations() {
    return useQuery({
        queryKey: ['admin-donations'],
        queryFn: async () => {
            logActivity('PAYMENT', 'Fetching all donations (admin)');
            const data = await apiFetch<AdminDonation[]>('/donations/admin/all');
            logActivity('PAYMENT', 'Admin donations loaded', { count: data.length });
            return data;
        },
    });
}