<?php

use App\Account;
use Illuminate\Support\Str;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Hash;

$factory->define(Account::class, function (Faker $faker) {
    $role = App\Role::pluck('id')->toArray();
    return [
        'role' => $faker->randomElement($role),
        'user_name' => $faker->firstName(),
        'email' => $faker->safeEmail(),
        'email_verified_at' => dateTime(),
        'password' => bcrypt('secret'),
        'last_ip' => $faker->ipv4(),
        'changed_pw_at' => '',
    ];
});
