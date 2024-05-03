<?php

namespace App\Http\Middleware;

use App\Models\RentalListing;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRentalListingOwnership
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $userId = auth()->id();
        $rentalListingId = $request->route('id');

        if (!$userId || !$rentalListingId) {
            abort(404);
        }

        $rentalListing = RentalListing::find($rentalListingId);

        if (!$rentalListing || $rentalListing->user_id !== $userId) {
            abort(403);
        }

        return $next($request);
    }
}
