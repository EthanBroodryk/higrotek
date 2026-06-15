import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link ,router } from '@inertiajs/react';

export default function Index({ carousels = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        images: [],
        active: true,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('home-carousel.store'), {
            forceFormData: true,
            data: {
                ...data,
                images: data.images,
            },
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

                    {/* CREATE FORM */}
                    <form
                        onSubmit={submit}
                        className="rounded-2xl border border-gray-100 bg-white shadow-sm mb-8"
                    >
                        {/* HEADER */}
                        <div className="border-b border-gray-100/80 px-6 py-4">
                            <h3 className="text-lg font-semibold text-blue-500">
                                Add Carousel Slide
                            </h3>
                        </div>

                        {/* BODY */}
                        <div className="space-y-5 px-6 py-5">
                            {/* IMAGES */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Images
                                </label>

                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onClick={(e) => {
                                        e.target.value = null;
                                    }}
                                    onChange={(e) => {
                                        const newFiles = Array.from(e.target.files);

                                        setData('images', [
                                            ...data.images,
                                            ...newFiles,
                                        ]);
                                    }}
                                    className="mt-1 w-full text-sm"
                                />

                                {/* PREVIEWS */}
                                {data.images.length > 0 && (
                                    <div className="mt-4 grid grid-cols-4 gap-3">
                                        {data.images.map((file, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt="preview"
                                                    className="h-20 w-full rounded-lg object-cover border border-gray-200"
                                                />

                                                {/* REMOVE */}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const updated = [...data.images];
                                                        updated.splice(index, 1);
                                                        setData('images', updated);
                                                    }}
                                                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {errors.images && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.images}
                                    </p>
                                )}
                            </div>

       

                            {/* SUBMIT */}
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

                    {/* EXISTING SLIDES */}
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

                        <div className="border-b border-gray-100/80 p-4">
                            <h3 className="font-semibold text-gray-900">
                                Existing Carousel Slides
                            </h3>
                        </div>

                        <div className="p-6">

                        {carousels.length === 0 ? (
                            <div className="text-center text-sm text-gray-500">
                                No carousel slides found.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                                {carousels.map((slide) => (
                                <div
                                    key={slide.id}
                                    className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                                >
                                    <img
                                        src={slide.image_url}
                                        alt=""
                                        className="h-48 w-full object-cover"
                                    />

                                    <div className="absolute inset-x-0 top-0 flex justify-end p-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (confirm('Delete this carousel image?')) {
                                                    router.delete(
                                                        route('home-carousel.destroy', slide.id)
                                                    );
                                                }
                                            }}
                                            className="rounded-lg bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                ))}

                            </div>
                        )}

                    </div>

                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}