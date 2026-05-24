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
        $stories = Story::latest()->get();

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
            'image'       => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('stories', 'public');
        }

        Story::create($validated);

        return redirect()->route('stories.index')->with('success', 'Story created successfully.');
    }

    public function show(Story $story)
    {
        return Inertia::render('Stories/Show', [
            'story' => $story,
        ]);
    }
}