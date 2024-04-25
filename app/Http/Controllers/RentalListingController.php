<?php

namespace App\Http\Controllers;

use App\Http\Resources\RentalListingResource;
use App\Models\RentalListing;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class RentalListingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $rentalListings = QueryBuilder::for(RentalListing::class)
            ->active()
            ->allowedFilters([
                'type',
                AllowedFilter::scope('country', 'whereCountry'),
                AllowedFilter::scope('city', 'whereCity'),
                AllowedFilter::scope('monthly_rent_between', 'whereMonthlyRentBetween'),
                AllowedFilter::scope('available_rooms_between', 'whereAvailableRoomsBetween'),
            ])
            ->defaultSort('-created_at')
            ->allowedSorts('created_at', 'updated_at', 'monthly_rent', 'available_rooms', 'size', 'year_built')
            ->cursorPaginate($request->get('per_page', 12));

        return RentalListingResource::collection($rentalListings);
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
