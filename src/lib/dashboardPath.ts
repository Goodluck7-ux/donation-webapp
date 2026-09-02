export function dashboardPathFor(role?: string) {
    if (role === 'PLATFORM_ADMIN' || role === 'VERIFICATION_STAFF') return '/admin';
    if (role === 'ORG_ADMIN') return '/org';
    if (role === 'CAMPAIGN_MANAGER') return '/manager';
    return '/dashboard';
}