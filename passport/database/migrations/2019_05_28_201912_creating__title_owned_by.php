<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatingTitleOwnedBy extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('TitleOwnedBy', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('title_id');

            $table->foreign('user_id')
                ->references('id')
                ->on('User');

            $table->foreign('title_id')
                ->references('id')
                ->on('Title');

            $table->primary(['user_id', 'title_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('TitleOwnedBy', function (Blueprint $table) {
            $table->dropForeign('titleownedby_user_id_foreign');
            $table->dropForeign('titleownedby_title_id_foreign');
        });
        Schema::dropIfExists('TitleOwnedBy');
    }
}
