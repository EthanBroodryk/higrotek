import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ team = [] }) {

    const [editingId, setEditingId] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        role: '',
        description: '',
        credentials: '',
        image: null,
    });

    const editMember = (member) => {
        setEditingId(member.id);

        setData({
            name: member.name || '',
            role: member.role || '',
            description: member.description || '',
            credentials: member.credentials || '',
            image: null,
        });
    };

    const cancelEdit = () => {
        setEditingId(null);

        reset();
    };

    const submit = (e) => {
        e.preventDefault();

        if (editingId) {
            router.post(
                route('team.update', editingId),
                {
                    _method: 'PATCH',
                    ...data,
                },
                {
                    forceFormData: true,
                    onSuccess: () => {
                        reset();
                        setEditingId(null);
                    },
                }
            );
        } else {
            post(route('team.store'), {
                forceFormData: true,
                onSuccess: () => reset(),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-blue-500">
                        Team Management
                    </h2>
                </div>
            }
        >
            <Head title="Team" />

            <div className="py-10">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

                    {/* CREATE / EDIT TEAM MEMBER */}
                    <form
                        onSubmit={submit}
                        className="mb-8 rounded-2xl border border-gray-100 bg-white shadow-sm"
                    >
                        <div className="border-b border-gray-100 px-6 py-4">
                            <h3 className="text-lg font-semibold text-blue-500">
                                {editingId ? 'Edit Team Member' : 'Add Team Member'}
                            </h3>
                        </div>

                        <div className="space-y-5 px-6 py-5">

                            {/* NAME */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-200 text-sm"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* ROLE */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Role
                                </label>
                                <input
                                    type="text"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-200 text-sm"
                                />
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-200 text-sm"
                                    rows="4"
                                />
                            </div>

                            {/* CREDENTIALS */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Credentials
                                </label>
                                <input
                                    type="text"
                                    value={data.credentials}
                                    onChange={(e) => setData('credentials', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-200 text-sm"
                                    placeholder="e.g. PrEng No. 20110405"
                                />
                            </div>

                            {/* IMAGE */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Image
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onClick={(e) => {
                                        e.target.value = null;
                                    }}
                                    onChange={(e) =>
                                        setData('image', e.target.files[0] || null)
                                    }
                                    className="mt-1 w-full text-sm"
                                />
                            </div>

                            {/* ACTIONS */}
                            <div className="flex justify-end gap-3">

                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={cancelEdit}
                                        className="rounded-lg bg-gray-500 px-5 py-2 text-white text-sm font-semibold hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                )}

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-blue-600 px-5 py-2 text-white text-sm font-semibold hover:bg-blue-700"
                                >
                                    {editingId ? 'Update Member' : 'Save Member'}
                                </button>

                            </div>

                        </div>
                    </form>

                    {/* TEAM LIST */}
                    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">

                        <div className="border-b border-gray-100 p-4">
                            <h3 className="font-semibold text-gray-900">
                                Team Members
                            </h3>
                        </div>

                        <div className="p-6">

                            {team.length === 0 ? (
                                <div className="text-sm text-gray-500 text-center">
                                    No team members found.
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                                    {team.map((member) => (
                                        <div
                                            key={member.id}
                                            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                                        >
                                            {/* IMAGE */}
                                            <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 mb-3">
                                                {member.image ? (
                                                    <img
                                                        src={`/storage/${member.image}`}
                                                        alt={member.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full bg-gray-200" />
                                                )}
                                            </div>

                                            {/* INFO */}
                                            <h4 className="font-semibold text-gray-900">
                                                {member.name}
                                            </h4>

                                            <p className="text-sm text-blue-600">
                                                {member.role}
                                            </p>

                                            <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                                                {member.description}
                                            </p>

                                            <p className="mt-2 text-xs text-gray-400">
                                                {member.credentials}
                                            </p>

                                            {/* ACTIONS */}
                                            <div className="mt-4 flex gap-2">

                                                <button
                                                    type="button"
                                                    onClick={() => editMember(member)}
                                                    className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                'Delete this team member?'
                                                            )
                                                        ) {
                                                            router.delete(
                                                                route(
                                                                    'team.destroy',
                                                                    member.id
                                                                )
                                                            );
                                                        }
                                                    }}
                                                    className="rounded-lg bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700"
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