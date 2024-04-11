<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\RentalListing;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([AmenitySeeder::class]);

        $rentalListingFactory = RentalListing::factory()
            ->has(Image::factory()->count(3))
            ->count(3);

        User::factory()
            ->has($rentalListingFactory)
            ->create();
    }
}
