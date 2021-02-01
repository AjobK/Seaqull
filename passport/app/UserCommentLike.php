<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class UserCommentLike extends Model
{
    use SoftDeletes;

    protected $table = 'User_Comment_Like';
    protected $primaryKey = null;
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'comment_id'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'user_id' => 'int',
        'comment_id' => 'int',
    ];

    public function user()
    {
         return $this->hasMany('App\User');
    }

    public function comment()
    {
        return $this->hasMany('App\Comment');
    }
}
