<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Title extends Model
{

    protected $table = 'Title';

    protected $fillable = [
        'name'
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
