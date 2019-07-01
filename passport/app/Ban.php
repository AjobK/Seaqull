<?php

namespace App;

use App\Account;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ban extends Model
{
    use SoftDeletes;

    protected $table = 'Ban';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'staff_id', 
        'account_id', 
        'reason', 
        'description', 
        'banned_at', 
        'banned_to', 
        'ip_ban',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'staff_id' => 'int',
        'account_id' => 'int',
        'ip_ban' => 'boolean',
    ];

    public function staff()
    {
        return $this->belongsTo('App\Account', 'staff_id');
    }

    public function account()
    {
        return $this->belongsTo('App\Account');
    }
}
