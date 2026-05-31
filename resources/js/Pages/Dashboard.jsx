import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Dashboard() {
    const { data, setData, post, processing, progress } = useForm({
        logo: null,
    });

    const [preview, setPreview] = useState(null);

    const handleLogoChange = (e) => {
        const file = e.target.files?.[0];

        if (file) {
            setData("logo", file);

            // preview
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post("/dashboard/logo", {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                    <h2 className="text-xl font-semibold leading-tight text-blue-500">
                        Manage Company Logo
                    </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-8">
                        {/* <h3 className="text-2xl font-bold text-gray-800 mb-6">
                            Company Branding
                        </h3> */}

                        <form onSubmit={submit} className="space-y-6">

                            {/* PREVIEW */}
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-2">
                                    Current Logo
                                </p>

                                {preview ? (
                                    <img
                                        src={preview}
                                        className="h-20 w-auto rounded shadow"
                                        alt="Logo Preview"
                                    />
                                ) : (
                                    <div className="h-20 w-20 flex items-center justify-center border rounded bg-gray-50 text-gray-400">
                                        No Logo
                                    </div>
                                )}
                            </div>

                            {/* FILE INPUT */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload New Logo
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100
                                        cursor-pointer"
                                />

                                {progress && (
                                    <div className="mt-2 text-sm text-gray-600">
                                        Uploading: {progress.percentage}%
                                    </div>
                                )}
                            </div>

                            {/* SUBMIT */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-green-700 transition"
                            >
                                Save Logo
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}