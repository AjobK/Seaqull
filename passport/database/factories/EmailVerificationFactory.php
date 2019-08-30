<?php

use App\EmailVerification;
use Illuminate\Support\Str;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Hash;

$factory->define(EmailVerification::class, function (Faker $faker) {
    $accounts = App\Account::pluck('id')->toArray();

    return [
        'account_id' => $faker->randomElement($accounts),
        'token' => $faker->randomNumber(5),
        'verified_at' => $faker->datetime(),
        'expires_at' => $faker->datetime(),
    ];
});
