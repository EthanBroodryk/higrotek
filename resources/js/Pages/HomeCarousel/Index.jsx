import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Index({ carousels = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        image: null,
        active: true,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('home-carousel.store'), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-blue-500">
                        Home Carousel Management
                    </h2>
                </div>
            }
        >
            <Head title="Home Carousel" />

            <div className="py-10">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

                    {/* Create Form */}
                <form
                    onSubmit={submit}
                    className="rounded-2xl border border-gray-100 bg-white shadow-sm mb-8"
                >

                    {/* Header */}
                    <div className="border-b border-gray-100/80 px-6 py-4">
                        <h3 className="text-lg font-semibold text-blue-500">
                            Add Carousel Slide
                        </h3>
                    </div>

                    {/* BODY WRAPPER (THIS IS WHAT YOU'RE MISSING) */}
                    <div className="space-y-5 px-6 py-5">

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="mt-1 w-full rounded-lg border border-gray-200 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                rows="4"
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                className="mt-1 w-full rounded-lg border border-gray-200 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        {/* Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Image
                            </label>
                            <input
                                type="file"
                                onChange={(e) =>
                                    setData('image', e.target.files[0])
                                }
                                className="mt-1 w-full text-sm"
                            />
                            {errors.image && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.image}
                                </p>
                            )}
                        </div>

                        {/* Active */}
                        <div>
                            <label className="flex items-center gap-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={data.active}
                                    onChange={(e) =>
                                        setData('active', e.target.checked)
                                    }
                                />
                                <span>Active Slide</span>
                            </label>
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-green-600 px-5 py-2 text-white text-sm font-semibold hover:bg-green-700"
                            >
                                Save Slide
                            </button>
                        </div>

                    </div>
                </form>

                    {/* Existing Slides */}
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

                    <div className="border-b border-gray-100/80 p-4">
                        <h3 className="font-semibold text-gray-900">
                            Existing Carousel Slides
                        </h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left text-sm text-gray-500">

                            <thead className="bg-gray-50/70 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Image</th>
                                    <th className="px-6 py-4 font-semibold">Title</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 border-t border-gray-100">

                                {carousels.map((slide) => (
                                    <tr
                                        key={slide.id}
                                        className="transition hover:bg-gray-50/40"
                                    >
                                        <td className="px-6 py-4">
                                            <img
                                                src={slide.image_url}
                                                alt={slide.title}
                                                className="h-16 w-24 rounded object-cover"
                                            />
                                        </td>

                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {slide.title}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold border ${
                                                    slide.active
                                                        ? 'bg-green-50 text-green-700 border-green-100'
                                                        : 'bg-slate-50 text-slate-600 border-slate-100'
                                                }`}
                                            >
                                                {slide.active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={route('home-carousel.edit', slide.id)}
                                                className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-blue-600 shadow-sm transition hover:bg-gray-50"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}

                                {carousels.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="p-6 text-center text-sm text-gray-500"
                                        >
                                            No carousel slides found.
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>

                </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}