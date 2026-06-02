import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link,router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Index({ stories,filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [date, setDate] = useState(filters.date || '');
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            router.get(
                route('stories.index'),
                { search: search, date: date }, // Sent both parameters
                { 
                    preserveState: true, 
                    replace: true        
                }
            );
        }, 300); 

        return () => clearTimeout(delayDebounceFn);
    }, [search, date]); 
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-blue-500">
                        Company Stories
                    </h2>

                    <Link
                        href={route('stories.create')}
                        className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                    >
                        + Upload Story
                    </Link>
                </div>
            }
        >
            <Head title="Stories" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* SEARCH & DATE FILTERS */}
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center max-w-2xl">
                        {/* Text Search */}
                        <div className="relative flex-1 rounded-xl shadow-sm">
                            <input
                                type="text"
                                name="search"
                                id="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-xl border-gray-200 pl-4 pr-10 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Search stories..."
                            />
                            {search && (
                                <button 
                                    onClick={() => setSearch('')}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 text-xs font-semibold"
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                        {/* Date Filter */}
                        <div className="relative rounded-xl shadow-sm sm:w-64">
                            <input
                                type="date"
                                name="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full rounded-xl border-gray-200 px-4 text-sm shadow-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500"
                            />
                            {date && (
                                <button 
                                    onClick={() => setDate('')}
                                    className="absolute inset-y-0 right-8 flex items-center text-gray-400 hover:text-gray-600 text-xs font-semibold"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

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
                                className="mt-4 rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition"
                            >
                                Create First Story
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {stories.map((story) => {
                                // Find the cover image or fallback to the very first image in the relationship array
                                const displayImage = story.cover_image?.path || story.images?.[0]?.path;
                                const imageCount = story.images?.length || 0;

                                return (
                                    <div
                                        key={story.id}
                                        className="overflow-hidden rounded-2xl  bg-white shadow-sm transition hover:shadow-md flex flex-col justify-between"
                                    >
                                        <div>
                                            {/* MEDIA WITH LIVE OVERLAY COUNTER */}
                                            <div className="relative h-48 w-full bg-gray-100">
                                                {displayImage ? (
                                                    <img
                                                        src={`/storage/${displayImage}`}
                                                        alt={story.title}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                                        No images attached
                                                    </div>
                                                )}

                                                {/* Image count badge overlay */}
                                                {imageCount > 1 && (
                                                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[11px] px-2 py-0.5 rounded-md backdrop-blur-sm">
                                                        +{imageCount - 1} more photos
                                                    </span>
                                                )}
                                            </div>

                                            {/* CONTENT */}
                                            <div className="p-4">
                                                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                                                    {story.title}
                                                </h3>

                                                {story.description && (
                                                    <p className="mt-1 line-clamp-3 text-sm text-gray-600">
                                                        {story.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* CARD FOOTER METADATA */}
                                        <div className="px-4 pb-4 pt-2 flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 bg-gray-50/50">
                                            <span>
                                                By {story.user?.name ?? 'Unknown'}
                                            </span>

                                            <Link
                                                href={route('stories.show', story.id)}
                                                className="text-blue-600 font-semibold hover:underline"
                                                >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}