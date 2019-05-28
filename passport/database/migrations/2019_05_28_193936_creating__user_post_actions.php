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
        if(Schema::hasTable('UserPostActions')){
            Schema::drop('UserPostActions');
        };
        Schema::create('UserPostActions', function (Blueprint $table) {
            $table->unsignedBigInteger('id');
            $table->unsignedBigInteger('user_id');
            $table->integer('post_id')->unsigned();
            $table->integer('like_weight')->nullable();
            $table->timestamp('liked_at')->nullable();
            $table->timestamp('fb_shared_at')->nullable();
            $table->timestamp('tw_shared_at')->nullable();

            $table->timestamps();
            $table->foreign('user_id')
                ->references('id')
                ->on('User');

            $table->foreign('post_id')->references('id')->on('Post');

            $table->primary(['id', 'user_id', 'post_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('UserPostActions');
    }
}
