<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProfileInfo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('path')->unique();
            $table->string('profile_photo')->nullable();
            $table->string('profile_banner')->nullable();
            $table->integer('experience')->unsigned();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('path');
            $table->dropColumn('profile_photo');
            $table->dropColumn('profile_banner');
            $table->dropColumn('experience');
        });
    }
}
