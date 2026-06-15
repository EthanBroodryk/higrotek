<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::orderBy('sort_order')->get();
        return Inertia::render('Services/Index', [
            'services' => Service::orderBy('sort_order')->get()
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'images' => 'nullable|array',
            'sort_order' => 'nullable|integer',
        ]);

        $images = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $images[] = $file->store('services', 'public');
            }
        }

        Service::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'images' => $images ?: null,
            'sort_order' => $data['sort_order'] ?? 0,
        ]);

        return back();
    }

    public function destroy(Service $service)
    {
        if ($service->images) {
            foreach ($service->images as $img) {
                Storage::disk('public')->delete($img);
            }
        }

        $service->delete();

        return back();
    }
}