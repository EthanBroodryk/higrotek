import { useState } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Show({ story }) {
    // Find the designated cover image or default to the first image array entry as a failsafe
    const coverImage = story.cover_image?.path || story.images?.[0]?.path;
    
    // Filter out the active cover image so it doesn't repeat inside the lower gallery grid
    const galleryImages = story.images?.filter(img => img.path !== coverImage) || [];

    // --- DELETION STATE MANAGEMENT ---
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const { delete: destroy, processing } = useForm();

    const handleDeleteSubmit = (e) => {
        e.preventDefault();
        destroy(route("stories.destroy", story.id), {
            onSuccess: () => setIsConfirmingDelete(false),
        });
    };

    const renderStoryParagraphs = (text) => {
        if (!text) return null;
        return text.split(/\n\s*\n/).map((para, index) => (
            <p 
                key={index} 
                className="text-slate-700 leading-relaxed font-serif text-lg md:text-xl text-left max-w-2xl mx-auto mb-6 break-words whitespace-pre-line"
            >
                {para.trim()}
            </p>
        ));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Story Details
                    </h2>

                    <Link
                        href={route("stories.index")}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
                    >
                        ← Back to Stories
                    </Link>
                </div>
            }
        >
            <Head title={`Story - ${story.title}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden  rounded-2xl shadow-sm p-6 sm:p-8">

                        {/* STORY TITLE */}
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {story.title}
                        </h1>

                        {/* AUTHOR & DATE METADATA */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1 items-center text-sm text-gray-500 mb-6 border-b pb-4">
                            <span>
                                By <strong className="text-gray-700">{story.user?.name ?? 'Unknown Author'}</strong>
                            </span>
                            <span className="text-gray-300">|</span>
                            <span>
                                Published: {new Date(story.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                        </div>

                        {/* HERO COVER IMAGE */}
                        {coverImage ? (
                            <div className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-gray-50 mb-6 max-h-[450px]">
                                <img
                                    src={`/storage/${coverImage}`}
                                    alt={`${story.title} Cover`}
                                    className="w-full h-full object-cover max-h-[450px]"
                                />
                                <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
                                    Cover Photo
                                </span>
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-dashed bg-gray-50 p-8 text-center text-gray-400 mb-6">
                                No images uploaded for this project story.
                            </div>
                        )}

                        {/* DESCRIPTION BLOCK */}
                        <div className="prose max-w-none mb-8">
                            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                                 {renderStoryParagraphs(story?.description)}
                            </p>
                        </div>

                        {/* ADDITIONAL PHOTO GALLERY */}
                        {galleryImages.length > 0 && (
                            <div className="border-t pt-6 mb-8">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">
                                    Project Gallery ({galleryImages.length})
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {galleryImages.map((image) => (
                                        <div 
                                            key={image.id} 
                                            className="group relative aspect-video rounded-xl overflow-hidden border bg-gray-100 shadow-sm transition hover:shadow-md"
                                        >
                                            <img
                                                src={`/storage/${image.path}`}
                                                alt="Gallery Attachment"
                                                className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* INTERACTION ACTION BAR */}
                        <div className="flex items-center justify-between border-t pt-6">
                            {/* Destructive Action Trigger */}
                            <button
                                type="button"
                                onClick={() => setIsConfirmingDelete(true)}
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-800 hover:bg-red-50 px-4 py-2.5 rounded-xl transition cursor-pointer"
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete Project
                            </button>

                            <div className="flex items-center gap-3">
                                <Link
                                    href={route("stories.index")}
                                    className="rounded-xl border px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                                >
                                    Close View
                                </Link>
                                
                                <Link
                                    href={route("stories.edit", story.id)}
                                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm shadow-sm transition"
                                >
                                    Edit Details
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* --- CONFIRMATION MODAL COMPONENT --- */}
            {isConfirmingDelete && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    {/* Backdrop Tint */}
                    <div 
                        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
                        onClick={() => !processing && setIsConfirmingDelete(false)}
                    />

                    {/* Centering Layout Box wrapper */}
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all w-full max-w-md p-6 border">
                            <div className="sm:flex sm:items-start">
                                {/* Danger Icon Badge */}
                                <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Delete Project Update?
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            Are you sure you want to permanently delete <strong className="text-gray-800">"{story.title}"</strong>? This action cannot be undone and will erase all associated gallery photographs from the public carousel loop.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer Controls */}
                            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                                <button
                                    type="button"
                                    disabled={processing}
                                    onClick={() => setIsConfirmingDelete(false)}
                                    className="w-full sm:w-auto inline-flex justify-center rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    disabled={processing}
                                    onClick={handleDeleteSubmit}
                                    className="w-full sm:w-auto inline-flex justify-center items-center gap-1.5 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus:outline-none transition disabled:opacity-60 cursor-pointer"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Deleting...
                                        </>
                                    ) : 'Yes, Delete Project'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}