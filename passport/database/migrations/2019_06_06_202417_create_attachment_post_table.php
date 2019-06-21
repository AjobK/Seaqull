<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAttachmentPostTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Attachment_Post', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('attachment_id');
            $table->unsignedBigInteger('post_id');
            $table->string('type');

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('attachment_id')
                ->references('id')
                ->on('Attachment');

            $table->foreign('post_id')
                ->references('id')
                ->on('Post');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Attachment_Post', function (Blueprint $table) {
            $table->dropForeign('attachment_post_attachment_id_foreign');
            $table->dropForeign('attachment_post_post_id_foreign');
        });
        Schema::dropIfExists('Attachment_Post');
    }
}
