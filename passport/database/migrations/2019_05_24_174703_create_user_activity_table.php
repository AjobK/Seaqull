<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserActivityTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('User_Activity', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('user_id');
            $table->string('previous_password', 255)->nullable();
            $table->string('type');
            $table->string('ip_address');
            $table->timestamp('created_at');

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
        Schema::table('User_Activity', function (Blueprint $table) {
            $table->dropForeign('user_activity_user_id_foreign');
        });
        Schema::dropIfExists('User_Activity');
    }
}
