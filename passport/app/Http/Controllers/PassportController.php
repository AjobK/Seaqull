<?php

namespace App\Http\Controllers;

use App\User;
use Validator;
use App\Rules\Uppercase;
use App\Rules\Lowercase;
use App\Rules\NumberOrSpecial;
use App\Rules\Captcha;
use App\Rules\NoUsernameOrEmail;
use Illuminate\Http\Request;

class PassportController extends Controller
{
    /**
     * Handles Registration Request
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => ['required', 'min:3', 'unique:users', 'alpha_dash'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => [
                'required',
                'min:6',
                new Uppercase,
                new Lowercase,
                new NumberOrSpecial,
                new NoUsernameOrEmail($request->username, $request->email)
            ],
            'recaptcha' => ['required', new Captcha]
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'role_id' => 1,
            'password' => bcrypt($request->password)
        ]);


        $token = $user->createToken('HorseNeedleRabbitLava')->accessToken;

        return response()->json(['token' => $token], 200);
    }

    /**
     * Handles Login Request
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = [
            'username' => $request->username,
            'password' => $request->password
        ];

        if (auth()->attempt($credentials)) {
            $token = auth()->user()->createToken('HorseNeedleRabbitLava')->accessToken;
            return response()->json(['user' => auth()->user(), 'token' => $token], 200);
        } else {
            return response()->json(['error' => ['Invalid email or password.']], 422);
        }
    }

    /**
     * Returns Authenticated User Details
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function details()
    {
        return response()->json(['user' => auth()->user()], 200);
    }
}