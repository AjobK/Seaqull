<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatingUseractivity extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(Schema::hasTable('useractivity')){
            Schema::drop('useractivity');
        };
        Schema::create('UserActivity', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();

            $table->integer('user_id')->unsigned();
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
        Schema::table('UserActivity', function (Blueprint $table) {
            $table->dropForeign('useractivity_user_id_foreign');
        });
        Schema::dropIfExists('UserActivity');
    }
}
