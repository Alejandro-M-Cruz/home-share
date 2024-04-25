<?php

namespace Database\Seeders;

use App\Models\Amenity;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

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
            ['name' => 'Air Conditioning', 'icon' => 'air-conditioner'],
            ['name' => 'Heating', 'icon' => 'fire'],
            ['name' => 'Gym', 'icon' => 'dumbbell'],
            ['name' => 'Pool', 'icon' => 'pool'],
            ['name' => 'Elevator', 'icon' => 'elevator'],
            ['name' => 'Wheelchair accessible', 'icon' => 'wheelchair-accessibility'],
            ['name' => 'Balcony', 'icon' => 'balcony'],
            ['name' => 'Garden', 'icon' => 'grass'],
            ['name' => 'Dishwasher', 'icon' => 'dishwasher'],
            ['name' => 'Oven', 'icon' => 'toaster-oven'],
            ['name' => 'TV', 'icon' => 'television'],
        ];

        $amenities = array_map(function ($amenity) {
            return array_merge($amenity, ['slug' => Str::slug($amenity['name'])]);
        }, $amenities);

        Amenity::insert($amenities);
    }
}
