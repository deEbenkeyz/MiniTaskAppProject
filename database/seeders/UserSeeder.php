<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => "Ebenezer Ohene-Adutwum",
            'email' => "dev.ebenkeyz@gmail.com",
            'password' => bcrypt("Pass#2025x"),
        ]);
    }
}
