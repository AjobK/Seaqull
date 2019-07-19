<?php

use App\Post;
use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;


$factory->define(Post::class, function (Faker $faker) {
    $user = App\User::pluck('id')->toArray();

    return [
        'user_id' => $faker->randomElement($user),
        'title' => $faker->sentence(),
        'path' => $faker->imageUrl(),
        'content' => $faker->paragraph(10),
        'description' => $faker->paragraph(3),
        'published_at' => $faker->dateTime('now'),
    ];
});
