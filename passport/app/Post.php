<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'Post';

    protected $fillable = [
        'title', 'path', 'content', 'description'
    ];
}
