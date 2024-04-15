<?php

use App\Http\Controllers\AmenityController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\RentalListingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/amenities', [AmenityController::class, 'index']);

Route::get('/locations', [LocationController::class, 'index']);

Route::apiResource('rental-listings', RentalListingController::class);
