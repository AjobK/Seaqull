<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAccountTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Account', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('role_id');
            $table->string('user_name')->unique();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->ipAddress('last_ip');
            $table->integer('login_attempts_count')->nullable();
            $table->timestamp('locked_to')->nullable();
            $table->rememberToken();
            
            $table->timestamps();
            $table->softDeletes();
            $table->timestamp('changed_pw_at')->nullable();

            $table->foreign('role_id')
                ->references('id')
                ->on('Role');
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
            $table->dropForeign('account_role_id_foreign');
        });
        Schema::dropIfExists('Account');
    }
}
