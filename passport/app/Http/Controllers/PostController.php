<?php

namespace App\Http\Controllers;

use App\Post;
use App\User;
use Validator;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index () {
        $posts = Post::paginate(15);

        return response()->json([
            'succes' => true,
            'data' => $posts
        ]);
    }

    public function show ($id) {
      $post = Post::find($id);
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

	public function store(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'title' => 'required',
      'description' => 'required',
      'Content' => 'required'
    ]);

    if ($validator->fails()) {
      return response()->json(['errors' => $validator->errors()], 422);
    } else { 
			$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      $charactersLength = strlen($characters);
      $path = '';
      for ($i = 0; $i < 10; $i++) {
          $path .= $characters[rand(0, $charactersLength - 1)];
      }
          
      $post = Post::create([
        'title' => $request->title,
        'description' => $request->description,
        'content' => $request->Content,
        'path' => $path,
        'user_id' => $request->user_id
      ]);
    }
  }


    public function update(Request $request, $id)
    {
	    $post = Post::find($id);

      $updated = $post->fill($request->all())->save();

      if ($updated){
        return response()->json([
          'success' => true,
          'post' => $post
				]);
			}
      else{
        return response()->json([
          'success' => false,
          'message' => 'Post could not be updated'
				], 500);
			}
    }

    public function destroy($id)
    {
        $post = Post::find($id);

        if(!!$post){
					$post->delete();
					return "succes";
        } else {
					return "post not found";
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
