<?php

use App\Models\Amenity;

test('users can get all amenities', function () {
    Amenity::factory()->count(3)->create();

    $response = $this->get('/api/amenities');

    $response->assertStatus(200);
    $response->assertJsonStructure([
        '*' => [
            'id',
            'name',
            'icon',
            'created_at',
            'updated_at',
        ],
    ]);
    $response->assertJsonCount(3);
});


