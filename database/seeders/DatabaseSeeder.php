<?php

namespace Database\Seeders;

use App\Models\Amenity;
use App\Models\Image;
use App\Models\RentalListing;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Storage::disk('public')->deleteDirectory('images');

        Storage::disk('public')->makeDirectory('images');

        $this->call([AmenitySeeder::class]);

        $rentalListingFactory = RentalListing::factory()
            ->has(Image::factory()->count(3))
            ->count(14);

        User::factory()
            ->has($rentalListingFactory)
            ->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => Hash::make('password')
            ]);

        RentalListing::all()->each(function (RentalListing $rentalListing) {
            $amenities = Amenity::inRandomOrder()->limit(3)->get();
            $rentalListing->amenities()->attach($amenities);
        });
    }
}
