<?php

use Illuminate\Database\Seeder;

class PostHasAttachment extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\PostHasAttachment::class, 5)->create();
    }
}
