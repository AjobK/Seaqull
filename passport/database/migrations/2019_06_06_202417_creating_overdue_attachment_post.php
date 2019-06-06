<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatingOverdueAttachmentPost extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Attachment_Post', function (Blueprint $table) {
            $table->unsignedBigInteger('id');
            $table->unsignedBigInteger('attachment_id');
            $table->unsignedBigInteger('post_id');
            $table->string('type');

            $table->timestamps();

            $table->foreign('attachment_id')
                ->references('id')
                ->on('Attachment');

            $table->foreign('post_id')
                ->references('id')
                ->on('Post');

            $table->primary(['id', 'attachment_id', 'post_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Attachment_Post');
    }
}
