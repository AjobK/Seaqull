<?php

use App\User;
use Illuminate\Support\Str;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Hash;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    $roles = App\Role::pluck('id')->toArray();
    $username = $faker->unique()->userName;

    return [
        'name' => $username,
        'email' => $username.'@'.$faker->safeEmailDomain,
        'email_verified_at' => now(),
        'password' => bcrypt('qwerty'),
        'remember_token' => Str::random(10),
        'role_id' => $faker->randomElement($roles)
    ];
});
