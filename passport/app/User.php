<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Account;
use App\Attachment;

class User extends Model
{

    protected $table = 'User';

    protected $fillable = [
        'account_id', 'title_id', 'avatar', 'display_name', 'experience', 'banner', 'rows_scrolled', 'custom_path', 'created_at', 'updated_at', 'deleted_at'
    ];

    public function title()
    {
        return $this->belongsTo(Title::class);
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function avatar()
    {
        return $this->belongsTo(Attachment::class, 'avatar_attachment', 'id');
    }

    public function banner()
    {
        return $this->belongsTo(Attachment::class, 'banner_attachment', 'id');
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

}