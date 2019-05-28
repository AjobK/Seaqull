<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PostsComplyWithErd extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Comment', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->integer('user_id');
            $table->integer('post_id');
            $table->integer('comment_id')->nullable();
            $table->text('comment');

            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')
                ->on('users');

            $table->foreign('post_id')
                ->references('id')
                ->on('posts');

            $table->foreign('comment_id')
            ->references('id')
            ->on('Comment');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comment');
    }
}
