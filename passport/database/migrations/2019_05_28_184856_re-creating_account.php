<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ReCreatingAccount extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('Account', function (Blueprint $table) {
            $table->dropColumn('name');
            $table->ipAddress('last_ip');
            $table->softDeletes();
            $table->timestamp('changed_pw_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Account', function (Blueprint $table) {
            $table->string('name');
            $table->dropColumn(['last_ip', 'deleted_at', 'changed_pw_at']);
        });
    }
}
