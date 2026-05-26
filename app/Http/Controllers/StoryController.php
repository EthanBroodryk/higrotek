<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\CompanyLogo;
use App\Models\Story;
use App\Models\StoryImage;
use Illuminate\Support\Facades\Route;

class StoryController extends Controller
{
    public function getStoriesHomePage(Request $request)
    {
        $logo = CompanyLogo::where('is_active', true)->first();
        
        // Eager load the images relationship with the story list query
        $stories = Story::with(['images', 'coverImage'])->latest()->get();
        
        return Inertia::render('Welcome', [
            'stories'        => $stories,
            'canLogin'       => Route::has('login'),
            'canRegister'    => Route::has('register'),
            'laravelVersion' => \Illuminate\Foundation\Application::VERSION,
            'phpVersion'     => PHP_VERSION,
            'logo'           => $logo ? asset('storage/' . $logo->path) : null,
        ]);
    }

    public function index()
    {
        // Load relationships for backend dashboard index list too
        $stories = Story::with(['images', 'coverImage'])->latest()->get();

        return Inertia::render('Stories/Index', [
            'stories' => $stories,
        ]);
    }

    public function create()
    {
        return Inertia::render('Stories/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'images'      => 'nullable|array',
            'images.*'    => 'image|max:2048', // 2MB max per image
        ]);

        // 1. Initialize and create the base Story model entry 
        $story = Story::create([
            'user_id'      => auth()->id(), // maps active user ID cleanly
            'title'        => $validated['title'],
            'description'  => $validated['description'],
            'is_published' => true,
        ]);

        // 2. Loop through and save all uploaded images onto the public storage disk
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $file) {
                $path = $file->store('stories', 'public');

                // Designate the very first image ($index === 0) as the cover photo
                $story->images()->create([
                    'path'     => $path,
                    'is_cover' => $index === 0, 
                ]);
            }
        }

        return redirect()->route('stories.index')->with('success', 'Story created successfully.');
    }

    public function show(Story $story)
    {
        // Load full image stack when opening the story detail page view
        $story->load(['images', 'coverImage']);

        return Inertia::render('Stories/Show', [
            'story' => $story,
        ]);
    }
}