<?php

namespace App\Http\Controllers;

use App\Models\Location;

class LocationController extends Controller
{
    public function index()
    {
        return response()->json(
            Location::whereHas('rentalListing', function ($query) {
                $query->where('status', 'active');
            })->get()
        );
    }
}
