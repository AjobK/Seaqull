<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class Account extends Authenticatable
{
    use Notifiable, HasApiTokens;

    protected $table = 'Account';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'role_id', 'user_name', 'email', 'email_verified_at', 'password', 'last_ip', 'login_attempts_count', 'locked_to', 'changed_pw_at',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'deleted_at' => null,
        'changed_pw_at' => null,
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'role_id' => 'int',
    ];
    
    public function ban_staff()
    {
        return $this->hasMany('App\Ban', 'staff_id');
    }

    public function ban_account()
    {
        return $this->hasMany('App\Ban', 'account_id');
    }

    public function user()
    {
        return $this->hasMany('App\User');
    }

    public function email_verification()
    {
        return $this->hasMany('App\EmailVerification');
    }
}
