import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Edit({ story }) {
    // Determine the current active cover image database ID
    const initialCoverId = story.cover_image?.id || story.images?.[0]?.id || 0;

    // Inertia form layout instance
    const { data, setData, post, processing, errors, progress } = useForm({
        _method: 'PATCH', // Spoofing PATCH method to allow multipart form uploads over Laravel
        title: story.title,
        description: story.description,
        cover_image_id: initialCoverId,
        delete_images: [], // tracks IDs of old photos marked to be purged
        new_images: [],    // tracks actual File objects for appending
    });

    // Holds previews for brand new additional file choices
    const [newPreviews, setNewPreviews] = useState([]);

    // Watcher: handles fallback cover shifting inside data tracking if active selection gets deleted
    useEffect(() => {
        const structuralImages = story.images.filter(img => !data.delete_images.includes(img.id));
        if (structuralImages.length > 0 && !structuralImages.some(img => img.id === data.cover_image_id)) {
            setData('cover_image_id', structuralImages[0].id);
        }
    }, [data.delete_images]);

    // Handle incoming selection of supplementary photos
    const handleNewImagesChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            setData('new_images', files);

            const previewUrls = [];
            let loaded = 0;
            files.forEach((file) => {
                const reader = new FileReader();
                reader.onload = () => {
                    previewUrls.push(reader.result);
                    loaded++;
                    if (loaded === files.length) {
                        setNewPreviews(previewUrls);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    // Toggle items between active gallery view and deletion queue arrays
    const toggleDeleteImage = (id) => {
        if (data.delete_images.includes(id)) {
            setData('delete_images', data.delete_images.filter(imgId => imgId !== id));
        } else {
            setData('delete_images', [...data.delete_images, id]);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        // Send as POST request because _method: 'PATCH' spoofing handles file delivery correctly
        post(route('stories.update', story.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Edit Story Details
                    </h2>
                    <Link href={route('stories.index')} className="text-sm text-gray-600 hover:text-gray-900">
                        ← Cancel & Go Back
                    </Link>
                </div>
            }
        >
            <Head title={`Edit Story - ${story.title}`} />

            <div className="py-10">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="rounded-2xl border bg-white p-6 shadow-sm space-y-6">
                        
                        {/* TITLE */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="mt-1 w-full rounded-lg border p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
                        </div>

                        {/* DESCRIPTION */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-1 w-full rounded-lg border p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                                rows="5"
                            />
                            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
                        </div>

                        {/* MANAGE EXISTING IMAGES GRAPH */}
                        {story.images && story.images.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Manage Existing Photos <span className="text-xs font-normal text-gray-400">(Click text options to alter settings)</span>
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border bg-gray-50/50 p-4 rounded-xl">
                                    {story.images.map((img) => {
                                        const isMarkedDeleted = data.delete_images.includes(img.id);
                                        const isCurrentCover = data.cover_image_id === img.id;

                                        return (
                                            <div 
                                                key={img.id} 
                                                className={`relative rounded-lg overflow-hidden border bg-white flex flex-col justify-between transition ${
                                                    isMarkedDeleted ? 'opacity-40 border-red-300' : 'border-gray-200'
                                                }`}
                                            >
                                                <img src={`/storage/${img.path}`} className="h-24 w-full object-cover" alt="Gallery item" />
                                                
                                                {/* Status overlay indicators */}
                                                <div className="absolute top-1 right-1 flex flex-col gap-1">
                                                    {isCurrentCover && !isMarkedDeleted && (
                                                        <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">Cover</span>
                                                    )}
                                                    {isMarkedDeleted && (
                                                        <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">Deleting</span>
                                                    )}
                                                </div>

                                                {/* Action Buttons Toggles Container */}
                                                <div className="p-1.5 border-t bg-gray-50 flex items-center justify-between text-[11px] font-medium gap-1">
                                                    <button
                                                        type="button"
                                                        disabled={isMarkedDeleted}
                                                        onClick={() => setData('cover_image_id', img.id)}
                                                        className={`px-1.5 py-0.5 rounded transition ${
                                                            isCurrentCover ? 'text-blue-700 font-bold bg-blue-50' : 'text-gray-500 hover:bg-gray-200 disabled:opacity-20'
                                                        }`}
                                                    >
                                                        Set Cover
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleDeleteImage(img.id)}
                                                        className={`px-1.5 py-0.5 rounded transition ${
                                                            isMarkedDeleted ? 'text-green-700 bg-green-50' : 'text-red-600 hover:bg-red-50'
                                                        }`}
                                                    >
                                                        {isMarkedDeleted ? 'Keep' : 'Remove'}
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* UPLOAD NEW ADDITIONAL IMAGES */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Add More Photos</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleNewImagesChange}
                                className="mt-1 w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                            />
                            {progress && <p className="mt-2 text-sm text-gray-500">Uploading: {progress.percentage}%</p>}
                        </div>

                        {/* BRAND NEW FILE CHOICE ATTACHMENT PREVIEWS */}
                        {newPreviews.length > 0 && (
                            <div className="rounded-xl border bg-blue-50/20 p-4">
                                <p className="text-sm font-medium text-blue-800 mb-3">Newly Appended Photos ({newPreviews.length})</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {newPreviews.map((url, idx) => (
                                        <div key={idx} className="rounded-lg overflow-hidden border bg-white shadow-sm">
                                            <img src={url} className="h-24 w-full object-cover" alt="Pending attachment layout" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* FORM ACTION CONTROL BUTTONS */}
                        <div className="flex items-center justify-end gap-3 border-t pt-4">
                            <Link href={route('stories.index')} className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}