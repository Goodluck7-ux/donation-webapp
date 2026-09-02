import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

interface Profile { id: string; name: string; email: string; role: string; createdAt: string }

export function useProfile() {
    return useQuery({
        queryKey: ['profile'],
        queryFn: () => apiFetch<Profile>('/users/me'),
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes — avoids refetching on every navigation
    });
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { name: string }) =>
            apiFetch('/api/auth/update-user', { method: 'POST', body: JSON.stringify(data) }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] }),
    });
}