<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UploadsController extends Controller
{
    public function uploadLogo(Request $request)
    {
        //dd($request);
        $request->validate([
            'logo' => ['required', 'image', 'max:2048'], // 2MB
        ]);

        // Store in /storage/app/public/logos
        $path = $request->file('logo')->store('logos', 'public');

        // // OPTIONAL: Save logo to user profile
        // $user = Auth::user();
        // $user->company_logo = $path;
        // $user->save();

        return back()->with('success', 'Logo uploaded successfully.');
    }
}