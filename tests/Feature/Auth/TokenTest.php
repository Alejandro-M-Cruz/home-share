<?php

use App\Models\User;

test('user can create token with valid credentials', function () {
    $user = User::factory()->create();

    $response = $this->post('/sanctum/token', [
        'email' => $user->email,
        'password' => 'password',
        'device_name' => 'test-device'
    ]);

    $response->assertOk();
    $this->assertStringStartsWith('1', $response->content());
});
