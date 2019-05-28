<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddingAttachmentFK extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('Comment', function (Blueprint $table) {
            $table->unsignedBigInteger('attachment_id')->nullable();
            $table->foreign('attachment_id')
                ->references('id')
                ->on('Attachment')
                ->onDelete('cascade');
        });

        Schema::table('Post', function (Blueprint $table) {
            $table->unsignedBigInteger('attachment_id')->nullable();
            $table->foreign('attachment_id')
                ->references('id')
                ->on('Attachment')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Comment', function (Blueprint $table) {
            //
        });
    }
}
