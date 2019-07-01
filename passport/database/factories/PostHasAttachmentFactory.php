<?php

use App\Post;
use App\Attachment;
use App\Type;
use Faker\Generator as Faker;

$factory->define(PostHasAttachment::class, function (Faker $faker) {
    $post = App\Post::pluck('id')->toArray();
    $attachment = App\Attachment::pluck('id')->toArray();
    $type = App\Type::pluck('id')->toArray();

    return [
        'post_id' => $faker->randomElement($post),
        'attachment_id' => $faker->randomElement($attachment),
    ];
});
