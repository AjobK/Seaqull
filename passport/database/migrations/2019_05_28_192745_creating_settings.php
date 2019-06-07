<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatingSettings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Setting', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->unsignedBigInteger('user_id');
            $table->string('key');
            $table->longText('value')->nullable();
            //this has timestamps?

            $table->foreign('user_id')
                ->references('id')
                ->on('User');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Setting', function (Blueprint $table) {
            $table->dropForeign('setting_user_id_foreign');
        });
        Schema::dropIfExists('Setting');
    }
}
