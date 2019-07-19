<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use SoftDeletes;

    protected $table = 'Comment';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'post_id', 'comment_id', 'content',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'user_id' => 'int',
        'post_id' => 'int',
        'comment_id' => 'int',
    ];

    public function attachment()
    {
        return $this->belongsToMany('App\Attachment', 'CommentHasAttachment');
    }

    public function post()
    {
        return $this->belongsTo('App\Post');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function belongsTo_comment()
    {
        return $this->belongsTo('App\Comment');
    }

    public function has_comment()
    {
        return $this->hasMany('App\Comment');
    }
}
