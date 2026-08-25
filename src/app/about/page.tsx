import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ShieldCheck, Users, TrendingUp, MapPin } from 'lucide-react';

const VALUES = [
    { icon: ShieldCheck, title: 'Verified before funded', body: 'Every campaign passes identity and documentation review before it ever appears publicly. Trust is earned before the first donation, not after.' },
    { icon: TrendingUp, title: 'Radical transparency', body: 'Every confirmed donation, milestone, and update is logged to an auditable timeline. Nothing is summarized away.' },
    { icon: Users, title: 'Direct to the field', body: '100% of donor contributions fund programs. Platform operations are never subsidized by donation funds.' },
];

const TIMELINE = [
    { year: '2024', label: 'Riverside founded', body: 'Started with a single question: why do donors have to trust blindly?' },
    { year: '2025', label: 'First verified partners', body: 'Onboarded local organizations across water, education, and climate causes.' },
    { year: '2026', label: 'Full accountability platform', body: 'Launched milestone tracking and public impact reporting for every campaign.' },
];

export default function AboutPage() {
    return (
        <div className="bg-base text-text-primary">
            <Navbar />

            <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 text-center space-y-6">
                <p className="text-sm font-medium text-accent-hover">Our mission</p>
                <h1 className="font-display text-4xl sm:text-5xl text-text-primary leading-tight">
                    Funding the proof — not the promises.
                </h1>
                <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
                    Riverside exists because donors deserve more than a thank-you email. We connect people directly to
                    vetted causes worldwide, and track every dollar from contribution to real-world outcome — so generosity
                    is never a leap of faith.
                </p>
            </section>

            <section className="border-y border-border-subtle bg-subtle">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 grid sm:grid-cols-3 gap-8">
                    {VALUES.map((v) => (
                        <div key={v.title} className="space-y-3">
                            <div className="w-11 h-11 rounded-xl bg-surface border border-border-subtle flex items-center justify-center">
                                <v.icon size={20} className="text-accent-hover" strokeWidth={1.75} />
                            </div>
                            <h3 className="font-medium text-text-primary">{v.title}</h3>
                            <p className="text-sm text-text-secondary leading-relaxed">{v.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20 space-y-10">
                <div className="text-center space-y-2">
                    <p className="text-sm font-medium text-accent-hover">Our story</p>
                    <h2 className="font-display text-3xl text-text-primary">How Finovia.Givings came to be.</h2>
                </div>
                <div className="space-y-8">
                    {TIMELINE.map((t, i) => (
                        <div key={t.year} className="flex gap-6">
                            <div className="flex flex-col items-center">
                                <span className="font-display text-lg text-accent-hover w-16 shrink-0">{t.year}</span>
                                {i < TIMELINE.length - 1 && <div className="w-px flex-1 bg-border-subtle mt-2" />}
                            </div>
                            <div className="pb-8">
                                <h4 className="font-medium text-text-primary">{t.label}</h4>
                                <p className="text-sm text-text-secondary mt-1 leading-relaxed">{t.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-brand text-white">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center space-y-4">
                    <MapPin size={22} className="mx-auto text-focus-ring/70" strokeWidth={1.75} />
                    <h2 className="font-display text-2xl sm:text-3xl">Currently funding causes across 4 countries.</h2>
                    <p className="text-white/70">Every campaign you see was vetted by our team before it went live.</p>
                </div>
            </section>

            <Footer />
        </div>
    );
}