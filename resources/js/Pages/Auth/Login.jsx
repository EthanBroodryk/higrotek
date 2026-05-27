import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    // ✅ Extract the uploaded brand logo safely from global Inertia shared page props
    const { logo } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {/* ✅ DYNAMIC BRAND LOGO HEADER INTEGRATION */}
            <div className="flex flex-col items-center justify-center text-center mb-8">
                {logo ? (
                    <Link href="/">
                        <img
                            src={logo}
                            alt="Higrotek Brand Logo"
                            className="h-16 md:h-20 w-auto object-contain hover:opacity-90 transition duration-200"
                        />
                    </Link>
                ) : (
                    <Link href="/" className="text-3xl font-extrabold text-blue-700 tracking-tight">
                        Higrotek
                    </Link>
                )}
                <p className="mt-2 text-xs text-gray-400 font-medium">
                    Management Portal Authentication
                </p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                    {canResetPassword ? (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-xs text-gray-400 underline hover:text-gray-600 focus:outline-none"
                        >
                            Forgot password?
                        </Link>
                    ) : (
                        <div />
                    )}

                    <PrimaryButton className="ms-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}