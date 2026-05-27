import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Navbar() {
    const [active, setActive] = useState("home");
    const [open, setOpen] = useState(false);
    
    // ✅ Extract logo, stories, and auth session state from global Inertia page props
    const { logo, stories = [], auth } = usePage().props;
    const hasStories = stories.length > 0;
    const isLoggedIn = !!auth?.user;

    // Helper function to handle fallback smoothing if sections don't exist on sub-pages
    const scrollToSection = (id, fallbackUrl = "/") => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        } else {
            // If the user is on /projects/{id}, redirect them home first
            window.location.href = fallbackUrl;
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg shadow-sm z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                
                {/* LOGO CONTAINER */}
                <button
                    onClick={() => {
                        setActive("home");
                        scrollToSection("hero");
                    }}
                    className="flex items-center"
                >
                    {logo ? (
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-10 md:h-12 w-auto object-contain"
                        />
                    ) : (
                        <span className="text-xl font-bold text-blue-700">
                            Higrotek
                        </span>
                    )}
                </button>

                {/* DESKTOP MENU */}
                <div className="hidden md:flex gap-8 text-gray-700 font-medium items-center">
                    <button
                        onClick={() => {
                            setActive("home");
                            scrollToSection("hero");
                        }}
                        className={`transition ${
                            active === "home"
                                ? "text-blue-700 font-semibold"
                                : "text-gray-700 hover:text-blue-700"
                        }`}
                    >
                        Home
                    </button>

                    <button
                        onClick={() => {
                            setActive("about");
                            scrollToSection("who-we-are");
                        }}
                        className={`transition ${
                            active === "about"
                                ? "text-blue-700 font-semibold"
                                : "text-gray-700 hover:text-blue-700"
                        }`}
                    >
                        About
                    </button>

                    <button
                        onClick={() => {
                            setActive("services");
                            scrollToSection("services");
                        }}
                        className={`transition ${
                            active === "services"
                                ? "text-blue-700 font-semibold"
                                : "text-gray-700 hover:text-blue-700"
                        }`}
                    >
                        Services
                    </button>

                    {/* DESKTOP PROJECTS LINK */}
                    {hasStories && (
                        <button
                            onClick={() => {
                                setActive("projects");
                                scrollToSection("latest-stories");
                            }}
                            className={`transition ${
                                active === "projects"
                                    ? "text-blue-700 font-semibold"
                                    : "text-gray-700 hover:text-blue-700"
                            }`}
                        >
                            Projects
                        </button>
                    )}
                    
                    {/* CONTACT LINK */}
                    <button
                        onClick={() => {
                            setActive("contact");
                            scrollToSection("contact-cta");
                        }}
                        className={`transition ${
                            active === "contact"
                                ? "text-blue-700 font-semibold"
                                : "text-gray-700 hover:text-blue-700"
                        }`}
                    >
                        Contact
                    </button>

                    {/* ✅ DESKTOP LOGIN/DASHBOARD ROUTE LINK */}
                    <Link
                        href={isLoggedIn ? route('dashboard') : route('login')}
                        className="text-xs font-semibold text-gray-400 hover:text-blue-600 border-l border-gray-200 pl-6 transition duration-200"
                    >
                        {isLoggedIn ? "Dashboard →" : "Portal Login"}
                    </Link>
                </div>

                {/* MOBILE MENU BUTTON */}
                <button
                    className="md:hidden text-gray-700 focus:outline-none p-1"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    {open ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* MOBILE DROPDOWN */}
            {open && (
                <div className="md:hidden bg-white shadow-inner border-t border-gray-100 animate-fade-in pb-4">
                    <button
                        onClick={() => {
                            setOpen(false);
                            setActive("home");
                            scrollToSection("hero");
                        }}
                        className={`block px-6 py-3 w-full text-left transition ${
                            active === "home"
                                ? "text-blue-700 font-semibold bg-blue-50"
                                : "text-gray-700 hover:bg-blue-50"
                        }`}
                    >
                        Home
                    </button>

                    <button
                        onClick={() => {
                            setOpen(false);
                            setActive("about");
                            scrollToSection("who-we-are");
                        }}
                        className={`block px-6 py-3 w-full text-left transition ${
                            active === "about"
                                ? "text-blue-700 font-semibold bg-blue-50"
                                : "text-gray-700 hover:bg-blue-50"
                        }`}
                    >
                        About
                    </button>

                    <button
                        onClick={() => {
                            setOpen(false);
                            setActive("services");
                            scrollToSection("services");
                        }}
                        className={`block px-6 py-3 w-full text-left transition ${
                            active === "services"
                                ? "text-blue-700 font-semibold bg-blue-50"
                                : "text-gray-700 hover:bg-blue-50"
                        }`}
                    >
                        Services
                    </button>

                    {/* MOBILE PROJECTS LINK */}
                    {hasStories && (
                        <button
                            onClick={() => {
                                setOpen(false);
                                setActive("projects");
                                scrollToSection("latest-stories");
                            }}
                            className={`block px-6 py-3 w-full text-left transition ${
                                active === "projects"
                                    ? "text-blue-700 font-semibold bg-blue-50"
                                    : "text-gray-700 hover:bg-blue-50"
                            }`}
                        >
                            Projects
                        </button>
                    )}

                    <button
                        onClick={() => {
                            setOpen(false);
                            setActive("contact");
                            scrollToSection("contact-cta");
                        }}
                        className={`block px-6 py-3 w-full text-left transition ${
                            active === "contact"
                                ? "text-blue-700 font-semibold bg-blue-50"
                                : "text-gray-700 hover:bg-blue-50"
                        }`}
                    >
                        Contact
                    </button>

                    <div className="px-6 pt-4 grid grid-cols-2 gap-3 border-t border-gray-100 mt-2">
                        {/* ✅ MOBILE LOGIN/DASHBOARD ACTION LINK */}
                        <Link 
                            href={isLoggedIn ? route('dashboard') : route('login')}
                            className="px-4 py-2.5 border border-gray-200 text-center text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50 transition"
                        >
                            {isLoggedIn ? "Dashboard" : "Portal Login"}
                        </Link>

                        <button
                            onClick={() => {
                                setOpen(false);
                                setActive("contact");
                                scrollToSection("contact-cta");
                            }}
                            className="px-4 py-2.5 bg-blue-600 text-center text-sm font-semibold text-white rounded-xl hover:bg-blue-700 transition shadow-sm"
                        >
                            Get a Quote
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}