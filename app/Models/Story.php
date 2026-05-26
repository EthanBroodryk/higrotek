<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Story extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'media_path', // You can keep this or deprecate it since we use the images relationship
        'media_type',
        'meta',
        'is_published',
    ];

    protected $casts = [
        'meta' => 'array',
        'is_published' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship: A story can have multiple associated images.
     */
    public function images()
    {
        return $this->hasMany(StoryImage::class);
    }

    /**
     * Relationship shortcut: Grab just the cover photo for the story.
     */
    public function coverImage()
    {
        return $this->hasOne(StoryImage::class)->where('is_cover', true);
    }
}