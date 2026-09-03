'use client';

import { AnimatePresence, motion } from 'motion/react';
import { LogOut, X } from 'lucide-react';

interface ConfirmSignOutModalProps {
    open: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export function ConfirmSignOutModal({ open, onCancel, onConfirm }: ConfirmSignOutModalProps) {
    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-5">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onCancel}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
                    >
                        <button
                            onClick={onCancel}
                            aria-label="Close"
                            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-base hover:text-text-primary"
                        >
                            <X size={16} />
                        </button>

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-highlight/10 text-highlight">
                            <LogOut size={20} />
                        </div>

                        <h2 className="mt-4 font-display text-lg text-text-primary">
                            Sign out?
                        </h2>
                        <p className="mt-1.5 text-sm leading-6 text-text-secondary">
                            You'll need to sign in again to access your dashboard.
                        </p>

                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={onCancel}
                                className="flex-1 rounded-xl border border-border bg-surface py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-base"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="flex-1 rounded-xl bg-highlight py-2.5 text-sm font-semibold text-white transition-colors hover:brightness-95"
                            >
                                Sign out
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}