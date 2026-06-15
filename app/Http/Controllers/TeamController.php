<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use App\Models\Team; // we will create this model next if not yet created

class TeamController extends Controller
{
    public function index()
    {
        $team = Team::latest()->get();

        return Inertia::render('Team/Index', [
            'team' => $team
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'role'         => 'nullable|string|max:255',
            'description'   => 'nullable|string',
            'credentials'   => 'nullable|string',
            'image'        => 'nullable|image|max:2048',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('teammemberpics', 'public');
        }

        Team::create([
            'name'        => $validated['name'],
            'role'        => $validated['role'] ?? null,
            'description' => $validated['description'] ?? null,
            'credentials' => $validated['credentials'] ?? null,
            'image'       => $imagePath,
        ]);

        return redirect()->route('team.index')
            ->with('success', 'Team member created successfully.');
    }

    public function destroy(Team $team)
    {
        if ($team->image && Storage::disk('public')->exists($team->image)) {
            Storage::disk('public')->delete($team->image);
        }

        $team->delete();

        return redirect()->route('team.index')
            ->with('success', 'Team member deleted successfully.');
    }
}