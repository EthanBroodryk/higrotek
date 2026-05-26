import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Create() {
    // ✅ Form state configured to send an array of images to match StoryController@store
    const { data, setData, post, processing, errors, progress } = useForm({
        title: '',
        description: '',
        images: [], 
    });

    // Holds an array of base64 data URLs for rendering multi-image previews
    const [previews, setPreviews] = useState([]);

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files || []);
        
        if (files.length > 0) {
            // Update the form tracking instance array
            setData('images', files);

            // Generate previews for all selected images dynamically
            const previewUrls = [];
            let loadedCount = 0;

            files.forEach((file) => {
                const reader = new FileReader();
                reader.onload = () => {
                    previewUrls.push(reader.result);
                    loadedCount++;
                    
                    // Once all images are loaded, update the state view safely
                    if (loadedCount === files.length) {
                        setPreviews(previewUrls);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('stories.store'), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Create Story
                    </h2>

                    <Link
                        href={route('stories.index')}
                        className="text-sm text-gray-600 hover:text-gray-900"
                    >
                        ← Back to Stories
                    </Link>
                </div>
            }
        >
            <Head title="Create Story" />

            <div className="py-10">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

                    <form
                        onSubmit={submit}
                        className="rounded-2xl border bg-white p-6 shadow-sm space-y-6"
                    >

                        {/* TITLE */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Title
                            </label>

                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="mt-1 w-full rounded-lg border p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Enter story title..."
                            />

                            {errors.title && (
                                <p className="text-sm text-red-500 mt-1">{errors.title}</p>
                            )}
                        </div>

                        {/* DESCRIPTION */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>

                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-1 w-full rounded-lg border p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                                rows="4"
                                placeholder="Describe your work..."
                            />

                            {errors.description && (
                                <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                            )}
                        </div>

                        {/* MULTIPLE IMAGES UPLOAD */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Upload Story Images <span className="text-xs text-gray-400 font-normal">(First image chosen acts as the cover)</span>
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                multiple // ✅ Allows selection of more than one image
                                onChange={handleImagesChange}
                                className="mt-1 w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                            />

                            {/* Catch top-level or structural nested image array validation errors */}
                            {errors.images && (
                                <p className="text-sm text-red-500 mt-1">{errors.images}</p>
                            )}
                            {Object.keys(errors).map((key) => {
                                if (key.startsWith('images.')) {
                                    return <p key={key} className="text-sm text-red-500 mt-1">{errors[key]}</p>;
                                }
                                return null;
                            })}

                            {progress && (
                                <p className="mt-2 text-sm text-gray-500">
                                    Uploading: {progress.percentage}%
                                </p>
                            )}
                        </div>

                        {/* MULTI PREVIEW GRID */}
                        {previews.length > 0 && (
                            <div className="rounded-xl border bg-gray-50 p-4">
                                <p className="text-sm font-medium text-gray-600 mb-3">
                                    Selected Gallery Images ({previews.length})
                                </p>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {previews.map((url, idx) => (
                                        <div key={idx} className="relative rounded-lg overflow-hidden border bg-white shadow-sm group">
                                            <img
                                                src={url}
                                                className="h-32 w-full object-cover"
                                                alt={`Preview snapshot ${idx + 1}`}
                                            />
                                            {idx === 0 && (
                                                <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
                                                    Cover Photo
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ACTIONS */}
                        <div className="flex items-center justify-end gap-3 border-t pt-4">
                            <Link
                                href={route('stories.index')}
                                className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                Publish Story
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}