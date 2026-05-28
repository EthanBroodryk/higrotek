import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Create() {
    
    const { data, setData, post, processing, errors, progress } = useForm({
        title: '',
        description: '',
        images: [], 
        cover_index: 0,
    });

    
    const [previews, setPreviews] = useState([]);
    const [coverIndex, setCoverIndex] = useState(0);

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files || []);
        
        if (files.length > 0) {
            setData('images', files);
            
            // Reset the cover choice to index 0 on fresh upload resets
            setCoverIndex(0);
            setData('cover_index', 0);

            // Pre-allocate array slots to preserve identical index ordering
            const previewUrls = new Array(files.length);
            let loadedCount = 0;

            files.forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = () => {
                    // Assign to the strict array slot position matching native files array
                    previewUrls[index] = reader.result;
                    loadedCount++;
                    
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

                    
                        {/* PREVIEW IMAGES + SELECT COVER */}
                        {previews.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600 font-medium">Select Cover Photo</p>

                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                                    {previews.map((src, index) => (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                setCoverIndex(index);
                                                setData("cover_index", index); // send to backend
                                            }}
                                            className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition 
                                                ${coverIndex === index ? "border-blue-500" : "border-transparent hover:border-gray-300"}
                                            `}
                                        >
                                            <img
                                                src={src}
                                                className="h-28 w-full object-cover"
                                            />

                                            {coverIndex === index && (
                                                <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
                                                    Cover
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