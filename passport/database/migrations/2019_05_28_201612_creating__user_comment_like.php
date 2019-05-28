<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatingUserCommentLike extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(Schema::hasTable('UserCommentLike')){
            Schema::drop('UserCommentLike');
        };
        Schema::create('UserCommentLike', function (Blueprint $table) {
            $table->unsignedBigInteger('id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('comment_id');
            $table->timestamp('liked_at')->nullable();

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('User');
            $table->foreign('comment_id')->references('id')->on('Comment');
            $table->primary(['id', 'user_id', 'comment_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('UserCommentLike');
    }
}
