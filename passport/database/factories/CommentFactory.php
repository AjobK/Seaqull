<?php

use App\Comment;
use App\User;
use App\Post;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(Comment::class, function (Faker $faker) {
    $user = App\User::pluck('id')->toArray();
    $post = App\Post::pluck('id')->toArray();

    return [
        'user_id' => $faker->randomElement($user),
        'post_id' => $faker->randomElement($post),
        'content' => $faker->text(100),
    ];
});
