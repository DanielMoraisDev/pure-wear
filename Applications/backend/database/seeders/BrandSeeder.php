<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        $brands = [
            'Nike', 'Adidas', 'Puma', 'Reebok', 'Gucci',
            'Zara', 'H&M', 'Levi\'s', 'Tommy Hilfiger', 'Calvin Klein'
        ];

        foreach ($brands as $brand) {
            Brand::create([
                'name' => $brand,
                'status' => 1,
            ]);
        }
    }
}
