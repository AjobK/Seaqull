<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatingComments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Comment', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('post_id');
            $table->unsignedBigInteger('comment_id')->nullable();
            $table->unsignedBigInteger('attachment_id')->nullable();
            $table->text('comment');

            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')
                ->on('User');

            $table->foreign('post_id')
                ->references('id')
                ->on('Post');

            $table->foreign('comment_id')
                ->references('id')
                ->on('Comment');

            $table->foreign('attachment_id')
                ->references('id')
                ->on('Attachment');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Comment', function (Blueprint $table) {
            $table->dropForeign('comment_user_id_foreign');
            $table->dropForeign('comment_post_id_foreign');
            $table->dropForeign('comment_comment_id_foreign');
            $table->dropForeign('comment_attachment_id_foreign');
        });
        Schema::dropIfExists('comment');
    }
}
