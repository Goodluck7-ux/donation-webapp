'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Mail, MessageCircle, Clock } from 'lucide-react';

const FAQS = [
    { q: 'How do I know a campaign is real?', a: 'Every campaign is reviewed and verified before it goes live, and its full funding and milestone history is public.' },
    { q: 'Can I get a receipt for my donation?', a: 'Yes — every confirmed donation appears in your dashboard with a full record, viewable anytime.' },
    { q: 'How do I start a campaign for my organization?', a: 'Reach out via the form below and our team will walk you through verification and setup.' },
];

export default function ContactPage() {
    const [sent, setSent] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSent(true);
    }

    return (
        <div className="bg-base text-text-primary">
            <Navbar />

            <section className="max-w-2xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 text-center space-y-3">
                <h1 className="font-display text-4xl text-text-primary">Get in touch</h1>
                <p className="text-text-secondary">Questions about a campaign, a donation, or partnering with us — we'd love to hear from you.</p>
            </section>

            <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-10 grid sm:grid-cols-3 gap-4">
                {[
                    { icon: Mail, title: 'Email us', body: 'hello@finovia.org' },
                    { icon: MessageCircle, title: 'Response time', body: 'Within 1 business day' },
                    { icon: Clock, title: 'Support hours', body: 'Mon–Fri, 9am–5pm WAT' },
                ].map((c) => (
                    <div key={c.title} className="border border-border-subtle rounded-xl p-5 space-y-2 text-center">
                        <c.icon size={20} className="mx-auto text-accent-hover" strokeWidth={1.75} />
                        <p className="text-sm font-medium text-text-primary">{c.title}</p>
                        <p className="text-sm text-text-secondary">{c.body}</p>
                    </div>
                ))}
            </section>

            <section className="max-w-xl mx-auto px-4 sm:px-6 py-10">
                {sent ? (
                    <p className="text-center text-accent-hover bg-accent/10 rounded-lg p-4">
                        Thanks for reaching out — we'll get back to you shortly.
                    </p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <input required placeholder="Your name" className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text-primary outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent" />
                            <input required type="email" placeholder="Email address" className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text-primary outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent" />
                        </div>
                        <textarea required rows={5} placeholder="Your message" className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-text-primary outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent" />
                        <button type="submit" className="w-full rounded-lg bg-accent text-white py-2.5 text-sm font-medium hover:bg-accent-hover">
                            Send message
                        </button>
                    </form>
                )}
            </section>

            <section className="max-w-2xl mx-auto px-4 sm:px-6 py-16 space-y-6">
                <h2 className="font-display text-2xl text-text-primary text-center">Frequently asked</h2>
                <div className="space-y-4">
                    {FAQS.map((f) => (
                        <div key={f.q} className="border-b border-border-subtle pb-4">
                            <h4 className="font-medium text-text-primary text-sm">{f.q}</h4>
                            <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">{f.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}