<?php

use App\User;
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
    
    

    // return [
    //     'title_id' => ,
    //     'avatar_attachment' => ,
    //     'display_name' => ,
    //     'experience' => 0,
    //     'rows_scrolled' => 0,
    //     'custom_path' => ,
    //     'created_at' => now(),
    // ];
});
