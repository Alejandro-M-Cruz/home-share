<?php

namespace Database\Factories;

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

            'monthly_rent_amount' => $this->faker->randomFloat(2, 100, 10000),
            'year_built' => $this->faker->numberBetween(1900, 2024),
            'size' => $this->faker->numberBetween(10, 1000),
            'size_unit' => $this->faker->randomElement(['sq_ft', 'sq_m']),
            'bathrooms' => $this->faker->numberBetween(1, 5),
            'bedrooms' => $this->faker->numberBetween(1, 5),
            'available_rooms' => $this->faker->numberBetween(1, 5),

            'country' => $this->faker->country,
            'state' => $this->faker->state,
            'city' => $this->faker->city,
            'postal_code' => $this->faker->postcode,
            'street' => $this->faker->streetName,
            'street_number' => $this->faker->buildingNumber,
            'door_number' => $this->faker->buildingNumber,
            'floor_number' => $this->faker->numberBetween(1, 10),
            'latitude' => $this->faker->latitude,
            'longitude' => $this->faker->longitude,
        ];
    }
}
