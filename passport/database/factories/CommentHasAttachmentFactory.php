<?php

use App\Comment;
use App\Attachent;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(CommentHasAttachment::class, function (Faker $faker) {
    $comment = App\Comment::pluck('id')->toArray();
    $attachment = App\Attachment::pluck('id')->toArray();

    return [
        'comment_id' => $faker->randomElement($comment),
        'attachment_id' => $faker->randomElement($attachment),
    ];
});
