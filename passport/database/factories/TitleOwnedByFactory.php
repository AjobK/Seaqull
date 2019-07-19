<?php

use App\TitleOwnedBy;
use App\Title;
use App\User;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(TitleOwnedBy::class, function (Faker $faker) {
    $title = App\Title::pluck('id')->toArray();
    $user = App\User::pluck('id')->toArray();

    return [
        'user_id' => $faker->randomElement($user),
        'title_id' => $faker->randomElement($title),
    ];
});
