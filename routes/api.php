<?php

use App\Http\Controllers\AmenityController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\RentalListingController;
use App\Http\Middleware\CheckRentalListingOwnership;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/amenities', [AmenityController::class, 'index']);

Route::get('/locations', [LocationController::class, 'index'])
    ->name('locations.index');

Route::prefix('rental-listings')->group(function () {
    Route::get('/', [RentalListingController::class, 'index'])
        ->name('rental-listings.index');
    Route::get('/{rental_listing}', [RentalListingController::class, 'show'])
        ->name('rental-listings.show');

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/', [RentalListingController::class, 'store'])
            ->name('rental-listings.store');
        Route::get('/mine', [RentalListingController::class, 'mine'])
            ->name('rental-listings.mine');
    });

    Route::middleware(['auth:sanctum', CheckRentalListingOwnership::class])->group(function () {
        Route::post('/{rental_listing}/upload-images', [RentalListingController::class, 'uploadImages'])
            ->name('rental-listings.upload-images');
        Route::put('/{rental_listing}', [RentalListingController::class, 'update'])
            ->name('rental-listings.update');
        Route::patch('/{rental_listing}', [RentalListingController::class, 'update'])
            ->name('rental-listings.update');
        Route::delete('/{rental_listing}', [RentalListingController::class, 'destroy'])
            ->name('rental-listings.destroy');
    });
});
