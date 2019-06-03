<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatingResetAndVerify extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ResetAndVerify', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('account_id')->unsigned();
            $table->string('code');
            $table->boolean('reset')->nullable();
            $table->timestamps();
            $table->timestamp('verified_at')->nullable();

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
        Schema::table('ResetAndVerify', function (Blueprint $table) {
            $table->dropForeign('resetandverify_account_id_foreign');
        });
        Schema::dropIfExists('ResetAndVerify');
    }
}
