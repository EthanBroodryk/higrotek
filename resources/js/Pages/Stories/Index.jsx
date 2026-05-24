import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ stories }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Company Stories
                    </h2>

                    <Link
                        href={route('stories.create')}
                        className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
                    >
                        + Upload Story
                    </Link>
                </div>
            }
        >
            <Head title="Stories" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {stories.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-xl border bg-white p-10 text-center shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-700">
                                No stories yet
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Upload your company work, updates, or projects to showcase them here.
                            </p>

                            <Link
                                href={route('stories.create')}
                                className="mt-4 rounded-xl bg-green-600 px-5 py-2 text-white hover:bg-green-700"
                            >
                                Create First Story
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {stories.map((story) => (
                                <div
                                    key={story.id}
                                    className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md"
                                >

                                    {/* MEDIA */}
                                    <div className="h-48 w-full bg-gray-100">
                                        {story.media_type === 'image' && story.media_path && (
                                            <img
                                                src={`/storage/${story.media_path}`}
                                                alt={story.title}
                                                className="h-full w-full object-cover"
                                            />
                                        )}

                                        {story.media_type === 'video' && story.media_path && (
                                            <video
                                                src={`/storage/${story.media_path}`}
                                                className="h-full w-full object-cover"
                                                controls
                                            />
                                        )}

                                        {!story.media_path && (
                                            <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                                No media
                                            </div>
                                        )}
                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {story.title}
                                        </h3>

                                        {story.description && (
                                            <p className="mt-1 line-clamp-3 text-sm text-gray-600">
                                                {story.description}
                                            </p>
                                        )}

                                        <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                                            <span>
                                                By {story.user?.name ?? 'Unknown'}
                                            </span>

                                            <Link
                                                href={route('stories.show', story.id)}
                                                className="text-green-600 hover:underline"
                                            >
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}