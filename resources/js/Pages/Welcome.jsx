import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Higrotek - Green Energy Solutions" />

            <div className="min-h-screen bg-gradient-to-b from-green-50 to-white text-gray-800">

                {/* HERO */}
                <section className="flex flex-col items-center justify-center text-center px-6 py-24">
                    <h1 className="text-5xl font-bold text-green-700">
                        Higrotek
                    </h1>

                    <p className="mt-4 text-xl max-w-2xl text-gray-600">
                        Powering a cleaner future with smart, sustainable green energy solutions.
                    </p>

                    <div className="mt-8 flex gap-4">
                        <Link
                            href="/contact"
                            className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                        >
                            Get a Quote
                        </Link>

                        <Link
                            href="/about"
                            className="px-6 py-3 border border-green-600 text-green-700 rounded-xl hover:bg-green-50 transition"
                        >
                            Learn More
                        </Link>
                    </div>
                </section>

                {/* SERVICES */}
                <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">

                    <div className="p-6 bg-white rounded-2xl shadow">
                        <h3 className="text-xl font-semibold text-green-700">
                            Solar Installations
                        </h3>
                        <p className="mt-2 text-gray-600">
                            Residential and commercial solar energy systems designed for efficiency and savings.
                        </p>
                    </div>

                    <div className="p-6 bg-white rounded-2xl shadow">
                        <h3 className="text-xl font-semibold text-green-700">
                            Energy Consulting
                        </h3>
                        <p className="mt-2 text-gray-600">
                            Optimize your energy usage with expert sustainability planning and audits.
                        </p>
                    </div>

                    <div className="p-6 bg-white rounded-2xl shadow">
                        <h3 className="text-xl font-semibold text-green-700">
                            Battery Storage
                        </h3>
                        <p className="mt-2 text-gray-600">
                            Reliable energy storage systems to keep your power running day and night.
                        </p>
                    </div>

                </section>

                {/* ABOUT SECTION */}
                <section className="bg-green-700 text-white py-20 px-6 text-center">
                    <h2 className="text-3xl font-bold">
                        Building a Sustainable Future
                    </h2>

                    <p className="mt-4 max-w-3xl mx-auto text-green-100">
                        Higrotek delivers innovative renewable energy solutions that reduce carbon footprints,
                        lower electricity costs, and empower businesses and homeowners to go green.
                    </p>
                </section>

                {/* CTA */}
                <section className="py-20 text-center px-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Ready to switch to green energy?
                    </h2>

                    <p className="mt-2 text-gray-600">
                        Let’s design a sustainable energy solution for your home or business.
                    </p>

                    <Link
                        href="/contact"
                        className="mt-6 inline-block px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                    >
                        Contact Higrotek
                    </Link>
                </section>

                {/* FOOTER */}
                <footer className="py-10 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Higrotek. All rights reserved.
                </footer>

            </div>
        </>
    );
}