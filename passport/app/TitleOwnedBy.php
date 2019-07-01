<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TitleOwnedBy extends Model
{
    protected $table = 'Title_Owned_By';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'title_id',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'user_id' => 'int',
        'title_id' => 'int',
    ];

    public function user()
    {
        return $this->hasMany('App\User');
    }

    public function title()
    {
        return $this->hasMany('App\Title');
    }
}
