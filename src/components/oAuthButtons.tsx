'use client';

import { X } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { logActivity } from '@/lib/logger';

export function OAuthButtons({
    callbackURL = '/dashboard'
}: {
    callbackURL?: string;
}) {
    function handleOAuth(provider: 'google' | 'github') {
        logActivity('AUTH', `OAuth sign-in initiated: ${provider}`);
        const appUrl = window.location.origin;

        authClient.signIn.social({
            provider,
            callbackURL: `${appUrl}${callbackURL}`,
            errorCallbackURL: `${appUrl}/login?oauth_error=1`,
        });
    }

    return (
        <div className="grid grid-cols-2 gap-3">
            <button
                type="button"
                onClick={() => handleOAuth('google')}
                className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface py-3 text-sm font-medium text-text-primary transition-all hover:border-border-hover hover:bg-base"
            >
                <svg width="17" height="17" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.81Z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.94-2.92l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.73-4.95H1.27v3.1A11.997 11.997 0 0 0 12 24Z" />
                    <path fill="#FBBC05" d="M5.27 14.28a7.2 7.2 0 0 1 0-4.56v-3.1H1.27a12 12 0 0 0 0 10.76l4-3.1Z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.94 1.19 15.24 0 12 0A11.997 11.997 0 0 0 1.27 6.62l4 3.1c.95-2.84 3.6-4.97 6.73-4.97Z" />
                </svg>
                Google
            </button>

            <button
                type="button"
                onClick={() => handleOAuth('github')}
                className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface py-3 text-sm font-medium text-text-primary transition-all hover:border-border-hover hover:bg-base"
            >
                <X size={17} />
                GitHub
            </button>
        </div>
    );
}