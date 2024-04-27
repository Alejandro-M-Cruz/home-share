<?php

use App\Models\RentalListing;

it('returns location of all active rental listings', function () {
    RentalListing::factory()->count(3)->create();

    $response = $this->get(route('locations.index'));

    $response->assertSuccessful();
    $response->assertJsonCount(3, 'data');
    $response->assertJsonStructure([
        'data' => [
            '*' => [
                'id',
                'country',
                'state',
                'city',
                'postal_code',
                'street',
                'street_number',
                'door_number',
                'floor_number',
                'latitude',
                'longitude',
            ],
        ],
    ]);
});
