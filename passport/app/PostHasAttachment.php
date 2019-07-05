<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PostHasAttachment extends Model
{
    protected $table = 'Post_Has_Attachment';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'post_id', 'attachment_id', 'type',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'post_id' => 'int',
        'attachment_id' => 'int',
    ];

    protected $attributes = [
        'type' => null,
    ];

    public function post()
    {
        return $this->hasMany('App\Post');
    }

    public function attachment()
    {
        return $this->hasMany('App\Attachment');
    }
}
