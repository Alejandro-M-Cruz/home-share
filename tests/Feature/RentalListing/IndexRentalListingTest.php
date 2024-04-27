<?php

use App\Models\RentalListing;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('only returns active rental listings', function () {
    RentalListing::factory()->create(['status' => 'inactive']);
    RentalListing::factory()->create(['status' => 'active']);

    $response = $this->get('/api/rental-listings');
    $rentalListings = $response->json('data');

    $response->assertSuccessful();
    $this->assertCount(1, $rentalListings);
});

it('returns 12 rental listings sorted by default', function () {
    RentalListing::factory()->count(20)->create();

    $response = $this->get('/api/rental-listings');
    $rentalListings = $response->json('data');

    $response->assertSuccessful();
    $this->assertCount(12, $rentalListings);
});

it('returns 2 rental listings when passing per_page 2', function () {
    RentalListing::factory()->count(20)->create();

    $response = $this->get('/api/rental-listings?per_page=2');
    $rentalListings = $response->json('data');

    $response->assertSuccessful();
    $this->assertCount(2, $rentalListings);
});

it('returns all active rental listings when passing per_page greater than total', function () {
    RentalListing::factory()->count(20)->create();

    $response = $this->get('/api/rental-listings?per_page=20');
    $rentalListings = $response->json('data');

    $response->assertSuccessful();
    $this->assertCount(20, $rentalListings);
});

it('sorts by created_at by default', function () {
    RentalListing::factory()->count(20)->create();

    $response = $this->get('/api/rental-listings');
    $rentalListings = $response->json('data');

    $response->assertSuccessful();
    $this->assertEquals(
        RentalListing::active()
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->pluck('id')
            ->toArray(),
        array_column($rentalListings, 'id')
    );
});

it('sorts by key passed in the sort query parameter', function () {
    RentalListing::factory()->count(20)->create();

    $response = $this->get('/api/rental-listings?sort=monthly_rent');
    $rentalListings = $response->json('data');

    $response->assertSuccessful();
    $this->assertEquals(
        RentalListing::active()
            ->orderBy('monthly_rent')
            ->limit(12)
            ->pluck('id')
            ->toArray(),
        array_column($rentalListings, 'id')
    );
});

it('sorts by key passed in the sort query parameter in descending order', function () {
    RentalListing::factory()->count(20)->create();

    $response = $this->get('/api/rental-listings?sort=-monthly_rent');
    $rentalListings = $response->json('data');

    $response->assertSuccessful();
    $this->assertEquals(
        RentalListing::active()
            ->orderBy('monthly_rent', 'desc')
            ->limit(12)
            ->pluck('id')
            ->toArray(),
        array_column($rentalListings, 'id')
    );
});

it('filters by the key and value in the filter query parameter', function () {
    RentalListing::factory()->create(['type' => 'apartment']);
    RentalListing::factory()->create(['type' => 'house']);

    $response = $this->get('/api/rental-listings?filter[type]=apartment');
    $rentalListings = $response->json('data');

    $response->assertSuccessful();
    $this->assertCount(1, $rentalListings);
});

it('applies all filters when given more than one filter', function () {
    RentalListing::factory()->count(2)->create(['city' => 'New York', 'country' => 'United States']);
    RentalListing::factory()->create(['city' => 'Los Angeles', 'country' => 'United States']);

    $response = $this->get('/api/rental-listings?filter[city]=new&filter[country]=States');
    $rentalListings = $response->json('data');

    $response->assertSuccessful();
    $this->assertCount(2, $rentalListings);
});

it('can filter monthly_rent between two values', function () {
    RentalListing::factory()->create(['monthly_rent' => 1000]);
    RentalListing::factory()->create(['monthly_rent' => 2000]);
    RentalListing::factory()->create(['monthly_rent' => 3000]);

    $response = $this->get('/api/rental-listings?filter[monthly_rent_between]=999.99,2000');
    $rentalListings = $response->json('data');

    $response->assertSuccessful();
    $this->assertCount(2, $rentalListings);
});

it('can filter available_rooms between two values', function () {
    RentalListing::factory()->create(['available_rooms' => 1]);
    RentalListing::factory()->create(['available_rooms' => 3]);
    RentalListing::factory()->create(['available_rooms' => 6]);

    $response = $this->get('/api/rental-listings?filter[available_rooms_between]=4,7');
    $rentalListings = $response->json('data');

    $response->assertSuccessful();
    $this->assertCount(1, $rentalListings);
});

it('can filter and sort at the same time', function () {
    RentalListing::factory()->create(['monthly_rent' => 2000, 'city' => 'New York']);
    RentalListing::factory()->create(['monthly_rent' => 4000, 'city' => 'New York']);
    RentalListing::factory()->create(['monthly_rent' => 2000, 'city' => 'Los Angeles']);

    $response = $this->get(
        '/api/rental-listings?filter[city]=yor&filter[monthly_rent_between]=1500.00&sort=-monthly_rent'
    );
    $rentalListings = $response->json('data');

    $response->assertSuccessful();
    $this->assertCount(2, $rentalListings);
    $this->assertEquals(
        [4000, 2000],
        array_column($rentalListings, 'monthly_rent')
    );
});


