import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from "@/Components/Navbar";
import { ArrowLeft, ChevronLeft, ChevronRight, Maximize2, LayoutGrid, X } from "lucide-react";

// Import components from your newly generated shadcn directory
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ClientShow({ story }) {
    const allImages = story?.images || [];
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const openGallery = (index = 0) => {
        setActiveIndex(index);
        setIsOpen(true);
    };

    const nextSlide = (e) => {
        e?.stopPropagation(); 
        setActiveIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    };

    const prevSlide = (e) => {
        e?.stopPropagation();
        setActiveIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
    };

    // Helper to divide the plain text into scannable paragraphs
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
        <>
            <Navbar />
            <Head title={`${story?.title || 'Story'} - Higrotek`} />

            <div className="min-h-screen bg-slate-50/50 pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-6">
                    
                    {/* Navigation Link styled as an atomic shadcn subtle button */}
                    <Button asChild variant="ghost" className="mb-6 gap-2 text-muted-foreground hover:text-primary">
                        <Link href="/">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Projects
                        </Link>
                    </Button>

                    {/* Main Content Area styled using shadcn Card component shell layout structure */}
                    <Card className="overflow-hidden border-slate-200/60 shadow-sm rounded-3xl bg-white">
                        {allImages.length > 0 && (
                            <div className="relative h-64 md:h-[460px] w-full bg-slate-950 group overflow-hidden">
                                <div 
                                    className="absolute inset-0 bg-cover bg-center blur-2xl opacity-30 scale-110 pointer-events-none"
                                    style={{ backgroundImage: `url('/storage/${allImages[0]?.path}')` }}
                                />
                                <img 
                                    src={`/storage/${allImages[0]?.path}`} 
                                    alt={story?.title} 
                                    className="relative w-full h-full object-contain z-0"
                                />

                                {/* Interactive Overlay */}
                                <div className="absolute inset-0 bg-slate-950/20 md:bg-transparent md:group-hover:bg-slate-950/30 transition-all duration-300 flex items-center justify-center z-10">
                                    <Button
                                        onClick={() => openGallery(0)}
                                        size="lg"
                                        className="gap-2 bg-white text-slate-950 hover:bg-slate-100 font-medium shadow-xl rounded-xl transition transform md:translate-y-2 md:group-hover:translate-y-0 duration-300"
                                    >
                                        <Maximize2 className="h-4 w-4 text-slate-500" />
                                        View Gallery ({allImages.length})
                                    </Button>
                        
                                </div>
                            </div>
                        )}

                        <CardContent className="p-8 md:p-14 flex flex-col items-center">
                            <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight text-center max-w-2xl leading-tight">
                                {story?.title}
                            </h1>

                            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground border-b border-slate-100 pb-8 w-full max-w-xs justify-center">
                                <span className="italic">Written by <strong className="text-slate-700 font-medium">{story?.user?.name ?? 'Higrotek Team'}</strong></span>
                            </div>

                            {/* Centered Editorial Typography Layout Section */}
                            <div className="mt-12 w-full">
                                <div className="text-center text-slate-300 text-2xl font-serif tracking-widest pointer-events-none select-none mb-8">
                                    ∗  ∗  ∗
                                </div>
                                <div className="w-full max-w-2xl mx-auto">
                                    {renderStoryParagraphs(story?.description)}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* PHOTO GRID GALLERY - Secondary Row Layout Section */}
                    {allImages.length > 1 && (
                        <div className="mt-16 text-center">
                            <div className="flex items-center justify-center gap-2 mb-6">
                                <LayoutGrid className="h-4 w-4 text-slate-400" />
                                <h2 className="text-xs font-semibold tracking-widest uppercase text-slate-400">
                                    Visual Project Records
                                </h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {allImages.map((image, idx) => (
                                    <Card 
                                        key={image.id || idx} 
                                        onClick={() => openGallery(idx)}
                                        className="aspect-video rounded-xl overflow-hidden bg-slate-50 border-slate-200/60 shadow-sm cursor-pointer relative group transition-all duration-300 hover:border-slate-300"
                                    >
                                        <img 
                                            src={`/storage/${image.path}`} 
                                            alt="Project asset grid thumbnail" 
                                            className="w-full h-full object-cover md:group-hover:scale-102 transition duration-500"
                                        />
                                        <div className="absolute inset-0 bg-slate-950/0 md:group-hover:bg-slate-950/20 transition-all flex items-center justify-center opacity-0 md:group-hover:opacity-100">
                                            <div className="p-2.5 rounded-full bg-white/90 shadow-md text-slate-800 backdrop-blur-sm">
                                                <Maximize2 className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* ✅ UPDATED FULL SCREEN MEDIA VIEWER DIALOG BOX TRACK */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                {/* 
                  1. `bg-black` maps down to completely black container profiles
                  2. `[&>button]:hidden` uses arbitrary selectors to completely target and vanish shadcn's original secondary generic absolute cross button template! 
                */}
                <DialogContent className="max-w-[100vw] h-screen w-screen p-0 m-0 bg-black border-none flex flex-col justify-between sm:rounded-none text-white focus:outline-none [&>button]:hidden">
                    
                    {/* Accessible Screen Reader Titles for Radix Compliance */}
                    <div className="sr-only">
                        <DialogTitle>{story?.title || 'Gallery'}</DialogTitle>
                        <DialogDescription>Project imagery slide showcase overview</DialogDescription>
                    </div>

                    {/* MODAL CONTROL TOP BAR */}
                    <div className="flex justify-between items-center w-full text-white px-6 pt-6 pb-2 z-50">
                        <div className="text-xs font-medium tracking-wide bg-neutral-900/90 border border-neutral-800 px-3 py-1.5 rounded-full backdrop-blur-md">
                            Image {activeIndex + 1} of {allImages.length}
                        </div>
                        
                        {/* Only your deliberate, clean control button remains visible here */}
                        <DialogClose asChild>
                            <Button 
                                size="icon" 
                                variant="outline" 
                                className="rounded-full bg-neutral-900/90 border-neutral-800 hover:bg-neutral-800 text-neutral-200 hover:text-white backdrop-blur-md shadow-md h-10 w-10 transition-all"
                            >
                                <X className="h-5 w-5" />
                                <span className="sr-only">Close gallery</span>
                            </Button>
                        </DialogClose>
                    </div>

                    {/* CAROUSEL CONTROLS */}
                    <div className="relative flex-1 flex items-center justify-center w-full max-w-5xl mx-auto my-auto max-h-[70vh] px-4">
                        {allImages.length > 1 && (
                            <Button
                                size="icon"
                                variant="outline"
                                onClick={prevSlide}
                                className="absolute left-4 z-50 rounded-full bg-neutral-900/60 border-neutral-800 hover:bg-neutral-800 hover:text-white text-white shadow-lg backdrop-blur-sm h-12 w-12"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </Button>
                        )}

                        {/* Active Image Canvas Frame */}
                        <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-xl select-none">
                            <img
                                src={`/storage/${allImages[activeIndex]?.path}`}
                                alt={`Expanded view item ${activeIndex + 1}`}
                                className="max-w-full max-h-full object-contain shadow-2xl transition-all duration-300 animate-in fade-in zoom-in-95 duration-200"
                            />
                        </div>

                        {allImages.length > 1 && (
                            <Button
                                size="icon"
                                variant="outline"
                                onClick={nextSlide}
                                className="absolute right-4 z-50 rounded-full bg-neutral-900/60 border-neutral-800 hover:bg-neutral-800 hover:text-white text-white shadow-lg backdrop-blur-sm h-12 w-12"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </Button>
                        )}
                    </div>

                    {/* BOTTOM THUMBNAIL COMPACT BAR TRACK SELECTION SECTION */}
                    <div className="w-full max-w-3xl mx-auto p-6 border-t border-neutral-900 bg-black/40 backdrop-blur-md z-50">
                        <div className="flex gap-3 overflow-x-auto justify-start md:justify-center pb-1 no-scrollbar scroll-smooth">
                            {allImages.map((img, index) => (
                                <button
                                    key={img.id || index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`relative shrink-0 w-20 md:w-24 aspect-video rounded-lg overflow-hidden border-2 transition-all duration-200 bg-neutral-950 ${
                                        index === activeIndex 
                                            ? 'border-blue-500 scale-105 opacity-100 shadow-xl ring-2 ring-blue-500/20' 
                                            : 'border-transparent opacity-40 hover:opacity-80'
                                    }`}
                                >
                                    <img 
                                        src={`/storage/${img.path}`} 
                                        alt={`Thumbnail preview control index selector button ${index + 1}`} 
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                </DialogContent>
            </Dialog>
            
            {/* Utility custom CSS tag cleanup wrapper to hide native horizontal scroll track indicators */}
            <style dangerouslySetInnerHTML={{__html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </>
    );
}