<?php

use Illuminate\Database\Seeder;

class CommentHasAttachmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\CommentHasAttachment::class, 5)->create();
    }
}
