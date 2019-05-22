<?php

namespace App\Http\Controllers;

use App\User;
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
        $this->validate($request, [
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $token = $user->createToken('TutsForWeb')->accessToken;

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
            'email' => $request->email,
            'password' => $request->password
        ];

        if (auth()->attempt($credentials)) {
            $token = auth()->user()->createToken('TutsForWeb')->accessToken;
            return response()->json(['token' => $token], 200);
        } else {
            return response()->json(['error' => 'UnAuthorised'], 401);
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

    /**
     * Returns Profile information for a given user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function profile(Request $request, $path)
    {
        $user = User::where('path', '=', $path)->first();

        if (!$user) {
            return response()->json([
                'succes' => false,
                'message' => 'User with path: ' . $path . ' cannot be found'
            ], 400);
        }

        $profile = [
            'name' => $user->name,
            'title' => $user->title->name,
            'exp' => $user->experience
        ];

        return response()->json(['profile' => $profile], 200);
    }
}