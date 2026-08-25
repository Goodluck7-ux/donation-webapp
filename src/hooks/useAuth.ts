import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { logActivity } from '@/lib/logger';

interface AuthResponse {
    token: string;
    user: { id: string; name: string; email: string; role: string };
}

export function useRegister() {
    return useMutation({
        mutationFn: (data: { name: string; email: string; password: string }) => {
            logActivity('AUTH', 'Register attempt', { email: data.email });
            return apiFetch<AuthResponse>('/api/auth/sign-up/email', {
                method: 'POST',
                body: JSON.stringify(data),
            });
        },
        onSuccess: (data) => {
            logActivity('AUTH', 'Register successful', { userId: data.user.id, role: data.user.role });
        },
        onError: (error) => {
            logActivity('AUTH', 'Register failed', { message: (error as Error).message });
        },
    });
}

export function useLogin() {
    return useMutation({
        mutationFn: (data: { email: string; password: string }) => {
            logActivity('AUTH', 'Login attempt', { email: data.email });
            return apiFetch<AuthResponse>('/api/auth/sign-in/email', {
                method: 'POST',
                body: JSON.stringify(data),
            });
        },
        onSuccess: (data) => {
            logActivity('AUTH', 'Login successful', { userId: data.user.id, role: data.user.role });
        },
        onError: (error) => {
            logActivity('AUTH', 'Login failed', { message: (error as Error).message });
        },
    });
}

export function useForgotPassword() {
    return useMutation({
        mutationFn: (data: { email: string }) => {
            logActivity('AUTH', 'Password reset requested', { email: data.email });
            return apiFetch<{ status: boolean }>('/api/auth/request-password-reset', {
                method: 'POST',
                body: JSON.stringify({ ...data, redirectTo: 'http://localhost:3001/reset-password' }),
            });
        },
        onSuccess: () => {
            logActivity('AUTH', 'Password reset email sent');
        },
        onError: (error) => {
            logActivity('AUTH', 'Password reset request failed', { message: (error as Error).message });
        },
    });
}

export function useResetPassword() {
    return useMutation({
        mutationFn: (data: { newPassword: string; token: string }) => {
            logActivity('AUTH', 'Password reset submitted');
            return apiFetch<{ status: boolean }>('/api/auth/reset-password', {
                method: 'POST',
                body: JSON.stringify(data),
            });
        },
        onSuccess: () => {
            logActivity('AUTH', 'Password reset successful');
        },
        onError: (error) => {
            logActivity('AUTH', 'Password reset failed', { message: (error as Error).message });
        },
    });
}