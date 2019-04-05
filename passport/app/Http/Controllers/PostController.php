<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    private function pathString ($length = 11) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }

        $path = Post::where('path', $randomString);

        if ($path->first()) {
            $this->pathString();
        } else {
            return $randomString;
        }
    }
    public function index () {
        $posts = Post::paginate(15);

        return response()->json([
            'succes' => true,
            'data' => $posts
        ]);
    }
    public function show ($id) {
        if (auth()->user()) {
            $post =Post::find($id);

            if (!$post) {
                return response()->json([
                    'succes' => false,
                    'message' => 'Post with ID: ' . $id . ' cannot be found'
                ], 400);
            } else {
                return response()->json([
                    'succes' => true,
                    'data' => $post->toArray()
                ]);
            }
        }
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
            'description' => 'required',
            'Content' => 'required'
        ]);

        $path = $this->pathString();

        $post = new Post();
        $post->title = $request->title;
        $post->description = $request->description;
        $post->content = $request->Content;
        $post->path = $path;
        
        if (auth()->user()->posts()->save($post)) {
            return response()->json([
                'success' => true,
                'data' => $post->toArray()
            ]);
        }
        else {
            return response()->json([
                'success' => false,
                'message' => 'Post could not be added'
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $post = auth()->user()->posts()->find($id);

        if (!$post) {
            $posts = Post::find($id);

            if ($posts) {
                return response()->json([
                    'succes' => false,
                    'message' => 'The user did not make this post!'
                ]);
            }  else {
                return response()->json([
                    'success' => false,
                    'message' => 'Post with id ' . $id . ' not found'
                ], 400);
            }
        }

        $updated = $post->fill($request->all())->save();

        if ($updated)
            return response()->json([
                'success' => true
            ]);
        else
            return response()->json([
                'success' => false,
                'message' => 'Post could not be updated'
            ], 500);
    }

    public function destroy($id)
    {
        $post = auth()->user()->posts()->find($id);

        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Product with id ' . $id . ' not found'
            ], 400);
        }

        if ($post->delete()) {
            return response()->json([
                'success' => true
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Product could not be deleted'
            ], 500);
        }
    }
}
