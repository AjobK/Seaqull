<?php

namespace App\Http\Controllers;

use App\Account;
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
            'user_name' => ['required', 'min:3', 'unique:users', 'alpha_dash'],
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

        $user = Account::create([
            'user_name' => $request->user_name,
            'email' => $request->email,
            'role_id' => 1,
            'password' => bcrypt($request->password),
            'last_ip' => request()->ip()
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
            'user_name' => $request->user_name,
            'password' => $request->password
        ];

        $targetUser = Account::where('user_name', $request->user_name)->first();

        if ($targetUser && $targetUser->locked_to > now()) {
            return response()->json([
                'error' => ['Can not login yet'],
                'remaining_time' => strtotime($targetUser->locked_to) - strtotime(now())
            ], 422);
        }

        if (auth()->attempt($credentials)) {
            $token = auth()->user()->createToken('HorseNeedleRabbitLava')->accessToken;
            auth()->user()->update([
                'last_ip' => request()->ip(),
                'login_attempts_count' => 0,
                'locked_to' => null
            ]);

            return response()->json(['user' => auth()->user(), 'token' => $token], 200);
        } else if ($targetUser) {
            if (!$targetUser->login_attempts_count) {
                $targetUser->login_attempts_count = 1;
            } else {
                $targetUser->login_attempts_count++;
            }

            if ($targetUser->login_attempts_count > 3) {
                $targetUser->locked_to = date('Y-m-d H:i:s', time() + 30);
            }

            $targetUser->save();
        }

        return response()->json(['error' => ['Invalid email or password.']], 422);
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

    /**
     * Returns Profile information for a given user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function profile(Request $request, $path)
    {
        $user = Account::where('path', '=', $path)->first();

        if (!$user) {
            return response()->json([
                'succes' => false,
                'message' => 'User with path: ' . $path . ' cannot be found'
            ], 400);
        }

        $isOwner = $user->is(auth()->guard('api')->user());
        $name = $user->name;
        $exp = $user->experience;
        $title = $user->title ? $user->title->name : "";
        $posts = $user
            ->posts()
            ->orderBy('created_at')
            ->take($isOwner ? 7 : 8)
            ->get(['title'])
            ->toArray()
        ;

        $profile = [
            'name' => $name,
            'title' => $title,
            'experience' => $exp,
            'isOwner' => $isOwner,
            'posts' => $posts
        ];

        return response()->json(['profile' => $profile], 200);
    }
}