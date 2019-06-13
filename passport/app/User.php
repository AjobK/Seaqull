<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Account;

class User extends Model
{

    protected $table = 'User';

    protected $fillable = [
        'account', 'title', 'avatar', 'display_name', 'experience', 'rows_scrolled', 'custom_path', 'created_at', 'updated_at', 'deleted_at'
    ];

    public function title()
    {
        return $this->belongsTo(Title::class);
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

}