<?php

namespace Database\Seeders;

use App\Models\RentalListing;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RentalListingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RentalListing::factory()->count(10)->create();
    }
}
