<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatingBan extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Ban', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->unsignedBigInteger('staff_id');
            $table->unsignedBigInteger('account_id');
            $table->text('reason');
            $table->text('description')->nullable();
            $table->timestamp('banned_at');
            $table->timestamp('banned_to')->nullable();
            $table->boolean('ip_ban');

            $table->timestamps();
            $table->sofDeletes();

            $table->foreign('staff_id')
                ->references('id')
                ->on('Account');
            
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
        Schema::table('Ban', function (Blueprint $table) {
            $table->dropForeign('ban_staff_id_foreign');
            $table->dropForeign('ban_account_id_foreign');
        });
        Schema::dropIfExists('Ban');
    }
}
