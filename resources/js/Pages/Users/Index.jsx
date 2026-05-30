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

                    <Link
                        href={route('users.create')}
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
                        /* ✅ MODERN CLEAN MANAGEMENT TABLE WRAPPER */
                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[700px] border-collapse text-left text-sm text-gray-500">
                                    
                                    {/* Table Headings */}
                                    <thead className="bg-gray-50/70 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 font-semibold">User</th>
                                            <th scope="col" className="px-6 py-4 font-semibold">Role</th>
                                            <th scope="col" className="px-6 py-4 font-semibold">Joined Date</th>
                                            <th scope="col" className="px-6 py-4 font-semibold text-right">Actions</th>
                                        </tr>
                                    </thead>

                                    {/* Table Body Content Loop */}
                                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
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

                                            const isAdmin = userItem.role === 'admin';

                                            return (
                                                <tr key={userItem.id} className="hover:bg-gray-50/50 transition duration-150">
                                                    
                                                    {/* COLUMN 1: AVATAR, NAME & EMAIL */}
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 border border-green-100 text-sm font-bold text-green-700">
                                                                {initials}
                                                            </div>
                                                            <div className="font-medium text-gray-800">
                                                                <div className="text-sm font-semibold text-gray-900">{userItem.name}</div>
                                                                <div className="text-xs text-gray-500 mt-0.5">{userItem.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* COLUMN 2: ROLE STATUS BADGE */}
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold ${
                                                            isAdmin 
                                                                ? 'bg-purple-50 text-purple-700 border border-purple-100' 
                                                                : 'bg-slate-50 text-slate-600 border border-slate-100'
                                                        }`}>
                                                            {isAdmin ? 'Administrator' : 'Team Member'}
                                                        </span>
                                                    </td>

                                                    {/* COLUMN 3: JOINED DATE */}
                                                    <td className="px-6 py-4 text-gray-600 font-medium">
                                                        {formattedDate}
                                                    </td>

                                                    {/* COLUMN 4: ACTIONS BAR */}
                                                    <td className="px-6 py-4 text-right">
                                                        <Link
                                                            href="#"
                                                            className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-green-600 shadow-sm transition hover:bg-gray-50"
                                                        >
                                                            Manage
                                                        </Link>
                                                    </td>

                                                </tr>
                                            );
                                        })}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}