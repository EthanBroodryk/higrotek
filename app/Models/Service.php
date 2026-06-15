<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'title',
        'description',
        'images',
        'sort_order',
        'active',
    ];

    protected $casts = [
        'images' => 'array',
        'active' => 'boolean',
    ];
}