import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Profile { id: string; name: string; email: string; role: string; createdAt: string }

export function useProfile() {
    return useQuery({ queryKey: ['profile'], queryFn: () => apiFetch<Profile>('/users/me') });
}


export function useUpdateProfile() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { name: string }) =>
            apiFetch('/api/auth/update-user', { method: 'POST', body: JSON.stringify(data) }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] }),
    });
}