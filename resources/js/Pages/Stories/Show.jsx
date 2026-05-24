import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ story }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Story Details
                    </h2>

                    <Link
                        href={route("stories.index")}
                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                        Back to Stories
                    </Link>
                </div>
            }
        >
            <Head title={`Story - ${story.title}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">

                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            {story.title}
                        </h1>

                        {story.image && (
                            <img
                                src={`/storage/${story.image}`}
                                alt={story.title}
                                className="rounded-lg shadow mb-6 w-full object-cover"
                            />
                        )}

                        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                            {story.description}
                        </p>

                        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                            Created: {story.created_at}
                        </div>

                        <div className="mt-6">
                            <Link
                                href={route("stories.edit", story.id)}
                                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                            >
                                Edit Story
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}