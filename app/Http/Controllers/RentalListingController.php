<?php

namespace App\Http\Controllers;

use App\Http\Resources\RentalListingResource;
use App\Models\RentalListing;
use Illuminate\Http\Request;

class RentalListingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return RentalListingResource::collection(
            RentalListing::where('status', 'active')
                ->orderBy('created_at', 'desc')
                ->cursorPaginate(2)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(RentalListing $rentalListing)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RentalListing $rentalListing)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RentalListing $rentalListing)
    {
        //
    }
}