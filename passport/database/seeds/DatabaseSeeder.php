<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RoleSeeder::class);
        $this->call(AccountSeeder::class);
        $this->call(AttachmentSeeder::class);
        $this->call(BanSeeder::class);
        $this->call(PostSeeder::class);
        $this->call(EmailVerificationSeeder::class);
        $this->call(PostHasAttachmentSeeder::class);
        $this->call(SettingSeeder::class);
        $this->call(TitleSeeder::class);
        $this->call(UserActivitySeeder::class);
        $this->call(UserCommentLikeSeeder::class);
        $this->call(UserSeeder::class);
    }
}
