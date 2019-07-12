<?php

use App\UserCommentLike;
use App\User;
use App\Comment;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(UserCommentLike::class, function (Faker $faker) {
    $user = App\User::pluck('id')->toArray();
    $comment = App\Comment::pluck('id')->toArray();

    return [
        'user_id' => $faker->randomElement($user),
        'comment_id' => $faker->randomElement($comment),
        'liked_at' => $faker->dateTime(),
    ];
});
