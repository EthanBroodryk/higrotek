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
        // 1. Add cover_index to validation
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'images'      => 'nullable|array',
            'images.*'    => 'image|max:2048',
            'cover_index' => 'required|integer|min:0', // Ensure it's a valid number index
        ]);

        $story = Story::create([
            'user_id'      => auth()->id(),
            'title'        => $validated['title'],
            'description'  => $validated['description'],
            'is_published' => true,
        ]);

        if ($request->hasFile('images')) {
            // Read the user-selected cover index from the request payload
            $chosenCoverIndex = (int) $request->input('cover_index', 0);
        
            foreach ($request->file('images') as $index => $file) {
                $path = $file->store('stories', 'public');

                $story->images()->create([
                    'path'     => $path,
                    // Match the current file loop index against the user's selected index
                    'is_cover' => $index === $chosenCoverIndex, 
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
        'cover_image_id' => 'required|numeric',
        'is_new_cover'   => 'required|string', // Forms send booleans as strings via multipart
        'new_cover_name' => 'nullable|string',
        'delete_images'  => 'nullable|array',
        'delete_images.*'=> 'numeric',
        'new_images'     => 'nullable|array',
        'new_images.*'   => 'image|max:2048',
    ]);

    $story->update([
        'title'       => $validated['title'],
        'description' => $validated['description'],
    ]);

    // 1. Process files deletion safely
    $deleteIds = $request->input('delete_images');
    if (!empty($deleteIds) && is_array($deleteIds)) {
        $imagesToDelete = StoryImage::whereIn('id', $deleteIds)
                                    ->where('story_id', $story->id)
                                    ->get();
        
        foreach ($imagesToDelete as $img) {
            if (Storage::disk('public')->exists($img->path)) {
                Storage::disk('public')->delete($img->path);
            }
            $img->delete();
        }
    }

    // Reset current cover state targets across the database
    $story->images()->update(['is_cover' => false]);
    $newCoverAssigned = false;
    $isNewCoverFlag = filter_var($validated['is_new_cover'], FILTER_VALIDATE_BOOLEAN);

    // 2. Process incoming file uploads
    if ($request->hasFile('new_images')) {
        foreach ($request->file('new_images') as $file) {
            if ($file->isValid()) {
                $path = $file->store('stories', 'public');
                
                // Match the client file name against the selected file layout name
                $shouldBeCover = $isNewCoverFlag && ($file->getClientOriginalName() === $validated['new_cover_name']);

                $story->images()->create([
                    'path'     => $path,
                    'is_cover' => $shouldBeCover,
                ]);

                if ($shouldBeCover) {
                    $newCoverAssigned = true;
                }
            }
        }
    }

    // 3. Sync Fallback cover mapping states
    if (!$newCoverAssigned) {
        $targetCover = $story->images()->where('id', $validated['cover_image_id'])->first();
        
        if ($targetCover) {
            $targetCover->update(['is_cover' => true]);
        } else {
            $fallback = $story->images()->first();
            if ($fallback) {
                $fallback->update(['is_cover' => true]);
            }
        }
    }

    // Redirect to index or loop back cleanly to re-render fresh state props automatically
    return redirect()->route('stories.index')->with('success', 'Story updated successfully.');
}

    public function showClientStory(Story $story)
    {
        $story->load(['images', 'coverImage', 'user']);
        $logo = CompanyLogo::where('is_active', true)->first();

        return Inertia::render('Stories/ClientShow', [
            'story' => $story,
            'logo'  => $logo ? asset('storage/' . $logo->path) : null,
        ]);
    }

    
    public function destroy(Story $story)
    {
        // 1. Fetch all associated graphics linked to this story sequence
        $images = $story->images;

        // 2. Erase each absolute physical file out of the public storage directory
        foreach ($images as $image) {
            if (Storage::disk('public')->exists($image->path)) {
                Storage::disk('public')->delete($image->path);
            }
        }

        // 3. Delete the parent story entry (cascade constraints will drop the image rows automatically)
        $story->delete();

        // 4. Send admin back to the index tracking deck
        return redirect()->route('stories.index')->with('success', 'Project update and files purged successfully.');
    }
}