import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

interface AuthResponse {
    token: string;
    user: { id: string; name: string; email: string; role: string };
}

export function useRegister() {
    return useMutation({
        mutationFn: (data: { name: string; email: string; password: string }) =>
            apiFetch<AuthResponse>('/api/auth/sign-up/email', {
                method: 'POST',
                body: JSON.stringify(data),
            }),
    });
}

export function useLogin() {
    return useMutation({
        mutationFn: (data: { email: string; password: string }) =>
            apiFetch<AuthResponse>('/api/auth/sign-in/email', {
                method: 'POST',
                body: JSON.stringify(data),
            }),
    });
}

export function useForgotPassword() {
    return useMutation({
        mutationFn: (data: { email: string }) =>
            apiFetch<{ status: boolean }>('/api/auth/request-password-reset', {
                method: 'POST',
                body: JSON.stringify({ ...data, redirectTo: 'http://localhost:3001/reset-password' }),
            }),
    });
}

export function useResetPassword() {
    return useMutation({
        mutationFn: (data: { newPassword: string; token: string }) =>
            apiFetch<{ status: boolean }>('/api/auth/reset-password', {
                method: 'POST',
                body: JSON.stringify(data),
            }),
    });
}