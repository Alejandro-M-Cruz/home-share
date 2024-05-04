<?php

use App\Models\RentalListing;
use App\Models\User;
use Illuminate\Http\UploadedFile;

it('returns unauthorized if user is not authenticated', function () {
    $rentalListing = RentalListing::factory()->create();

    $response = $this->postJson(route('rental-listings.upload-images', ['rental_listing' => $rentalListing->id]));

    $response->assertUnauthorized();
});

it('returns forbidden if rental listing does not belong to user', function () {
    $user = User::factory()->create();
    $rentalListing = RentalListing::factory()->create();

    $response = $this->actingAs($user)
        ->postJson(route('rental-listings.upload-images', ['rental_listing' => $rentalListing->id]));

    $response->assertForbidden();
});

it('validates the request', function () {
    $user = User::factory()->create();
    $rentalListing = RentalListing::factory(['user_id' => $user->id])->create();

    $response = $this->actingAs($user)
        ->postJson(
            route('rental-listings.upload-images', ['rental_listing' => $rentalListing->id]),
            ['images' => 'not-an-array']
        );

    $response->assertStatus(422);
    $response->assertJsonValidationErrors([
        'images',
    ]);
});

it('can upload images to a rental listing', function () {
    $user = User::factory()->create();
    $rentalListing = RentalListing::factory(['user_id' => $user->id])->create();

    $file = UploadedFile::fake()->image('image.jpg');

    $response = $this->actingAs($user)
        ->postJson(route('rental-listings.upload-images', ['rental_listing' => $rentalListing->id]), [
            'images' => [$file],
        ]);

    $response->assertCreated();
    $this->assertDatabaseHas('images', [
        'imageable_id' => $rentalListing->id,
        'imageable_type' => RentalListing::class,
        'path' => 'public/images/' . $file->hashName(),
    ]);
});
