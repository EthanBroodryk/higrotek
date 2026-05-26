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
        $stories = Story::with(['images', 'coverImage', 'user'])->latest()->get();
        
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
        $stories = Story::with(['images', 'coverImage', 'user'])->latest()->get();
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
            'images.*'    => 'image|max:2048',
        ]);

        $story = Story::create([
            'user_id'      => auth()->id(),
            'title'        => $validated['title'],
            'description'  => $validated['description'],
            'is_published' => true,
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $file) {
                $path = $file->store('stories', 'public');

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
        $story->load(['images', 'coverImage', 'user']);

        return Inertia::render('Stories/Show', [
            'story' => $story,
        ]);
    }

    
    public function edit(Story $story)
    {
        $story->load(['images', 'coverImage']);
        
        return Inertia::render('Stories/Edit', [
            'story' => $story
        ]);
    }

    
    public function update(Request $request, Story $story)
    {
        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'description'    => 'required|string',
            'cover_image_id' => 'required|numeric', // Id track of current/assigned cover
            'delete_images'  => 'nullable|array',
            'delete_images.*'=> 'numeric',
            'new_images'     => 'nullable|array',
            'new_images.*'   => 'image|max:2048',
        ]);

        
        $story->update([
            'title'       => $validated['title'],
            'description' => $validated['description'],
        ]);


        if (!empty($request->delete_images)) {
            $imagesToDelete = StoryImage::whereIn('id', $request->delete_images)
                                        ->where('story_id', $story->id)
                                        ->get();
            
            foreach ($imagesToDelete as $img) {
                Storage::disk('public')->delete($img->path);
                $img->delete();
            }
        }

      
        if ($request->hasFile('new_images')) {
            foreach ($request->file('new_images') as $file) {
                $path = $file->store('stories', 'public');
                $story->images()->create([
                    'path'     => $path,
                    'is_cover' => false,
                ]);
            }
        }

  
        StoryImage::where('story_id', $story->id)->update(['is_cover' => false]);
        
        
        $targetCover = StoryImage::where('story_id', $story->id)->where('id', $validated['cover_image_id'])->first();
        
        if ($targetCover) {
            $targetCover->update(['is_cover' => true]);
        } else {
            
            $fallback = StoryImage::where('story_id', $story->id)->first();
            if ($fallback) {
                $fallback->update(['is_cover' => true]);
            }
        }

        return redirect()->route('stories.index')->with('success', 'Story updated successfully.');
    }
}