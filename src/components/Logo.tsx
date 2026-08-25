export function Logo({ light = false }: { light?: boolean }) {
    return (
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1L2 5v6l6 4 6-4V5L8 1z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
                    <circle cx="8" cy="8" r="1.8" fill="white" />
                </svg>
            </div>
            <span className={`font-display text-xl tracking-tight ${light ? 'text-white' : 'text-text-primary'}`}>
                Finovia
            </span>
        </div>
    );
}