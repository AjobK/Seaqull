<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Account;
use App\Attachment;

class User extends Model
{
    use SoftDeletes;

    protected $table = 'User';

    protected $fillable = [
        'account_id', 'title_id', 'avatar_attachment', 'banner_attachment', 'display_name', 'experience', 'rows_scrolled', 'custom_path',
    ];

    public function title()
    {
        return $this->belongsTo('App\Title');
    }
    
    public function account()
    {
        return $this->belongsTo('App\Account');
    }
    
    public function avatar()
    {
        return $this->belongsTo('App\Attachment', 'avatar_attachment');
    }
    
    public function banner()
    {
        return $this->belongsTo('App\Attachment', 'banner_attachment');
    }

    public function like()
    {
        return $this->belongsToMany('App\Comment', 'user_comment_like');
    }

    public function activity()
    {
        return $this->hasMany('App\UserActivity');
    }

    public function comment()
    {
        return $this->hasMany('App\Comment');
    }

    public function post()
    {
        return $this->hasMany('App\Post');
    }
}
