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
        Schema::create('UserActivity', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->integer('user_id');
            $table->string('previous_password', 255)->nullable();
            $table->string('type');
            $table->string('ip_address');
            $table->timestamp('created_at');

            $table->foreign('user_id')
                ->references('id')
                ->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('UserActivity');
    }
}
