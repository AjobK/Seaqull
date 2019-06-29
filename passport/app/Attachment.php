<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Attachment extends Model
{
    protected $table = 'Attachment';

    protected $fillable = [
        'path'
    ];

    public function bannerUsers()
    {
        return $this->hasMany(User::class);
    }

    public function avatarUsers()
    {
        return $this->hasMany(User::class);
    }
}
