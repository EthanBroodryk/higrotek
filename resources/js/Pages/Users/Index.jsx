import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ users = [] }) {
    // Track which user ID is currently being edited inline
    const [editingId, setEditingId] = useState(null);

    // Inertia form handler state hook
    const { data, setData, patch, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        password: '', // Optional: Fill to change, leave blank to keep existing
        role: 'user'
    });

    // Enters edit mode for a row and fills the input data states
    const startEditing = (userItem) => {
        clearErrors();
        setEditingId(userItem.id);
        setData({
            name: userItem.name || '',
            email: userItem.email || '',
            password: '', // Kept empty unless they consciously type a new one
            role: userItem.role || 'user'
        });
    };

    // Resets states cleanly back to viewing mode
    const cancelEditing = () => {
        setEditingId(null);
        reset();
        clearErrors();
    };

    // Submits updates to the backend handler
    const handleUpdateSubmit = (id) => {
        patch(route('users.update', id), {
            preserveScroll: true,
            onSuccess: () => setEditingId(null),
        });
    };

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
                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[850px] border-collapse text-left text-sm text-gray-500">
                                    
                                    <thead className="bg-gray-50/70 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 font-semibold w-1/3">User / Identity</th>
                                            <th scope="col" className="px-6 py-4 font-semibold w-1/4">Password Override</th>
                                            <th scope="col" className="px-6 py-4 font-semibold w-1/6">Role</th>
                                            <th scope="col" className="px-6 py-4 font-semibold w-1/6">Joined Date</th>
                                            <th scope="col" className="px-6 py-4 font-semibold text-right">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                        {users.map((userItem) => {
                                            const isEditingThisRow = editingId === userItem.id;

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
                                                <tr key={userItem.id} className={`transition duration-150 ${isEditingThisRow ? 'bg-blue-50/20' : 'hover:bg-gray-50/50'}`}>
                                                    
                                                    {/* COLUMN 1: NAME & EMAIL FORM FIELD SHIFT */}
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 border border-green-100 text-sm font-bold text-green-700">
                                                                {initials}
                                                            </div>
                                                            <div className="w-full">
                                                                {isEditingThisRow ? (
                                                                    <div className="space-y-1.5 max-w-xs">
                                                                        <input 
                                                                            type="text" 
                                                                            value={data.name} 
                                                                            onChange={e => setData('name', e.target.value)}
                                                                            className="w-full rounded-md border border-gray-300 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                                            placeholder="Full name"
                                                                        />
                                                                        {errors.name && <p className="text-[11px] text-red-500">{errors.name}</p>}
                                                                        
                                                                        <input 
                                                                            type="email" 
                                                                            value={data.email} 
                                                                            onChange={e => setData('email', e.target.value)}
                                                                            className="w-full rounded-md border border-gray-300 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                                            placeholder="Email address"
                                                                        />
                                                                        {errors.email && <p className="text-[11px] text-red-500">{errors.email}</p>}
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        <div className="text-sm font-semibold text-gray-900">{userItem.name}</div>
                                                                        <div className="text-xs text-gray-500 mt-0.5">{userItem.email}</div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* COLUMN 2: PASSWORD CONTEXT (ONLY ACCESSIBLE IN EDIT MODE) */}
                                                    <td className="px-6 py-4">
                                                        {isEditingThisRow ? (
                                                            <div className="max-w-xs space-y-1">
                                                                <input 
                                                                    type="password" 
                                                                    value={data.password} 
                                                                    onChange={e => setData('password', e.target.value)}
                                                                    className="w-full rounded-md border border-gray-300 p-1.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                                    placeholder="Leave blank to keep current"
                                                                />
                                                                {errors.password && <p className="text-[11px] text-red-500">{errors.password}</p>}
                                                            </div>
                                                        ) : (
                                                            <span className="text-xs text-gray-400 italic select-none">••••••••</span>
                                                        )}
                                                    </td>

                                                    {/* COLUMN 3: ROLE SELECTOR DROPDOWN SHIFT */}
                                                    <td className="px-6 py-4">
                                                        {isEditingThisRow ? (
                                                            <div>
                                                                <select
                                                                    value={data.role}
                                                                    onChange={e => setData('role', e.target.value)}
                                                                    className="rounded-md border border-gray-300 p-1.5 text-xs text-gray-900 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                                >
                                                                    <option value="user">Team Member</option>
                                                                    <option value="admin">Administrator</option>
                                                                </select>
                                                                {errors.role && <p className="text-[11px] text-red-500 mt-1">{errors.role}</p>}
                                                            </div>
                                                        ) : (
                                                            <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold ${
                                                                isAdmin 
                                                                    ? 'bg-purple-50 text-purple-700 border border-purple-100' 
                                                                    : 'bg-slate-50 text-slate-600 border border-slate-100'
                                                            }`}>
                                                                {isAdmin ? 'Administrator' : 'Team Member'}
                                                            </span>
                                                        )}
                                                    </td>

                                                    {/* COLUMN 4: JOINED DATE */}
                                                    <td className="px-6 py-4 text-gray-600 font-medium">
                                                        {formattedDate}
                                                    </td>

                                                    {/* COLUMN 5: ACTION TRIGGERS SHIFT */}
                                                    <td className="px-6 py-4 text-right">
                                                        {isEditingThisRow ? (
                                                            <div className="inline-flex gap-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleUpdateSubmit(userItem.id)}
                                                                    disabled={processing}
                                                                    className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
                                                                >
                                                                    Save
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={cancelEditing}
                                                                    className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 shadow-sm transition hover:bg-gray-50"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                onClick={() => startEditing(userItem)}
                                                                className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-green-600 shadow-sm transition hover:bg-gray-50"
                                                            >
                                                                Manage
                                                            </button>
                                                        )}
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