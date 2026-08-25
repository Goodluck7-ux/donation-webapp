type LogCategory = 'AUTH' | 'PAYMENT' | 'DONATION' | 'CAMPAIGN' | 'API';

const COLORS: Record<LogCategory, string> = {
    AUTH: '#2D6A4F',
    PAYMENT: '#E8703A',
    DONATION: '#1B4332',
    CAMPAIGN: '#3A7659',
    API: '#5C7165',
};

export function logActivity(category: LogCategory, message: string, data?: unknown) {
    const style = `color: ${COLORS[category]}; font-weight: bold;`;
    if (data !== undefined) {
        console.log(`%c[${category}]%c ${message}`, style, 'color: inherit;', data);
    } else {
        console.log(`%c[${category}]%c ${message}`, style, 'color: inherit;');
    }
}