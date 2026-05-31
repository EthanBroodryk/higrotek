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
        const newFiles = Array.from(e.target.files || []);

        if (newFiles.length === 0) return;

        // Merge existing + new uploads
        const combinedFiles = [...data.images, ...newFiles];
        setData("images", combinedFiles);

        // Update previews
        const updatedPreviews = [...previews];

        newFiles.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = () => {
                updatedPreviews.push(reader.result);
                setPreviews([...updatedPreviews]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleRemoveImage = (indexToRemove, e) => {
        // Prevent the click event from bubbling up and setting this image as the cover right before it's deleted
        e.stopPropagation();

        // 1. Remove from data.images
        const updatedImages = data.images.filter((_, index) => index !== indexToRemove);
        
        // 2. Remove from previews state
        const updatedPreviews = previews.filter((_, index) => index !== indexToRemove);

        // 3. Adjust cover index logic
        let newCoverIndex = coverIndex;
        if (indexToRemove === coverIndex) {
            // Fallback to the first image if the cover was removed, or 0 if no images remain
            newCoverIndex = updatedImages.length > 0 ? 0 : 0;
        } else if (indexToRemove < coverIndex) {
            // Shift index down by 1 if an image before the cover was removed
            newCoverIndex = coverIndex - 1;
        }

        // 4. Update all relevant states
        setPreviews(updatedPreviews);
        setCoverIndex(newCoverIndex);
        
        // Inertia useForm helper requires an object or callback to match state updates accurately
        setData((oldData) => ({
            ...oldData,
            images: updatedImages,
            cover_index: newCoverIndex
        }));
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
                    <h2 className="text-xl font-semibold text-blue-500">
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
                                multiple 
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

                                            {/* REMOVE BUTTON */}
                                            <button
                                                type="button"
                                                onClick={(e) => handleRemoveImage(index, e)}
                                                className="absolute top-1 right-1 rounded bg-white/80 px-1.5 py-0.5 text-xs font-semibold text-red-600 shadow-sm backdrop-blur-sm hover:bg-white hover:text-red-700 transition"
                                                title="Remove image"
                                            >
                                                Remove
                                            </button>

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