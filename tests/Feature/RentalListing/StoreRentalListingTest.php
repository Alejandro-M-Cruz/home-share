<?php

use App\Models\Amenity;
use App\Models\User;

it('returns unauthorized if user is not authenticated', function () {
    $response = $this->postJson(route('rental-listings.store'));

    $response->assertUnauthorized();
});

it('validates the request', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->postJson(route('rental-listings.store'));

    $response->assertJsonValidationErrors([
        'title',
        'type',
        'description',
        'monthly_rent',
        'bathrooms',
        'bedrooms',
        'available_rooms',
        'size',
        'year_built',
        'location'
    ]);
});

it('can store a rental listing', function () {
    $user = User::factory()->create();
    $amenities = Amenity::factory(3)->create();
    $response = $this->actingAs($user)
        ->postJson(route('rental-listings.store'), [
            'title' => 'Beautiful house in the city center',
            'type' => 'house',
            'description' => 'This is a beautiful house in the city center',
            'monthly_rent' => 1500,
            'bathrooms' => 2,
            'bedrooms' => 3,
            'available_rooms' => 3,
            'size' => 150,
            'year_built' => 2010,
            'location' => [
                'country' => 'United States',
                'state' => 'California',
                'city' => 'Los Angeles',
                'postal_code' => '90001',
                'street' => 'Main St',
                'street_number' => '123',
                'door_number' => 'A',
                'floor_number' => 1,
                'latitude' => 34.052235,
                'longitude' => -118.243683,
            ],
            'amenities' => $amenities->pluck('slug')->toArray(),
        ]);

    $response->assertCreated();
    $this->assertDatabaseHas('rental_listings', [
        'title' => 'Beautiful house in the city center',
        'type' => 'house',
        'description' => 'This is a beautiful house in the city center',
        'monthly_rent' => 1500,
        'bathrooms' => 2,
        'bedrooms' => 3,
        'available_rooms' => 3,
        'size' => 150,
        'year_built' => 2010,
        'user_id' => $user->id,
    ]);
    $this->assertDatabaseCount('amenity_rental_listing', 3);
});
