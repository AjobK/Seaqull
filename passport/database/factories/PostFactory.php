<?php

use App\Post;
use Faker\Generator as Faker;
use Illuminate\Support\Str;


$factory->define(Post::class, function (Faker $faker) {
    return [
        'title' => Str::random(25),
        'content' => Str::random(555),
        'description' => Str::random(125),
        'path' => Str::random(11),
    ];
});
