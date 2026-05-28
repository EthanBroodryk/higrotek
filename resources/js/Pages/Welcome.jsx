import { useRef, useState, useEffect } from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import Navbar from "@/Components/Navbar";

export default function Welcome() {
    // Destructured stories alongside the company logo from Inertia props
    const { logo, stories = [] } = usePage().props;
    const hasStories = stories.length > 0;

    // --- CONTACT DRAWER COMPONENT HOOK MANAGEMENT ---
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isRendered, setIsRendered] = useState(false);

    // Inertia form submission hook tracking contact data properties
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
    });

    // Control mounting lifecycle delays to trigger transition frames correctly
    const openContactDrawer = () => {
        setIsRendered(true);
        setTimeout(() => setIsContactOpen(true), 10);
    };

    const closeContactDrawer = () => {
        setIsContactOpen(false);
        setTimeout(() => setIsRendered(false), 350); // Matches sliding transition durations
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        post(route('contact.submit'), {
            onSuccess: () => {
                reset();
                setTimeout(() => closeContactDrawer(), 2000);
            }
        });
    };

    // --- CAROUSEL SCROLL STATE & AUTOPLAY MANAGEMENT ---
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isPaused, setIsPaused] = useState(false);

    const checkScrollBounds = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 5);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollBounds);
            checkScrollBounds();
            window.addEventListener('resize', checkScrollBounds);

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

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { clientWidth } = scrollContainerRef.current;
            const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        if (stories.length <= 1 || isPaused) return;

        const interval = setInterval(() => {
            if (scrollContainerRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
                
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    scrollContainerRef.current.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                } else {
                    scrollContainerRef.current.scrollBy({
                        left: clientWidth * 0.75,
                        behavior: 'smooth'
                    });
                }
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [stories, isPaused, canScrollRight]);

    return (
        <>
            <Navbar />
            <Head title="Higrotek - Blue Energy Solutions" />

            <div className={`min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800 pt-16 transition-all duration-300 ${isContactOpen ? 'blur-[2px] pointer-events-none select-none scale-[0.99]' : ''}`}>

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
                        {/* ✅ UPGRADED CONTACT TRIGGER TO LAUNCH MODAL */}
                        <button
                            onClick={openContactDrawer}
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg transition"
                        >
                            Get a Quote
                        </button>

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
                <section id="services" className="scroll-mt-24 max-w-6xl mx-auto px-6 py-20">
                    {/* Section Header with Fade-In Up Animation */}
                    <div className="text-center mb-12 animate-fade-in-up animate-duration-700 animate-ease-out">
                        <h2 className="text-3xl font-bold text-blue-700 sm:text-4xl tracking-tight">
                            Our Professional Services
                        </h2>
                        <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
                            High-quality, compliant, and cost-effective commercial and industrial energy engineering.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        
                        {/* 1. Solar Installations (EPC) */}
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition duration-300 hover:shadow-md hover:-translate-y-0.5">
                            <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-5 font-bold text-lg">01</div>
                            <h3 className="text-xl font-bold text-gray-900">
                                Solar Installations
                            </h3>
                            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                                We offer end-to-end EPC (Engineering, Procurement, and Construction) solutions for solar PV systems across the commercial and industrial sectors. Our services cover the full project lifecycle — from initial design and permitting to procurement, installation, and commissioning — ensuring reliable energy solutions that reduce costs and support sustainability.
                            </p>
                        </div>

                        {/* 2. Structures & Civil Works */}
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition duration-300 hover:shadow-md hover:-translate-y-0.5">
                            <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-5 font-bold text-lg">02</div>
                            <h3 className="text-xl font-bold text-gray-900">
                                Structures & Civil Works
                            </h3>
                            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                                Turnkey installation solutions for rooftop, carport, and ground-mounted solar systems, including all associated civil works. Our services include structural assembly, foundations, trenching, cable routing, and site preparation. With a focus on durability and precision, we ensure every system is built to perform and last.
                            </p>
                        </div>

                        {/* 3. Advanced Fault Finding & Diagnostics */}
               
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition duration-300 hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between">
                            <div>
                                <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-5 font-bold text-lg">03</div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    Fault Finding & Diagnostics
                                </h3>
                                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                                    Specialized troubleshooting using industry-leading tools and technologies. We utilize Sonel insulation resistance testers, thermal inspections, and infrared scanning to detect faults with precision. Our technicians use professional-grade meters and various inverter software platforms to minimize downtime and ensure optimal performance.
                                </p>

                        {/* Card Image Cover */}
                                <div className="w-full h-48 rounded-xl overflow-hidden mb-5 bg-gray-50 border">
                                    <img 
                                        src="/storage/webpics/ARiWLf.png" 
                                        alt="Advanced Fault Finding & Diagnostics" 
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            // Failsafe in case file path mapping is broken or missing on local dev
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </div>


                            </div>
                        </div>

                        {/* 4. System Audits & Repairs */}
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition duration-300 hover:shadow-md hover:-translate-y-0.5">
                            <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-5 font-bold text-lg">04</div>
                            <h3 className="text-xl font-bold text-gray-900">
                                System Audits & Repairs
                            </h3>
                            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                                Comprehensive diagnostics for new and existing solar PV installations to identify performance inefficiencies, safety risks, and non-compliance with electrical standards or best practices. We provide targeted rectification and repair solutions to restore systems to full operational capacity and industry compliance.
                            </p>
                        </div>

                        {/* 5. Operations & Maintenance (O&M) */}
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition duration-300 hover:shadow-md hover:-translate-y-0.5">
                            <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-5 font-bold text-lg">05</div>
                            <h3 className="text-xl font-bold text-gray-900">
                                Operations & Maintenance (O&M)
                            </h3>
                            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                                Customized O&M services designed to maximize system uptime and efficiency. Our solutions include routine solar panel cleaning, remote system monitoring, condition scanning, and proactive optimization based on site-specific parameters, combining preventative maintenance with data insights for long-term reliability.
                            </p>
                        </div>

                        {/* 6. System Balancing & Optimisation */}
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition duration-300 hover:shadow-md hover:-translate-y-0.5">
                            <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-5 font-bold text-lg">06</div>
                            <h3 className="text-xl font-bold text-gray-900">
                                Balancing & Optimisation
                            </h3>
                            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                                Often overlooked, we systematically enhance the performance and efficiency of solar PV assets. Making use of professional audits, rigorous data analysis, and technical fine-tuning, we identify and resolve component mismatches or imbalances across your array to improve your long-term energy yield and maximize ROI.
                            </p>
                        </div>

                    </div>
                </section>

                {/* LEADERSHIP */}
                <section id="leadership" className="bg-blue-50 py-20 px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-blue-700 mb-10">
                            Leadership Team
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            
                            {/* Pieter Brand - With Profile Picture */}
                            <div className="bg-white p-6 rounded-xl shadow transition duration-300 hover:shadow-md hover:-translate-y-0.5 flex flex-col items-start gap-3">
                                <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 border shrink-0">
                                    <img 
                                        src="/storage/teammemberpics/9ru1pW.jpg" 
                                        alt="Pieter Brand" 
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900 leading-tight">Pieter Brand</h3>
                                    <p className="text-sm font-medium text-blue-700 mt-0.5">Managing Director</p>
                                    
                                    {/* Professional Credentials Block */}
                                    <div className="mt-2 pt-2 border-t border-gray-100">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Professional Credentials</p>
                                        <p className="text-sm text-gray-700 font-medium mt-0.5">Electrical Engineer</p>
                                        <p className="text-xs text-gray-500 font-mono mt-0.5">(PrEng No. 20110405)</p>
                                    </div>
                                </div>
                            </div>
                            {/* Dewald Becker */}
                            <div className="bg-white p-6 rounded-xl shadow transition duration-300 hover:shadow-md hover:-translate-y-0.5 flex flex-col items-start gap-3">
                                <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 border shrink-0">
                                    <img 
                                        src="/storage/teammemberpics/PGVQr6.png" 
                                        alt="Dewald Becker" 
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900 leading-tight">Dewald Becker</h3>
                                    <p className="text-sm font-medium text-blue-700 mt-0.5">Head of Projects</p>
                                    
                                    {/* Technical Qualifications & Specialization Block */}
                                    <div className="mt-2 pt-2 border-t border-gray-100">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Qualifications & Focus</p>
                                        <p className="text-sm text-gray-700 font-medium mt-0.5">
                                            Qualified Electrician <span className="text-xs text-gray-500 font-mono">(Red Seal Trade Test, NQF Level 5)</span>
                                        </p>
                                        <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                                            Specialist in fault finding and implementation of PV & hybrid systems.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Rico du Plessis */}
                            <div className="bg-white p-6 rounded-xl shadow transition duration-300 hover:shadow-md hover:-translate-y-0.5 flex flex-col items-start gap-3">
                                <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 border shrink-0">
                                    <img 
                                        src="/storage/teammemberpics/fXvsjE.png" 
                                        alt="Rico du Plessis" 
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900 leading-tight">Rico du Plessis</h3>
                                    <p className="text-sm font-medium text-blue-700 mt-0.5">Business Development</p>
                                    
                                    {/* Focus & Core Expertise Block */}
                                    <div className="mt-2 pt-2 border-t border-gray-100">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Core Focus</p>
                                        <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                                            New business development and long-term customer relationships.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* DYNAMIC PROJECTS CAROUSEL SECTION */}
                {hasStories && (
                    <section id="latest-stories" className="scroll-mt-24 max-w-6xl mx-auto px-6 py-20 overflow-hidden">
                        <div className="mb-10">
                            <h2 className="text-3xl font-bold text-blue-700">
                                Latest Projects & Updates
                            </h2>
                            <p className="text-gray-500 mt-1 text-sm">
                                See how we are powering commercial and industrial spaces across South Africa.
                            </p>
                        </div>

                        <div className="relative group/carousel-container">
                            {stories.length > 1 && (
                                <button
                                    onClick={() => scroll('left')}
                                    disabled={!canScrollLeft}
                                    aria-label="Scroll left"
                                    className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full border transition-all duration-200 flex items-center justify-center bg-white shadow-md ${
                                        canScrollLeft ? 'border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-700 scale-100 opacity-100 md:opacity-0 md:group-hover/carousel-container:opacity-100' : 'border-gray-100 text-gray-300 cursor-not-allowed opacity-40'
                                    }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            )}

                            {stories.length > 1 && (
                                <button
                                    onClick={() => scroll('right')}
                                    disabled={!canScrollRight}
                                    aria-label="Scroll right"
                                    className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full border transition-all duration-200 flex items-center justify-center bg-white shadow-md ${
                                        canScrollRight ? 'border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-700 scale-100 opacity-100 md:opacity-0 md:group-hover/carousel-container:opacity-100' : 'border-gray-100 text-gray-300 cursor-not-allowed opacity-40'
                                    }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}

                            <div
                                ref={scrollContainerRef}
                                className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-6 -mx-4 px-4 scroll-smooth"
                                style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
                            >
                                {stories.map((story) => {
                                    const mainImage = story.cover_image?.path || story.images?.[0]?.path;
                                    const remainingCount = story.images?.length || 0;

                                    return (
                                        <div key={story.id} className="w-[85vw] sm:w-[45vw] lg:w-[31%] shrink-0 snap-start group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between">
                                            <div>
                                                <div className="relative h-52 w-full bg-gray-100 overflow-hidden">
                                                    {mainImage ? (
                                                        <img src={`/storage/${mainImage}`} alt={story.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-102" />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center text-sm text-gray-400 font-medium bg-gray-50">Higrotek Energy Project</div>
                                                    )}
                                                    {remainingCount > 1 && (
                                                        <span className="absolute bottom-3 right-3 bg-blue-600/90 backdrop-blur-sm text-white text-[11px] font-semibold px-2 py-1 rounded-md shadow-sm">+{remainingCount - 1} More Photos</span>
                                                    )}
                                                </div>
                                                <div className="p-5">
                                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition duration-200 line-clamp-1">{story.title}</h3>
                                                    {story.description && <p className="mt-2 line-clamp-3 text-sm text-gray-600 leading-relaxed">{story.description}</p>}
                                                </div>
                                            </div>
                                            <div className="px-5 pb-5 pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                                                <span>By {story.user?.name ?? 'Higrotek Team'}</span>
                                                <Link href={route('stories.show.client', story.id)} className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-1 group/link">
                                                    Read Full Story <span className="transition-transform group-hover/link:translate-x-0.5">→</span>
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <style dangerouslySetInnerHTML={{__html: `.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}} />
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
                    {/* ✅ UPGRADED BOTTOM CALL TO ACTION BUTTON */}
                    <button
                        onClick={openContactDrawer}
                        className="mt-6 inline-block px-8 py-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg transition cursor-pointer"
                    >
                        Contact Higrotek
                    </button>
                </section>

                {/* FOOTER */}
                <footer className="py-10 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Higrotek Renewable Energy. All rights reserved.
                </footer>
            </div>

            {/* --- SLIDING CONTACT MODAL PANEL DRAWER LAYER --- */}
            {isRendered && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    {/* Backdrop Tint Panel overlay layer */}
                    <div 
                        className={`absolute inset-0 bg-gray-900/40 backdrop-blur-xs transition-opacity duration-300 ${isContactOpen ? 'opacity-100' : 'opacity-0'}`}
                        onClick={closeContactDrawer} 
                    />

                    {/* Sliding Box Body Panel */}
                    <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
                        <div className={`w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isContactOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                            
                            {/* Drawer Shell Top Header panel */}
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Get in Touch</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">Let's discuss your custom solar project requirements.</p>
                                </div>
                                <button 
                                    onClick={closeContactDrawer}
                                    className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-200 transition"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Contact Interactive Core Container Form Body */}
                            <div className="flex-1 overflow-y-auto p-6">
                                {wasSuccessful ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center px-4">
                                        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 animate-bounce">
                                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900">Message Received!</h4>
                                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                                            Thank you for reaching out. The Higrotek technical design engineering team will review your parameters and respond shortly.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleContactSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Full Name *</label>
                                            <input 
                                                type="text" required
                                                value={data.name} onChange={e => setData('name', e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
                                                placeholder="e.g. Pieter Brand"
                                            />
                                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Email Address *</label>
                                            <input 
                                                type="email" required
                                                value={data.email} onChange={e => setData('email', e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
                                                placeholder="name@company.co.za"
                                            />
                                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Company / Organization</label>
                                            <input 
                                                type="text"
                                                value={data.company} onChange={e => setData('company', e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
                                                placeholder="Company Name Pty Ltd"
                                            />
                                            {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Contact Number</label>
                                            <input 
                                                type="tel"
                                                value={data.phone} onChange={e => setData('phone', e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
                                                placeholder="e.g. +27 11 123 4567"
                                            />
                                            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Project Details / Message *</label>
                                            <textarea 
                                                rows="4" required
                                                value={data.message} onChange={e => setData('message', e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition resize-none"
                                                placeholder="Provide summary scope (e.g. 150kW commercial solar installation, carport racking, grid-tied battery storage, etc.)..."
                                            />
                                            {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                                        </div>

                                        <button 
                                            type="submit" disabled={processing}
                                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl tracking-wide shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                                        >
                                            {processing ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Transmitting Details...
                                                </>
                                            ) : 'Submit Request'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}