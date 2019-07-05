<?php

namespace App\Http\Controllers;

use App\Account;
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
            'user_name' => ['required', 'min:3', 'unique:account', 'alpha_dash'],
            'email' => ['required', 'email', 'unique:account'],
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

        $account = Account::create([
            'user_name' => $request->user_name,
            'email' => $request->email,
            'role_id' => 1,
            'password' => bcrypt($request->password),
            'last_ip' => request()->ip()
        ]);

        $user = User::create([
            'account_id' => $account->id,
            'title_id' => 0,
            'display_name' => $request->user_name,
            'experience' => 0,
            'custom_path' => $request->user_name
        ]);

        $token = $account->createToken('HorseNeedleRabbitLava')->accessToken;

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
        $validator = Validator::make($request->all(), [
            'recaptcha' => ['required', new Captcha]
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $credentials = [
            'user_name' => $request->user_name,
            'password' => $request->password
        ];

        $targetUser = Account::where('user_name', $request->user_name)->first();

        if ($targetUser && now() < $targetUser->locked_to) {
            return response()->json([
                'error' => ['Cannot login yet'],
                'remainingTime' => strtotime($targetUser->locked_to) - strtotime(now())
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

            if ($targetUser->login_attempts_count > 2 && $targetUser->login_attempts_count % 3 == 0) {
                $targetUser->locked_to = date('Y-m-d H:i:s', time() + 30);

                $targetUser->save();

                return response()->json([
                    'error' => ['Invalid username or password.'],
                    'remainingTime' => strtotime($targetUser->locked_to) - strtotime(now())
                ], 422);
            }

            $targetUser->save();
        }

        return response()->json(['error' => ['Invalid username or password.']], 422);
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
    public function profile(Request $request, $path = null)
    {
        $user = null; //Refactor this

        if ($path == null) {
            $account = auth()->guard('api')->user();
            if ($account) {
                $user = User::where('account_id', '=', $account->id)->first();
            }
        } else {
            $user = User::where('custom_path', '=', $path)->first();
        }

        if (!$user) {
            return response()->json([
                'succes' => false,
                'message' => 'User with path: ' . $path . ' cannot be found'
            ], 400);
        }

        $isOwner = $user->account->is(auth()->guard('api')->user());
        $name = $user->display_name;
        $exp = $user->experience;
        $title = $user->title ? $user->title->name : "";
        $banner = $user->banner ? $user->banner->path : "/src/static/dummy/user/banner.jpg";
        $avatar = $user->avatar ? $user->avatar->path : "/src/static/dummy/user/profile.jpg";
        $posts = $user
            ->posts()
            ->orderBy('created_at')
            ->take($isOwner ? 7 : 8)
            ->get(['title'])
            ->toArray();

        $profile = [
            'username' => $name,
            'title' => $title,
            'experience' => $exp,
            'isOwner' => $isOwner,
            'posts' => $posts,
            'banner' => $banner,
            'avatar' => $avatar
        ];

        return response()->json(['profile' => $profile], 200);
    }
}
