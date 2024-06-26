<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRentalListingRequest;
use App\Http\Resources\RentalListingResource;
use App\Http\Resources\RentalListingDetailsResource;
use App\Models\Amenity;
use App\Models\RentalListing;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
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
     * Get the rental listings created by the authenticated user.
     */
    public function getMyRentalListings(Request $request)
    {
        $myRentalListings = QueryBuilder::for(RentalListing::class)
            ->where('user_id', auth()->id())
            ->allowedFilters([AllowedFilter::exact('status')])
            ->defaultSort('-created_at')
            ->allowedSorts('created_at', 'updated_at', 'monthly_rent', 'available_rooms', 'size', 'year_built')
            ->cursorPaginate($request->get('per_page', 12));
        return RentalListingResource::collection($myRentalListings);
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

        return response()->json(['id' => $rentalListing->id], Response::HTTP_CREATED);
    }

    public function uploadImages(Request $request, RentalListing $rentalListing)
    {
        $request->validate([
            'images' => 'required|array|min:1|max:8',
            'images.*' => 'required|image|max:4096',
        ], [
            'images.*.required' => 'Every image must be provided.',
            'images.*.image' => 'Every file must be an image.',
            'images.*.max' => 'Every image must be smaller than 4MB.',
        ]);

        $images = $request->file('images');

        foreach ($images as $image) {
            $name = $image->hashName();
            $path = $image->storeAs('public/images', $name);
            if ($path) {
                $rentalListing->images()->create([
                    'path' => $path,
                    'url' => Storage::url($path),
                    'size' => $image->getSize(),
                ]);
            } else {
                Log::error("Failed to store image $name for rental listing $rentalListing->id");
                return response()->json(
                    ['message' => 'Failed to store some of the images.'],
                    Response::HTTP_INTERNAL_SERVER_ERROR
                );
            }
        }

        return response()->noContent(Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(RentalListing $rentalListing)
    {
        if ($rentalListing->status !== 'active' && $rentalListing->user_id !== auth()->id()) {
            return response()->noContent(Response::HTTP_FORBIDDEN);
        }
        return new RentalListingDetailsResource($rentalListing);
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
        $rentalListing->delete();
        return response()->noContent();
    }

    public function toggleStatus(RentalListing $rentalListing)
    {
        $rentalListing->toggleStatus();
        return response()->noContent();
    }
}
