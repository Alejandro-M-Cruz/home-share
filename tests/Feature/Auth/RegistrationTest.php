<?php

test('new users can register', function () {
    $response = $this->post('/register', [
        'name' => 'Test Auth',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertNoContent();
});
