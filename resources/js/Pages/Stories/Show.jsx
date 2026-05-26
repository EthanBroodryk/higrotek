import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ story }) {
    // Find the designated cover image or default to the first image array entry as a failsafe
    const coverImage = story.cover_image?.path || story.images?.[0]?.path;
    
    // Filter out the active cover image so it doesn't repeat inside the lower gallery grid
    const galleryImages = story.images?.filter(img => img.path !== coverImage) || [];

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
                    <div className="bg-white overflow-hidden border rounded-2xl shadow-sm p-6 sm:p-8">

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
                            <div className="relative rounded-2xl overflow-hidden shadow-sm border bg-gray-50 mb-6 max-h-[450px]">
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
                                {story.description}
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
                        <div className="flex items-center justify-end gap-3 border-t pt-6">
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
        </AuthenticatedLayout>
    );
}