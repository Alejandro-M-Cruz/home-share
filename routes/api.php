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

Route::get('/locations', [LocationController::class, 'index'])
    ->name('locations.index');

Route::group(['prefix' => 'rental-listings'], function () {
    Route::get('/', [RentalListingController::class, 'index']);
    Route::get('{rental_listing}', [RentalListingController::class, 'show']);

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/', [RentalListingController::class, 'store']);
        Route::get('mine', [RentalListingController::class, 'mine']);
    });

    Route::middleware(['auth:sanctum', 'rental-listing:check-ownership'])->group(function () {
        Route::put('{rental_listing}', [RentalListingController::class, 'update']);
        Route::patch('{rental_listing}', [RentalListingController::class, 'update']);
        Route::delete('{rental_listing}', [RentalListingController::class, 'destroy']);
    });
});
