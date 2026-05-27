import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Navbar from "@/Components/Navbar";

export default function ClientShow({ story }) {
    // Collect all available project images (starting with the featured cover image)
    const allImages = story.images || [];
    
    // --- MODAL & CAROUSEL STATE MANAGEMENT ---
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    // Open modal at a specific image index position
    const openGallery = (index = 0) => {
        setActiveIndex(index);
        setIsOpen(true);
    };

    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    };

    const prevSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
    };

    // Keyboard controls shortcut routing listener
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'Escape') setIsOpen(false);
        };

        window.addEventListener('keydown', handleKeyDown);
        // Prevent background document viewport scrolling when modal overlay is visible
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, allImages.length]);

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
                        
                        {/* Featured Cover Image Section */}
                        {allImages.length > 0 && (
                            <div className="relative h-64 md:h-[420px] w-full bg-gray-900 group overflow-hidden">
                                
                                {/* Background blur layer to elegantly handle image frame filling without causing pixelated rendering */}
                                <div 
                                    className="absolute inset-0 bg-cover bg-center blur-xl opacity-40 scale-110 pointer-events-none"
                                    style={{ backgroundImage: `url('/storage/${allImages[0]?.path}')` }}
                                />

                                {/* ✅ Sharp Main Photo Container Layer */}
                                <img 
                                    src={`/storage/${allImages[0]?.path}`} 
                                    alt={story.title} 
                                    className="relative w-full h-full object-contain z-0"
                                />

                                {/* ✅ FIXED MOBILE OVERLAY: Always visible on mobile, darkens slightly on desktop hover */}
                                <div className="absolute inset-0 bg-black/30 md:bg-black/10 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                                    <button
                                        onClick={() => openGallery(0)}
                                        className="px-5 py-3 bg-white text-blue-700 md:bg-white/95 backdrop-blur rounded-xl font-semibold shadow-lg hover:bg-blue-600 hover:text-white transition flex items-center gap-2 transform md:translate-y-2 md:group-hover:translate-y-0 duration-300 text-sm md:text-base"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                        View Project Gallery ({allImages.length})
                                    </button>
                                </div>
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

                    {/* ✅ RE-ADDED EXTRA PHOTO GRID: Gives mobile users explicit thumbnails to tap on */}
                    {allImages.length > 1 && (
                        <div className="mt-12">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Project Gallery Grid</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {allImages.map((image, idx) => (
                                    <div 
                                        key={image.id} 
                                        onClick={() => openGallery(idx)}
                                        className="aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm cursor-pointer relative group"
                                    >
                                        <img 
                                            src={`/storage/${image.path}`} 
                                            alt="Project asset grid thumb item" 
                                            className="w-full h-full object-cover md:group-hover:scale-105 transition duration-300"
                                        />
                                        {/* Mobile Tap Flash Overlay Indicator */}
                                        <div className="absolute inset-0 bg-black/10 opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="p-2 rounded-full bg-white/90 shadow-sm text-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* --- LIGHTBOX MODAL GALLERY CAROUSEL SYSTEM --- */}
            {isOpen && allImages.length > 0 && (
                <div className="fixed inset-0 z-50 bg-gray-950/95 flex flex-col justify-between p-4 md:p-6 backdrop-blur-sm">
                    
                    {/* MODAL CONTROL TOP BAR */}
                    <div className="flex justify-between items-center w-full text-white pb-2 z-10">
                        <div className="text-sm font-medium tracking-wide bg-gray-900/60 px-3 py-1.5 rounded-full backdrop-blur-md">
                            Image {activeIndex + 1} of {allImages.length}
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="p-2.5 rounded-full bg-gray-900/60 border border-gray-800 hover:bg-gray-800 text-gray-300 hover:text-white shadow-md backdrop-blur-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* CAROUSEL CONTROLS */}
                    <div className="relative flex-1 flex items-center justify-center w-full max-w-5xl mx-auto my-auto max-h-[65vh]">
                        
                        {/* Left Arrow */}
                        {allImages.length > 1 && (
                            <button
                                onClick={prevSlide}
                                className="absolute left-2 md:-left-6 z-10 p-3 rounded-full bg-gray-900/70 border border-gray-800 hover:bg-gray-800 text-white transition shadow-lg"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        )}

                        {/* Active Image Canvas Frame */}
                        <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-2xl select-none">
                            <img
                                src={`/storage/${allImages[activeIndex]?.path}`}
                                alt={`Expanded view item ${activeIndex + 1}`}
                                className="max-w-full max-h-full object-contain shadow-2xl transition-all duration-300"
                            />
                        </div>

                        {/* Right Arrow */}
                        {allImages.length > 1 && (
                            <button
                                onClick={nextSlide}
                                className="absolute right-2 md:-right-6 z-10 p-3 rounded-full bg-gray-900/70 border border-gray-800 hover:bg-gray-800 text-white transition shadow-lg"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* BOTTOM THUMBNAIL COMPACT BAR TRACK SELECTION SECTION */}
                    <div className="w-full max-w-3xl mx-auto pt-4 border-t border-gray-900 z-10">
                        <div className="flex gap-3 overflow-x-auto justify-start md:justify-center pb-2 no-scrollbar scroll-smooth">
                            {allImages.map((img, index) => (
                                <button
                                    key={img.id}
                                    onClick={() => setActiveIndex(index)}
                                    className={`relative shrink-0 w-20 md:w-24 aspect-video rounded-lg overflow-hidden border-2 transition-all duration-200 bg-gray-900 ${
                                        index === activeIndex 
                                            ? 'border-blue-500 scale-105 opacity-100 shadow-md ring-4 ring-blue-500/10' 
                                            : 'border-transparent opacity-40 hover:opacity-80'
                                    }`}
                                >
                                    <img 
                                        src={`/storage/${img.path}`} 
                                        alt={`Thumbnail picker navigation row ${index + 1}`} 
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            )}
            
            {/* Utility custom CSS tag cleanup wrapper to hide native horizontal scroll track indicators */}
            <style dangerouslySetInnerHTML={{__html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </>
    );
}