import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

interface Organization { id: string; name: string }

export function useOrganizations() {
    return useQuery({ queryKey: ['organizations'], queryFn: () => apiFetch<Organization[]>('/organizations/admin/all') });
}