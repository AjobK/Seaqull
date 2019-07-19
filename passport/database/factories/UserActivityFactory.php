<?php

use App\UserActivity;
use App\User;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(UserActivity::class, function (Faker $faker) {
    $user = App\User::pluck('id')->toArray();

    return [
        'user_id' => $faker->randomElement($user),
        'previous_password' => $faker->password(),
        'type' => Str::random(10),
        'ip_addres' => $faker->ipv4(),
    ];
});
