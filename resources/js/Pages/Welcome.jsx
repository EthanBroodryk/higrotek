import { Head, Link } from '@inertiajs/react';
import Navbar from "@/Components/Navbar";
import { usePage } from '@inertiajs/react';

export default function Welcome() {
    const { logo } = usePage().props;
    return (
        <>
            <Navbar />
            <Head title="Higrotek - Blue Energy Solutions" />

            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">

                {/* HERO */}
                <section id="hero" className="flex flex-col items-center justify-center text-center px-6 py-24">
                    {logo ? (
                        <img
                            src={logo}
                            alt="Higrotek Logo"
                            className="h-48 sm:h-56 md:h-64 lg:h-72 w-auto mb-4"
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

                        <Link
                            href="/about"
                            className="px-6 py-3 border border-blue-600 text-blue-700 rounded-xl hover:bg-blue-50 transition"
                        >
                            Learn More
                        </Link>
                    </div>
                </section>

                {/* WHO WE ARE */}
                <section id="who-we-are" className="max-w-6xl mx-auto px-6 py-16">
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
                <section id="services" className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">

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

                {/* CTA */}
                <section id="contact-cta" className="py-20 text-center px-6">
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