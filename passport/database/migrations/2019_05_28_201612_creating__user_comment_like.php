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
        Schema::create('User_Comment_Like', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('comment_id');
            $table->timestamp('liked_at')->nullable();

            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')
                ->on('User');

            $table->foreign('comment_id')
                ->references('id')
                ->on('Comment');

            $table->primary(['user_id', 'comment_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('User_Comment_Like', function (Blueprint $table) {
            $table->dropForeign('user_comment_like_user_id_foreign');
            $table->dropForeign('user_comment_like_comment_id_foreign');
        });
        Schema::dropIfExists('User_Comment_Like');
    }
}
