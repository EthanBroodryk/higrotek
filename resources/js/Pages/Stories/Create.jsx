import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors, progress } = useForm({
        title: '',
        description: '',
        media: null,
    });

    const [preview, setPreview] = useState(null);

    const handleMediaChange = (e) => {
        const file = e.target.files?.[0];

        if (file) {
            setData('media', file);

            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(file);
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
                                className="mt-1 w-full rounded-lg border p-2 text-sm"
                                placeholder="Enter story title..."
                            />

                            {errors.title && (
                                <p className="text-sm text-red-500">{errors.title}</p>
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
                                className="mt-1 w-full rounded-lg border p-2 text-sm"
                                rows="4"
                                placeholder="Describe your work..."
                            />

                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description}</p>
                            )}
                        </div>

                        {/* MEDIA UPLOAD */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Upload Image / Video
                            </label>

                            <input
                                type="file"
                                accept="image/*,video/*"
                                onChange={handleMediaChange}
                                className="mt-1 w-full text-sm"
                            />

                            {errors.media && (
                                <p className="text-sm text-red-500">{errors.media}</p>
                            )}

                            {progress && (
                                <p className="mt-2 text-sm text-gray-500">
                                    Uploading: {progress.percentage}%
                                </p>
                            )}
                        </div>

                        {/* PREVIEW */}
                        {preview && (
                            <div className="rounded-xl border bg-gray-50 p-3">
                                <p className="text-sm font-medium text-gray-600 mb-2">
                                    Preview
                                </p>

                                {data.media?.type?.startsWith('video') ? (
                                    <video
                                        src={preview}
                                        controls
                                        className="h-64 w-full rounded-lg object-cover"
                                    />
                                ) : (
                                    <img
                                        src={preview}
                                        className="h-64 w-full rounded-lg object-cover"
                                        alt="Preview"
                                    />
                                )}
                            </div>
                        )}

                        {/* ACTIONS */}
                        <div className="flex items-center justify-end gap-3">
                            <Link
                                href={route('stories.index')}
                                className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
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