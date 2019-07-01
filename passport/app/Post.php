<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'Post';

    protected $fillable = [
        'user_id', 'title', 'path', 'content', 'description', 'hidden_at', 'published_at',
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function comment()
    {
        return $this->hasMany('App\Comment');
    }

    public function attachments()
    {
        return $this->belongsToMany('App\Attachment', 'post_has_attachment');
    }

    public function actions()
    {
        return $this->belongsToMany('App\User', 'user_post_actions');
    }
}
