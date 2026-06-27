<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Cria o Admin
        User::factory()->create([
            'name' => 'Admin',
            'role' => 'admin',
            'email' => 'admin@example.com',
        ]);

        // Chama os novos seeders
        $this->call([
            CategorySeeder::class,
            BrandSeeder::class,
        ]);
    }
}
