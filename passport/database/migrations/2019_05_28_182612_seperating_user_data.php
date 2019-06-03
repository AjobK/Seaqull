<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SeperatingUserData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('User', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->integer('account_id')->unsigned();
            $table->unsignedBigInteger('title_id');
            $table->string('user_name');
            $table->string('display_name');
            $table->float('experience', 8, 2)->nullable();
            $table->integer('rows_scrolled');
            $table->string('custom_path')->nullable();
            
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('account_id')
                ->references('id')
                ->on('Account');
            $table->foreign('title_id')
                ->references('id')
                ->on('Title');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('User', function (Blueprint $table) {
            $table->dropForeign(['user_account_id_foreign', 'user_title_id_foreign']);
        });
        Schema::dropIfExists('User');
    }
}
