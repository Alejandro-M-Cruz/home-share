<?php

namespace Database\Factories;

use App\Models\Amenity;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Amenity>
 */
class AmenityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, Amenity>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
            'icon' => $this->faker->word
        ];
    }
}
