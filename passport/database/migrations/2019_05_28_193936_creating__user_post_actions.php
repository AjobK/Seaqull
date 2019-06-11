<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatingUserPostActions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('User_Post_Actions', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('post_id');
            $table->timestamp('liked_at')->nullable();
            $table->timestamp('fb_shared_at')->nullable();
            $table->timestamp('tw_shared_at')->nullable();

            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')
                ->on('User');

            $table->foreign('post_id')
                ->references('id')
                ->on('Post');

            $table->primary(['user_id', 'post_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('User_Post_Actions', function (Blueprint $table) {
            $table->dropForeign('user_post_actions_user_id_foreign');
            $table->dropForeign('user_post_actions_post_id_foreign');
        });
        Schema::dropIfExists('User_Post_Actions');
    }
}
