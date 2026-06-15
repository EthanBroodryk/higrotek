<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeCarouselPic extends Model
{
    protected $fillable = [
        'image_path',
        'active',
    ];
}