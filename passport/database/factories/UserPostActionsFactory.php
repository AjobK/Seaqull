<?php

use App\UserPostActions;
use App\User;
use App\Post;
use Faker\Generator as Faker;

$factory->define(UserPostActions::class, function (Faker $faker) {
    $user = App\User::pluck('id')->toArray();
    $post = App\Post::pluck('id')->toArray();

    return [
        'user_id' => $faker->randomElement($user),
        'post_id' => $faker->randomElement($post),
        'liked_at' => $faker->dateTime(),
    ];
});
