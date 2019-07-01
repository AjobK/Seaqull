<?php

use App\User;
use App\Account;
use App\Title;
use Illuminate\Support\Str;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Hash;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    $account = App\Account::pluck('id')->toArray();
    $title = App\Title::pluck('id')->toArray();
    return [
        'account_id' => $faker->randomElement($account),
        'title_id' => $faker->randomElement($title),
        'display_name' => $faker->name,
        'experience' => $faker->randomFloat(2),
        'rows_scrolled' => $faker->randomDigit(),
        'custom_path' => $faker->imageUrl(),
    ];
});
