<?php

use App\Ban;
use App\Account;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(Ban::class, function (Faker $faker) {
    $account = App\Account::pluck('id')->toArray();

    return [
        'staff_id' => $faker->randomElement($account),
        'account_id' => $faker->randomElement($account),
        'reason' => $faker->sentence(4),
        'banned_at' => $faker->dateTime(now),
        'banned_to' => $faker->dateTime(),
        'ip_ban' => $faker->ipv4(), 
    ];
});
