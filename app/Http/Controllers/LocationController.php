<?php

namespace App\Http\Controllers;

use App\Http\Resources\LocationResource;
use App\Http\Resources\RentalListingResource;
use App\Models\RentalListing;
use Illuminate\Http\Response;

class LocationController extends Controller
{
    public function index()
    {
        return LocationResource::collection(
            RentalListing::active()->get()
        );
    }

    public function show(RentalListing $rentalListing)
    {
        if ($rentalListing->status !== 'active') {
            return response()->noContent(Response::HTTP_NOT_FOUND);
        }

        return new RentalListingResource($rentalListing);
    }
}
