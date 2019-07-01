<?php

use App\Setting;
use App\User;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(Setting::class, function (Faker $faker) {
    $user = App\User::pluck('id')->toArray();

    return [
        'user_id' => $faker->randomElement($user),
        'key' => $faker->word(),
        'value' => $faker->sentence(6),
    ];
});
