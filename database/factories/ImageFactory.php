<?php

namespace Database\Factories;

use App\Models\Image;
use App\Models\RentalListing;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, Image>
     */
    public function definition(): array
    {
        return [
            'path' => $this->faker->image,
            'url' => $this->faker->imageUrl,
            'size' => $this->faker->numberBetween(100, 9_000_000),
            'order' => $this->faker->numberBetween(1, 10),
            'imageable_type' => 'App\Models\RentalListing',
            'imageable_id' => RentalListing::factory(),
        ];
    }
}
