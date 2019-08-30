<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostHasAttachmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Post_Has_Attachment', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('attachment_id');
            $table->unsignedBigInteger('post_id');
            $table->string('type')->nullable();

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
        Schema::table('Post_Has_Attachment', function (Blueprint $table) {
            $table->dropForeign('post_has_attachment_attachment_id_foreign');
            $table->dropForeign('post_has_attachment_post_id_foreign');
        });
        Schema::dropIfExists('Post_Has_Attachment');
    }
}
