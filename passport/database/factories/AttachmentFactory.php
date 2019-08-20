<?php

use App\Attachment;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(Attachment::class, function (Faker $faker) {
    return [
        'path' => $faker->image('../src/static/images'),
    ];
});
