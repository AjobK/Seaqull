<?php

use Illuminate\Database\Seeder;

class EmailVerificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\EmailVerification::class, 5)->create();
    }
}
