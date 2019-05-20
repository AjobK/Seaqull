<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'PassportController@login');
Route::post('register', 'PassportController@register');
Route::get('post', 'PostController@index');

Route::middleware('auth:api')->group(function () {
    Route::get('user', 'PassportController@details');

    Route::get('post/{id}', 'PostController@show');
    Route::post('post', 'PostController@store');
    Route::post('post/{id}', 'PostController@update');

    Route::get('profile/{id}', 'PassportController@profile');
});