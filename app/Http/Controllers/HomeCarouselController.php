<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeCarouselController extends Controller
{
    public function index()
    {
        return Inertia::render('HomeCarousel/Index', [
            'carousels' => [],
        ]);
    }

    public function create()
    {
        return Inertia::render('HomeCarousel/Create');
    }

    public function store(Request $request)
    {
        //
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}