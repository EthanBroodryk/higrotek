import { useState } from "react";
import { Link } from "@inertiajs/react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                
                {/* LOGO */}
                <Link href="/" className="flex items-center">
                    <img
                        src="/storage/logos/niUKMliCL6aS7UG6vWofx23FQDnYNqA4CxSPn8TL.png"
                        alt="Higrotek Logo"
                        className="h-10 md:h-12 w-auto"
                    />
                </Link>

                {/* DESKTOP MENU */}
                <div className="hidden md:flex gap-8 text-gray-700 font-medium">
                    <Link href="/" className="hover:text-green-700 transition">Home</Link>
                    <Link href="/about" className="hover:text-green-700 transition">About</Link>
                    <Link href="/services" className="hover:text-green-700 transition">Services</Link>
                    <Link href="/contact" className="hover:text-green-700 transition">Contact</Link>
                </div>

                {/* CTA BUTTON (Desktop) */}
                <div className="hidden md:block">
                    <Link
                        href="/contact"
                        className="px-5 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                    >
                        Get a Quote
                    </Link>
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

                    <Link 
                        href="/about" 
                        className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                    >
                        About
                    </Link>

                    <Link 
                        href="/services" 
                        className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                    >
                        Services
                    </Link>

                    <Link 
                        href="/contact" 
                        className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                    >
                        Contact
                    </Link>

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