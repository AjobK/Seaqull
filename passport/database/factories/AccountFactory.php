<?php

use App\Account;
use Illuminate\Support\Str;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Hash;

$factory->define(Account::class, function (Faker $faker) {
    $roles = App\Role::pluck('id')->toArray();
    $username = $faker->unique()->userName;

    return [
        'role_id' => $faker->randomElement($roles),
        'user_name' => $username,
        'email' => $username . '@' . $faker->safeEmailDomain,
        'password' => bcrypt('Qwerty123'),
        'last_ip' => $faker->ipv4(),
        'created_at' => now()
    ];
});
