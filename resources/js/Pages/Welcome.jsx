import { useRef, useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from "@/Components/Navbar";

export default function Welcome() {
    // ✅ Destructured stories alongside the company logo from Inertia props
    const { logo, stories = [] } = usePage().props;
    const hasStories = stories.length > 0;

    // --- CAROUSEL SCROLL STATE & AUTOPLAY MANAGEMENT ---
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isPaused, setIsPaused] = useState(false); // ✅ Added missing state hook variable

    const checkScrollBounds = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 5);
            // Give a 5px buffer for rounding variances on high-density displays
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
        }
    };

    // Handle Scroll Listeners, Resize Bounds, and Hover Interactivity
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollBounds);
            // Initial run to determine if content overflows window view width
            checkScrollBounds();
            
            // Re-verify bounds if user shifts layout size
            window.addEventListener('resize', checkScrollBounds);

            // Pause autoplay when user hovers or touches carousel
            const pauseAction = () => setIsPaused(true);
            const resumeAction = () => setIsPaused(false);

            container.addEventListener('mouseenter', pauseAction);
            container.addEventListener('mouseleave', resumeAction);
            container.addEventListener('touchstart', pauseAction, { passive: true });
            container.addEventListener('touchend', resumeAction);

            return () => {
                container.removeEventListener('scroll', checkScrollBounds);
                window.removeEventListener('resize', checkScrollBounds);
                container.removeEventListener('mouseenter', pauseAction);
                container.removeEventListener('mouseleave', resumeAction);
                container.removeEventListener('touchstart', pauseAction);
                container.removeEventListener('touchend', resumeAction);
            };
        }
    }, [stories]);

    // Manual slide control handler trigger
    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { clientWidth } = scrollContainerRef.current;
            // Slides horizontally by approximately 75% of container viewport panel widths
            const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // Autoplay Timer Loop Effect
    useEffect(() => {
        if (stories.length <= 1 || isPaused) return;

        const interval = setInterval(() => {
            if (scrollContainerRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
                
                // If we are at the end, roll back smoothly to the beginning
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    scrollContainerRef.current.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                } else {
                    // Otherwise, slide right by one card view cluster
                    scrollContainerRef.current.scrollBy({
                        left: clientWidth * 0.75,
                        behavior: 'smooth'
                    });
                }
            }
        }, 5000); // 5000ms = 5 seconds autoplay intervals

        return () => clearInterval(interval);
    }, [stories, isPaused, canScrollRight]);

    return (
        <>
            <Navbar />
            <Head title="Higrotek - Blue Energy Solutions" />

            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800 pt-16">

                {/* HERO */}
                <section id="hero" className="scroll-mt-24 flex flex-col items-center justify-center text-center px-6 py-24">
                    {logo ? (
                        <img
                            src={logo}
                            alt="Higrotek Logo"
                            className="h-36 sm:h-56 md:h-64 lg:h-72 w-full max-w-xs sm:max-w-none object-contain mb-4"
                        />
                    ) : (
                        <h1 className="text-5xl font-bold text-blue-700">
                            Higrotek
                        </h1>
                    )}
                    <p className="mt-4 text-xl max-w-2xl text-gray-600">
                        Powering a cleaner future with smart, sustainable energy solutions.
                    </p>

                    <div className="mt-8 flex gap-4">
                        <Link
                            href="/contact"
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                        >
                            Get a Quote
                        </Link>

                        <button
                            onClick={() => document.getElementById("who-we-are")?.scrollIntoView({ behavior: "smooth" })}
                            className="px-6 py-3 border border-blue-600 text-blue-700 rounded-xl hover:bg-blue-50 transition"
                        >
                            Learn More
                        </button>
                    </div>
                </section>

                {/* WHO WE ARE */}
                <section id="who-we-are" className="scroll-mt-24 max-w-6xl mx-auto px-6 py-16">
                    <h2 className="text-3xl font-bold text-blue-700 mb-6">
                        Who We Are
                    </h2>

                    <p className="text-gray-700 leading-relaxed">
                        Higrotek Renewable Energy is a proudly South African company specialising in mid-size solar PV installations.
                        We serve commercial and industrial clients nationwide with grid-tied and hybrid systems including battery energy storage (BESS).
                    </p>

                    <p className="mt-4 text-gray-700 leading-relaxed">
                        Based in Gauteng, we focus on hands-on technical leadership, compliance, and long-term system performance.
                    </p>
                </section>

                {/* VISION & MISSION */}
                <section className="bg-blue-700 text-white py-20 px-6">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
                        <div>
                            <h3 className="text-2xl font-bold">Our Vision</h3>
                            <p className="mt-3 text-blue-100">
                                To drive South Africa’s transition to clean, reliable energy by being the solar partner of choice for quality-driven businesses.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold">Our Mission</h3>
                            <p className="mt-3 text-blue-100">
                                To design, install, and maintain high-performance solar systems that reduce costs and improve energy security.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CORE STRENGTHS */}
                <section className="max-w-6xl mx-auto px-6 py-20">
                    <h2 className="text-3xl font-bold text-blue-700 mb-8">
                        Core Strengths
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                        {[
                            "Solar PV Design & Installation (Rooftop, Carport, Ground Mount)",
                            "Grid-Tied and Hybrid BESS Solutions",
                            "Civil & Structural Installation Works",
                            "Compliance Inspections (NRS/SANS)",
                            "SSEG Application Assistance",
                            "Fault Finding & Repairs",
                            "Operations & Maintenance (O&M)",
                            "Energy Monitoring & Optimisation"
                        ].map((item, i) => (
                            <div key={i} className="p-4 bg-gray-50 rounded-lg">
                                {item}
                            </div>
                        ))}
                    </div>
                </section>

                {/* SERVICES */}
                <section id="services" className="scroll-mt-24 max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
                    <div className="p-6 bg-white rounded-2xl shadow">
                        <h3 className="text-xl font-semibold text-blue-700">
                            Solar Installations
                        </h3>
                        <p className="mt-2 text-gray-600">
                            EPC solutions for commercial and industrial solar PV systems from design to commissioning.
                        </p>
                    </div>

                    <div className="p-6 bg-white rounded-2xl shadow">
                        <h3 className="text-xl font-semibold text-blue-700">
                            Fault Finding & Maintenance
                        </h3>
                        <p className="mt-2 text-gray-600">
                            Advanced diagnostics using professional tools, thermal imaging, and inverter analysis.
                        </p>
                    </div>

                    <div className="p-6 bg-white rounded-2xl shadow">
                        <h3 className="text-xl font-semibold text-blue-700">
                            Battery Storage (BESS)
                        </h3>
                        <p className="mt-2 text-gray-600">
                            Hybrid and grid-tied battery systems for energy security and cost reduction.
                        </p>
                    </div>
                </section>

                {/* LEADERSHIP */}
                <section className="bg-blue-50 py-20 px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-blue-700 mb-10">
                            Leadership Team
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow">
                                <h3 className="font-semibold text-lg">Pieter Brand</h3>
                                <p className="text-sm text-gray-600">Managing Director</p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow">
                                <h3 className="font-semibold text-lg">Dewald Becker</h3>
                                <p className="text-sm text-gray-600">Head of Projects</p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow">
                                <h3 className="font-semibold text-lg">Rico du Plessis</h3>
                                <p className="text-sm text-gray-600">Business Development</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* DYNAMIC HORIZONTAL SWIPEABLE PROJECTS CAROUSEL SECTION */}
                {hasStories && (
                    <section id="latest-stories" className="scroll-mt-24 max-w-6xl mx-auto px-6 py-20 overflow-hidden">
                        
                        {/* CAROUSEL HEADER PANEL */}
                        <div className="mb-10">
                            <h2 className="text-3xl font-bold text-blue-700">
                                Latest Projects & Updates
                            </h2>
                            <p className="text-gray-500 mt-1 text-sm">
                                See how we are powering commercial and industrial spaces across South Africa.
                            </p>
                        </div>

                        {/* CAROUSEL TRACK WRAPPER WITH SIDE CONTROLS */}
                        <div className="relative group/carousel-container">
                            
                            {/* LEFT ARROW (Vertically Centered) */}
                            {stories.length > 1 && (
                                <button
                                    onClick={() => scroll('left')}
                                    disabled={!canScrollLeft}
                                    aria-label="Scroll left"
                                    className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full border transition-all duration-200 flex items-center justify-center bg-white shadow-md ${
                                        canScrollLeft
                                            ? 'border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-700 scale-100 opacity-100 md:opacity-0 md:group-hover/carousel-container:opacity-100'
                                            : 'border-gray-100 text-gray-300 cursor-not-allowed opacity-40'
                                    }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            )}

                            {/* RIGHT ARROW (Vertically Centered) */}
                            {stories.length > 1 && (
                                <button
                                    onClick={() => scroll('right')}
                                    disabled={!canScrollRight}
                                    aria-label="Scroll right"
                                    className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full border transition-all duration-200 flex items-center justify-center bg-white shadow-md ${
                                        canScrollRight
                                            ? 'border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-700 scale-100 opacity-100 md:opacity-0 md:group-hover/carousel-container:opacity-100'
                                            : 'border-gray-100 text-gray-300 cursor-not-allowed opacity-40'
                                    }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}

                            {/* HORIZONTAL CONTAINER TRACK */}
                            <div
                                ref={scrollContainerRef}
                                className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-6 -mx-4 px-4 scroll-smooth"
                                style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
                            >
                                {stories.map((story) => {
                                    const mainImage = story.cover_image?.path || story.images?.[0]?.path;
                                    const remainingCount = story.images?.length || 0;

                                    return (
                                        <div
                                            key={story.id}
                                            className="w-[85vw] sm:w-[45vw] lg:w-[31%] shrink-0 snap-start group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
                                        >
                                            <div>
                                                {/* PROJECT IMAGE HEADER */}
                                                <div className="relative h-52 w-full bg-gray-100 overflow-hidden">
                                                    {mainImage ? (
                                                        <img
                                                            src={`/storage/${mainImage}`}
                                                            alt={story.title}
                                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-102"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center text-sm text-gray-400 font-medium bg-gray-50">
                                                            Higrotek Energy Project
                                                        </div>
                                                    )}

                                                    {/* EXTRA GALLERIES IMAGE BADGE */}
                                                    {remainingCount > 1 && (
                                                        <span className="absolute bottom-3 right-3 bg-blue-600/90 backdrop-blur-sm text-white text-[11px] font-semibold px-2 py-1 rounded-md shadow-sm">
                                                            +{remainingCount - 1} More Photos
                                                        </span>
                                                    )}
                                                </div>

                                                {/* BODY DETAILS */}
                                                <div className="p-5">
                                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition duration-200 line-clamp-1">
                                                        {story.title}
                                                    </h3>
                                                    
                                                    {story.description && (
                                                        <p className="mt-2 line-clamp-3 text-sm text-gray-600 leading-relaxed">
                                                            {story.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* VIEW ATTACHED STORY FOOTER LINK */}
                                            <div className="px-5 pb-5 pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                                                <span>
                                                    By {story.user?.name ?? 'Higrotek Team'}
                                                </span>

                                                <Link
                                                    href={route('stories.show', story.id)}
                                                    className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-1 group/link"
                                                >
                                                    Read Full Story 
                                                    <span className="transition-transform group-hover/link:translate-x-0.5">→</span>
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Inline styles helper to completely hide scroll bars across browsers */}
                        <style dangerouslySetInnerHTML={{__html: `
                            .no-scrollbar::-webkit-scrollbar {
                                display: none;
                            }
                            .no-scrollbar {
                                -ms-overflow-style: none;
                                scrollbar-width: none;
                            }
                        `}} />
                    </section>
                )}
                    

                {/* CTA */}
                <section id="contact-cta" className="scroll-mt-24 py-20 text-center px-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Ready to switch to clean energy?
                    </h2>

                    <p className="mt-2 text-gray-600">
                        Let’s design a sustainable energy solution for your business.
                    </p>

                    <Link
                        href="/contact"
                        className="mt-6 inline-block px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                    >
                        Contact Higrotek
                    </Link>
                </section>

                {/* FOOTER */}
                <footer className="py-10 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Higrotek Renewable Energy. All rights reserved.
                </footer>

            </div>
        </>
    );
}