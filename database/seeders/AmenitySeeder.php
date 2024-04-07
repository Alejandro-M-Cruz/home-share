<?php

namespace Database\Seeders;

use App\Models\Amenity;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AmenitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $amenities = [
            ['name' => 'Parking', 'icon' => 'parking'],
            ['name' => 'Pets Allowed', 'icon' => 'paw'],
            ['name' => 'Smoking Allowed', 'icon' => 'smoking'],
            ['name' => 'Wi-Fi', 'icon' => 'wifi'],
            ['name' => 'Air Conditioning', 'icon' => 'fan'],
            ['name' => 'Heating', 'icon' => 'fire'],
        ];

        Amenity::createMany($amenities);
    }
}
