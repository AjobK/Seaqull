<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatingEmailVerification extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Email_Verification', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('account_id');
            $table->string('token');

            $table->timestamps();
            $table->timestamp('verified_at')->nullable();
            $table->timestamp('expires_at');

            $table->foreign('account_id')
                ->references('id')
                ->on('Account');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Reset_And_Verify', function (Blueprint $table) {
            $table->dropForeign('reset_and_verify_account_id_foreign');
        });
        Schema::dropIfExists('Reset_And_Verify');
    }
}
