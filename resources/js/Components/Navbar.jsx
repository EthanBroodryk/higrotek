import { useState } from "react";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
export default function Navbar() {
    const [active, setActive] = useState("home");
    const [open, setOpen] = useState(false);
    const { logo } = usePage().props;
    return (
        <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                
                {/* LOGO */}
                {/* <Link href="/" className="flex items-center">
                    <img
                        src="/storage/logos/niUKMliCL6aS7UG6vWofx23FQDnYNqA4CxSPn8TL.png"
                        alt="Higrotek Logo"
                        className="h-10 md:h-12 w-auto"
                    />
                </Link> */}
                {/* <Link href="/" className="flex items-center">
                    {logo ? (
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-10 md:h-12 w-auto"
                        />
                    ) : (
                        <span className="text-xl font-bold text-green-700">
                            Higrotek
                        </span>
                    )}
                </Link> */}

                <button
                    onClick={() => {
                        setActive("home");
                        document.getElementById("hero")?.scrollIntoView({
                            behavior: "smooth",
                        });
                    }}
                    className="flex items-center"
                    >
                    {logo ? (
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-10 md:h-12 w-auto"
                        />
                    ) : (
                    <span className="text-xl font-bold text-green-700">
                        Higrotek
                    </span>
                    )}
                </button>

                {/* DESKTOP MENU */}
                <div className="hidden md:flex gap-8 text-gray-700 font-medium">
                    {/* <Link href="/" className="hover:text-green-700 transition">Home</Link> */}
                    <button
                        onClick={() => {
                            setActive("home");
                            document.getElementById("hero")?.scrollIntoView({
                                behavior: "smooth",
                            });
                        }}
                        className={`transition ${
                            active === "home"
                            ? "text-green-700 font-semibold"
                            : "text-gray-700"
                        }`}
                        >
                        Home
                    </button>
                    {/* <Link href="/about" className="hover:text-green-700 transition">About</Link> */}
                    <button
                        onClick={() => {
                            setActive("about");
                                document.getElementById("who-we-are")?.scrollIntoView({
                                behavior: "smooth",
                            });
                        }}
                        className={`transition ${
                            active === "about"
                            ? "text-green-700 font-semibold"
                            : "text-gray-700"
                        }`}
                        >
                        About
                    </button>
                    {/* <Link href="/services" className="hover:text-green-700 transition">Services</Link> */}
                    <button
                        onClick={() => {
                            setActive("services");
                            document.getElementById("services")?.scrollIntoView({
                                behavior: "smooth",
                            });
                        }}
                        className={`transition ${
                            active === "services"
                            ? "text-green-700 font-semibold"
                            : "text-gray-700"
                        }`}
                    >
                    Services
                    </button>
                                    {/* CTA BUTTON (Desktop) */}
                <div className="hidden md:block">
                    {/* <Link
                        href="/contact"
                        className="px-5 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                    >
                        Get a Quote
                    </Link> */}
                    <button
                    onClick={() => {
                    setActive("contact");
                    document.getElementById("contact-cta")?.scrollIntoView({
                    behavior: "smooth",
                    });
                    }}
                    className={`transition ${
                    active === "contact"
                    ? "text-green-700 font-semibold"
                    : "text-gray-700"
                    }`}
                    >
                    Contact
                    </button>
                </div>
                </div>



                {/* MOBILE MENU BUTTON */}
                <button
                    className="md:hidden text-gray-700 focus:outline-none"
                    onClick={() => setOpen(!open)}
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
                <div className="md:hidden bg-white shadow-sm border-t">
                    <Link 
                        href="/" 
                        className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                    >
                        Home
                    </Link>
{/* 
                    <Link 
                        href="/about" 
                        className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                    >
                        About
                    </Link> */}

                    <button
                        onClick={() => {
                                setOpen(false);
                                document.getElementById("who-we-are")?.scrollIntoView({
                                    behavior: "smooth",
                                });
                            }}
                            className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition w-full text-left"
                            >
                        About
                    </button>

                    {/* <Link 
                        href="/services" 
                        className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                    >
                        Services
                    </Link> */}

                    <button
                        onClick={() => {
                            setOpen(false);
                            setActive("services");
                            document.getElementById("services")?.scrollIntoView({
                                behavior: "smooth",
                            });
                        }}
                        className={`block px-6 py-3 w-full text-left transition ${
                        active === "services"
                        ? "text-green-700 font-semibold bg-green-50"
                        : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                        }`}
                        >
                        Services
                    </button>

                    {/* <Link 
                        href="/contact" 
                        className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                    >
                        Contact
                    </Link> */}

                    <button
                        onClick={() => {
                            setOpen(false);
                            setActive("contact");
                            document.getElementById("contact-cta")?.scrollIntoView({
                                behavior: "smooth",
                            });
                        }}
                        className={`block px-6 py-3 w-full text-left transition ${
                            active === "contact"
                                ? "text-green-700 font-semibold bg-green-50"
                                : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                        }`}
                    >
                        Contact
                    </button>

                    <Link 
                        href="/contact"
                        className="block mx-6 my-4 px-5 py-3 bg-green-600 text-center text-white rounded-xl hover:bg-green-700 transition"
                    >
                        Get a Quote
                    </Link>
                </div>
            )}
        </nav>
    );
}