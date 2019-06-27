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
        'role_id', 
        'user_name', 
        'email', 
        'email_verified_at', 
        'password', 
        'last_ip', 
        'login_attempts_count', 
        'locked_to', 
        'changed_pw_at',
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
        'email_verified_at' => 'datetime',
        'changed_pw_at' => 'datetime',
    ];
    
    public function role()
    {
        return $this->hasOne(Role::class);
    }
}
