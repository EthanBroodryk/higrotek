import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // Dynamic extraction of user initials
    const userInitials = user.name
        ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
        : 'U';

    return (
        <div className="min-h-screen bg-slate-50/50 text-slate-900">
            {/* =========================================================
                STICKY MODERN NAVIGATION
            ========================================================= */}
            <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-all">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        
                        {/* Left Side: Logo & Main Navigation */}
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="transition hover:opacity-90 active:scale-95 flex items-center gap-2">
                                    {usePage().props.logo ? (
                                        <img 
                                            src={usePage().props.logo} 
                                            alt="Company Logo" 
                                            className="block h-8 w-auto object-contain rounded-lg"
                                        />
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs tracking-wider">
                                                H
                                            </div>
                                            <span className="text-base font-bold tracking-tight text-slate-900">
                                                Higrotek
                                            </span>
                                        </div>
                                    )}
                                </Link>
                            </div>

                            {/* Desktop Links */}
                            <div className="hidden space-x-6 sm:-my-px sm:ms-10 sm:flex items-center">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Change Company Logo
                                </NavLink>

                                <NavLink
                                    href={route('stories.index')}
                                    active={route().current('stories.*')}
                                >
                                    Stories & Events
                                </NavLink>

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
                                        <span className="inline-flex rounded-xl">
                                            <button
                                                type="button"
                                                className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white pl-2 pr-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition duration-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 focus:outline-none"
                                            >
                                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700 shadow-sm">
                                                    {userInitials}
                                                </div>
                                                
                                                <span className="max-w-[120px] truncate">{user.name}</span>

                                                <svg
                                                    className="h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:translate-y-0.5"
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

                                    <Dropdown.Content contentClasses="py-1.5 bg-white rounded-xl shadow-xl ring-1 ring-slate-900/5 min-w-[180px] mt-1 border border-slate-100">
                                        <div className="border-b border-slate-100 px-3 py-2 text-[11px] font-semibold tracking-wider uppercase text-slate-400">
                                            Account Workspace
                                        </div>
                                        <Dropdown.Link href={route('profile.edit')} className="text-xs font-medium text-slate-600 hover:text-slate-900">
                                            Profile Settings
                                        </Dropdown.Link>
                                        <div className="border-t border-slate-100 my-1"></div>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="w-full text-start text-xs font-semibold text-red-600 hover:bg-red-50/60"
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
                                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition duration-200 focus:outline-none ${
                                    showingNavigationDropdown 
                                        ? 'bg-slate-100 text-slate-800' 
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                }`}
                                aria-label="Main Menu Toggle"
                            >
                                <svg className="h-5 w-5 transition-transform duration-200" stroke="currentColor" fill="none" viewBox="0 0 24 24">
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
                    MOBILE NAV DROPDOWN PANEL (WITH CLEAN TRANSITION OVERLAY)
                ========================================================= */}
                <div className={`sm:hidden border-t border-slate-100 bg-white transition-all duration-300 ease-in-out ${
                    showingNavigationDropdown 
                        ? 'max-h-[400px] opacity-100 visibility-visible' 
                        : 'max-h-0 opacity-0 overflow-hidden pointer-events-none'
                }`}>
                    <div className="space-y-1 px-3 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Change Company Logo
                        </ResponsiveNavLink>
                        
                        <ResponsiveNavLink
                            href={route('stories.index')}
                            active={route().current('stories.*')}
                        >
                            Stories & Events
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route('users.index')}
                            active={route().current('users.*')}
                        >
                            User Management
                        </ResponsiveNavLink>
                    </div>

                    {/* Mobile Profile Card Area */}
                    <div className="border-t border-slate-100 pb-4 pt-4 bg-blue-500 px-4">
                        <div className="flex items-center gap-3 mb-3 bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-sm">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-sm">
                                {userInitials}
                            </div>
                            <div className="w-full min-w-0">
                                <div className="text-sm font-semibold text-slate-800 truncate">{user.name}</div>
                                <div className="text-xs font-medium text-slate-400 truncate">{user.email}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <Link 
                                href={route('profile.edit')}
                                className="flex justify-center items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 active:bg-slate-100"
                            >
                                Settings
                            </Link>
                            <Link
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="flex justify-center items-center rounded-lg border border-transparent bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                            >
                                Log Out
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Optional Page Sub-Header */}
            {header && (
                <header className="bg-white border-b border-slate-200/60">
                    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Viewport Core Layout Grid Container */}
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</main>
        </div>
    );
}