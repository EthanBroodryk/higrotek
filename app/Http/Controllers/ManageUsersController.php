<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class ManageUsersController extends Controller
{
    /**
     * Enforce global administrator check gate across actions
     */
    protected function authorizeAdmin(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            abort(403, 'Unauthorized action. Admin clearance required.');
        }
    }

    public function index(Request $request)
    {
        $this->authorizeAdmin($request);

        $users = User::select(['id', 'name', 'email', 'role', 'created_at'])
            ->latest()
            ->get();

        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }

    public function create(Request $request)
    {
        $this->authorizeAdmin($request);

        return Inertia::render('Users/Create');
    }

    public function store(Request $request)
    {
        $this->authorizeAdmin($request);

        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role'     => 'required|string|in:user,admin',
        ]);

        User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role'     => $validated['role'],
        ]);

        return redirect()->route('users.index')->with('success', 'User account deployed successfully.');
    }

    public function update(Request $request, User $user)
    {
        
        $this->authorizeAdmin($request);

        
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|lowercase|email|max:255|unique:users,email,' . $user->id,
            'role'     => 'required|string|in:user,admin',
            'password' => 'nullable|string|min:8', 
        ]);

        
        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            
            unset($validated['password']);
        }

        
        $user->update($validated);

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(Request $request, User $user)
    {
        // Enforce admin authorization gate
        $this->authorizeAdmin($request);

        // Fail-safe protection: Prevent an admin from deleting their own logged-in account
        if ($request->user()->id === $user->id) {
            return redirect()->route('users.index')->with('error', 'You cannot delete your own active administrator session.');
        }

        // Permanently delete the user account profile record
        $user->delete();

        return redirect()->route('users.index')->with('success', 'User account permanently purged.');
    }
}