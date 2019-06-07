<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('User', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->unsignedBigInteger('account_id');
            $table->unsignedBigInteger('title_id')->nullable();
            $table->unsignedBigInteger('avatar_attachment')->nullable();
            $table->string('display_name')->nullable();
            $table->float('experience', 10, 2)->nullable();
            $table->integer('rows_scrolled')->nullable();
            $table->string('custom_path')->nullable();
            
            $table->timestamps();
            $table->softDeletes();


            $table->foreign('profile_pic')
                ->references('id')
                ->on('Attachment');

            $table->foreign('account_id')
                ->references('id')
                ->on('Account');

            $table->foreign('title_id')
                ->references('id')
                ->on('Title');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('User', function (Blueprint $table) {
            $table->dropForeign('user_profile_pic_foreign');
            $table->dropForeign('user_account_id_foreign');
            $table->dropForeign('user_title_id_foreign');
        });
        Schema::dropIfExists('User');
    }
}
