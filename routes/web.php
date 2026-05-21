<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UploadsController;
use App\Models\CompanyLogo;

Route::get('/', function () {

    $logo = CompanyLogo::where('is_active', true)->first();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,

        // ✅ ADD THIS
        'logo' => $logo
            ? asset('storage/' . $logo->path)
            : null,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
   

Route::post('/dashboard/logo', [UploadsController::class, 'uploadLogo'])->name('logo.upload');
});

require __DIR__.'/auth.php';
