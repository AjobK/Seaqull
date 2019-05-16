<?php

namespace App\Http\Controllers;

use App\Post;
use App\User;
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
        } else {
            return response()->json([
                'succes' => false,
                'message' => 'No authentication for user'
            ], 400);
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
                    'message' => 'User did not create this post'
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
                'success' => true,
                'post' => $post
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

    public function showPath ($path) {
        if (strlen($path) === 11) {
            if (auth()->user()) {
                $post = Post::where('path', $path);
    
                if ($post->first()) {
                    // Return of data
                    return response()->json([
                        'succes' => true,
                        'data' => $post->first()
                    ], 200);
                } else {
                    // If no path is found
                    return response()->json([
                        'succes' => false,
                        'message' => 'Post with path ' . $path . ' cannot be found'
                    ], 404);
                }
            }
        } else {
            // If string size is not correct
            return response()->json([
                'succes' => false,
                'message' => 'The path is not correct, it is either to long or to short'
            ], 412);
        }
    }

    public function showUser ($id) {
        if (auth()->user()) {
            if (User::find($id)) {
                $post = Post::where('user_id', $id);
    
                if ($post->first()) {
                    return response()->json([
                        'succes' => true,
                        'data' => $post->first()
                    ]);
                } else {
                    return response()->json([
                        'succes' => false,
                        'message' => 'There is no post made by this user'
                    ], 404);
                }
            } else {
                return response()->json([
                    'succes' => false,
                    'message' => 'User with id ' . $id . ' cannot be found'
                ], 404);
            }
        }
    } 
}
