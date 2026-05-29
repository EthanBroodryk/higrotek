<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UploadsController;
use App\Models\CompanyLogo;
use App\Http\Controllers\StoryController;
use App\Http\Controllers\ContactController;

// --- PUBLIC VISITOR ROUTES ---
Route::get('/', [StoryController::class, 'getStoriesHomePage'])->name('welcome');
Route::get('/projects/{story}', [StoryController::class, 'showClientStory'])->name('stories.show.client');
Route::post('/contact-submit', [ContactController::class, 'submit'])->name('contact.submit');

// --- AUTHENTICATED MANAGEMENT ROUTES ---
Route::middleware(['auth'])->group(function () {
    // Project Update Stories
    Route::get('/stories', [StoryController::class, 'index'])->name('stories.index');
    Route::get('/stories/create', [StoryController::class, 'create'])->name('stories.create');
    Route::post('/stories', [StoryController::class, 'store'])->name('stories.store');
    Route::get('/stories/{story}', [StoryController::class, 'show'])->name('stories.show');
    Route::delete('/stories/{story}', [StoryController::class, 'destroy'])->name('stories.destroy');
    Route::get('/stories/{story}/edit', [StoryController::class, 'edit'])->name('stories.edit');
    // Route::patch('/stories/{story}', [StoryController::class, 'update'])->name('stories.update');
    Route::post('/stories/{story}', [StoryController::class, 'update'])->name('stories.update');

    //Users
    Route::get('/users', function () {
        return Inertia::render('Users/Index'); 
    })->name('users.index');
    

    // Dashboard Hub
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['verified'])->name('dashboard');

    // User Profile Management
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Brand Configurations
    Route::post('/dashboard/logo', [UploadsController::class, 'uploadLogo'])->name('logo.upload');
});

require __DIR__.'/auth.php';