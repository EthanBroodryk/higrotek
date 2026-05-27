import { Head, Link } from '@inertiajs/react';
import Navbar from "@/Components/Navbar";

export default function ClientShow({ story }) {
    const coverImage = story.cover_image?.path || story.images?.[0]?.path;
    // Filter out the cover image from the rest of the gallery images
    const galleryImages = story.images?.filter(img => img.path !== coverImage) || [];

    return (
        <>
            <Navbar />
            <Head title={`${story.title} - Higrotek`} />

            <div className="min-h-screen bg-gray-50 pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-6">
                    
                    {/* Back to Home Link */}
                    <Link 
                        href="/" 
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-700 transition mb-6"
                    >
                        ← Back to Projects
                    </Link>

                    <article className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                        {/* Featured Cover Image */}
                        {coverImage && (
                            <div className="relative h-64 md:h-[400px] w-full bg-gray-100">
                                <img 
                                    src={`/storage/${coverImage}`} 
                                    alt={story.title} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Article Content */}
                        <div className="p-6 md:p-10">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                                {story.title}
                            </h1>

                            <div className="mt-3 flex items-center gap-2 text-sm text-gray-400 border-b border-gray-100 pb-6">
                                <span>Published by <strong>{story.user?.name ?? 'Higrotek Team'}</strong></span>
                            </div>

                            {/* Story Body Paragraphs */}
                            <div className="mt-6 text-gray-700 leading-relaxed space-y-4 whitespace-pre-line text-base md:text-lg">
                                {story.description}
                            </div>
                        </div>
                    </article>

                    {/* Additional Photo Gallery Grid */}
                    {galleryImages.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Project Gallery</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {galleryImages.map((image) => (
                                    <div key={image.id} className="aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm">
                                        <img 
                                            src={`/storage/${image.path}`} 
                                            alt="Project update snippet" 
                                            className="w-full h-full object-cover hover:scale-105 transition duration-300 cursor-pointer"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}