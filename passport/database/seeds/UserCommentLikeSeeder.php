<?php

use Illuminate\Database\Seeder;

class UserCommentLikeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\UserCommentLike::class, 5)->create();
    }
}
