<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRentalListingRequest;
use App\Http\Resources\RentalListingResource;
use App\Models\Amenity;
use App\Models\RentalListing;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
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
                'country',
                'city',
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
    public function store(StoreRentalListingRequest $request)
    {
        $data = $request->validated();
        $rentalListing = RentalListing::create(
            array_merge($data, $data['location'], ['user_id' => auth()->id()])
        );

        $amenities = Amenity::whereIn('slug', $data['amenities'])->get();
        $rentalListing->amenities()->attach($amenities);

        $images = $request->file('images');

        foreach ($images as $image) {
            $name = $image->hashName();
            $path = "public/images/$name";
            if ($image->storeAs('public/images', $name)) {
                $rentalListing->images()->create([
                    'path' => $path,
                    'url' => Storage::url($path),
                    'size' => $image->getSize(),
                ]);
            }
        }

        return response()->noContent(Response::HTTP_CREATED);
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
