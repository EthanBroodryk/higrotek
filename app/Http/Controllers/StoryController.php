<?php

namespace App\Http\Controllers;

use App\Models\Story;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StoryController extends Controller
{
    public function index()
    {
        $stories = Story::with('user')
            ->latest()
            ->get();

        return Inertia::render('Stories/Index', [
            'stories' => $stories
        ]);
    }

    public function create()
    {
        return Inertia::render('Stories/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'media' => 'nullable|file|mimes:jpg,jpeg,png,mp4,webm|max:10240',
        ]);

        $path = null;
        $type = null;

        if ($request->hasFile('media')) {
            $file = $request->file('media');
            $path = $file->store('stories', 'public');

            $type = str_contains($file->getMimeType(), 'video')
                ? 'video'
                : 'image';
        }

        Story::create([
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'media_path' => $path,
            'media_type' => $type,
        ]);

        return redirect()->route('stories.index');
    }

    public function show(Story $story)
    {
        return Inertia::render('Stories/Show', [
            'story' => $story->load('user')
        ]);
    }

    public function destroy(Story $story)
    {
        if ($story->media_path) {
            Storage::disk('public')->delete($story->media_path);
        }

        $story->delete();

        return back();
    }
} 