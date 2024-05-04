<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRentalListingOwnership
{
    public function handle(Request $request, Closure $next): Response
    {
        $rentalListing = $request->route('rental_listing');

        if ($rentalListing === null) {
            abort(Response::HTTP_NOT_FOUND);
        }

        if ($rentalListing->user_id !== auth()->id()) {
            abort(Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
