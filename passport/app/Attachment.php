<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attachment extends Model
{
    use SoftDeletes;

    protected $table = 'Attachment';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'path',
    ];


    public function comments()
    {
        return $this->belongsToMany('App\Comment', 'CommentHasAttachment');
    }

    public function post()
    {
        return $this->belongsToMany('App\Post', 'PostHasAttachment');
    }

    public function user()
    {
        return $this->hasOne('App\User', 'avatar_attachment');
    }
}
