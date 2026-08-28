import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { logActivity } from '@/lib/logger';

export interface Organization {
    id: string;
    name: string;
    createdAt: string;
}

export function useOrganizations() {
    return useQuery({
        queryKey: ['organizations'],
        queryFn: async () => {
            logActivity('API', 'Fetching organizations');
            const data = await apiFetch<Organization[]>('/organizations/admin/all');
            logActivity('API', 'Organizations loaded', { count: data.length });
            return data;
        },
    });
}

export function useCreateOrganization() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { name: string }) => {
            logActivity('API', 'Creating organization', data);
            return apiFetch<Organization>('/organizations', {
                method: 'POST',
                body: JSON.stringify(data),
            });
        },
        onSuccess: () => {
            logActivity('API', 'Organization created successfully');
            queryClient.invalidateQueries({ queryKey: ['organizations'] });
        },
        onError: (error) => {
            logActivity('API', 'Organization creation failed', { message: (error as Error).message });
        },
    });
}