<?php

use App\Models\RentalListing;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function () {
    RentalListing::factory()->count(20)->create();
});

describe('index', function () {
    it('only returns active rental listings', function () {
        RentalListing::truncate();
        RentalListing::factory()->create(['status' => 'inactive']);
        RentalListing::factory()->create(['status' => 'active']);

        $response = $this->get('/api/rental-listings');
        $rentalListings = $response->json('data');

        $response->assertSuccessful();
        $this->assertCount(1, $rentalListings);
    });

    it('returns 12 rental listings sorted by created_at by default', function () {
        $response = $this->get('/api/rental-listings');
        $rentalListings = $response->json('data');

        $response->assertSuccessful();
        $this->assertCount(12, $rentalListings);
    });

    it('returns 2 rental listings when given per_page 2', function () {
        $response = $this->get('/api/rental-listings?per_page=2');
        $rentalListings = $response->json('data');

        $response->assertSuccessful();
        $this->assertCount(2, $rentalListings);
    });

    it('returns 20 rental listings when given per_page 25', function () {
        $response = $this->get('/api/rental-listings?per_page=20');
        $rentalListings = $response->json('data');

        $response->assertSuccessful();
        $this->assertCount(20, $rentalListings);
    });

    it('sorts by created_at by default', function () {
        $response = $this->get('/api/rental-listings');
        $rentalListings = $response->json('data');

        $response->assertSuccessful();
        $this->assertEquals(
            RentalListing::where('status', 'active')
                ->orderBy('created_at', 'desc')
                ->limit(12)
                ->pluck('id')
                ->toArray(),
            array_column($rentalListings, 'id')
        );
    });

    it('sorts by monthly_rent when given sort_by monthly_rent', function () {
        $response = $this->get('/api/rental-listings?sort=monthly_rent');
        $rentalListings = $response->json('data');

        $response->assertSuccessful();
        $this->assertEquals(
            RentalListing::where('status', 'active')
                ->orderBy('monthly_rent')
                ->limit(12)
                ->pluck('id')
                ->toArray(),
            array_column($rentalListings, 'id')
        );
    });
});


