import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'user', // standard default
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('users.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Add New User</h2>
                    <Link href={route('users.index')} className="text-sm text-gray-600 hover:text-gray-900">
                        ← Back to Directory
                    </Link>
                </div>
            }
        >
            <Head title="Create User" />

            <div className="py-10">
                <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="rounded-2xl border bg-white p-6 shadow-sm space-y-5">
                        
                        {/* NAME */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-green-500 focus:ring-green-500"
                                required
                            />
                            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-green-500 focus:ring-green-500"
                                required
                            />
                            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                        </div>

                        {/* ROLE SELECTOR */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Access Permissions Role</label>
                            <select
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-green-500 focus:ring-green-500 bg-white"
                            >
                                <option value="user">User (Standard Access)</option>
                                <option value="admin">Admin (Full System Management)</option>
                            </select>
                            {errors.role && <p className="text-sm text-red-500 mt-1">{errors.role}</p>}
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-green-500 focus:ring-green-500"
                                required
                            />
                            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                        </div>

                        {/* PASSWORD CONFIRMATION */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-green-500 focus:ring-green-500"
                                required
                            />
                            {errors.password_confirmation && (
                                <p className="text-sm text-red-500 mt-1">{errors.password_confirmation}</p>
                            )}
                        </div>

                        {/* ACTIONS BUTTONS STACK */}
                        <div className="flex items-center justify-end gap-3 border-t pt-4 mt-6">
                            <Link href={route('users.index')} className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 transition disabled:opacity-50"
                            >
                                Provision Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}