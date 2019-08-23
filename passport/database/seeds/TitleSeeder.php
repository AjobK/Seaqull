<?php

use Illuminate\Database\Seeder;

class TitleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Title::class, 1)->create(['name' => 'Hatchling']);
        factory(App\Title::class, 5)->create();
    }
}
