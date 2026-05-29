import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ users = [] }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                        User Management
                    </h2>

                    {/* Placeholder link for future User creation/invitation form */}
                    <Link
                        href="#"
                        className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
                    >
                        + Create User
                    </Link>
                </div>
            }
        >
            <Head title="User Management" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {users.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-xl border bg-white p-10 text-center shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-700">
                                No registered users found
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                                When team members join your dashboard, they will appear in this management workspace directory.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {users.map((userItem) => {
                                const initials = userItem.name
                                    ? userItem.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
                                    : 'U';

                                const formattedDate = userItem.created_at
                                    ? new Date(userItem.created_at).toLocaleDateString(undefined, {
                                          year: 'numeric',
                                          month: 'short',
                                          day: 'numeric'
                                      })
                                    : 'N/A';

                                return (
                                    <div
                                        key={userItem.id}
                                        className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md flex flex-col justify-between"
                                    >
                                        <div>
                                            {/* MODERN CARD HERO HEADER BACKGROUND */}
                                            <div className="relative h-24 w-full bg-gradient-to-r from-green-600 to-emerald-700 flex items-end px-5">
                                                {/* Profile Avatar Overlay Offset */}
                                                <div className="absolute -bottom-6 left-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white border-2 border-white text-xl font-bold text-green-700 shadow-md">
                                                    <div className="flex h-full w-full items-center justify-center rounded-xl bg-green-50">
                                                        {initials}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* CORE DETAILS IDENTIFIER CARD BODY */}
                                            <div className="p-5 pt-8">
                                                <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                                                    {userItem.name}
                                                </h3>
                                                <p className="text-sm font-medium text-gray-500 truncate mt-0.5">
                                                    {userItem.email}
                                                </p>
                                                
                                                <div className="mt-4 flex flex-wrap gap-1.5">
                                                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
                                                        Team Member
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CARD FOOTER METADATA METRICS */}
                                        <div className="px-5 pb-4 pt-3 flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 bg-gray-50/50">
                                            <span>
                                                Joined: {formattedDate}
                                            </span>

                                            {/* Future Management Dropdown/Link anchor */}
                                            <Link
                                                href="#"
                                                className="text-green-600 font-semibold hover:underline"
                                            >
                                                Manage
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