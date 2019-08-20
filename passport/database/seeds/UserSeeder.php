<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class, 5)->create()->each(function ($user) {
            DB::table('title_owned_by')->insert([
                'user_id' => $user->id,
                'title_id' => 1
            ]);
        });
    }
}
