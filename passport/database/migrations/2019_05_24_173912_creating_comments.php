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

            $table->integer('user_id')->unsigned();
            $table->integer('post_id')->unsigned();
            $table->unsignedBigInteger('comment_id')->nullable();
            $table->text('comment');

            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('post_id')
                ->references('id')
                ->on('posts')
                ->onDelete('cascade');

            $table->foreign('comment_id')
                ->references('id')
                ->on('Comment')
                ->onDelete('cascade');

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
            $table->dropForeign(['comment_user_id_foreign', 'comment_post_id_foreign', 'comment_comment_id_foreign']);
        });
        Schema::dropIfExists('comment');
    }
}
