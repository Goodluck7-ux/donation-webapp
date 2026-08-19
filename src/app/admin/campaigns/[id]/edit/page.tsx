'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCampaign } from '@/hooks/useCampaigns';
import { useUpdateCampaign } from '@/hooks/useAdmin';
import { uploadImage } from '@/lib/cloudinary';

export default function EditCampaignPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { data: campaign, isLoading } = useCampaign(id);
    const updateCampaign = useUpdateCampaign();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [goalAmount, setGoalAmount] = useState(0);
    const [imageUrl, setImageUrl] = useState<string | undefined>();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    // Pre-fill once the real campaign data arrives
    useEffect(() => {
        if (campaign) {
            setTitle(campaign.title);
            setDescription(campaign.description);
            setGoalAmount(Number(campaign.goalAmount));
            setImageUrl((campaign as any).imageUrl);
        }
    }, [campaign]);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        try {
            let finalImageUrl = imageUrl;
            if (imageFile) {
                setUploading(true);
                finalImageUrl = await uploadImage(imageFile);
                setUploading(false);
            }

            await updateCampaign.mutateAsync({ id, title, description, goalAmount, imageUrl: finalImageUrl });
            router.push('/admin/campaigns');
        } catch (err) {
            setUploading(false);
            setError((err as Error).message);
        }
    }

    if (isLoading || !campaign) return <p className="p-10 text-center text-neutral-400">Loading…</p>;

    const busy = uploading || updateCampaign.isPending;
    const displayImage = preview ?? imageUrl;

    return (
        <div className="p-6 sm:p-10 max-w-2xl mx-auto space-y-8">
            <div>
                <h1 className="font-display text-2xl sm:text-3xl text-neutral-900">Edit campaign</h1>
                <p className="text-neutral-500 mt-1 text-sm sm:text-base">Update the details for "{campaign.title}".</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-700">Campaign image</label>
                    <label className="block border-2 border-dashed border-neutral-300 rounded-xl aspect-[16/7] cursor-pointer overflow-hidden hover:border-neutral-400 transition-colors">
                        {displayImage ? (
                            <img src={displayImage} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-sm text-neutral-400">
                                Click to upload an image
                            </div>
                        )}
                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    </label>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-700">Title</label>
                    <input
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-700">Description</label>
                    <textarea
                        required
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-700">Goal amount (₦)</label>
                    <input
                        type="number"
                        min={1}
                        required
                        value={goalAmount}
                        onChange={(e) => setGoalAmount(Number(e.target.value))}
                        className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                    type="submit"
                    disabled={busy}
                    className="w-full rounded-lg bg-[#1B4332] text-white py-2.5 text-sm font-medium hover:bg-[#143526] disabled:opacity-50"
                >
                    {uploading ? 'Uploading image…' : updateCampaign.isPending ? 'Saving…' : 'Save changes'}
                </button>
            </form>
        </div>
    );
}