<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenamingTablesToSnakeCase extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::rename('resetandverify', 'reset_and_verify');
        Schema::rename('titleownedby', 'title_owned_by');
        Schema::rename('useractivity', 'user_activity');
        Schema::rename('usercommentlike', 'user_comment_like');
        Schema::rename('userpostactions', 'user_post_actions');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::rename('reset_and_verify', 'resetandverify');
        Schema::rename('title_owned_by', 'titleownedby');
        Schema::rename('user_activity', 'useractivity');
        Schema::rename('user_comment_like', 'usercommentlike');
        Schema::rename('user_post_actions', 'userpostactions');
    }
}
