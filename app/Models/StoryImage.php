<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StoryImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'story_id',
        'path',
        'is_cover',
    ];

    protected $casts = [
        'is_cover' => 'boolean',
    ];

    /**
     * Get the story that owns the image.
     */
    public function story()
    {
        return $this->belongsTo(Story::class);
    }
}