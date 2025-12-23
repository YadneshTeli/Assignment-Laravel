<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'url',
        'author',
        'published_date',
        'references',
        'is_updated'
    ];

    protected $casts = [
        'published_date' => 'date',
        'is_updated' => 'boolean',
    ];
}
