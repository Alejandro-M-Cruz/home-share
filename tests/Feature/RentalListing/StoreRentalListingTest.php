<?php

use App\Models\Amenity;
use App\Models\Location;
use App\Models\User;

it('returns forbidden if user is not authenticated', function () {
    $response = $this->postJson(route('rental-listings.store'));

    $response->assertForbidden();
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
        'available_rooms',
        'size',
        'year_built',
        'location',
        'amenities',
    ]);
});

it('can store a rental listing', function () {
    $user = User::factory()->create();
    $amenities = Amenity::factory(3)->create();
    $location = Location::factory()->make()->toArray();

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
            'location' => $location,
            'amenities' => $amenities->pluck('slug')->toArray(),
        ]);

    dump($response->content());

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

    $this->assertDatabaseHas('locations', $location);

    $this->assertDatabaseCount('amenity_rental_listing', 3);
});
