import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* =========================================================
                STICKY MODERN NAVIGATION
            ========================================================= */}
            <nav className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/80 backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        
                        {/* Left Side: Logo & Main Navigation */}
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href={route('dashboard')} className="transition hover:opacity-90">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-green-600" />
                                </Link>
                            </div>

                            {/* Desktop Links */}
                            <div className="hidden space-x-6 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                                
                                <NavLink
                                  href={route('stories.index')}
                                  active={route().current('stories.*')}
                                >
                                    Stories/Events
                                </NavLink>

                                {/* ✅ Added Desktop User Management Link */}
                                <NavLink
                                  href={route('users.index')}
                                  active={route().current('users.*')}
                                >
                                    User Management
                                </NavLink>
                            </div>
                        </div>

                        {/* Right Side: Desktop Profile Dropdown */}
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 hover:text-gray-900 focus:outline-none"
                                            >
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-700">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-1 h-4 w-4 text-gray-400 transition-transform duration-200"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content contentClasses="py-1 bg-white rounded-xl shadow-lg ring-1 ring-black/5">
                                        <div className="border-b border-gray-100 px-4 py-2 text-xs text-gray-400">
                                            Manage Account
                                        </div>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            Profile Settings
                                        </Dropdown.Link>
                                        <div className="border-t border-gray-100 my-1"></div>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="w-full text-start text-red-600 hover:bg-red-50/60"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Hamburger Trigger button */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
                                aria-label="Main Menu Toggle"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* =========================================================
                    MOBILE NAV DROPDOWN PANEL
                ========================================================= */}
                <div className={`${showingNavigationDropdown ? 'block opacity-100' : 'hidden opacity-0'} transition-all duration-200 sm:hidden border-t border-gray-100 bg-white`}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        
                        <ResponsiveNavLink
                            href={route('stories.index')}
                            active={route().current('stories.*')}
                        >
                            Stories / Events
                        </ResponsiveNavLink>

                        {/* ✅ Added Mobile User Management Link */}
                        <ResponsiveNavLink
                            href={route('users.index')}
                            active={route().current('users.*')}
                        >
                            User Management
                        </ResponsiveNavLink>
                    </div>

                    {/* Mobile Profile Tray */}
                    <div className="border-t border-gray-100 pb-3 pt-4 bg-gray-50/70">
                        <div className="flex items-center px-4 mb-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white shadow-sm">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="ms-3">
                                <div className="text-sm font-semibold text-gray-800">{user.name}</div>
                                <div className="text-xs font-medium text-gray-500">{user.email}</div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile Settings
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="text-red-600 hover:bg-red-50/50 hover:text-red-700"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white border-b border-gray-100">
                    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="mx-auto max-w-7xl">{children}</main>
        </div>
    );
}