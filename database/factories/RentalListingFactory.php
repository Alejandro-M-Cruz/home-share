<?php

namespace Database\Factories;

use App\Models\Location;
use App\Models\RentalListing;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RentalListing>
 */
class RentalListingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, RentalListing>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'status' => 'active',
            'type' => $this->faker->randomElement(['apartment', 'house']),
            'rules' => $this->faker->paragraph,
            'additional_information' => $this->faker->paragraph,

            'monthly_rent' => $this->faker->randomFloat(2, 100, 10000),
            'year_built' => $this->faker->numberBetween(1900, 2024),
            'size' => $this->faker->numberBetween(10, 1000),
            'size_unit' => $this->faker->randomElement(['sq_ft', 'sq_m']),
            'bathrooms' => $this->faker->numberBetween(1, 5),
            'bedrooms' => $this->faker->numberBetween(1, 5),
            'available_rooms' => $this->faker->numberBetween(1, 5),

            'location_id' => Location::factory(),
        ];
    }
}
