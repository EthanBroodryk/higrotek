<?php


namespace App\Http\Controllers;

use App\Models\CompanyLogo;
use Illuminate\Http\Request;

class UploadsController extends Controller
{
    public function uploadLogo(Request $request)
    {
        $request->validate([
            'logo' => ['required', 'image', 'max:2048'],
        ]);

        // deactivate old logos
        CompanyLogo::where('is_active', true)->update(['is_active' => false]);

        // store new logo
        $path = $request->file('logo')->store('logos', 'public');
        
        // save to DB
        CompanyLogo::create([
            'path' => $path,
            'is_active' => true,
        ]);

        return back()->with('success', 'Logo uploaded successfully.');
    }
}