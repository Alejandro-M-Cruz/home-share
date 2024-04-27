<?php

namespace App\Http\Controllers;

use App\Http\Resources\LocationResource;
use App\Models\RentalListing;

class LocationController extends Controller
{
    public function index()
    {
        return LocationResource::collection(
            RentalListing::active()->get()
        );
    }
}
