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
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'password' => Hash::make(Str::random(18)), // password
        'remember_token' => Str::random(10),
        'path' => Str::random(16),
        'profile_photo' => null,
        'profile_banner' => null,
        'experience' => 0,
        'title_id' => 0,
        'role_id' => $faker->randomElement($roles)
    ];
});
