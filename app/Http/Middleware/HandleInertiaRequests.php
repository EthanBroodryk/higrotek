<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\CompanyLogo; // ✅ Imported the Logo model namespace

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // ✅ Fetch the active company logo reference once for all components
        $logo = CompanyLogo::where('is_active', true)->first();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            // ✅ Shared globally—instantly accessible on your Login, Welcome, and Navbar pages
            'logo' => $logo ? asset('storage/' . $logo->path) : null,
        ];
    }
}