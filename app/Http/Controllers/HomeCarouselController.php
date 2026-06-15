<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\HomeCarouselPic;
use Illuminate\Support\Facades\File;


class HomeCarouselController extends Controller
{
    public function index()
    {
        return Inertia::render('HomeCarousel/Index', [
            'carousels' => HomeCarouselPic::latest()->get()->map(function ($pic) {
                return [
                    'id' => $pic->id,
                    'image_url' => asset($pic->image_path),
                    'active' => $pic->active,
                ];
            }),
        ]);
    }

    public function create()
    {
        return Inertia::render('HomeCarousel/Create');
    }

    public function store(Request $request)
    {
        
        $request->validate([
            'images' => ['required', 'array', 'min:1'],
            'images.*' => ['image', 'max:10240'],
        ]);

        $destination = public_path('storage/homeCarousel');

        if (! File::exists($destination)) {
            File::makeDirectory($destination, 0755, true);
        }

        foreach ($request->file('images') as $image) {

            $filename = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();

            $image->move($destination, $filename);

            HomeCarouselPic::create([
                'image_path' => 'storage/homeCarousel/' . $filename,
                'active' => true,
            ]);
        }

        return redirect()->route('home-carousel.index')
            ->with('success', 'Carousel images uploaded successfully.');
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy(HomeCarouselPic $homeCarouselPic)
    {
        $file = public_path($homeCarouselPic->image_path);

        if (file_exists($file)) {
            unlink($file);
        }

        $homeCarouselPic->delete();

        return back();
    }
}