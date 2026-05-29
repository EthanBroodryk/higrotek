import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ story }) {
    const initialCoverId = story.cover_image?.id || story.images?.[0]?.id || 0;

    const { data, setData, post, processing, errors, progress } = useForm({
        _method: 'PATCH',             // ✅ Spoofs PATCH method internally over a POST request pipeline
        title: story.title,
        description: story.description,
        cover_image_id: initialCoverId,
        is_new_cover: false,          // Tracks if chosen cover is a new upload
        new_cover_name: '',           // Tracks file name if cover is a new upload
        delete_images: [], 
        new_images: [],    
    });

    const [newPreviews, setNewPreviews] = useState([]);

    const handleNewImagesChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            setData('new_images', files);

            const previewUrls = new Array(files.length);
            let loaded = 0;
            files.forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = () => {
                    // Save both the base64 source layout and file name string reference
                    previewUrls[index] = {
                        name: file.name,
                        src: reader.result
                    };
                    loaded++;
                    if (loaded === files.length) {
                        setNewPreviews(previewUrls);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const toggleDeleteImage = (id) => {
        const isMarked = data.delete_images.includes(id);
        const nextDeleteImages = isMarked
            ? data.delete_images.filter((imgId) => imgId !== id)
            : [...data.delete_images, id];
            
        const remainingImages = story.images.filter((img) => !nextDeleteImages.includes(img.id));
        let nextCoverId = data.cover_image_id;
        let isNewCover = data.is_new_cover;
        let newCoverName = data.new_cover_name;
        
        // Dynamic Fallback: If removing the current cover, shift to next remaining asset
        if (!isMarked && data.cover_image_id === id && !data.is_new_cover) {
            if (remainingImages.length > 0) {
                nextCoverId = remainingImages[0].id;
            } else if (data.new_images.length > 0) {
                nextCoverId = 0;
                isNewCover = true;
                newCoverName = data.new_images[0].name;
            }
        }

        setData({
            ...data,
            delete_images: nextDeleteImages,
            cover_image_id: nextCoverId,
            is_new_cover: isNewCover,
            new_cover_name: newCoverName
        });
    };

    const selectExistingAsCover = (id) => {
        setData({
            ...data,
            cover_image_id: id,
            is_new_cover: false,
            new_cover_name: ''
        });
    };

    const selectNewAsCover = (fileName) => {
        setData({
            ...data,
            cover_image_id: 0,
            is_new_cover: true,
            new_cover_name: fileName
        });
    };

    const submit = (e) => {
        e.preventDefault();
        // Fire via POST because Inertia + FormData requires root POST method execution
        post(route('stories.update', story.id), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Edit Story Details</h2>
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

                        {/* UNIFIED IMAGES SELECTOR DECK */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Manage Active Photos & Cover Selections
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border bg-gray-50/50 p-4 rounded-xl">
                                
                                {/* Existing Database Files */}
                                {story.images && story.images
                                    // This line filters out images marked for deletion so they visually disappear
                                    .filter((img) => !data.delete_images.includes(img.id))
                                    .map((img) => {
                                        const isCurrentCover = !data.is_new_cover && data.cover_image_id === img.id;

                                        return (
                                            <div 
                                                key={img.id} 
                                                className="relative rounded-lg overflow-hidden border bg-white flex flex-col justify-between border-gray-200"
                                            >
                                                <img src={`/storage/${img.path}`} className="h-24 w-full object-cover" alt="Gallery item" />
                                                
                                                <div className="absolute top-1 right-1 flex flex-col gap-1">
                                                    {isCurrentCover && (
                                                        <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">Cover</span>
                                                    )}
                                                </div>

                                                <div className="p-1.5 border-t bg-gray-50 flex items-center justify-between text-[11px] font-medium gap-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => selectExistingAsCover(img.id)}
                                                        className={`px-1.5 py-0.5 rounded transition ${
                                                            isCurrentCover ? 'text-blue-700 font-bold bg-blue-50' : 'text-gray-500 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        Set Cover
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleDeleteImage(img.id)}
                                                        className="px-1.5 py-0.5 rounded transition text-red-600 hover:bg-red-50"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                })}

                                {/* Newly Selected Local Images */}
                                {newPreviews.map((preview, idx) => {
                                    const isCurrentCover = data.is_new_cover && data.new_cover_name === preview.name;

                                    return (
                                        <div key={`new-${idx}`} className="relative rounded-lg overflow-hidden border border-blue-300 bg-white flex flex-col justify-between shadow-sm">
                                            <img src={preview.src} className="h-24 w-full object-cover" alt="New upload preview" />
                                            
                                            <div className="absolute top-1 right-1">
                                                {isCurrentCover && (
                                                    <span className="bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">New Cover</span>
                                                )}
                                            </div>

                                            <div className="p-1.5 border-t bg-blue-50/40 flex items-center justify-between text-[11px] font-medium">
                                                <button
                                                    type="button"
                                                    onClick={() => selectNewAsCover(preview.name)}
                                                    className={`w-full text-center py-0.5 rounded transition ${
                                                        isCurrentCover ? 'text-blue-700 font-bold bg-blue-100' : 'text-gray-600 hover:bg-gray-200'
                                                    }`}
                                                >
                                                    Set As Cover
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* UPLOAD SELECTION SELECTOR */}
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