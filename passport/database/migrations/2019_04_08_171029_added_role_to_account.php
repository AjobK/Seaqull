<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddedRoleToAccount extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('Account', function (Blueprint $table) {
            // $table->unsignedBigInteger('role_id');

            // $table->foreign('role_id')
            // ->references('id')
            // ->on('Role');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // I made this try-catch because role was a weird column to deal with
        try {
            if(Schema::hasColumn('Account','role_id')){
                Schema::table('Account', function (Blueprint $table) {
                    $table->dropForeign('Account_role_id_foreign');
                });
            }
        } 
        catch (Exception $e) {
            //
        }
    }
}
