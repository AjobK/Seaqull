<?php

use App\Post;
use Faker\Generator as Faker;
use Illuminate\Support\Str;


$factory->define(Post::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence,
        'content' => $faker->paragraph(10),
        'description' => $faker->paragraph(3),
        'path' => Str::random(11),
    ];
});
